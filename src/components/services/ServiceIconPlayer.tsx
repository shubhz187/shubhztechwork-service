import { Player } from '@remotion/player';
import { ServiceIconComposition, ServiceIconType } from './ServiceIconComposition';
import { RemotionErrorBoundary } from '@/components/RemotionErrorBoundary';

const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Props {
    iconType: ServiceIconType;
}

export const ServiceIconPlayer: React.FC<Props> = ({ iconType }) => {
    return (
        <RemotionErrorBoundary>
            <Player
                component={ServiceIconComposition}
                inputProps={{ iconType }}
                durationInFrames={120}
                fps={30}
                compositionWidth={80}
                compositionHeight={80}
                style={{ width: '80px', height: '80px', display: 'block' }}
                autoPlay={!prefersReducedMotion}
                loop
                controls={false}
                clickToPlay={false}
            />
        </RemotionErrorBoundary>
    );
};
