import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

export const TechnologiesHeroComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();
    const isMobile = width < 768;

    // Title
    const titleProgress = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
    const titleY = interpolate(titleProgress, [0, 1], [60, 0]);
    const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

    // Subtitle
    const subtitleOpacity = interpolate(frame - 18, [0, 28], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Accent line
    const lineWidth = interpolate(frame - 28, [0, 35], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Grid
    const gridOpacity = interpolate(frame, [50, 90], [0, 0.35], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                background: 'linear-gradient(135deg, hsl(0,0%,8%) 0%, hsl(0,0%,12%) 100%)',
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
                    backgroundImage: `radial-gradient(circle, ${CORAL}1a 1px, transparent 1px)`,
                    backgroundSize: '48px 48px',
                    opacity: gridOpacity,
                }}
            />

            {/* Glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '800px',
                    height: '350px',
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse, ${CORAL}20, transparent 70%)`,
                    opacity: interpolate(frame, [0, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: isMobile ? '0 24px' : '0 80px', maxWidth: '1000px' }}>
                {/* Title */}
                <div
                    style={{
                        opacity: titleOpacity,
                        transform: `translateY(${titleY}px)`,
                        fontSize: isMobile ? '30px' : '68px',
                        fontWeight: 700,
                        color: '#fff',
                        lineHeight: 1.1,
                        marginBottom: isMobile ? '14px' : '20px',
                        letterSpacing: isMobile ? '-1px' : '-2px',
                    }}
                >
                    Our <span style={{ color: CORAL }}>Technologies</span>
                </div>

                {/* Accent line */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? '14px' : '22px' }}>
                    <div
                        style={{
                            height: '3px',
                            width: `${lineWidth}%`,
                            maxWidth: '140px',
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
                        color: 'rgba(255,255,255,0.6)',
                        fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                >
                    Cutting-edge technologies across the entire stack for scalable, secure solutions.
                </div>
            </div>
        </AbsoluteFill>
    );
};
