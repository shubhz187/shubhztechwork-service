import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';
const TEAL = '#14b8a6';

const loopSteps = [
  { label: 'Discover', icon: '🔍' },
  { label: 'Join', icon: '👥' },
  { label: 'Engage', icon: '✨' },
  { label: 'Return', icon: '🔄' },
  { label: 'Refer', icon: '📣' },
  { label: 'Grow', icon: '📈' },
];

const platforms = [
  'Marketplace',
  'Community',
  'Events',
  'Wellness',
  'Education',
];

export const EcosystemLoopComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = interpolate(frame, [0, 40], [0, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Pulse traveling around the loop
  const pulseFrame = (frame - 60) % 120;
  const pulsePosition = interpolate(pulseFrame, [0, 120], [0, loopSteps.length], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${TEAL}12 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: gridOpacity }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 50 }}>
        {/* Left: Growth loop */}
        <div style={{ position: 'relative', width: 300, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Center label */}
          <div style={{
            position: 'absolute',
            opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: TEAL, letterSpacing: 1.5 }}>GROWTH</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: TEAL, letterSpacing: 1.5 }}>LOOP</div>
          </div>

          {/* Loop nodes in hexagonal arrangement */}
          {loopSteps.map((step, i) => {
            const angle = (i * 60 - 90) * (Math.PI / 180);
            const radius = 108;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const nodeDelay = 5 + i * 10;
            const nodeProgress = spring({ frame: frame - nodeDelay, fps, config: { damping: 14, stiffness: 100 } });
            const nodeScale = interpolate(nodeProgress, [0, 1], [0.3, 1]);
            const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1]);

            const isActive = frame > 60 && Math.abs(pulsePosition - i) < 0.7;

            return (
              <div
                key={step.label}
                style={{
                  position: 'absolute',
                  left: 150 + x - 30,
                  top: 130 + y - 25,
                  width: 60,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  opacity: nodeOpacity,
                  transform: `scale(${nodeScale})`,
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: isActive ? `${TEAL}25` : 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${isActive ? TEAL : 'rgba(255,255,255,0.12)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16,
                  boxShadow: isActive ? `0 0 16px ${TEAL}30` : 'none',
                  transition: 'all 0.2s',
                }}>
                  {step.icon}
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 600, letterSpacing: 0.5,
                  color: isActive ? TEAL : 'rgba(255,255,255,0.4)',
                  transition: 'color 0.2s',
                }}>
                  {step.label}
                </span>
              </div>
            );
          })}

          {/* Connection arrows between nodes */}
          <svg width="300" height="260" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
            {loopSteps.map((_, i) => {
              const a1 = (i * 60 - 90) * (Math.PI / 180);
              const a2 = (((i + 1) % 6) * 60 - 90) * (Math.PI / 180);
              const r = 108;
              const rInner = 82;
              const x1 = 150 + Math.cos(a1) * rInner;
              const y1 = 130 + Math.sin(a1) * rInner;
              const x2 = 150 + Math.cos(a2) * rInner;
              const y2 = 130 + Math.sin(a2) * rInner;

              const arrowDelay = 50 + i * 6;
              const arrowOpacity = interpolate(frame - arrowDelay, [0, 15], [0, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={TEAL}
                  strokeWidth="1.5"
                  opacity={arrowOpacity}
                  strokeDasharray="4,4"
                />
              );
            })}
          </svg>
        </div>

        {/* Right: Platform verticals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, marginBottom: 4,
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}>
            PLATFORM VERTICALS
          </div>

          {platforms.map((platform, i) => {
            const platDelay = 30 + i * 12;
            const platProgress = spring({ frame: frame - platDelay, fps, config: { damping: 14, stiffness: 100 } });
            const platX = interpolate(platProgress, [0, 1], [25, 0]);
            const platOpacity = interpolate(platProgress, [0, 1], [0, 1]);

            // Connection glow when loop reaches "Engage"
            const glowPhase = frame > 60 && Math.abs(pulsePosition - 2) < 0.7;

            return (
              <div
                key={platform}
                style={{
                  opacity: platOpacity,
                  transform: `translateX(${platX}px)`,
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: glowPhase ? `${TEAL}10` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${glowPhase ? TEAL + '30' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 8, padding: '8px 16px', minWidth: 160,
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: TEAL, opacity: 0.6,
                }} />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                  {platform}
                </span>
              </div>
            );
          })}

          <div style={{
            opacity: interpolate(frame - 110, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            fontSize: 10, color: TEAL, fontWeight: 600, marginTop: 4,
          }}>
            ✓ Phase-first — launch one, scale many
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
