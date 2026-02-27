import { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { HeroComposition } from './HeroComposition';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const MOBILE_BREAKPOINT = 768;

export const HeroPlayer: React.FC = () => {
  // HeroPlayer uses absolute positioning (inset: 0), so use window.innerWidth
  const [compWidth, setCompWidth] = useState(() =>
    typeof window !== 'undefined' ? Math.min(window.innerWidth, 1200) : 1200
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setCompWidth(Math.min(window.innerWidth, 1200));
      }, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Player
      component={HeroComposition}
      durationInFrames={210}
      fps={30}
      compositionWidth={compWidth}
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
};
