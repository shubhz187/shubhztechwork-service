import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';
const DARK = '#0a0a0a';
const LIGHT_BG = '#f7f3ee';


export const AboutHeroComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();
    const isMobile = width < 768;

    // Company name spring
    const nameProgress = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
    const nameY = interpolate(nameProgress, [0, 1], [70, 0]);
    const nameOpacity = interpolate(nameProgress, [0, 1], [0, 1]);

    // Tagline fade
    const taglineOpacity = interpolate(frame - 15, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Accent line
    const lineWidth = interpolate(frame - 30, [0, 30], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Background grid
    const gridOpacity = interpolate(frame, [60, 100], [0, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
            {/* Animated background grid */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle, ${CORAL}18 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    opacity: gridOpacity,
                }}
            />

            {/* Glow blobs */}
            <div
                style={{
                    position: 'absolute',
                    top: '-15%',
                    right: '-10%',
                    width: '450px',
                    height: '450px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${CORAL}25, transparent 70%)`,
                    opacity: interpolate(frame, [0, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '-15%',
                    left: '-10%',
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${CORAL}15, transparent 70%)`,
                    opacity: interpolate(frame, [30, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: isMobile ? '0 24px' : '0 80px', maxWidth: '900px' }}>
                {/* Company name */}
                <div
                    style={{
                        opacity: nameOpacity,
                        transform: `translateY(${nameY}px)`,
                        fontSize: isMobile ? '28px' : '64px',
                        fontWeight: 700,
                        color: DARK,
                        lineHeight: 1.1,
                        marginBottom: isMobile ? '14px' : '20px',
                        letterSpacing: isMobile ? '-1px' : '-2px',
                    }}
                >
                    About <span style={{ color: CORAL }}>ShubhzTechWork</span>
                </div>

                {/* Accent line */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? '14px' : '24px' }}>
                    <div
                        style={{
                            height: isMobile ? '3px' : '4px',
                            width: `${lineWidth}%`,
                            maxWidth: '140px',
                            background: CORAL,
                            borderRadius: '2px',
                        }}
                    />
                </div>

                {/* Tagline */}
                <div
                    style={{
                        opacity: taglineOpacity,
                        fontSize: isMobile ? '14px' : '22px',
                        color: '#555',
                        fontWeight: 400,
                        fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                >
                    Making cutting-edge technology accessible to businesses of all sizes.
                </div>
            </div>
        </AbsoluteFill>
    );
};
