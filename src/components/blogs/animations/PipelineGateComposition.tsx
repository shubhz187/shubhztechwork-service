import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

const stages = [
  { label: 'Code', icon: '{ }' },
  { label: 'Secrets', icon: '🔑', isGate: true },
  { label: 'Build', icon: '⚙' },
  { label: 'SAST', icon: '🛡', isGate: true },
  { label: 'Deploy', icon: '🚀' },
];

export const PipelineGateComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = interpolate(frame, [0, 40], [0, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${CORAL}12 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: gridOpacity }} />

      {/* Title */}
      <div style={{
        opacity: titleOpacity, fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.4)',
        letterSpacing: 2, marginBottom: 40, position: 'relative', zIndex: 1,
      }}>
        CI/CD SECURITY PIPELINE
      </div>

      {/* Pipeline stages */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 0 }}>
        {stages.map((stage, i) => {
          const stageDelay = 15 + i * 18;
          const stageProgress = spring({ frame: frame - stageDelay, fps, config: { damping: 14, stiffness: 100 } });
          const stageScale = interpolate(stageProgress, [0, 1], [0.5, 1]);
          const stageOpacity = interpolate(stageProgress, [0, 1], [0, 1]);

          // Pulse traveling through pipeline
          const pulseFrame = (frame - 70) % 90;
          const pulsePosition = i;
          const pulseTarget = interpolate(pulseFrame, [0, 90], [0, stages.length - 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const isActive = frame > 70 && Math.abs(pulseTarget - pulsePosition) < 0.6;

          // Checkmark
          const checkDelay = stageDelay + 25;
          const checkOpacity = interpolate(frame - checkDelay, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          const nodeColor = stage.isGate ? CORAL : 'rgba(255,255,255,0.15)';
          const nodeBackground = stage.isGate ? `${CORAL}15` : 'rgba(255,255,255,0.04)';

          return (
            <div key={stage.label} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Connector line */}
              {i > 0 && (
                <div style={{
                  width: 40, height: 2,
                  background: `linear-gradient(90deg, ${i > 0 && stages[i - 1].isGate ? CORAL + '60' : 'rgba(255,255,255,0.1)'}, ${stage.isGate ? CORAL + '60' : 'rgba(255,255,255,0.1)'})`,
                  opacity: stageOpacity,
                }} />
              )}

              {/* Stage node */}
              <div style={{
                opacity: stageOpacity,
                transform: `scale(${stageScale})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: stage.isGate ? 14 : '50%',
                  border: `2px solid ${nodeColor}`,
                  background: isActive ? `${CORAL}25` : nodeBackground,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: stage.isGate ? 22 : 18,
                  transition: 'background 0.2s',
                  position: 'relative',
                  boxShadow: isActive ? `0 0 20px ${CORAL}30` : 'none',
                }}>
                  <span style={{ opacity: 0.9 }}>{stage.icon}</span>
                  {/* Checkmark */}
                  <svg width="18" height="18" viewBox="0 0 24 24" style={{
                    position: 'absolute', bottom: -4, right: -4, opacity: checkOpacity,
                  }}>
                    <circle cx="12" cy="12" r="10" fill="#141414" stroke="#22c55e" strokeWidth="2" />
                    <path d="M8 12 L11 15 L16 9" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: stage.isGate ? CORAL : 'rgba(255,255,255,0.5)',
                  letterSpacing: 0.5,
                }}>
                  {stage.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom label */}
      <div style={{
        position: 'absolute', bottom: 22,
        opacity: interpolate(frame - 100, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        fontSize: 11, color: CORAL, fontWeight: 600, letterSpacing: 0.5,
      }}>
        ✓ Security gates integrated — blocking critical issues before production
      </div>
    </AbsoluteFill>
  );
};
