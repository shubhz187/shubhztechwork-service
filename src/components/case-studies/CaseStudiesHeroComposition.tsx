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

const metrics = [
    { value: 5, suffix: '', label: 'Industries' },
    { value: 5, suffix: '', label: 'Case Studies' },
    { value: 100, suffix: '%', label: 'End-to-End' },
];

function AnimatedCounter({ target, suffix, frame, startFrame, fps }: {
    target: number; suffix: string; frame: number; startFrame: number; fps: number;
}) {
    const elapsed = Math.max(0, frame - startFrame);
    const progress = interpolate(elapsed, [0, 60], [0, 1], { extrapolateRight: 'clamp' });
    const current = Math.floor(progress * target);
    return <>{current}{suffix}</>;
}

export const CaseStudiesHeroComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();
    const isMobile = width < 768;

    // Title
    const titleProgress = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
    const titleY = interpolate(titleProgress, [0, 1], [60, 0]);
    const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

    // Subtitle
    const subtitleOpacity = interpolate(frame - 20, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Divider
    const dividerWidth = interpolate(frame - 70, [0, 40], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
                    opacity: interpolate(frame, [60, 90], [0, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
            />

            {/* Glow blob */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${CORAL}22, transparent 70%)`,
                    opacity: interpolate(frame, [0, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: isMobile ? '0 24px' : '0 80px', maxWidth: '1000px' }}>
                {/* Title */}
                <div
                    style={{
                        opacity: titleOpacity,
                        transform: `translateY(${titleY}px)`,
                        fontSize: isMobile ? '32px' : '68px',
                        fontWeight: 700,
                        color: DARK,
                        lineHeight: 1.1,
                        marginBottom: isMobile ? '10px' : '16px',
                        letterSpacing: isMobile ? '-1px' : '-2px',
                    }}
                >
                    Case <span style={{ color: CORAL }}>Studies</span>
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        opacity: subtitleOpacity,
                        fontSize: isMobile ? '14px' : '20px',
                        color: '#666',
                        marginBottom: isMobile ? '24px' : '48px',
                        fontFamily: "'Inter', system-ui, sans-serif",
                    }}
                >
                    Real problems. Real solutions. Measurable impact.
                </div>

                {/* Metrics */}
                <div style={{ display: 'flex', gap: isMobile ? '24px' : '48px', justifyContent: 'center', marginBottom: isMobile ? '24px' : '48px' }}>
                    {metrics.map((m, i) => {
                        const metricStart = 40 + i * 10;
                        const metricProgress = spring({ frame: frame - metricStart, fps, config: { damping: 12, stiffness: 80 } });
                        const metricOpacity = interpolate(metricProgress, [0, 1], [0, 1]);
                        const metricY = interpolate(metricProgress, [0, 1], [30, 0]);
                        return (
                            <div
                                key={m.label}
                                style={{
                                    opacity: metricOpacity,
                                    transform: `translateY(${metricY}px)`,
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{ fontSize: isMobile ? '28px' : '52px', fontWeight: 700, color: CORAL, lineHeight: 1 }}>
                                    <AnimatedCounter target={m.value} suffix={m.suffix} frame={frame} startFrame={metricStart} fps={fps} />
                                </div>
                                <div style={{ fontSize: isMobile ? '12px' : '16px', color: '#888', marginTop: '8px', fontWeight: 500 }}>{m.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Divider */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                        style={{
                            height: '3px',
                            width: `${dividerWidth}%`,
                            maxWidth: '300px',
                            background: `linear-gradient(90deg, ${CORAL}, transparent)`,
                            borderRadius: '2px',
                        }}
                    />
                </div>
            </div>
        </AbsoluteFill>
    );
};
