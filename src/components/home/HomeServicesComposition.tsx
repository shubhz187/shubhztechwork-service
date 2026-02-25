import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';
const DARK = '#0a0a0a';

const services = ['Full Stack Dev', 'Cloud & DevOps', 'Cybersecurity', 'Gen AI', 'IT Solutions'];

export const HomeServicesComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();

    // Title
    const titleProgress = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
    const titleY = interpolate(titleProgress, [0, 1], [50, 0]);
    const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

    // Subtitle
    const subtitleOpacity = interpolate(frame - 20, [0, 25], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Accent line
    const lineWidth = interpolate(frame - 25, [0, 30], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Service pills — scroll marquee effect
    const marqueeOffset = interpolate(frame, [0, 300], [0, -width], {
        extrapolateRight: 'wrap',
    });

    // Grid opacity
    const gridOpacity = interpolate(frame, [50, 90], [0, 0.4], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                background: `linear-gradient(135deg, #0a0a0a 0%, #141414 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
                overflow: 'hidden',
            }}
        >
            {/* Animated grid */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle, ${CORAL}20 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
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
                    width: '700px',
                    height: '300px',
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse, ${CORAL}18, transparent 70%)`,
                    opacity: interpolate(frame, [0, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 80px', maxWidth: '1000px' }}>
                {/* Title */}
                <div
                    style={{
                        opacity: titleOpacity,
                        transform: `translateY(${titleY}px)`,
                        fontSize: '60px',
                        fontWeight: 700,
                        color: '#fff',
                        lineHeight: 1.1,
                        marginBottom: '20px',
                        letterSpacing: '-2px',
                    }}
                >
                    Simplifying Tech,{' '}
                    <span style={{ color: CORAL }}>Amplifying Growth</span>
                </div>

                {/* Accent line */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div
                        style={{
                            height: '3px',
                            width: `${lineWidth}%`,
                            maxWidth: '160px',
                            background: `linear-gradient(90deg, ${CORAL}, transparent)`,
                            borderRadius: '2px',
                        }}
                    />
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        opacity: subtitleOpacity,
                        fontSize: '20px',
                        color: 'rgba(255,255,255,0.65)',
                        marginBottom: '48px',
                        fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                >
                    Cutting-edge technology solutions for businesses of all sizes.
                </div>

                {/* Service pills — staggered */}
                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {services.map((svc, i) => {
                        const pillStart = 45 + i * 10;
                        const pillProgress = spring({ frame: frame - pillStart, fps, config: { damping: 12, stiffness: 120 } });
                        const pillY = interpolate(pillProgress, [0, 1], [25, 0]);
                        const pillOpacity = interpolate(pillProgress, [0, 1], [0, 1]);
                        return (
                            <div
                                key={svc}
                                style={{
                                    opacity: pillOpacity,
                                    transform: `translateY(${pillY}px)`,
                                    background: i === 0 ? CORAL : 'rgba(255,255,255,0.07)',
                                    border: `1.5px solid ${i === 0 ? CORAL : 'rgba(255,255,255,0.15)'}`,
                                    color: i === 0 ? '#fff' : 'rgba(255,255,255,0.8)',
                                    padding: '10px 22px',
                                    borderRadius: '100px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    letterSpacing: '0.3px',
                                    backdropFilter: 'blur(8px)',
                                }}
                            >
                                {svc}
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
