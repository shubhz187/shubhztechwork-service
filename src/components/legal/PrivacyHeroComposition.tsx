import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';
const ICON_PATH_LEN = 300;

// Shield with lock keyhole
const SHIELD_PATH =
  'M 32 6 L 10 16 L 10 30 C 10 44 19 54 32 60 C 45 54 54 44 54 30 L 54 16 Z';
const KEYHOLE_CIRCLE = 'M 32 28 A 5 5 0 1 1 32 38 A 5 5 0 1 1 32 28';
const KEYHOLE_BODY = 'M 29 36 L 32 46 L 35 36';

export const PrivacyHeroComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grid bg
  const gridOpacity = interpolate(frame, [0, 60], [0, 0.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Glow
  const glowOpacity = interpolate(frame, [20, 70], [0, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Icon draw-on
  const shieldDraw = interpolate(frame - 10, [0, 40], [ICON_PATH_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const keyholeDraw = interpolate(frame - 35, [0, 25], [ICON_PATH_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const iconOpacity = interpolate(frame - 5, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Title
  const titleSpring = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 100 } });
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Subtitle
  const subOpacity = interpolate(frame - 40, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Accent line
  const lineWidth = interpolate(frame - 50, [0, 25], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0f0f14 50%, #0a0a0a 100%)',
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${CORAL}0d 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: gridOpacity,
        }}
      />

      {/* Glow blob */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${CORAL}14, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Layout: icon left, text right */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 40,
        }}
      >
        {/* Shield icon */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 64 64"
          style={{ opacity: iconOpacity, flexShrink: 0 }}
        >
          <path
            d={SHIELD_PATH}
            fill="none"
            stroke={CORAL}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={ICON_PATH_LEN}
            strokeDashoffset={shieldDraw}
          />
          <path
            d={`${KEYHOLE_CIRCLE} ${KEYHOLE_BODY}`}
            fill="none"
            stroke={CORAL}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={ICON_PATH_LEN}
            strokeDashoffset={keyholeDraw}
          />
        </svg>

        {/* Text */}
        <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-1px',
              lineHeight: 1.2,
            }}
          >
            Privacy <span style={{ color: CORAL }}>Policy</span>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.5)',
              marginTop: 8,
              opacity: subOpacity,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            How we protect your data
          </div>
          {/* Accent line */}
          <div
            style={{
              height: 3,
              width: `${lineWidth}%`,
              maxWidth: 100,
              marginTop: 12,
              background: `linear-gradient(90deg, ${CORAL}, transparent)`,
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, #0a0a0a 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
