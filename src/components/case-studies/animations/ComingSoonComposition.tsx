import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const ROSE = '#f43f5e';

/* Shield SVG path for security theme */
const SHIELD_PATH = 'M 50 8 L 12 24 L 12 48 C 12 70 28 88 50 96 C 72 88 88 70 88 48 L 88 24 Z';
const LOCK_PATH = 'M 40 52 L 40 44 C 40 36 44 32 50 32 C 56 32 60 36 60 44 L 60 52 M 36 52 L 64 52 L 64 72 L 36 72 Z';
const SHIELD_LEN = 400;
const LOCK_LEN = 200;

export const ComingSoonComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grid
  const gridOpacity = interpolate(frame, [0, 40], [0, 0.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shield draw-on
  const shieldDraw = interpolate(frame, [10, 50], [SHIELD_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Lock draw-on (after shield)
  const lockDraw = interpolate(frame, [35, 65], [LOCK_LEN, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shield fill opacity
  const shieldFill = interpolate(frame, [45, 70], [0, 0.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Radar/scan ring pulses
  const ringPulse = (ringIdx: number) => {
    const delay = ringIdx * 25;
    const localFrame = (frame + delay) % 75;
    const scale = interpolate(localFrame, [0, 75], [0.7, 2.0], { extrapolateRight: 'clamp' });
    const opacity = interpolate(localFrame, [0, 75], [0.4, 0], { extrapolateRight: 'clamp' });
    return { scale, opacity };
  };

  // "COMING SOON" text
  const textSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const textScale = interpolate(textSpring, [0, 1], [0.6, 1]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

  // Subtitle
  const subOpacity = interpolate(frame - 75, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "Under Development" pill
  const pillSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const pillY = interpolate(pillSpring, [0, 1], [15, 0]);
  const pillOpacity = interpolate(pillSpring, [0, 1], [0, 1]);

  // Glow pulse (continuous after reveal)
  const glowPulse = frame > 60
    ? interpolate((frame - 60) % 80, [0, 40, 80], [0.3, 0.6, 0.3])
    : interpolate(frame, [20, 60], [0, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #140a0e 50%, #0a0a0a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${ROSE}10 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: gridOpacity,
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${ROSE}18, transparent 70%)`,
          opacity: glowPulse,
        }}
      />

      {/* Radar/scan rings */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -55%)' }}
      >
        {[0, 1, 2].map((i) => {
          const { scale, opacity } = ringPulse(i);
          return frame > 40 ? (
            <circle
              key={i}
              cx="100"
              cy="100"
              r="50"
              fill="none"
              stroke={ROSE}
              strokeWidth="1.5"
              opacity={opacity}
              transform={`translate(${100 * (1 - scale)} ${100 * (1 - scale)}) scale(${scale})`}
              style={{ transformOrigin: '100px 100px' }}
            />
          ) : null;
        })}
      </svg>

      {/* Shield + Lock icon */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        style={{ marginBottom: 16, position: 'relative', zIndex: 1 }}
      >
        <defs>
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ROSE} />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>
        {/* Shield fill */}
        <path d={SHIELD_PATH} fill={ROSE} opacity={shieldFill} />
        {/* Shield stroke */}
        <path
          d={SHIELD_PATH}
          fill="none"
          stroke="url(#shieldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={SHIELD_LEN}
          strokeDashoffset={shieldDraw}
        />
        {/* Lock */}
        <path
          d={LOCK_PATH}
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={LOCK_LEN}
          strokeDashoffset={lockDraw}
        />
      </svg>

      {/* COMING SOON text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          fontSize: 38,
          fontWeight: 700,
          color: '#fff',
          letterSpacing: 4,
          lineHeight: 1,
          marginBottom: 10,
          position: 'relative',
          zIndex: 1,
        }}
      >
        COMING <span style={{ color: ROSE }}>SOON</span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subOpacity,
          fontSize: 14,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.5)',
          fontFamily: "'Inter', system-ui, sans-serif",
          marginBottom: 20,
          position: 'relative',
          zIndex: 1,
        }}
      >
        Vulnerability Management Platform
      </div>

      {/* Under Development pill */}
      <div
        style={{
          opacity: pillOpacity,
          transform: `translateY(${pillY}px)`,
          background: 'rgba(255,255,255,0.05)',
          border: `1.5px solid ${ROSE}50`,
          borderRadius: 100,
          padding: '7px 22px',
          fontSize: 11,
          fontWeight: 600,
          color: ROSE,
          letterSpacing: 1.5,
          fontFamily: "'Inter', system-ui, sans-serif",
          position: 'relative',
          zIndex: 1,
        }}
      >
        UNDER DEVELOPMENT
      </div>
    </AbsoluteFill>
  );
};
