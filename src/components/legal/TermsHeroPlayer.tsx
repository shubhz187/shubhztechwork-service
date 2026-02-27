import { Player } from '@remotion/player';
import { TermsHeroComposition } from './TermsHeroComposition';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const TermsHeroPlayer: React.FC = () => (
  <div className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
    <Player
      component={TermsHeroComposition}
      durationInFrames={150}
      fps={30}
      compositionWidth={1200}
      compositionHeight={250}
      style={{ width: '100%', display: 'block' }}
      autoPlay={!prefersReducedMotion}
      loop
      controls={false}
      clickToPlay={false}
    />
  </div>
);
