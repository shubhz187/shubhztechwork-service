import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';
const ORANGE = '#f97316';

const accounts = [
  { label: 'SOURCE', sublabel: 'Connect Account', icon: '📞' },
  { label: 'ORCHESTRATION', sublabel: 'Control Plane', icon: '⚙️' },
  { label: 'TARGET', sublabel: 'Client Account', icon: '🎯' },
];

const pipelineSteps = [
  { label: 'Extract', icon: '📤' },
  { label: 'Snapshot', icon: '📸' },
  { label: 'Package', icon: '📦' },
  { label: 'Deploy', icon: '🚀' },
];

const dependencies = ['Lambda ARNs', 'Lex Bots', 'Queues', 'Prompts'];

export const ConnectDeployComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = interpolate(frame, [0, 40], [0, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Pipeline progress pulse
  const pipelineFrame = (frame - 70) % 100;
  const pipelineProgress = interpolate(pipelineFrame, [0, 100], [0, pipelineSteps.length], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        overflow: 'hidden',
        gap: 20,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${ORANGE}12 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: gridOpacity }} />

      {/* Title */}
      <div style={{
        position: 'relative', zIndex: 1,
        opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 2,
      }}>
        CROSS-ACCOUNT DEPLOYMENT ENGINE
      </div>

      {/* Account tiers */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 0 }}>
        {accounts.map((acc, i) => {
          const accDelay = 10 + i * 15;
          const accProgress = spring({ frame: frame - accDelay, fps, config: { damping: 14, stiffness: 100 } });
          const accScale = interpolate(accProgress, [0, 1], [0.6, 1]);
          const accOpacity = interpolate(accProgress, [0, 1], [0, 1]);

          // Data flow arrow
          const arrowDelay = 55 + i * 15;
          const arrowOpacity = interpolate(frame - arrowDelay, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          return (
            <div key={acc.label} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', opacity: arrowOpacity }}>
                  <svg width="50" height="20" viewBox="0 0 50 20">
                    <defs>
                      <linearGradient id={`flow${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={ORANGE} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={ORANGE} />
                      </linearGradient>
                    </defs>
                    <line x1="4" y1="10" x2="36" y2="10" stroke={`url(#flow${i})`} strokeWidth="2" strokeDasharray="4,3" />
                    <polygon points="36,5 46,10 36,15" fill={ORANGE} opacity="0.8" />
                  </svg>
                </div>
              )}

              <div style={{
                opacity: accOpacity,
                transform: `scale(${accScale})`,
                width: 150, padding: '14px 12px',
                background: 'rgba(255,255,255,0.03)',
                border: `1.5px solid ${i === 1 ? ORANGE + '40' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 12,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }}>
                <span style={{ fontSize: 20 }}>{acc.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: i === 1 ? ORANGE : 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>
                  {acc.label}
                </span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>
                  {acc.sublabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline steps */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
        {pipelineSteps.map((step, i) => {
          const stepDelay = 40 + i * 12;
          const stepProgress = spring({ frame: frame - stepDelay, fps, config: { damping: 14, stiffness: 120 } });
          const stepOpacity = interpolate(stepProgress, [0, 1], [0, 1]);
          const stepY = interpolate(stepProgress, [0, 1], [10, 0]);

          const isActive = frame > 70 && Math.abs(pipelineProgress - i) < 0.6;
          const isPast = frame > 70 && pipelineProgress > i + 0.6;

          return (
            <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && (
                <div style={{
                  width: 24, height: 2, marginRight: 6,
                  background: isPast ? '#22c55e40' : 'rgba(255,255,255,0.1)',
                  opacity: stepOpacity,
                }} />
              )}
              <div style={{
                opacity: stepOpacity,
                transform: `translateY(${stepY}px)`,
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', borderRadius: 8,
                background: isActive ? `${ORANGE}18` : isPast ? '#22c55e08' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? ORANGE + '40' : isPast ? '#22c55e25' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isActive ? `0 0 12px ${ORANGE}20` : 'none',
                transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: 13 }}>{step.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: isActive ? ORANGE : isPast ? '#22c55e' : 'rgba(255,255,255,0.45)' }}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dependencies resolved */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center', gap: 10,
        opacity: interpolate(frame - 85, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>
          DEPS RESOLVED:
        </span>
        {dependencies.map((dep, i) => {
          const depDelay = 90 + i * 8;
          const depOpacity = interpolate(frame - depDelay, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <span key={dep} style={{
              opacity: depOpacity,
              fontSize: 9, color: '#22c55e', fontWeight: 500,
              background: '#22c55e10', padding: '2px 8px', borderRadius: 4,
              border: '1px solid #22c55e20',
            }}>
              {dep} ✓
            </span>
          );
        })}
      </div>

      {/* Bottom status */}
      <div style={{
        position: 'absolute', bottom: 18,
        opacity: interpolate(frame - 120, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        fontSize: 11, color: ORANGE, fontWeight: 600, letterSpacing: 0.5,
      }}>
        ✓ Versioned, dependency-aware, audit-ready deployment
      </div>
    </AbsoluteFill>
  );
};
