import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

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
  const docDraw = interpolate(frame - 10, [0, 35], [ICON_PATH_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const foldDraw = interpolate(frame - 25, [0, 15], [ICON_PATH_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const linesDraw = interpolate(frame - 35, [0, 20], [ICON_PATH_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const checkDraw = interpolate(frame - 50, [0, 15], [ICON_PATH_LEN, 0], {
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
        {/* Document icon */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 64 64"
          style={{ opacity: iconOpacity, flexShrink: 0 }}
        >
          {/* Document outline */}
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
          {/* Corner fold */}
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
          {/* Text lines */}
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
          {/* Checkmark */}
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
              fontSize: 64,
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
              fontSize: 22,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.5)',
              marginTop: 8,
              opacity: subOpacity,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Rules for using our website
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
