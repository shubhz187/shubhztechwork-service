import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import { HeroRibbonBackground } from '../shared/HeroRibbonBackground';

const CORAL = 'hsl(6, 93%, 64%)';

export const ServicesHeroComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width } = useVideoConfig();
    const isMobile = width < 768;

    const textFrame = Math.min(frame, 90);

    // Title
    const titleProgress = spring({ frame: textFrame, fps, config: { damping: 14, stiffness: 100 } });
    const titleY = interpolate(titleProgress, [0, 1], [60, 0]);
    const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

    // Subtitle typewriter
    const fullSubtitle = 'Comprehensive technology solutions tailored to drive your business forward.';
    const subtitleStart = 15;
    const subtitleDuration = 55;
    const typeFrame = Math.min(frame, subtitleStart + subtitleDuration + 10);
    const charsVisible = Math.floor(
        interpolate(typeFrame - subtitleStart, [0, subtitleDuration], [0, fullSubtitle.length], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        })
    );
    const subtitleText = fullSubtitle.slice(0, charsVisible);

    return (
        <AbsoluteFill
            style={{
                fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
            }}
        >
            <HeroRibbonBackground idPrefix="svc" />

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
                            marginBottom: isMobile ? '14px' : '20px',
                            letterSpacing: isMobile ? '-1px' : '-2px',
                        }}
                    >
                        Our <span style={{ color: CORAL }}>Services</span>
                    </div>

                    <div
                        style={{
                            fontSize: isMobile ? '14px' : '20px',
                            color: 'rgba(255,255,255,0.6)',
                            fontFamily: "'Inter', system-ui, sans-serif",
                            minHeight: isMobile ? '20px' : '30px',
                        }}
                    >
                        {subtitleText}
                        <span style={{ opacity: frame % 30 < 15 ? 1 : 0, color: CORAL }}>|</span>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
