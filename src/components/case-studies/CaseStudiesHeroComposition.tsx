import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import { HeroRibbonBackground } from '../shared/HeroRibbonBackground';

const CORAL = 'hsl(6, 93%, 64%)';

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

    const textFrame = Math.min(frame, 90);

    // Title
    const titleProgress = spring({ frame: textFrame, fps, config: { damping: 14, stiffness: 100 } });
    const titleY = interpolate(titleProgress, [0, 1], [60, 0]);
    const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

    // Subtitle
    const subtitleOpacity = interpolate(textFrame - 20, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    // Metrics use textFrame for settle
    const metricFrame = Math.min(frame, 120);

    return (
        <AbsoluteFill
            style={{
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
            }}
        >
            <HeroRibbonBackground idPrefix="cases" />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
            }}>
                <div style={{ textAlign: 'center', padding: isMobile ? '0 24px' : '0 80px', maxWidth: '1000px' }}>
                    <div
                        style={{
                            opacity: titleOpacity,
                            transform: `translateY(${titleY}px)`,
                            fontSize: isMobile ? '32px' : '68px',
                            fontWeight: 700,
                            color: '#fff',
                            lineHeight: 1.1,
                            marginBottom: isMobile ? '10px' : '16px',
                            letterSpacing: isMobile ? '-1px' : '-2px',
                        }}
                    >
                        Case <span style={{ color: CORAL }}>Studies</span>
                    </div>

                    <div
                        style={{
                            opacity: subtitleOpacity,
                            fontSize: isMobile ? '14px' : '20px',
                            color: 'rgba(255,255,255,0.6)',
                            marginBottom: isMobile ? '24px' : '48px',
                            fontFamily: "'Inter', system-ui, sans-serif",
                        }}
                    >
                        Real problems. Real solutions. Measurable impact.
                    </div>

                    {/* Metrics */}
                    <div style={{ display: 'flex', gap: isMobile ? '24px' : '48px', justifyContent: 'center' }}>
                        {metrics.map((m, i) => {
                            const metricStart = 40 + i * 10;
                            const metricProgress = spring({ frame: metricFrame - metricStart, fps, config: { damping: 12, stiffness: 80 } });
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
                                        <AnimatedCounter target={m.value} suffix={m.suffix} frame={metricFrame} startFrame={metricStart} fps={fps} />
                                    </div>
                                    <div style={{ fontSize: isMobile ? '12px' : '16px', color: 'rgba(255,255,255,0.5)', marginTop: '8px', fontWeight: 500 }}>{m.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
