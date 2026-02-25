import { Player } from '@remotion/player';
import { ServicePillarsComposition } from './ServicePillarsComposition';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ServicePillarsPlayer: React.FC = () => (
  <div className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
    <Player
      component={ServicePillarsComposition}
      durationInFrames={300}
      fps={30}
      compositionWidth={1200}
      compositionHeight={500}
      style={{ width: '100%', display: 'block' }}
      autoPlay={!prefersReducedMotion}
      controls={false}
      clickToPlay={false}
    />
  </div>
);
