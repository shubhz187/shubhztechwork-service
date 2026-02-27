import { Player } from '@remotion/player';
import { HomeServicesComposition } from './HomeServicesComposition';
import { useResponsivePlayer } from '@/hooks/use-responsive-player';

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const HomeServicesPlayer: React.FC = () => {
    const { containerRef, compositionWidth, compositionHeight } = useResponsivePlayer({
        desktopWidth: 1200,
        desktopHeight: 380,
    });

    return (
        <div ref={containerRef} className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
            <Player
                component={HomeServicesComposition}
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
