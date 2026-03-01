import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';
const GREEN = '#22c55e';

// RGBA equivalents for interpolateColors (smooth blending)
const CORAL_RGBA = 'rgba(249, 95, 78, 1)';
const GREEN_RGBA = 'rgba(34, 197, 94, 1)';

/* ── Pipeline steps ────────────────────────────────────── */
const steps = [
  {
    label: 'Discovery',
    icon: 'M 11 5 A 6 6 0 1 1 11 17 A 6 6 0 1 1 11 5 M 16 15 L 22 21 M 11 8 L 11 14 M 8 11 L 14 11',
  },
  {
    label: 'Architecture',
    icon: 'M 14 3 L 24 8.5 L 14 14 L 4 8.5 Z M 4 12 L 14 17.5 L 24 12 M 4 15.5 L 14 21 L 24 15.5',
  },
  {
    label: 'Build',
    icon: 'M 14 4 L 23 9 L 23 19 L 14 24 L 5 19 L 5 9 Z M 5 9 L 14 14 L 23 9 M 14 14 L 14 24',
  },
  {
    label: 'Deploy',
    icon: 'M 14 3 C 11 3 9 6 9 10 L 6 15 L 10 13 L 10 19 L 14 22 L 18 19 L 18 13 L 22 15 L 19 10 C 19 6 17 3 14 3 Z M 14 9 A 1.5 1.5 0 1 1 14 12 A 1.5 1.5 0 1 1 14 9',
  },
  {
    label: 'Monitor',
    icon: 'M 4 5 L 24 5 L 24 17 L 4 17 Z M 14 17 L 14 21 M 10 21 L 18 21 M 7 12 L 10 12 L 12 8 L 14 15 L 16 6 L 18 12 L 21 12',
  },
  {
    label: 'Iterate',
    icon: 'M 19 9 A 7 7 0 1 0 9 13 M 19 9 L 22 7 M 19 9 L 21 12 M 9 19 A 7 7 0 1 0 19 15 M 9 19 L 7 16 M 9 19 L 6 21',
  },
];

const NODE_RADIUS = 28;

/* ── Desktop ellipse layout ── */
const DESKTOP_NODES = [
  { x: 170, y: 305 },
  { x: 385, y: 210 },
  { x: 815, y: 210 },
  { x: 1030, y: 305 },
  { x: 815, y: 400 },
  { x: 385, y: 400 },
];

const DESKTOP_SEGMENTS = [
  { d: 'M 170 305 C 170 266, 252 230, 385 210', len: 300 },
  { d: 'M 385 210 C 518 190, 682 190, 815 210', len: 500 },
  { d: 'M 815 210 C 948 230, 1030 266, 1030 305', len: 300 },
  { d: 'M 1030 305 C 1030 344, 948 380, 815 400', len: 300 },
  { d: 'M 815 400 C 682 420, 518 420, 385 400', len: 500 },
  { d: 'M 385 400 C 252 380, 170 344, 170 305', len: 300 },
];

