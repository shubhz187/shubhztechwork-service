import { Player } from '@remotion/player';
import { TermsHeroComposition } from './TermsHeroComposition';
import { useResponsivePlayer } from '@/hooks/use-responsive-player';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const TermsHeroPlayer: React.FC = () => {
  const { containerRef, compositionWidth, compositionHeight } = useResponsivePlayer({
    desktopWidth: 1200,
    desktopHeight: 250,
  });

  return (
    <div ref={containerRef} className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
      <Player
        component={TermsHeroComposition}
        durationInFrames={150}
        fps={30}
        compositionWidth={compositionWidth}
        compositionHeight={compositionHeight}
        style={{ width: '100%', display: 'block' }}
        autoPlay={!prefersReducedMotion}
        loop
        controls={false}
        clickToPlay={false}
      />
    </div>
  );
};
