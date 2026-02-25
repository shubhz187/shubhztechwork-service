import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

const dataRows = [
  { field: 'email', original: 'john.doe@company.com', redacted: '[REDACTED]' },
  { field: 'phone', original: '+1-555-0123-4567', redacted: '[REDACTED]' },
  { field: 'ssn', original: '123-45-6789', redacted: '[REDACTED]' },
  { field: 'address', original: '742 Evergreen Terrace', redacted: '[REDACTED]' },
];

export const DataRedactComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = interpolate(frame, [0, 40], [0, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${CORAL}12 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: gridOpacity }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 480 }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `${CORAL}15`, border: `1.5px solid ${CORAL}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
          }}>
            🔒
          </div>
          <div>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: 1 }}>
              LOG SANITIZATION
            </span>
          </div>
          <div style={{
            marginLeft: 'auto', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 10px',
          }}>
            BEFORE → AFTER
          </div>
        </div>

        {/* Data rows */}
        {dataRows.map((row, i) => {
          const rowDelay = 15 + i * 14;
          const rowProgress = spring({ frame: frame - rowDelay, fps, config: { damping: 14, stiffness: 100 } });
          const rowY = interpolate(rowProgress, [0, 1], [20, 0]);
          const rowOpacity = interpolate(rowProgress, [0, 1], [0, 1]);

          // Redaction wipe
          const redactStart = 60 + i * 14;
          const redactProgress = interpolate(frame - redactStart, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const isRedacted = redactProgress > 0.5;

          return (
            <div
              key={row.field}
              style={{
                opacity: rowOpacity,
                transform: `translateY(${rowY}px)`,
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 10,
                padding: '10px 16px',
                gap: 12,
              }}
            >
              {/* Field name */}
              <span style={{
                fontFamily: "'Inter', monospace", fontSize: 13, color: 'rgba(255,255,255,0.45)',
                fontWeight: 500, minWidth: 65,
              }}>
                {row.field}:
              </span>

              {/* Value container with wipe effect */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: 4 }}>
                {/* Original value */}
                <span style={{
                  fontFamily: "'Inter', monospace", fontSize: 13,
                  color: isRedacted ? 'transparent' : 'rgba(255,255,255,0.7)',
                  transition: 'color 0.15s',
                }}>
                  {row.original}
                </span>

                {/* Redaction overlay */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  display: 'flex', alignItems: 'center',
                  opacity: redactProgress,
                }}>
                  <span style={{
                    fontFamily: "'Inter', monospace", fontSize: 13,
                    color: '#22c55e', fontWeight: 700, letterSpacing: 0.5,
                  }}>
                    {row.redacted}
                  </span>
                </div>
              </div>

              {/* Status indicator */}
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: isRedacted ? '#22c55e' : CORAL,
                boxShadow: isRedacted ? '0 0 8px #22c55e50' : `0 0 8px ${CORAL}50`,
                transition: 'background 0.2s, box-shadow 0.2s',
              }} />
            </div>
          );
        })}

        {/* Status bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 6, padding: '0 4px',
          opacity: interpolate(frame - 115, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 600 }}>
            ✓ All PII fields sanitized
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
            4/4 fields protected
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
