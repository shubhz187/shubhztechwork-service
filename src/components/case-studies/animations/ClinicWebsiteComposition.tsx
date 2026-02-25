import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const SKY = '#0ea5e9';
const GREEN = '#22c55e';

/* ── Wireframe sections for the left-side website mockup ──── */
const sections = [
  { label: 'Header', y: 20, h: 30 },
  { label: 'Hero', y: 58, h: 55 },
  { label: 'Services', y: 121, h: 50 },
  { label: 'Contact', y: 179, h: 40 },
];

/* ── Right-side project phases checklist ────────────────────── */
const phases = [
  { label: 'Discovery & Planning', days: 'Day 1-3' },
  { label: 'Website Build', days: 'Day 4-15' },
  { label: 'QA & Review', days: 'Day 16-20' },
  { label: 'Launch', days: 'LIVE' },
];

export const ClinicWebsiteComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grid background
  const gridOpacity = interpolate(frame, [0, 40], [0, 0.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Glow
  const glowOpacity = interpolate(frame, [20, 60], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Browser frame draw-on
  const browserDraw = interpolate(frame, [5, 35], [600, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Right side title
  const rightTitleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0a1020 50%, #0a0a0a 100%)',
        display: 'flex',
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
          backgroundImage: `radial-gradient(circle, ${SKY}12 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: gridOpacity,
        }}
      />

      {/* Glow blob */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${SKY}18, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Left side: Website wireframe mockup */}
      <div style={{ position: 'absolute', left: 60, top: 30, width: 340, height: 260 }}>
        {/* Browser chrome */}
        <svg width="340" height="260" viewBox="0 0 340 260">
          {/* Browser outline */}
          <rect
            x="1"
            y="1"
            width="338"
            height="258"
            rx="10"
            fill="none"
            stroke={SKY}
            strokeWidth="1.5"
            strokeDasharray={600}
            strokeDashoffset={browserDraw}
            opacity={0.6}
          />

          {/* Browser top bar */}
          <line
            x1="1"
            y1="18"
            x2="339"
            y2="18"
            stroke={SKY}
            strokeWidth="0.8"
            strokeDasharray={340}
            strokeDashoffset={interpolate(frame, [10, 30], [340, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}
            opacity={0.4}
          />

          {/* Browser dots */}
          {[12, 24, 36].map((cx, i) => {
            const dotDelay = 15 + i * 5;
            const dotOp = interpolate(frame - dotDelay, [0, 10], [0, 0.6], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <circle key={i} cx={cx} cy={9} r="3" fill={SKY} opacity={dotOp} />
            );
          })}

          {/* URL bar */}
          {(() => {
            const urlOp = interpolate(frame - 25, [0, 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <g opacity={urlOp}>
                <rect x="60" y="4" width="220" height="10" rx="3" fill="rgba(255,255,255,0.06)" />
                <text x="170" y="12" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="'Inter', system-ui, sans-serif">
                  drmiteshshah.in
                </text>
              </g>
            );
          })()}
        </svg>

        {/* Wireframe sections filling in */}
        {sections.map((sec, i) => {
          const secDelay = 25 + i * 15;
          const secSpring = spring({
            frame: frame - secDelay,
            fps,
            config: { damping: 14, stiffness: 100 },
          });
          const secOpacity = interpolate(secSpring, [0, 1], [0, 1]);
          const secWidth = interpolate(secSpring, [0, 1], [0, 320]);

          return (
            <div
              key={sec.label}
              style={{
                position: 'absolute',
                left: 70,
                top: 30 + sec.y,
                width: secWidth,
                height: sec.h,
                background:
                  i === 0
                    ? `linear-gradient(90deg, ${SKY}20, ${SKY}08)`
                    : 'rgba(255,255,255,0.03)',
                border: `1px solid ${SKY}${i === 0 ? '40' : '15'}`,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: secOpacity,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: `rgba(255,255,255,${i === 0 ? 0.6 : 0.35})`,
                  letterSpacing: 1,
                  fontFamily: "'Inter', system-ui, sans-serif",
                  textTransform: 'uppercase',
                }}
              >
                {sec.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right side: Phase checklist */}
      <div style={{ position: 'absolute', right: 60, top: 35, width: 320 }}>
        {/* Title */}
        <div
          style={{
            opacity: rightTitleOpacity,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 2,
            color: SKY,
            marginBottom: 20,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          PROJECT TIMELINE
        </div>

        {/* Phase items */}
        {phases.map((phase, i) => {
          const phaseDelay = 35 + i * 20;
          const phaseSpring = spring({
            frame: frame - phaseDelay,
            fps,
            config: { damping: 12, stiffness: 120 },
          });
          const phaseOpacity = interpolate(phaseSpring, [0, 1], [0, 1]);
          const phaseX = interpolate(phaseSpring, [0, 1], [20, 0]);

          // Checkmark appears after phase is revealed
          const checkDelay = phaseDelay + 15;
          const checkOpacity = interpolate(frame - checkDelay, [0, 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const isLast = i === phases.length - 1;
          const isLive = isLast && checkOpacity > 0.5;

          // Live badge pulse
          const livePulse = isLive
            ? interpolate((frame - checkDelay) % 60, [0, 30, 60], [0.6, 1, 0.6])
            : 0;

          return (
            <div
              key={phase.label}
              style={{
                opacity: phaseOpacity,
                transform: `translateX(${phaseX}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 18,
              }}
            >
              {/* Checkbox / check */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  border: `2px solid ${isLive ? GREEN : SKY}`,
                  background: checkOpacity > 0.5
                    ? isLive
                      ? GREEN
                      : `${SKY}30`
                    : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: isLive ? `0 0 ${12 * livePulse}px ${GREEN}60` : 'none',
                }}
              >
                {checkOpacity > 0.5 && (
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path
                      d="M 3 7 L 6 10 L 11 4"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              {/* Phase info */}
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#fff',
                  }}
                >
                  {phase.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: isLive ? GREEN : 'rgba(255,255,255,0.4)',
                    fontFamily: "'Inter', system-ui, sans-serif",
                    marginTop: 2,
                  }}
                >
                  {phase.days}
                </div>
              </div>

              {/* LIVE badge for last item */}
              {isLive && (
                <div
                  style={{
                    marginLeft: 'auto',
                    background: GREEN,
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 100,
                    letterSpacing: 1,
                    boxShadow: `0 0 ${14 * livePulse}px ${GREEN}80`,
                  }}
                >
                  LIVE
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom label */}
      {(() => {
        const labelOpacity = interpolate(frame - 100, [0, 20], [0, 0.5], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              width: '100%',
              textAlign: 'center',
              opacity: labelOpacity,
              fontSize: 11,
              color: 'rgba(255,255,255,0.3)',
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: 1,
            }}
          >
            DR. MITESH SHAH — CLINIC WEBSITE DELIVERY
          </div>
        );
      })()}
    </AbsoluteFill>
  );
};
