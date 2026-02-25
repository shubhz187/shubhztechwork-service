import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

const attributes = [
  { label: 'runAsNonRoot', value: 'true', icon: '👤' },
  { label: 'readOnlyRootFilesystem', value: 'true', icon: '📁' },
  { label: 'allowPrivilegeEscalation', value: 'false', icon: '🛡' },
  { label: 'capabilities.drop', value: '["ALL"]', icon: '⛔' },
];

export const ContainerLockComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = interpolate(frame, [0, 40], [0, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Container box
  const boxProgress = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const boxScale = interpolate(boxProgress, [0, 1], [0.8, 1]);
  const boxOpacity = interpolate(boxProgress, [0, 1], [0, 1]);

  // Shield overlay after all attributes appear
  const shieldDelay = 90;
  const shieldOpacity = interpolate(frame - shieldDelay, [0, 25], [0, 0.9], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${CORAL}12 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: gridOpacity }} />

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 50 }}>
        {/* Container box */}
        <div style={{
          opacity: boxOpacity,
          transform: `scale(${boxScale})`,
          width: 180,
          height: 200,
          border: '2px solid rgba(255,255,255,0.12)',
          borderRadius: 16,
          background: 'rgba(255,255,255,0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Container icon */}
          <svg width="60" height="60" viewBox="0 0 60 60" style={{ opacity: 0.8 }}>
            <rect x="8" y="16" width="44" height="32" rx="4" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
            <rect x="14" y="22" width="12" height="8" rx="2" fill={`${CORAL}40`} stroke={CORAL} strokeWidth="1" />
            <rect x="30" y="22" width="12" height="8" rx="2" fill={`${CORAL}40`} stroke={CORAL} strokeWidth="1" />
            <rect x="14" y="34" width="12" height="8" rx="2" fill={`${CORAL}40`} stroke={CORAL} strokeWidth="1" />
            <rect x="30" y="34" width="12" height="8" rx="2" fill={`${CORAL}40`} stroke={CORAL} strokeWidth="1" />
            <line x1="8" y1="12" x2="52" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginTop: 8, letterSpacing: 1 }}>
            CONTAINER
          </span>

          {/* Shield overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${CORAL}15, transparent)`,
            borderRadius: 14,
            opacity: shieldOpacity,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="50" height="56" viewBox="0 0 50 56">
              <path d="M25 4 L46 16 L46 30 Q46 48 25 53 Q4 48 4 30 L4 16 Z" fill="none" stroke={CORAL} strokeWidth="2" opacity={0.8} />
              <path d="M16 28 L22 34 L34 22" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Security attributes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, marginBottom: 4,
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}>
            SECURITY CONTEXT
          </div>
          {attributes.map((attr, i) => {
            const attrDelay = 25 + i * 15;
            const attrProgress = spring({ frame: frame - attrDelay, fps, config: { damping: 14, stiffness: 100 } });
            const attrX = interpolate(attrProgress, [0, 1], [30, 0]);
            const attrOpacity = interpolate(attrProgress, [0, 1], [0, 1]);

            const checkDelay = attrDelay + 20;
            const checkOpacity = interpolate(frame - checkDelay, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

            return (
              <div
                key={attr.label}
                style={{
                  opacity: attrOpacity,
                  transform: `translateX(${attrX}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8,
                  padding: '8px 14px',
                }}
              >
                <span style={{ fontFamily: "'Inter', monospace", fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                  {attr.label}:
                </span>
                <span style={{ fontFamily: "'Inter', monospace", fontSize: 12, color: CORAL, fontWeight: 600 }}>
                  {attr.value}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginLeft: 'auto', opacity: checkOpacity }}>
                  <circle cx="12" cy="12" r="10" fill="#22c55e20" stroke="#22c55e" strokeWidth="2" />
                  <path d="M8 12 L11 15 L16 9" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
