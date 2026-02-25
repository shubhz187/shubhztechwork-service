import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';
const GREEN = '#22c55e';

/* ── Pipeline steps ────────────────────────────────────── */
const steps = [
  {
    label: 'Discovery',
    // Magnifying glass with crosshair target
    icon: 'M 11 5 A 6 6 0 1 1 11 17 A 6 6 0 1 1 11 5 M 16 15 L 22 21 M 11 8 L 11 14 M 8 11 L 14 11',
  },
  {
    label: 'Architecture',
    // Isometric 3-layer stack (system architecture)
    icon: 'M 14 3 L 24 8.5 L 14 14 L 4 8.5 Z M 4 12 L 14 17.5 L 24 12 M 4 15.5 L 14 21 L 24 15.5',
  },
  {
    label: 'Build',
    // 3D wireframe cube (constructing)
    icon: 'M 14 4 L 23 9 L 23 19 L 14 24 L 5 19 L 5 9 Z M 5 9 L 14 14 L 23 9 M 14 14 L 14 24',
  },
  {
    label: 'Deploy',
    // Rocket ship with window and fins
    icon: 'M 14 3 C 11 3 9 6 9 10 L 6 15 L 10 13 L 10 19 L 14 22 L 18 19 L 18 13 L 22 15 L 19 10 C 19 6 17 3 14 3 Z M 14 9 A 1.5 1.5 0 1 1 14 12 A 1.5 1.5 0 1 1 14 9',
  },
  {
    label: 'Monitor',
    // Dashboard screen with heartbeat pulse line
    icon: 'M 4 5 L 24 5 L 24 17 L 4 17 Z M 14 17 L 14 21 M 10 21 L 18 21 M 7 12 L 10 12 L 12 8 L 14 15 L 16 6 L 18 12 L 21 12',
  },
  {
    label: 'Iterate',
    // Dual circular refresh arrows (cycle)
    icon: 'M 19 9 A 7 7 0 1 0 9 13 M 19 9 L 22 7 M 19 9 L 21 12 M 9 19 A 7 7 0 1 0 19 15 M 9 19 L 7 16 M 9 19 L 6 21',
  },
];

const NODE_RADIUS = 28;

/*
 * ── Perfect ellipse layout ──
 * 6 nodes at 60° intervals on an ellipse.
 * Center: (600, 305), Semi-major a=430, Semi-minor b=110.
 * Clockwise from 9-o'clock: Discovery → Architecture → Build → Deploy → Monitor → Iterate
 *
 * Bezier control points computed with the standard cubic-bezier
 * elliptic-arc approximation: κ = (4/3) * tan(π/12) ≈ 0.3572
 * guaranteeing C1 tangent continuity at every node.
 */

const NODES = [
  { x: 170, y: 305 },  // 0 Discovery — 180°
  { x: 385, y: 210 },  // 1 Architecture — 120°
  { x: 815, y: 210 },  // 2 Build — 60°
  { x: 1030, y: 305 }, // 3 Deploy — 0°
  { x: 815, y: 400 },  // 4 Monitor — 300°
  { x: 385, y: 400 },  // 5 Iterate — 240°
];

const SEGMENTS = [
  // 0→1 Discovery → Architecture (180° → 120°)
  { d: 'M 170 305 C 170 266, 252 230, 385 210', len: 300 },
  // 1→2 Architecture → Build (120° → 60°)
  { d: 'M 385 210 C 518 190, 682 190, 815 210', len: 500 },
  // 2→3 Build → Deploy (60° → 0°)
  { d: 'M 815 210 C 948 230, 1030 266, 1030 305', len: 300 },
  // 3→4 Deploy → Monitor (0° → 300°)
  { d: 'M 1030 305 C 1030 344, 948 380, 815 400', len: 300 },
  // 4→5 Monitor → Iterate (300° → 240°)
  { d: 'M 815 400 C 682 420, 518 420, 385 400', len: 500 },
  // 5→0 Iterate → Discovery (240° → 180°) — closes the loop
  { d: 'M 385 400 C 252 380, 170 344, 170 305', len: 300 },
];

