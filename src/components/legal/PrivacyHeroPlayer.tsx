import { Player } from '@remotion/player';
import { PrivacyHeroComposition } from './PrivacyHeroComposition';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const PrivacyHeroPlayer: React.FC = () => (
  <div className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
    <Player
      component={PrivacyHeroComposition}
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
