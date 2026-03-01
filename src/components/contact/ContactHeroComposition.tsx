import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import { HeroRibbonBackground } from '../shared/HeroRibbonBackground';

const CORAL = 'hsl(6, 93%, 64%)';

export const ContactHeroComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();
    const isMobile = width < 768;

    const textFrame = Math.min(frame, 90);

    // Title spring
    const titleProgress = spring({ frame: textFrame, fps, config: { damping: 14, stiffness: 100 } });
    const titleY = interpolate(titleProgress, [0, 1], [50, 0]);
    const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

    // Subtitle
    const subtitleOpacity = interpolate(textFrame - 18, [0, 28], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill
            style={{
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
            }}
        >
            <HeroRibbonBackground idPrefix="contact" />

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
                            opacity: titleOpacity,
                            transform: `translateY(${titleY}px)`,
                            fontSize: isMobile ? '32px' : '66px',
                            fontWeight: 700,
                            color: '#f0f0f0',
                            lineHeight: 1.1,
                            marginBottom: isMobile ? '14px' : '20px',
                            letterSpacing: isMobile ? '-1px' : '-2px',
                        }}
                    >
                        Get In <span style={{ color: CORAL }}>Touch</span>
                    </div>

                    <div
                        style={{
                            opacity: subtitleOpacity,
                            fontSize: isMobile ? '14px' : '20px',
                            color: 'rgba(255, 255, 255, 0.55)',
                            fontFamily: "'Inter', system-ui, sans-serif",
                        }}
                    >
                        Ready to transform your business? Let's build something great together.
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
