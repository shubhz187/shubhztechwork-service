import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

const ROW_1 = ['React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Python', 'TypeScript', 'AWS', 'Azure', 'GCP'];
const ROW_2 = ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Linux', 'Git'];

const PILL_W = 130;
const PILL_GAP = 14;
const PILL_H = 38;
const ROW_TOTAL = (PILL_W + PILL_GAP) * ROW_1.length;

export const TechMarqueeComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [20, 0]);

  // Row offsets — opposite directions
  const row1Offset = interpolate(frame, [0, 600], [0, -ROW_TOTAL], {
    extrapolateRight: 'wrap',
  });
  const row2Offset = interpolate(frame, [0, 600], [-ROW_TOTAL, 0], {
    extrapolateRight: 'wrap',
  });

  // Grid
  const gridOpacity = interpolate(frame, [0, 40], [0, 0.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Center spotlight x position
  const centerX = 600;

  const renderPill = (tech: string, idx: number, offset: number) => {
    const baseX = idx * (PILL_W + PILL_GAP) + offset;
    // Wrap the position so it loops
    const x = ((baseX % ROW_TOTAL) + ROW_TOTAL) % ROW_TOTAL;

    // Center spotlight: pills near center get brighter border
    const distFromCenter = Math.abs(x + PILL_W / 2 - centerX);
    const spotlightGlow = interpolate(distFromCenter, [0, 200], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return (
      <div
        key={`${tech}-${idx}`}
        style={{
          position: 'absolute',
          left: x,
          width: PILL_W,
          height: PILL_H,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          background: `rgba(255,255,255,${0.03 + spotlightGlow * 0.05})`,
          border: `1.5px solid rgba(255,255,255,${0.08 + spotlightGlow * 0.25})`,
          boxShadow: spotlightGlow > 0.3
            ? `0 0 ${16 * spotlightGlow}px ${CORAL}${Math.round(spotlightGlow * 40).toString(16).padStart(2, '0')}`
            : 'none',
          fontSize: 13,
          fontWeight: 600,
          color: `rgba(255,255,255,${0.5 + spotlightGlow * 0.5})`,
          fontFamily: "'Inter', system-ui, sans-serif",
          letterSpacing: '0.3px',
        }}
      >
        {tech}
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0e0e14 50%, #0a0a0a 100%)',
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${CORAL}08 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: gridOpacity,
        }}
      />

      {/* Center spotlight glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${CORAL}15, transparent 70%)`,
          opacity: 0.6,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 4,
            color: CORAL,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          OUR TECH STACK
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 0,
          width: ROW_TOTAL,
          height: PILL_H,
        }}
      >
        {/* Duplicate pills for seamless loop */}
        {[...ROW_1, ...ROW_1].map((tech, idx) => renderPill(tech, idx, row1Offset))}
      </div>

      {/* Row 2 — scrolls right */}
      <div
        style={{
          position: 'absolute',
          top: 60 + PILL_H + 16,
          left: 0,
          width: ROW_TOTAL,
          height: PILL_H,
        }}
      >
        {[...ROW_2, ...ROW_2].map((tech, idx) => renderPill(tech, idx, row2Offset))}
      </div>

      {/* Edge fades */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 0,
          width: 120,
          height: 120,
          background: 'linear-gradient(90deg, #0a0a0a, transparent)',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 50,
          right: 0,
          width: 120,
          height: 120,
          background: 'linear-gradient(-90deg, #0a0a0a, transparent)',
          zIndex: 2,
        }}
      />
    </AbsoluteFill>
  );
};
