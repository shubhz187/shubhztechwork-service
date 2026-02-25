import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';
const VIOLET = '#8b5cf6';

const chatFlow = [
  { role: 'student', text: 'How do I solve x² + 5x + 6 = 0?', color: 'rgba(255,255,255,0.08)' },
  { role: 'agent', text: '🔍 Diagnosing understanding...', color: `${VIOLET}15`, isStatus: true },
  { role: 'agent', text: 'What do you know about factoring trinomials?', color: `${VIOLET}12` },
  { role: 'student', text: 'I think I need two numbers that...', color: 'rgba(255,255,255,0.08)' },
  { role: 'agent', text: '💡 Hint: Find two numbers that multiply to 6 and add to 5', color: `${VIOLET}12`, isHint: true },
];

export const SocraticTutorComposition: React.FC = () => {
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
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle, ${VIOLET}12 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: gridOpacity }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 40, alignItems: 'flex-start', padding: '0 40px' }}>
        {/* Left: Flow diagram */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 120,
          opacity: interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, marginBottom: 8 }}>
            SOCRATIC FLOW
          </div>
          {['Ask', 'Diagnose', 'Guide', 'Hint', 'Reinforce'].map((step, i) => {
            const stepDelay = 5 + i * 8;
            const stepProgress = spring({ frame: frame - stepDelay, fps, config: { damping: 14, stiffness: 120 } });
            const stepOpacity = interpolate(stepProgress, [0, 1], [0, 1]);

            // Highlight active step based on chat progress
            const chatProgress = interpolate(frame, [0, 150], [0, 5], { extrapolateRight: 'clamp' });
            const isActive = Math.floor(chatProgress) === i;
            const isPast = Math.floor(chatProgress) > i;

            return (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {i > 0 && (
                  <div style={{
                    width: 2, height: 12,
                    background: isPast ? '#22c55e40' : 'rgba(255,255,255,0.1)',
                    opacity: stepOpacity,
                  }} />
                )}
                <div style={{
                  opacity: stepOpacity,
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 14px', borderRadius: 8,
                  background: isActive ? `${VIOLET}20` : isPast ? '#22c55e10' : 'rgba(255,255,255,0.03)',
                  border: `1.5px solid ${isActive ? VIOLET + '50' : isPast ? '#22c55e30' : 'rgba(255,255,255,0.08)'}`,
                  transition: 'all 0.3s',
                }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: isPast ? '#22c55e' : isActive ? VIOLET : 'rgba(255,255,255,0.2)',
                    boxShadow: isActive ? `0 0 8px ${VIOLET}50` : 'none',
                  }} />
                  <span style={{
                    fontSize: 11, fontWeight: 600,
                    color: isActive ? VIOLET : isPast ? '#22c55e' : 'rgba(255,255,255,0.4)',
                  }}>
                    {step}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Chat simulation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, maxWidth: 420 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, marginBottom: 4,
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}>
            TUTOR SESSION
          </div>

          {chatFlow.map((msg, i) => {
            const msgDelay = 15 + i * 22;
            const msgProgress = spring({ frame: frame - msgDelay, fps, config: { damping: 14, stiffness: 100 } });
            const msgY = interpolate(msgProgress, [0, 1], [15, 0]);
            const msgOpacity = interpolate(msgProgress, [0, 1], [0, 1]);

            const isAgent = msg.role === 'agent';

            return (
              <div
                key={i}
                style={{
                  opacity: msgOpacity,
                  transform: `translateY(${msgY}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isAgent ? 'flex-start' : 'flex-end',
                }}
              >
                <div style={{
                  background: msg.color,
                  border: `1px solid ${isAgent ? VIOLET + '25' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: isAgent ? '12px 12px 12px 4px' : '12px 12px 4px 12px',
                  padding: '8px 14px',
                  maxWidth: 340,
                }}>
                  {!msg.isStatus && !msg.isHint && (
                    <span style={{ fontSize: 9, fontWeight: 600, color: isAgent ? VIOLET : 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 3 }}>
                      {isAgent ? 'SPARK Tutor' : 'Student'}
                    </span>
                  )}
                  <span style={{
                    fontSize: 12,
                    color: msg.isStatus ? VIOLET : msg.isHint ? '#f59e0b' : 'rgba(255,255,255,0.7)',
                    fontWeight: msg.isStatus || msg.isHint ? 600 : 400,
                    fontStyle: msg.isStatus ? 'italic' : 'normal',
                  }}>
                    {msg.text}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Mastery badge */}
          <div style={{
            opacity: interpolate(frame - 130, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            display: 'flex', alignItems: 'center', gap: 6, marginTop: 4,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#22c55e20" stroke="#22c55e" strokeWidth="2" />
              <path d="M8 12 L11 15 L16 9" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 600 }}>
              Concept mastery achieved through guided discovery
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
