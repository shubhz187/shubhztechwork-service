import { Player } from '@remotion/player';
import { TechIconComposition, TechIconType } from './TechIconComposition';
import { RemotionErrorBoundary } from '@/components/RemotionErrorBoundary';

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Props {
    iconType: TechIconType;
}

export const TechIconPlayer: React.FC<Props> = ({ iconType }) => {
    return (
        <RemotionErrorBoundary>
            <Player
                component={TechIconComposition}
                inputProps={{ iconType }}
                durationInFrames={120}
                fps={30}
                compositionWidth={100}
                compositionHeight={100}
                style={{ width: '100px', height: '100px', display: 'block' }}
                autoPlay={!prefersReducedMotion}
                loop
                controls={false}
                clickToPlay={false}
            />
        </RemotionErrorBoundary>
    );
};
