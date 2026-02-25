import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';
const PURPLE = '#a855f7';
const PINK = '#ec4899';

/* ── Circuit-node positions (1200x700 canvas, center cleared for logo) ── */
const NODES = [
  { x: 100, y: 80 },
  { x: 280, y: 50 },
  { x: 480, y: 120 },
  { x: 720, y: 60 },
  { x: 920, y: 110 },
  { x: 1100, y: 55 },
  { x: 160, y: 310 },
  { x: 340, y: 410 },
  { x: 760, y: 230 },
  { x: 880, y: 380 },
  { x: 1060, y: 310 },
  { x: 120, y: 560 },
  { x: 350, y: 590 },
  { x: 580, y: 540 },
  { x: 820, y: 600 },
  { x: 1020, y: 550 },
];

/* ── Edges (index pairs into NODES) ── */
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [0, 6], [6, 7], [7, 8], [8, 9], [9, 10],
  [2, 8], [4, 10], [1, 7], [3, 9],
  [6, 11], [11, 12], [12, 13], [13, 14], [14, 15],
  [7, 12], [8, 13], [9, 14], [10, 15],
];

/* ── Pulse path ── */
const PULSE_PATH = [0, 1, 2, 3, 4, 5, 4, 9, 10, 15, 14, 13, 12, 11, 6, 0];
const PATH_LEN = 200;

