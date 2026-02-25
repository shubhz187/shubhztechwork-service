import { Player } from '@remotion/player';
import { HomeServicesComposition } from './HomeServicesComposition';

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const HomeServicesPlayer: React.FC = () => {
    return (
        <div className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
            <Player
                component={HomeServicesComposition}
                durationInFrames={150}
                fps={30}
                compositionWidth={1200}
                compositionHeight={380}
                style={{ width: '100%', display: 'block' }}
                autoPlay={!prefersReducedMotion}
                loop
                controls={false}
                clickToPlay={false}
            />
        </div>
    );
};
