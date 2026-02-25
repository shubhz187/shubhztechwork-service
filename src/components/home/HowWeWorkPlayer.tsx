import { Player } from '@remotion/player';
import { HowWeWorkComposition } from './HowWeWorkComposition';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const HowWeWorkPlayer: React.FC = () => (
  <div className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
    <Player
      component={HowWeWorkComposition}
      durationInFrames={210}
      fps={30}
      compositionWidth={1200}
      compositionHeight={480}
      style={{ width: '100%', display: 'block' }}
      autoPlay={!prefersReducedMotion}
      loop
      controls={false}
      clickToPlay={false}
    />
  </div>
);
