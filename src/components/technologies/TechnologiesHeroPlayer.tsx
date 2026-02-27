import { Player } from '@remotion/player';
import { TechnologiesHeroComposition } from './TechnologiesHeroComposition';
import { useResponsivePlayer } from '@/hooks/use-responsive-player';

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const TechnologiesHeroPlayer: React.FC = () => {
    const { containerRef, compositionWidth, compositionHeight } = useResponsivePlayer({
        desktopWidth: 1200,
        desktopHeight: 260,
    });

    return (
        <div ref={containerRef} className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
            <Player
                component={TechnologiesHeroComposition}
                durationInFrames={150}
                fps={30}
                compositionWidth={compositionWidth}
                compositionHeight={compositionHeight}
                style={{ width: '100%', display: 'block' }}
                autoPlay={!prefersReducedMotion}
                controls={false}
                clickToPlay={false}
            />
        </div>
    );
};
