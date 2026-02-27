import { Player } from '@remotion/player';
import { ServicesHeroComposition } from './ServicesHeroComposition';
import { useResponsivePlayer } from '@/hooks/use-responsive-player';

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ServicesHeroPlayer: React.FC = () => {
    const { containerRef, compositionWidth, compositionHeight } = useResponsivePlayer({
        desktopWidth: 1200,
        desktopHeight: 260,
    });

    return (
        <div ref={containerRef} className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
            <Player
                component={ServicesHeroComposition}
                durationInFrames={150}
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
    );
};
