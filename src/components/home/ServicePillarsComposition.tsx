import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

/* ── Pillar data ───────────────────────────────────────── */
const pillars = [
  {
    name: 'Punctuality',
    services: ['On-time Delivery', 'Agile Sprints', 'Reliable Support'],
    // Clock path
    icon: 'M 32 8 A 24 24 0 1 1 32 56 A 24 24 0 1 1 32 8 M 32 16 L 32 32 L 44 32',
  },
  {
    name: 'Loyalty',
    services: ['Long-term Vision', 'Dedicated Teams', 'Client Success'],
    // Shield path
    icon: 'M 16 16 M 32 8 M 48 16 M 16 16 C 16 32 24 48 32 56 C 40 48 48 32 48 16 L 32 8 Z M 32 8 L 16 16 L 32 16 L 32 56 L 32 16 L 48 16 Z',
  },
  {
    name: 'Value for Money',
    services: ['Transparent Pricing', 'High ROI', 'Scalable Solutions'],
    // Diamond path
    icon: 'M 32 8 L 50 26 L 32 56 L 14 26 Z M 22 26 L 42 26 M 32 8 L 32 56',
  },
  {
    name: 'Growth',
    services: ['Business Scaling', 'Performance', 'Future-proof Tech'],
    // Upward trend/chart path
    icon: 'M 8 52 L 56 52 M 8 52 L 8 12 M 16 38 L 28 26 L 40 34 L 52 14 M 40 14 L 52 14 L 52 26',
  }
];

const ICON_PATH_LEN = 300;

export const ServicePillarsComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const isMobile = width < 768;

  // Responsive grid layout
  const cols = isMobile ? 2 : 4;
  const COL_WIDTH = isMobile ? (width - 48 - 16) / 2 : 270; // 24px padding each side + 16px gap on mobile
  const COL_GAP = isMobile ? 16 : 30;
  const TOTAL_WIDTH = COL_WIDTH * cols + COL_GAP * (cols - 1);
  const START_X = (width - TOTAL_WIDTH) / 2;

  // Grid background
  const gridOpacity = interpolate(frame, [0, 40], [0, 0.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Title
  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Accent line
  const lineWidth = interpolate(frame - 15, [0, 25], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Center glow
  const glowOpacity = interpolate(frame, [30, 70], [0, 0.35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
          backgroundImage: `radial-gradient(circle, ${CORAL}0d 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
          opacity: gridOpacity,
        }}
      />

      {/* Center glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? 400 : 700,
          height: isMobile ? 300 : 400,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${CORAL}12, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? 20 : 30,
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: isMobile ? 10 : 13,
            fontWeight: 600,
            letterSpacing: 3,
            color: CORAL,
            marginBottom: 8,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          WHAT WE DO
        </div>
        <div
          style={{
            fontSize: isMobile ? 22 : 36,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-1px',
          }}
        >
          Four Pillars of <span style={{ color: CORAL }}>Excellence</span>
        </div>
        {/* Accent line */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
          <div
            style={{
              height: 3,
              width: `${lineWidth}%`,
              maxWidth: 120,
              background: `linear-gradient(90deg, transparent, ${CORAL}, transparent)`,
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* Pillar columns */}
      {pillars.map((pillar, colIdx) => {
        const col = colIdx % cols;
        const row = Math.floor(colIdx / cols);
        const colDelay = 30 + colIdx * 20;
        const colSpring = spring({
          frame: frame - colDelay,
          fps,
          config: { damping: 12, stiffness: 100 },
        });
        const colY = interpolate(colSpring, [0, 1], [60, 0]);
        const colOpacity = interpolate(colSpring, [0, 1], [0, 1]);

        // Icon stroke draw-on
        const iconDraw = interpolate(frame - (colDelay + 15), [0, 35], [ICON_PATH_LEN, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const cardX = START_X + col * (COL_WIDTH + COL_GAP);
        // On mobile 2-col: row 0 at 120, row 1 below
        const ROW_HEIGHT = isMobile ? 260 : 0;
        const cardTop = isMobile ? 110 + row * ROW_HEIGHT : 135;

        return (
          <div
            key={pillar.name}
            style={{
              position: 'absolute',
              top: cardTop,
              left: cardX,
              width: COL_WIDTH,
              opacity: colOpacity,
              transform: `translateY(${colY}px)`,
            }}
          >
            {/* Card background */}
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: isMobile ? 12 : 16,
                padding: isMobile ? '18px 14px' : '28px 24px',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Icon */}
              <svg
                width={isMobile ? 44 : 60}
                height={isMobile ? 44 : 60}
                viewBox="0 0 64 64"
                style={{ marginBottom: isMobile ? 10 : 16 }}
              >
                <path
                  d={pillar.icon}
                  fill="none"
                  stroke={CORAL}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={ICON_PATH_LEN}
                  strokeDashoffset={iconDraw}
                />
              </svg>

              {/* Pillar name */}
              <div
                style={{
                  fontSize: isMobile ? 15 : 20,
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: isMobile ? 10 : 16,
                }}
              >
                {pillar.name}
              </div>

              {/* Service pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 6 : 8 }}>
                {pillar.services.map((svc, svcIdx) => {
                  const pillDelay = colDelay + 40 + svcIdx * 12;
                  const pillSpring = spring({
                    frame: frame - pillDelay,
                    fps,
                    config: { damping: 12, stiffness: 130 },
                  });
                  const pillOpacity = interpolate(pillSpring, [0, 1], [0, 1]);
                  const pillX = interpolate(pillSpring, [0, 1], [15, 0]);

                  return (
                    <div
                      key={svc}
                      style={{
                        opacity: pillOpacity,
                        transform: `translateX(${pillX}px)`,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: isMobile ? 6 : 8,
                        padding: isMobile ? '6px 10px' : '8px 14px',
                        fontSize: isMobile ? 11 : 13,
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.75)',
                        fontFamily: "'Inter', system-ui, sans-serif",
                      }}
                    >
                      {svc}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* Connecting flow-line between pillars */}
      <svg
        width={width}
        height="500"
        viewBox={`0 0 ${width} 500`}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {!isMobile && [0, 1, 2].map((i) => {
          const fromX = START_X + COL_WIDTH + i * (COL_WIDTH + COL_GAP);
          const toX = fromX + COL_GAP;
          const y = 220;
          const lineDelay = 55 + i * 15;
          const lineDraw = interpolate(frame - lineDelay, [0, 20], [COL_GAP, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <line
              key={i}
              x1={fromX}
              y1={y}
              x2={toX}
              y2={y}
              stroke={CORAL}
              strokeWidth="1.5"
              strokeDasharray={COL_GAP}
              strokeDashoffset={lineDraw}
              opacity={0.4}
            />
          );
        })}
        {/* Mobile: horizontal connector between each pair in a row */}
        {isMobile && [0].map((rowIdx) => {
          const fromX = START_X + COL_WIDTH;
          const toX = fromX + COL_GAP;
          const y = 220;
          const lineDelay = 55;
          const lineDraw = interpolate(frame - lineDelay, [0, 20], [COL_GAP, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <line
              key={`m-${rowIdx}`}
              x1={fromX}
              y1={y}
              x2={toX}
              y2={y}
              stroke={CORAL}
              strokeWidth="1.5"
              strokeDasharray={COL_GAP}
              strokeDashoffset={lineDraw}
              opacity={0.4}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
