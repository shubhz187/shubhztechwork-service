import { useState, useEffect } from 'react';
import { Player } from '@remotion/player';
import { HeroComposition } from './HeroComposition';
import { RemotionErrorBoundary } from '@/components/RemotionErrorBoundary';
import { useInView } from '@/hooks/use-in-view';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const HeroPlayer: React.FC = () => {
  const [compWidth, setCompWidth] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.clientWidth : 1200
  );
  const [compHeight, setCompHeight] = useState(() =>
    typeof window !== 'undefined' ? window.innerHeight : 700
  );
  const { ref: inViewRef, isInView } = useInView({ rootMargin: '0px', once: true });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setCompWidth(document.documentElement.clientWidth);
        setCompHeight(window.innerHeight);
      }, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <RemotionErrorBoundary>
      <div ref={inViewRef} style={{ position: 'absolute', inset: 0 }}>
        {isInView ? (
          <Player
            component={HeroComposition}
            durationInFrames={216000}
            fps={60}
            compositionWidth={compWidth}
            compositionHeight={compHeight}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
            autoPlay={!prefersReducedMotion}
            loop
            controls={false}
            clickToPlay={false}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: '#010108' }} />
        )}
      </div>
    </RemotionErrorBoundary>
  );
};
