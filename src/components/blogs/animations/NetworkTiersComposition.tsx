import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

const tiers = [
  { label: 'PUBLIC', sublabel: 'Load Balancer', color: CORAL, width: 520, height: 240 },
  { label: 'APPLICATION', sublabel: 'Compute Instances', color: '#f59e0b', width: 380, height: 170 },
  { label: 'DATA', sublabel: 'Databases & Caches', color: '#22c55e', width: 240, height: 100 },
];

export const NetworkTiersComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = interpolate(frame, [0, 40], [0, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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

      {/* Title */}
      <div style={{
        position: 'absolute', top: 20, left: 0, right: 0, textAlign: 'center',
        opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 2,
      }}>
        NETWORK ISOLATION TIERS
      </div>

      {/* Concentric tiers */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {tiers.map((tier, i) => {
          const tierDelay = i * 20;
          const tierProgress = spring({ frame: frame - tierDelay, fps, config: { damping: 14, stiffness: 80 } });
          const tierScale = interpolate(tierProgress, [0, 1], [0.7, 1]);
          const tierOpacity = interpolate(tierProgress, [0, 1], [0, 1]);

          // Lock icon appears after tier
          const lockDelay = 60 + i * 18;
          const lockOpacity = interpolate(frame - lockDelay, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          // Pulse animation for the innermost tier
          const pulse = i === 2 ? interpolate(frame % 80, [0, 40, 80], [1, 1.04, 1]) : 1;

          return (
            <div
              key={tier.label}
              style={{
                position: 'absolute',
                width: tier.width,
                height: tier.height,
                borderRadius: 20,
                border: `2px solid ${tier.color}30`,
                background: `${tier.color}06`,
                opacity: tierOpacity,
                transform: `scale(${tierScale * pulse})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: i === 2 ? 'center' : 'flex-start',
                paddingTop: i === 2 ? 0 : 14,
              }}
            >
              {/* Tier label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: tier.color, letterSpacing: 1.5, opacity: 0.9 }}>
                  {tier.label}
                </span>
                {/* Lock icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={tier.color} strokeWidth="2.5" strokeLinecap="round" style={{ opacity: lockOpacity }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2, fontFamily: "'Inter', system-ui" }}>
                {tier.sublabel}
              </span>
            </div>
          );
        })}

        {/* Arrow showing request filtering */}
        <div style={{
          position: 'absolute',
          left: -80,
          opacity: interpolate(frame - 80, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          <svg width="50" height="24" viewBox="0 0 50 24">
            <defs>
              <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="100%" stopColor={CORAL} />
              </linearGradient>
            </defs>
            <line x1="0" y1="12" x2="38" y2="12" stroke="url(#arrowGrad)" strokeWidth="2" />
            <polygon points="38,6 50,12 38,18" fill={CORAL} />
          </svg>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 2 }}>
            REQUEST
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div style={{
        position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center',
        opacity: interpolate(frame - 100, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        fontSize: 11, color: CORAL, fontWeight: 600, letterSpacing: 0.5,
      }}>
        ✓ Defense in depth — each layer reduces blast radius
      </div>
    </AbsoluteFill>
  );
};
