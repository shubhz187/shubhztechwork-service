import { Player } from '@remotion/player';
import { CaseStudiesHeroComposition } from './CaseStudiesHeroComposition';

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const CaseStudiesHeroPlayer: React.FC = () => {
    return (
        <div className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
            <Player
                component={CaseStudiesHeroComposition}
                durationInFrames={300}
                fps={30}
                compositionWidth={1200}
                compositionHeight={360}
                style={{ width: '100%', display: 'block' }}
                autoPlay={!prefersReducedMotion}
                loop
                controls={false}
                clickToPlay={false}
            />
        </div>
    );
};
