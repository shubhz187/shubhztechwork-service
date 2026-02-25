import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

const secrets = ['DB_PASSWORD', 'JWT_SECRET', 'API_KEY'];

export const SecretVaultComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = interpolate(frame, [0, 40], [0, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Vault door
  const vaultScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const vaultOpacity = interpolate(vaultScale, [0, 1], [0, 1]);

  // Lock icon rotation
  const lockRotate = interpolate(frame, [30, 55], [0, -20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lockOpacity = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 100 } });

  // Shield glow
  const glowPulse = interpolate(frame % 60, [0, 30, 60], [0.3, 0.7, 0.3]);

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
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${CORAL}15 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: gridOpacity }} />

      {/* Central glow */}
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${CORAL}15, transparent 70%)`, opacity: glowPulse }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 60 }}>
        {/* Vault icon */}
        <div style={{ opacity: vaultOpacity, transform: `scale(${vaultScale})`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Shield shape */}
          <svg width="120" height="140" viewBox="0 0 120 140">
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={CORAL} />
                <stop offset="100%" stopColor="hsl(12, 90%, 50%)" />
              </linearGradient>
            </defs>
            <path
              d="M60 8 L110 35 L110 75 Q110 120 60 135 Q10 120 10 75 L10 35 Z"
              fill="none"
              stroke="url(#shieldGrad)"
              strokeWidth="3"
              opacity={0.9}
            />
            <path
              d="M60 20 L100 42 L100 75 Q100 112 60 125 Q20 112 20 75 L20 42 Z"
              fill={`${CORAL}10`}
            />
            {/* Lock body */}
            <rect x="42" y="65" width="36" height="28" rx="4" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5"
              style={{ transform: `rotate(${lockRotate}deg)`, transformOrigin: '60px 79px', opacity: interpolate(lockOpacity, [0, 1], [0, 1]) }}
            />
            {/* Lock shackle */}
            <path d="M48 65 L48 55 Q48 42 60 42 Q72 42 72 55 L72 65" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round"
              style={{ opacity: interpolate(lockOpacity, [0, 1], [0, 1]) }}
            />
          </svg>
          <div style={{ marginTop: 12, fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500, letterSpacing: 1 }}>
            VAULT
          </div>
        </div>

        {/* Secret items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {secrets.map((secret, i) => {
            const itemFrame = frame - (40 + i * 15);
            const itemProgress = spring({ frame: itemFrame, fps, config: { damping: 14, stiffness: 100 } });
            const itemX = interpolate(itemProgress, [0, 1], [40, 0]);
            const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1]);

            // Masking animation
            const maskStart = 70 + i * 12;
            const maskProgress = interpolate(frame - maskStart, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const masked = maskProgress > 0.5;

            return (
              <div
                key={secret}
                style={{
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: '10px 20px',
                  minWidth: 280,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: masked ? '#22c55e' : CORAL, transition: 'background 0.3s' }} />
                <span style={{ fontFamily: "'Inter', monospace", fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                  {secret}
                </span>
                <span style={{ marginLeft: 'auto', fontFamily: "'Inter', monospace", fontSize: 12, color: masked ? '#22c55e' : 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
                  {masked ? '●●●●●●●●' : 'exposed'}
                </span>
              </div>
            );
          })}
          <div style={{
            opacity: interpolate(frame - 110, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            fontSize: 11, color: CORAL, fontWeight: 600, letterSpacing: 0.5, marginTop: 4, paddingLeft: 4,
          }}>
            ✓ All secrets encrypted at rest
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
