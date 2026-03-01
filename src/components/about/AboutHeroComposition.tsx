import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import { HeroRibbonBackground } from '../shared/HeroRibbonBackground';

const CORAL = 'hsl(6, 93%, 64%)';

export const AboutHeroComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();
    const isMobile = width < 768;

    const textFrame = Math.min(frame, 90);

    // Company name spring
    const nameProgress = spring({ frame: textFrame, fps, config: { damping: 14, stiffness: 100 } });
    const nameY = interpolate(nameProgress, [0, 1], [70, 0]);
    const nameOpacity = interpolate(nameProgress, [0, 1], [0, 1]);

    // Tagline fade
    const taglineOpacity = interpolate(textFrame - 15, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill
            style={{
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
            }}
        >
            <HeroRibbonBackground idPrefix="about" />

            <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
            }}>
                <div style={{ textAlign: 'center', padding: isMobile ? '0 24px' : '0 80px', maxWidth: '900px' }}>
                    <div
                        style={{
                            opacity: nameOpacity,
                            transform: `translateY(${nameY}px)`,
                            fontSize: isMobile ? '28px' : '64px',
                            fontWeight: 700,
                            color: '#fff',
                            lineHeight: 1.1,
                            marginBottom: isMobile ? '14px' : '20px',
                            letterSpacing: isMobile ? '-1px' : '-2px',
                        }}
                    >
                        About <span style={{ color: CORAL }}>ShubhzTechWork</span>
                    </div>

                    <div
                        style={{
                            opacity: taglineOpacity,
                            fontSize: isMobile ? '14px' : '22px',
                            color: 'rgba(255,255,255,0.6)',
                            fontWeight: 400,
                            fontFamily: "'Inter', system-ui, sans-serif",
                        }}
                    >
                        Making cutting-edge technology accessible to businesses of all sizes.
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
