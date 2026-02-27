import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';
const LIGHT_BG = '#f7f3ee';


export const ContactHeroComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();
    const isMobile = width < 768;

    // Title spring
    const titleProgress = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
    const titleY = interpolate(titleProgress, [0, 1], [50, 0]);
    const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

    // Subtitle
    const subtitleOpacity = interpolate(frame - 18, [0, 28], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Accent line
    const lineWidth = interpolate(frame - 28, [0, 30], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Pulse rings
    const ringScale = interpolate(frame % 90, [0, 90], [0.8, 1.6], { extrapolateRight: 'clamp' });
    const ringOpacity = interpolate(frame % 90, [0, 90], [0.5, 0], { extrapolateRight: 'clamp' });

    // Grid
    const gridOpacity = interpolate(frame, [50, 90], [0, 0.5], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(135deg, ${LIGHT_BG} 0%, #fff 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                overflow: 'hidden',
            }}
        >
            {/* Grid */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle, ${CORAL}18 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    opacity: gridOpacity,
                }}
            />

            {/* Pulse rings */}
            {[0, 1, 2].map((i) => {
                const delay = i * 30;
                const localFrame = (frame + delay) % 90;
                const scale = interpolate(localFrame, [0, 90], [0.6, 2.0], { extrapolateRight: 'clamp' });
                const opacity = interpolate(localFrame, [0, 90], [0.4, 0], { extrapolateRight: 'clamp' });
                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) scale(${scale})`,
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            border: `2px solid ${CORAL}`,
                            opacity,
                        }}
                    />
                );
            })}

            {/* Glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${CORAL}15, transparent 70%)`,
                    opacity: interpolate(frame, [0, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: isMobile ? '0 24px' : '0 80px', maxWidth: '900px' }}>
                {/* Title */}
                <div
                    style={{
                        opacity: titleOpacity,
                        transform: `translateY(${titleY}px)`,
                        fontSize: isMobile ? '32px' : '66px',
                        fontWeight: 700,
                        color: '#0a0a0a',
                        lineHeight: 1.1,
                        marginBottom: isMobile ? '14px' : '20px',
                        letterSpacing: isMobile ? '-1px' : '-2px',
                    }}
                >
                    Get In <span style={{ color: CORAL }}>Touch</span>
                </div>

                {/* Accent line */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? '14px' : '22px' }}>
                    <div
                        style={{
                            height: isMobile ? '3px' : '4px',
                            width: `${lineWidth}%`,
                            maxWidth: '120px',
                            background: CORAL,
                            borderRadius: '2px',
                        }}
                    />
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        opacity: subtitleOpacity,
                        fontSize: isMobile ? '14px' : '20px',
                        color: '#555',
                        fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                >
                    Ready to transform your business? Let's build something great together.
                </div>
            </div>
        </AbsoluteFill>
    );
};
