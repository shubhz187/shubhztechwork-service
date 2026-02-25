import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
    Sequence,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';
const DARK = '#0a0a0a';
const LIGHT_BG = '#f7f3ee';

const categories = ['Security', 'DevSecOps', 'Privacy'];

export const BlogsHeroComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Title spring
    const titleProgress = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
    const titleY = interpolate(titleProgress, [0, 1], [60, 0]);
    const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

    // Subtitle typewriter
    const fullSubtitle = 'Insights, tutorials and stories from our engineering team.';
    const subtitleStart = 15;
    const subtitleDuration = 45;
    const charsVisible = Math.floor(
        interpolate(frame - subtitleStart, [0, subtitleDuration], [0, fullSubtitle.length], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        })
    );
    const subtitleText = fullSubtitle.slice(0, charsVisible);

    // Accent line
    const lineStart = 30;
    const lineWidth = interpolate(frame - lineStart, [0, 30], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Category pills
    const pillStart = 50;

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
            {/* Background grid */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle, ${CORAL}18 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    opacity: interpolate(frame, [60, 90], [0, 0.6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
            />

            {/* Glow blob */}
            <div
                style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${CORAL}22, transparent 70%)`,
                    opacity: interpolate(frame, [0, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 80px', maxWidth: '900px' }}>
                {/* Title */}
                <div
                    style={{
                        opacity: titleOpacity,
                        transform: `translateY(${titleY}px)`,
                        fontSize: '72px',
                        fontWeight: 700,
                        color: DARK,
                        lineHeight: 1.1,
                        marginBottom: '24px',
                        letterSpacing: '-2px',
                    }}
                >
                    Our{' '}
                    <span style={{ color: CORAL }}>Blog</span>
                </div>

                {/* Accent line */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
                    <div
                        style={{
                            height: '4px',
                            width: `${lineWidth}%`,
                            maxWidth: '120px',
                            background: CORAL,
                            borderRadius: '2px',
                            transition: 'width 0.1s',
                        }}
                    />
                </div>

                {/* Subtitle typewriter */}
                <div
                    style={{
                        fontSize: '22px',
                        color: '#555',
                        fontWeight: 400,
                        minHeight: '32px',
                        marginBottom: '40px',
                        fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                >
                    {subtitleText}
                    {charsVisible < fullSubtitle.length && (
                        <span style={{ opacity: frame % 30 < 15 ? 1 : 0, color: CORAL }}>|</span>
                    )}
                </div>

                {/* Category pills */}
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    {categories.map((cat, i) => {
                        const pillFrame = frame - (pillStart + i * 12);
                        const pillProgress = spring({ frame: pillFrame, fps, config: { damping: 12, stiffness: 120 } });
                        const pillX = interpolate(pillProgress, [0, 1], [-40, 0]);
                        const pillOpacity = interpolate(pillProgress, [0, 1], [0, 1]);
                        return (
                            <div
                                key={cat}
                                style={{
                                    opacity: pillOpacity,
                                    transform: `translateX(${pillX}px)`,
                                    background: i === 0 ? CORAL : 'transparent',
                                    border: `2px solid ${CORAL}`,
                                    color: i === 0 ? '#fff' : CORAL,
                                    padding: '10px 28px',
                                    borderRadius: '100px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    letterSpacing: '0.5px',
                                }}
                            >
                                {cat}
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
