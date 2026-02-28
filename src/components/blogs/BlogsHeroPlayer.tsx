import { Player } from '@remotion/player';
import { BlogsHeroComposition } from './BlogsHeroComposition';
import { useResponsivePlayer } from '@/hooks/use-responsive-player';
import { RemotionErrorBoundary } from '@/components/RemotionErrorBoundary';

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const BlogsHeroPlayer: React.FC = () => {
    const { containerRef, compositionWidth, compositionHeight } = useResponsivePlayer({
        desktopWidth: 1200,
        desktopHeight: 250,
    });

    return (
        <RemotionErrorBoundary>
            <div ref={containerRef} className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
                <Player
                    component={BlogsHeroComposition}
                    durationInFrames={200}
                    fps={30}
                    compositionWidth={compositionWidth}
                    compositionHeight={compositionHeight}
                    style={{ width: '100%', display: 'block' }}
                    autoPlay={!prefersReducedMotion}
                    loop
                    controls={false}
                    clickToPlay={false}
                />
            </div>
        </RemotionErrorBoundary>
    );
};