export const HowWeWorkComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* ── Background ── */
  const gridOpacity = interpolate(frame, [0, 50], [0, 0.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  /* ── Title ── */
  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  const lineWidth = interpolate(frame - 12, [0, 25], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  /* ── Traveling pulse ── */
  const pulseStart = 90;
  const cycleDuration = 120;
  const pulseProgress = frame > pulseStart
    ? ((frame - pulseStart) % cycleDuration) / cycleDuration
    : -1;
  const activeStepFloat = pulseProgress * steps.length;
  const activeStep = Math.floor(activeStepFloat);

  /* ── Center glow ── */
  const glowOpacity = interpolate(frame, [40, 80], [0, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #111118 50%, #0a0a0a 100%)',
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${CORAL}0a 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
          opacity: gridOpacity,
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${CORAL}10, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 3,
            color: CORAL,
            marginBottom: 8,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          OUR PROCESS
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-1px',
          }}
        >
          How We <span style={{ color: CORAL }}>Work</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <div
            style={{
              height: 3,
              width: `${lineWidth}%`,
              maxWidth: 100,
              background: `linear-gradient(90deg, transparent, ${CORAL}, transparent)`,
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* Ellipse SVG */}
      <svg
        width="1200"
        height="480"
        viewBox="0 0 1200 480"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <radialGradient id="hwwPulseGlow">
            <stop offset="0%" stopColor={CORAL} stopOpacity="0.9" />
            <stop offset="50%" stopColor={CORAL} stopOpacity="0.3" />
            <stop offset="100%" stopColor={CORAL} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ghost ellipse — faint full shape always visible */}
        {SEGMENTS.map((seg, i) => {
          const ghostOpacity = interpolate(frame, [30, 60], [0, 0.06], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <path
              key={`ghost-${i}`}
              d={seg.d}
              fill="none"
              stroke="rgba(255,255,255,1)"
              strokeWidth="1.5"
              opacity={ghostOpacity}
              strokeLinecap="round"
            />
          );
        })}

        {/* Animated connector paths */}
        {SEGMENTS.map((seg, i) => {
          const connDelay = 20 + i * 12;
          const connDraw = interpolate(frame - connDelay, [0, 30], [seg.len, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const isPassed = pulseProgress >= 0 && activeStep > i;
          const isActive = pulseProgress >= 0 && activeStep === i;

          return (
            <path
              key={`conn-${i}`}
              d={seg.d}
              fill="none"
              stroke={isPassed ? GREEN : isActive ? CORAL : 'rgba(255,255,255,0.15)'}
              strokeWidth={isActive ? 2.5 : 2}
              strokeDasharray={seg.len}
              strokeDashoffset={connDraw}
              strokeLinecap="round"
            />
          );
        })}

        {/* Nodes */}
        {steps.map((step, i) => {
          const nodeDelay = 15 + i * 10;
          const nodeSpring = spring({
            frame: frame - nodeDelay,
            fps,
            config: { damping: 12, stiffness: 120 },
          });
          const nodeScale = interpolate(nodeSpring, [0, 1], [0, 1]);
          const nodeOpacity = interpolate(nodeSpring, [0, 1], [0, 1]);

          const { x: cx, y: cy } = NODES[i];

          const isPassed = pulseProgress >= 0 && activeStep > i;
          const isActive = pulseProgress >= 0 && activeStep === i;

          const ringScale = isActive ? 1.3 + Math.sin(frame * 0.15) * 0.1 : 1;
          const fillColor = isPassed ? GREEN : isActive ? CORAL : 'rgba(255,255,255,0.06)';
          const borderColor = isPassed ? GREEN : isActive ? CORAL : 'rgba(255,255,255,0.2)';

          return (
            <g key={`node-${i}`} opacity={nodeOpacity}>
              {/* Active glow ring */}
              {isActive && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={NODE_RADIUS * 2}
                  fill="none"
                  stroke={CORAL}
                  strokeWidth="1"
                  opacity={0.3}
                  transform={`scale(${ringScale})`}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              )}

              {/* Node circle */}
              <circle
                cx={cx}
                cy={cy}
                r={NODE_RADIUS}
                fill={fillColor}
                stroke={borderColor}
                strokeWidth="2"
                transform={`scale(${nodeScale})`}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />

              {/* Icon */}
              <g
                transform={`translate(${cx - 14} ${cy - 14}) scale(${nodeScale})`}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <path
                  d={step.icon}
                  fill="none"
                  stroke={isPassed || isActive ? '#fff' : 'rgba(255,255,255,0.6)'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Checkmark for passed steps */}
              {isPassed && (
                <g transform={`translate(${cx + 16} ${cy - 20})`}>
                  <circle cx="0" cy="0" r="8" fill={GREEN} />
                  <path
                    d="M -3 0 L -1 3 L 4 -3"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              )}

              {/* Label */}
              <text
                x={cx}
                y={cy + NODE_RADIUS + 22}
                textAnchor="middle"
                fill={isActive ? '#fff' : 'rgba(255,255,255,0.55)'}
                fontSize="13"
                fontWeight={isActive ? 700 : 500}
                fontFamily="'Inter', system-ui, sans-serif"
              >
                {step.label}
              </text>
            </g>
          );
        })}

        {/* Traveling glow pulse */}
        {pulseProgress >= 0 && activeStep < steps.length && (() => {
          const cx = NODES[activeStep].x;
          const cy = NODES[activeStep].y;
          return (
            <circle cx={cx} cy={cy} r="14" fill="url(#hwwPulseGlow)" />
          );
        })()}
      </svg>
    </AbsoluteFill>
  );
};
