import { Player } from '@remotion/player';
import { WhyUsComposition } from './WhyUsComposition';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const WhyUsPlayer: React.FC = () => (
  <div className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
    <Player
      component={WhyUsComposition}
      durationInFrames={180}
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
