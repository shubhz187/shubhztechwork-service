import { Player } from '@remotion/player';
import { HeroComposition } from './HeroComposition';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const HeroPlayer: React.FC = () => (
  <Player
    component={HeroComposition}
    durationInFrames={210}
    fps={30}
    compositionWidth={1200}
    compositionHeight={700}
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
    autoPlay={!prefersReducedMotion}
    loop
    controls={false}
    clickToPlay={false}
  />
);
