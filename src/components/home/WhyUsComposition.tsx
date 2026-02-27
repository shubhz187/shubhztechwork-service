import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

const differentiators = [
  {
    title: 'End-to-End Delivery',
    desc: 'From architecture to production — we own it.',
    icon: 'M 4 14 L 12 6 L 20 14 M 12 6 L 12 22',
  },
  {
    title: 'Security-First',
    desc: 'Built-in compliance, not bolted on.',
    icon: 'M 12 2 L 2 7 L 2 14 C 2 19 6 23 12 26 C 18 23 22 19 22 14 L 22 7 Z',
  },
  {
    title: 'Modern Stack',
    desc: 'Cloud-native, AI-ready, performance-tuned.',
    icon: 'M 12 2 L 12 12 M 12 12 L 22 7 M 12 12 L 22 17 M 12 12 L 12 22 M 12 12 L 2 17 M 12 12 L 2 7',
  },
  {
    title: 'Outcome-Driven',
    desc: 'We measure success by your growth metrics.',
    icon: 'M 2 22 L 8 14 L 14 18 L 22 4 M 18 4 L 22 4 L 22 8',
  },
];

export const WhyUsComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const isMobile = width < 768;

  // Responsive card dimensions
  const CARD_W = isMobile ? width - 40 : 480;
  const CARD_H = isMobile ? 110 : 120;
  const CARD_GAP_X = 60;
  const CARD_GAP_Y = isMobile ? 16 : 28;
  const cols = isMobile ? 1 : 2;
  const GRID_START_X = isMobile ? 20 : (width - CARD_W * 2 - CARD_GAP_X) / 2;
  const GRID_START_Y = 130;
  const BORDER_PERIMETER = (CARD_W + CARD_H) * 2;

  // Grid
  const gridOpacity = interpolate(frame, [0, 50], [0, 0.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Title
  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  // Accent line
  const lineWidth = interpolate(frame - 12, [0, 25], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Center glow
  const glowOpacity = interpolate(frame, [40, 80], [0, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const glowPulse = interpolate(
    (frame + 30) % 100,
    [0, 50, 100],
    [0.2, 0.45, 0.2]
  );

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0e0e16 50%, #0a0a0a 100%)',
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${CORAL}0a 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
          opacity: gridOpacity,
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? 300 : 500,
          height: isMobile ? 200 : 300,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${CORAL}14, transparent 70%)`,
          opacity: frame > 40 ? glowPulse : glowOpacity,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 26,
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: isMobile ? 11 : 13,
            fontWeight: 600,
            letterSpacing: 3,
            color: CORAL,
            marginBottom: 8,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          WHY US
        </div>
        <div
          style={{
            fontSize: isMobile ? 24 : 34,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-1px',
          }}
        >
          Why <span style={{ color: CORAL }}>ShubhzTechWork</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <div
            style={{
              height: 3,
              width: `${lineWidth}%`,
              maxWidth: 100,
              background: `linear-gradient(90deg, transparent, ${CORAL}, transparent)`,
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* 2x2 Grid of cards (or 1-col stack on mobile) */}
      {differentiators.map((item, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);

        // Diagonal stagger: top-left first, bottom-right last
        const delays = [14, 24, 28, 38];
        const cardDelay = delays[idx];

        const cardSpring = spring({
          frame: frame - cardDelay,
          fps,
          config: { damping: 12, stiffness: 100 },
        });
        const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
        const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

        // Border draw-on
        const borderDraw = interpolate(
          frame - (cardDelay + 15),
          [0, 40],
          [BORDER_PERIMETER, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        // Content fade in
        const contentOpacity = interpolate(frame - (cardDelay + 25), [0, 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const cardX = isMobile
          ? GRID_START_X
          : GRID_START_X + col * (CARD_W + CARD_GAP_X);
        const cardYPos = GRID_START_Y + row * (CARD_H + CARD_GAP_Y);

        return (
          <div
            key={item.title}
            style={{
              position: 'absolute',
              left: cardX,
              top: cardYPos,
              width: CARD_W,
              height: CARD_H,
              opacity: cardOpacity,
              transform: `translateY(${cardY}px)`,
            }}
          >
            {/* Card background */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 14,
                backdropFilter: 'blur(6px)',
              }}
            />

            {/* Animated border via SVG rect */}
            <svg
              width={CARD_W}
              height={CARD_H}
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              <defs>
                <linearGradient id={`borderGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={CORAL} />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <rect
                x="1"
                y="1"
                width={CARD_W - 2}
                height={CARD_H - 2}
                rx="14"
                ry="14"
                fill="none"
                stroke={`url(#borderGrad-${idx})`}
                strokeWidth="1.5"
                strokeDasharray={BORDER_PERIMETER}
                strokeDashoffset={borderDraw}
              />
            </svg>

            {/* Content */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? 14 : 20,
                padding: isMobile ? '0 16px' : '0 24px',
                height: '100%',
                opacity: contentOpacity,
              }}
            >
              {/* Icon */}
              <svg width={isMobile ? 36 : 44} height={isMobile ? 36 : 44} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path
                  d={item.icon}
                  fill="none"
                  stroke={CORAL}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div>
                <div
                  style={{
                    fontSize: isMobile ? 15 : 18,
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.55)',
                    fontFamily: "'Inter', system-ui, sans-serif",
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
