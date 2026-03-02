import { Player } from '@remotion/player';
import { AboutHeroComposition } from './AboutHeroComposition';
import { useResponsivePlayer } from '@/hooks/use-responsive-player';
import { RemotionErrorBoundary } from '@/components/RemotionErrorBoundary';
import { useInView } from '@/hooks/use-in-view';

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const AboutHeroPlayer: React.FC = () => {
    const { containerRef, compositionWidth, compositionHeight } = useResponsivePlayer({
        desktopWidth: 1200,
        desktopHeight: 300,
    });
    const { ref: inViewRef, isInView } = useInView({ rootMargin: '200px' });

    return (
        <RemotionErrorBoundary>
            <div ref={(el) => { (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el; (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }} className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
                {isInView ? (
                    <Player
                        component={AboutHeroComposition}
                        durationInFrames={600}
                        fps={60}
                        compositionWidth={compositionWidth}
                        compositionHeight={compositionHeight}
                        style={{ width: '100%', display: 'block' }}
                        autoPlay={!prefersReducedMotion}
                        loop={false}
                        muted
                        controls={false}
                        clickToPlay={false}
                    />
                ) : (
                    <div style={{ width: '100%', aspectRatio: `${compositionWidth}/${compositionHeight}`, background: '#0a0a0a' }} />
                )}
            </div>
        </RemotionErrorBoundary>
    );
};

