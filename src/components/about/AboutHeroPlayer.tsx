import { Player } from '@remotion/player';
import { AboutHeroComposition } from './AboutHeroComposition';

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const AboutHeroPlayer: React.FC = () => {
    return (
        <div className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
            <Player
                component={AboutHeroComposition}
                durationInFrames={200}
                fps={30}
                compositionWidth={1200}
                compositionHeight={300}
                style={{ width: '100%', display: 'block' }}
                autoPlay={!prefersReducedMotion}
                loop
                controls={false}
                clickToPlay={false}
            />
        </div>
    );
};
