import { Player } from '@remotion/player';
import { WhyUsComposition } from './WhyUsComposition';
import { useResponsivePlayer } from '@/hooks/use-responsive-player';
import { RemotionErrorBoundary } from '@/components/RemotionErrorBoundary';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const WhyUsPlayer: React.FC = () => {
  const { containerRef, compositionWidth, compositionHeight } = useResponsivePlayer({
    desktopWidth: 1200,
    desktopHeight: 480,
    mobileHeight: 700,
  });

  return (
    <RemotionErrorBoundary>
      <div ref={containerRef} className="w-full rounded-2xl overflow-hidden shadow-elevated border border-border">
        <Player
          component={WhyUsComposition}
          durationInFrames={600}
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
    </RemotionErrorBoundary>
  );
};
