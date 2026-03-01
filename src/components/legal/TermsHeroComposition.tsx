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

// Document with lines
const DOC_OUTER = 'M 16 4 L 44 4 L 52 12 L 52 60 L 12 60 L 12 4 Z';
const DOC_FOLD = 'M 44 4 L 44 12 L 52 12';
const DOC_LINE1 = 'M 20 24 L 44 24';
const DOC_LINE2 = 'M 20 32 L 40 32';
const DOC_LINE3 = 'M 20 40 L 44 40';
const DOC_CHECK = 'M 20 50 L 24 54 L 32 46';

export const TermsHeroComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const isMobile = width < 768;

  const textFrame = Math.min(frame, 90);

  // Icon draw-on (caps at completion)
  const iconFrame = Math.min(frame, 80);
  const docDraw = interpolate(iconFrame - 10, [0, 35], [ICON_PATH_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const foldDraw = interpolate(iconFrame - 25, [0, 15], [ICON_PATH_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const linesDraw = interpolate(iconFrame - 35, [0, 20], [ICON_PATH_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const checkDraw = interpolate(iconFrame - 50, [0, 15], [ICON_PATH_LEN, 0], {
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
      <HeroRibbonBackground idPrefix="terms" />

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
        {/* Document icon */}
        <svg
          width={isMobile ? 60 : 100}
          height={isMobile ? 60 : 100}
          viewBox="0 0 64 64"
          style={{ opacity: iconOpacity, flexShrink: 0 }}
        >
          <path
            d={DOC_OUTER}
            fill="none"
            stroke={CORAL}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={ICON_PATH_LEN}
            strokeDashoffset={docDraw}
          />
          <path
            d={DOC_FOLD}
            fill="none"
            stroke={CORAL}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={ICON_PATH_LEN}
            strokeDashoffset={foldDraw}
          />
          {[DOC_LINE1, DOC_LINE2, DOC_LINE3].map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={ICON_PATH_LEN}
              strokeDashoffset={linesDraw}
            />
          ))}
          <path
            d={DOC_CHECK}
            fill="none"
            stroke={CORAL}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={ICON_PATH_LEN}
            strokeDashoffset={checkDraw}
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
            Terms of <span style={{ color: CORAL }}>Service</span>
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
            Rules for using our website
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
