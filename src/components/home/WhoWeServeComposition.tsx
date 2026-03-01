import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

const segments = [
  {
    name: 'Startups',
    points: ['MVP to Production', 'Lean Architecture', 'Rapid Iteration'],
    // Rocket icon
    icon: 'M 30 50 L 30 30 C 30 18 38 8 44 4 C 50 8 58 18 58 30 L 58 50 M 38 50 L 30 58 L 30 50 M 50 50 L 58 58 L 58 50 M 38 34 A 6 6 0 1 0 50 34 A 6 6 0 1 0 38 34',
  },
  {
    name: 'SMBs',
    points: ['Scale Infrastructure', 'Process Automation', 'Cost Optimization'],
    // Building icon
    icon: 'M 16 56 L 16 16 L 50 16 L 50 56 M 16 16 L 33 6 L 50 16 M 24 26 L 30 26 M 36 26 L 42 26 M 24 36 L 30 36 M 36 36 L 42 36 M 24 46 L 30 46 M 36 46 L 42 46 M 30 56 L 30 48 L 36 48 L 36 56',
  },
  {
    name: 'Enterprise',
    points: ['Complex Integrations', 'Security & Compliance', 'Strategic Advisory'],
    // Globe icon
    icon: 'M 32 8 A 24 24 0 1 0 32 56 A 24 24 0 1 0 32 8 M 8 32 L 56 32 M 32 8 C 24 20 24 44 32 56 M 32 8 C 40 20 40 44 32 56 M 12 18 L 52 18 M 12 46 L 52 46',
  },
];

const ICON_PATH_LEN = 400;

export const WhoWeServeComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const isMobile = width < 768;

  // Responsive card dimensions
  const CARD_W = isMobile ? width - 48 : 310;
  const CARD_GAP = isMobile ? 24 : 50;
  const CARDS_START = isMobile
    ? 24
    : (width - CARD_W * 3 - CARD_GAP * 2) / 2;

  // Grid
  const gridOpacity = interpolate(frame, [0, 40], [0, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Title
  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [30, 0]);

  // Middle card glow
  const glowPulse = interpolate(
    (frame + 20) % 90,
    [0, 45, 90],
    [0.15, 0.35, 0.15]
  );

  // Card content height varies on mobile (stacked so icon+name+bullets)
  const cardContentHeight = isMobile ? 190 : 0; // used for vertical spacing

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #010108 0%, #080814 50%, #010108 100%)',
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${CORAL}15 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
          opacity: gridOpacity,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 24,
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
          OUR CLIENTS
        </div>
        <div
          style={{
            fontSize: isMobile ? 24 : 34,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-1px',
          }}
        >
          Who We <span style={{ color: CORAL }}>Serve</span>
        </div>
      </div>

      {/* Segment cards */}
      {segments.map((seg, idx) => {
        const cardDelay = 18 + idx * 12;
        const cardSpring = spring({
          frame: frame - cardDelay,
          fps,
          config: { damping: 12, stiffness: 100 },
        });
        const cardY = interpolate(cardSpring, [0, 1], [50, 0]);
        const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

        const iconDraw = interpolate(frame - (cardDelay + 12), [0, 35], [ICON_PATH_LEN, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const cardX = isMobile
          ? CARDS_START
          : CARDS_START + idx * (CARD_W + CARD_GAP);
        const cardTop = isMobile
          ? 120 + idx * (cardContentHeight + CARD_GAP)
          : 120;
        const isCenter = idx === 1;

        return (
          <div
            key={seg.name}
            style={{
              position: 'absolute',
              top: cardTop,
              left: cardX,
              width: CARD_W,
              opacity: cardOpacity,
              transform: `translateY(${cardY}px)`,
            }}
          >
            {/* Background glow for center card */}
            {isCenter && (
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  left: -20,
                  right: -20,
                  bottom: -20,
                  borderRadius: 24,
                  background: `radial-gradient(ellipse, ${CORAL}18, transparent 70%)`,
                  opacity: glowPulse,
                }}
              />
            )}

            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(8px)',
                borderRadius: 16,
                padding: isMobile ? '20px 16px' : '24px 20px',
                border: `1.5px solid ${isCenter ? CORAL : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isCenter
                  ? `0 8px 32px ${CORAL}22`
                  : '0 4px 16px rgba(0,0,0,0.2)',
                position: 'relative',
              }}
            >
              {/* Icon */}
              <svg
                width={isMobile ? 40 : 50}
                height={isMobile ? 40 : 50}
                viewBox="0 0 64 64"
                style={{ marginBottom: 12 }}
              >
                <path
                  d={seg.icon}
                  fill="none"
                  stroke={CORAL}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={ICON_PATH_LEN}
                  strokeDashoffset={iconDraw}
                />
              </svg>

              {/* Name */}
              <div
                style={{
                  fontSize: isMobile ? 17 : 20,
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: 14,
                }}
              >
                {seg.name}
              </div>

              {/* Bullet points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {seg.points.map((point, pIdx) => {
                  const ptDelay = cardDelay + 28 + pIdx * 8;
                  const ptSpring = spring({
                    frame: frame - ptDelay,
                    fps,
                    config: { damping: 12, stiffness: 130 },
                  });
                  const ptOpacity = interpolate(ptSpring, [0, 1], [0, 1]);
                  const ptX = interpolate(ptSpring, [0, 1], [12, 0]);
                  return (
                    <div
                      key={point}
                      style={{
                        opacity: ptOpacity,
                        transform: `translateX(${ptX}px)`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: isMobile ? 12 : 13,
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.55)',
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: CORAL,
                          flexShrink: 0,
                        }}
                      />
                      {point}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
