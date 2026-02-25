import { Player } from '@remotion/player';
import { TechMarqueeComposition } from './TechMarqueeComposition';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const TechMarqueePlayer: React.FC = () => (
  <div className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
    <Player
      component={TechMarqueeComposition}
      durationInFrames={600}
      fps={30}
      compositionWidth={1200}
      compositionHeight={200}
      style={{ width: '100%', display: 'block' }}
      autoPlay={!prefersReducedMotion}
      loop
      controls={false}
      clickToPlay={false}
    />
  </div>
);