export const HeroComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Layer 1: Background + Dot Grid ── */
  const gridOpacity = interpolate(frame, [0, 40], [0, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  /* ── Layer 2: Glow Blobs ── */
  const glow1Opacity = interpolate(frame, [10, 50], [0, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glow1Scale = interpolate(
    (frame + 10) % 120,
    [0, 60, 120],
    [1, 1.12, 1],
  );

  const glow2Opacity = interpolate(frame, [20, 60], [0, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glow2Scale = interpolate(
    (frame + 40) % 100,
    [0, 50, 100],
    [1, 1.1, 1],
  );

  /* ── Layer 3: Circuit Graph ── */
  const nodeAppear = (i: number) => {
    const delay = 8 + i * 3;
    return spring({
      frame: frame - delay,
      fps,
      config: { damping: 14, stiffness: 120 },
    });
  };

  const edgeDraw = (i: number) => {
    const delay = 20 + i * 2;
    return interpolate(frame - delay, [0, 30], [PATH_LEN, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  // Traveling pulse (starts after text reveals)
  const pulseSpeed = 0.04;
  const pulsePos =
    frame > 90 ? ((frame - 90) * pulseSpeed) % PULSE_PATH.length : -1;
  const pulseIdx = Math.floor(pulsePos);
  const pulseFrac = pulsePos - pulseIdx;

  let pulseX = -100;
  let pulseY = -100;
  if (pulsePos >= 0 && pulseIdx < PULSE_PATH.length - 1) {
    const fromNode = NODES[PULSE_PATH[pulseIdx]];
    const toNode = NODES[PULSE_PATH[pulseIdx + 1]];
    pulseX = fromNode.x + (toNode.x - fromNode.x) * pulseFrac;
    pulseY = fromNode.y + (toNode.y - fromNode.y) * pulseFrac;
  }

  const nodeGlow = (nx: number, ny: number) => {
    const dist = Math.sqrt((nx - pulseX) ** 2 + (ny - pulseY) ** 2);
    return interpolate(dist, [0, 120], [0.9, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  /* ── Layer 4: Logo — Center Stage ── */
  const logoSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1.0]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Energy burst behind logo
  const burstScale = interpolate(frame, [30, 55], [0.3, 1.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const burstOpacity = interpolate(frame, [30, 45, 55], [0, 0.7, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Logo glow breathing
  const logoGlow =
    frame > 55
      ? interpolate(
          (frame - 55) % 90,
          [0, 45, 90],
          [0.3, 0.55, 0.3],
        )
      : interpolate(frame, [40, 55], [0, 0.3], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  /* ── Layer 5: Text Reveals ── */
  const line1Spring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const line1Y = interpolate(line1Spring, [0, 1], [30, 0]);
  const line1Opacity = interpolate(line1Spring, [0, 1], [0, 1]);

  const line2Spring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const line2Y = interpolate(line2Spring, [0, 1], [30, 0]);
  const line2Opacity = interpolate(line2Spring, [0, 1], [0, 1]);

  const subOpacity = interpolate(frame, [80, 105], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(160deg, #050508 0%, #0a0a10 40%, #0d0a12 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${CORAL}0d 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          opacity: gridOpacity,
        }}
      />

      {/* Coral glow blob (behind logo) */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '35%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${CORAL}20, transparent 70%)`,
          opacity: glow1Opacity,
          transform: `scale(${glow1Scale})`,
        }}
      />

      {/* Purple glow blob (offset left) */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '15%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${PURPLE}18, transparent 70%)`,
          opacity: glow2Opacity,
          transform: `scale(${glow2Scale})`,
        }}
      />

      {/* Circuit graph SVG (background layer, reduced opacity) */}
      <svg
        width="1200"
        height="700"
        viewBox="0 0 1200 700"
        style={{ position: 'absolute', top: 0, left: 0, opacity: 0.55 }}
      >
        <defs>
          <linearGradient id="hEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={CORAL} stopOpacity="0.4" />
            <stop offset="100%" stopColor={PURPLE} stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="hPulseGlow">
            <stop offset="0%" stopColor={CORAL} stopOpacity="1" />
            <stop offset="50%" stopColor={CORAL} stopOpacity="0.4" />
            <stop offset="100%" stopColor={CORAL} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hNodeGlow">
            <stop offset="0%" stopColor={CORAL} stopOpacity="0.8" />
            <stop offset="100%" stopColor={CORAL} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const from = NODES[a];
          const to = NODES[b];
          return (
            <line
              key={`edge-${i}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#hEdgeGrad)"
              strokeWidth="1.2"
              strokeDasharray={PATH_LEN}
              strokeDashoffset={edgeDraw(i)}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const appear = nodeAppear(i);
          const glow = nodeGlow(node.x, node.y);
          const baseRadius = 4;
          const radius = baseRadius + glow * 3;
          return (
            <g key={`node-${i}`}>
              {glow > 0.1 && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={radius * 4}
                  fill="url(#hNodeGlow)"
                  opacity={glow * 0.5}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={radius}
                fill={CORAL}
                opacity={interpolate(appear, [0, 1], [0, 0.6 + glow * 0.4])}
                transform={`translate(${node.x * (1 - appear)} ${node.y * (1 - appear)}) scale(${appear})`}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
            </g>
          );
        })}

        {/* Traveling pulse */}
        {pulsePos >= 0 && (
          <circle
            cx={pulseX}
            cy={pulseY}
            r="18"
            fill="url(#hPulseGlow)"
          />
        )}
      </svg>

      {/* ── Logo — Center Stage ── */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Energy burst behind logo */}
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${PURPLE}40, ${PINK}20, transparent 70%)`,
            transform: `scale(${burstScale})`,
            opacity: burstOpacity,
          }}
        />

        {/* Logo glow ring */}
        <div
          style={{
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${PURPLE}30 0%, transparent 60%)`,
            opacity: logoGlow,
          }}
        />

        {/* The logo */}
        <Img
          src={staticFile('logo.png')}
          style={{
            width: 200,
            height: 200,
            objectFit: 'contain',
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            filter: `drop-shadow(0px 0px ${20 * logoGlow}px ${PURPLE}80)`,
            position: 'relative',
            zIndex: 1,
          }}
        />
      </div>

      {/* ── Text Reveals ── */}
      <div
        style={{
          position: 'absolute',
          top: '53%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {/* "Simplifying Tech," */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 44,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
            textAlign: 'center',
          }}
        >
          Simplifying Tech,
        </div>

        {/* "Amplifying Growth" */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontSize: 44,
            fontWeight: 700,
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            letterSpacing: '-0.5px',
            lineHeight: 1.2,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${CORAL}, hsl(12, 90%, 58%))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Amplifying Growth
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subOpacity,
            fontSize: 16,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.5)',
            fontFamily: "'Inter', system-ui, sans-serif",
            textAlign: 'center',
            marginTop: 16,
            maxWidth: 540,
            lineHeight: 1.5,
          }}
        >
          End-to-end technology solutions — from architecture to production.
          We build, secure, and scale the infrastructure your business runs on.
        </div>
      </div>

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,8,0.6) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