export const HowWeWorkComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isMobile = width < 768;

  /* ── Mobile vertical timeline layout ── */
  const mobileNodeRadius = 22;
  const mobileStartY = 130;
  const mobileSpacingY = 100;
  const mobileCenterX = width / 2;
  const mobileNodes = steps.map((_, i) => ({
    x: mobileCenterX,
    y: mobileStartY + i * mobileSpacingY,
  }));

  // Choose nodes/segments based on layout
  const NODES = isMobile ? mobileNodes : DESKTOP_NODES;
  const nodeR = isMobile ? mobileNodeRadius : NODE_RADIUS;

  /* ── Background ── */
  const gridOpacity = interpolate(frame, [0, 50], [0, 0.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  /* ── Title ── */
  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  /* ── Traveling pulse — smooth continuous flow ── */
  const pulseStart = 90;
  const cycleDuration = 180; // 6 seconds per cycle for relaxed flow
  const rawProgress = frame > pulseStart
    ? ((frame - pulseStart) % cycleDuration) / cycleDuration
    : -1;

  // activeStepFloat is a continuous value: 0.0 → steps.length + pause
  // When it's 2.5, the pulse is halfway between node 2 and node 3
  const activeStepFloat = rawProgress >= 0
    ? rawProgress * (steps.length + 1.5)
    : -1;

  // Smooth fade-out at end of cycle so green→default isn't a harsh snap
  const cycleFade = rawProgress >= 0
    ? interpolate(rawProgress, [0, 0.04, 0.88, 1], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  // Per-node completion: continuous 0→1 as pulse flows through, fades at cycle end
  const getNodeCompletion = (i: number): number => {
    if (activeStepFloat < 0) return 0;
    const forward = interpolate(activeStepFloat, [i - 0.2, i + 0.8], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return forward * cycleFade;
  };

  // Per-connector flow: continuous 0→1 as pulse travels the connector
  const getConnectorFlow = (i: number): number => {
    if (activeStepFloat < 0) return 0;
    const forward = interpolate(activeStepFloat, [i + 0.2, i + 0.9], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return forward * cycleFade;
  };

  // Smooth pulse position — glides between consecutive nodes
  const getPulsePosition = (): { x: number; y: number } | null => {
    if (activeStepFloat < 0 || activeStepFloat >= steps.length) return null;
    const currentIdx = Math.floor(activeStepFloat);
    const nextIdx = Math.min(currentIdx + 1, steps.length - 1);
    const frac = activeStepFloat - currentIdx;

    // Ease: decelerate at nodes, accelerate between them
    const easedFrac = interpolate(frac, [0, 0.15, 0.85, 1], [0, 0.05, 0.95, 1]);

    const from = NODES[currentIdx];
    const to = NODES[nextIdx];

    return {
      x: from.x + (to.x - from.x) * easedFrac,
      y: from.y + (to.y - from.y) * easedFrac,
    };
  };

  // Pulse opacity fades in/out with cycle
  const pulseOpacity = rawProgress >= 0
    ? interpolate(rawProgress, [0, 0.04, 0.82, 0.9], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  /* ── Center glow ── */
  const glowOpacity = interpolate(frame, [40, 80], [0, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulsePos = getPulsePosition();

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #010108 0%, #0a0a18 50%, #010108 100%)',
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
          width: isMobile ? 300 : 900,
          height: isMobile ? 500 : 300,
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
            fontSize: isMobile ? 11 : 13,
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
            fontSize: isMobile ? 24 : 34,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-1px',
          }}
        >
          How We <span style={{ color: CORAL }}>Work</span>
        </div>
      </div>

      {/* SVG for paths and nodes */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <radialGradient id="hwwPulseGlow">
            <stop offset="0%" stopColor={CORAL} stopOpacity="0.9" />
            <stop offset="40%" stopColor={CORAL} stopOpacity="0.4" />
            <stop offset="100%" stopColor={CORAL} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hwwPulseTrail">
            <stop offset="0%" stopColor={CORAL} stopOpacity="0.4" />
            <stop offset="100%" stopColor={CORAL} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Desktop: Ellipse paths */}
        {!isMobile && (
          <>
            {/* Ghost ellipse */}
            {DESKTOP_SEGMENTS.map((seg, i) => {
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

            {/* Animated connector paths — smooth color transition */}
            {DESKTOP_SEGMENTS.map((seg, i) => {
              const connDelay = 20 + i * 12;
              const connDraw = interpolate(frame - connDelay, [0, 30], [seg.len, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              const connFlow = getConnectorFlow(i);
              const connColor = interpolateColors(
                connFlow,
                [0, 0.35, 1],
                ['rgba(255, 255, 255, 0.15)', CORAL_RGBA, GREEN_RGBA]
              );
              const connWidth = interpolate(connFlow, [0, 0.2, 0.5, 1], [2, 2.5, 2.5, 2], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              return (
                <path
                  key={`conn-${i}`}
                  d={seg.d}
                  fill="none"
                  stroke={connColor}
                  strokeWidth={connWidth}
                  strokeDasharray={seg.len}
                  strokeDashoffset={connDraw}
                  strokeLinecap="round"
                />
              );
            })}
          </>
        )}

        {/* Mobile: Vertical line segments — smooth color transition */}
        {isMobile && steps.slice(0, -1).map((_, i) => {
          const fromY = mobileNodes[i].y + mobileNodeRadius;
          const toY = mobileNodes[i + 1].y - mobileNodeRadius;
          const segLen = toY - fromY;
          const connDelay = 20 + i * 12;
          const connDraw = interpolate(frame - connDelay, [0, 30], [segLen, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const connFlow = getConnectorFlow(i);
          const connColor = interpolateColors(
            connFlow,
            [0, 0.35, 1],
            ['rgba(255, 255, 255, 0.15)', CORAL_RGBA, GREEN_RGBA]
          );
          const connWidth = interpolate(connFlow, [0, 0.2, 0.5, 1], [2, 2.5, 2.5, 2], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <line
              key={`mconn-${i}`}
              x1={mobileCenterX}
              y1={fromY}
              x2={mobileCenterX}
              y2={toY}
              stroke={connColor}
              strokeWidth={connWidth}
              strokeDasharray={segLen}
              strokeDashoffset={connDraw}
              strokeLinecap="round"
            />
          );
        })}

        {/* Nodes — smooth color transitions */}
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
          const completion = getNodeCompletion(i);

          // Smooth color transitions: default → coral → green
          const fillColor = interpolateColors(
            completion,
            [0, 0.2, 0.45, 0.7, 1],
            [
              'rgba(255, 255, 255, 0.06)',
              'rgba(249, 95, 78, 0.5)',
              'rgba(249, 95, 78, 0.8)',
              'rgba(249, 95, 78, 0.4)',
              GREEN_RGBA,
            ]
          );
          const borderColor = interpolateColors(
            completion,
            [0, 0.2, 0.45, 0.7, 1],
            [
              'rgba(255, 255, 255, 0.2)',
              CORAL_RGBA,
              CORAL_RGBA,
              'rgba(34, 197, 94, 0.7)',
              GREEN_RGBA,
            ]
          );

          // Icon brightness: smoothly brightens during activation
          const iconColor = interpolateColors(
            completion,
            [0, 0.2, 1],
            ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']
          );

          // Glow ring: fades in during active phase, fades out as it turns green
          const glowRingOpacity = interpolate(
            completion,
            [0.05, 0.25, 0.5, 0.75],
            [0, 0.25, 0.25, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          const ringScale = 1 + glowRingOpacity * 0.15;

          const finalScale = nodeScale;

          // Checkmark: smooth fade-in after node turns green
          const checkmarkOpacity = interpolate(completion, [0.8, 1], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const checkmarkScale = interpolate(completion, [0.8, 1], [0.5, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          // Label color and weight
          const labelColor = interpolateColors(
            completion,
            [0, 0.2, 0.5, 1],
            ['rgba(255, 255, 255, 0.55)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.75)']
          );
          const labelWeight = completion > 0.15 && completion < 0.7 ? 700 : 500;

          // Mobile: label offset to the right
          const labelX = isMobile ? cx + nodeR + 14 : cx;
          const labelY = isMobile ? cy + 5 : cy + nodeR + 22;
          const labelAnchor = isMobile ? 'start' : 'middle';

          return (
            <g key={`node-${i}`} opacity={nodeOpacity}>
              {/* Glow ring — smooth fade in/out */}
              {glowRingOpacity > 0.01 && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={nodeR * 2}
                  fill="none"
                  stroke={CORAL}
                  strokeWidth="1"
                  opacity={glowRingOpacity}
                  transform={`scale(${ringScale})`}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              )}

              {/* Node circle */}
              <circle
                cx={cx}
                cy={cy}
                r={nodeR}
                fill={fillColor}
                stroke={borderColor}
                strokeWidth="2"
                transform={`scale(${finalScale})`}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />

              {/* Icon */}
              <g
                transform={`translate(${cx - (isMobile ? 11 : 14)} ${cy - (isMobile ? 11 : 14)}) scale(${finalScale})`}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <path
                  d={step.icon}
                  fill="none"
                  stroke={iconColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Checkmark — smooth fade-in with scale */}
              {checkmarkOpacity > 0.01 && (
                <g
                  transform={`translate(${cx + (isMobile ? 12 : 16)} ${cy - (isMobile ? 16 : 20)}) scale(${checkmarkScale})`}
                  style={{ transformOrigin: `${cx + (isMobile ? 12 : 16)}px ${cy - (isMobile ? 16 : 20)}px` }}
                  opacity={checkmarkOpacity}
                >
                  <circle cx="0" cy="0" r={isMobile ? 6 : 8} fill={GREEN} />
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
                x={labelX}
                y={labelY}
                textAnchor={labelAnchor}
                fill={labelColor}
                fontSize={isMobile ? 12 : 13}
                fontWeight={labelWeight}
                fontFamily="'Inter', system-ui, sans-serif"
              >
                {step.label}
              </text>
            </g>
          );
        })}

        {/* Traveling glow pulse — smooth gliding position */}
        {pulsePos && pulseOpacity > 0.01 && (
          <>
            {/* Soft trailing halo */}
            <circle
              cx={pulsePos.x}
              cy={pulsePos.y}
              r={isMobile ? 22 : 30}
              fill="url(#hwwPulseTrail)"
              opacity={pulseOpacity * 0.5}
            />
            {/* Main glow */}
            <circle
              cx={pulsePos.x}
              cy={pulsePos.y}
              r={isMobile ? 10 : 14}
              fill="url(#hwwPulseGlow)"
              opacity={pulseOpacity}
            />
          </>
        )}
      </svg>
    </AbsoluteFill>
  );
};
