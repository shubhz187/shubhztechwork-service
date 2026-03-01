import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { HeroRibbonBackground } from '../shared/HeroRibbonBackground';

const CORAL = 'hsl(6, 93%, 64%)';
const ICON_PATH_LEN = 300;

// Shield with lock keyhole
const SHIELD_PATH =
  'M 32 6 L 10 16 L 10 30 C 10 44 19 54 32 60 C 45 54 54 44 54 30 L 54 16 Z';
const KEYHOLE_CIRCLE = 'M 32 28 A 5 5 0 1 1 32 38 A 5 5 0 1 1 32 28';
const KEYHOLE_BODY = 'M 29 36 L 32 46 L 35 36';

export const PrivacyHeroComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const isMobile = width < 768;

  const textFrame = Math.min(frame, 90);

  // Icon draw-on (caps at completion)
  const iconFrame = Math.min(frame, 80);
  const shieldDraw = interpolate(iconFrame - 10, [0, 40], [ICON_PATH_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const keyholeDraw = interpolate(iconFrame - 35, [0, 25], [ICON_PATH_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const iconOpacity = interpolate(iconFrame - 5, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Title
  const titleSpring = spring({ frame: textFrame - 15, fps, config: { damping: 14, stiffness: 100 } });
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Subtitle
  const subOpacity = interpolate(textFrame - 40, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
      }}
    >
      <HeroRibbonBackground idPrefix="privacy" />

      {/* Layout: icon left, text right (stacked on mobile) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: isMobile ? 16 : 40,
          textAlign: isMobile ? 'center' : 'left',
          zIndex: 1,
        }}
      >
        {/* Shield icon */}
        <svg
          width={isMobile ? 60 : 100}
          height={isMobile ? 60 : 100}
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
              fontSize: isMobile ? 30 : 64,
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
              fontSize: isMobile ? 14 : 22,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.5)',
              marginTop: 8,
              opacity: subOpacity,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            How we protect your data
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
