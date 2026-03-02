import { Player } from '@remotion/player';
import { ServicePillarsComposition } from './ServicePillarsComposition';
import { useResponsivePlayer } from '@/hooks/use-responsive-player';
import { RemotionErrorBoundary } from '@/components/RemotionErrorBoundary';
import { useInView } from '@/hooks/use-in-view';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ServicePillarsPlayer: React.FC = () => {
  const { containerRef, compositionWidth, compositionHeight } = useResponsivePlayer({
    desktopWidth: 1200,
    desktopHeight: 500,
    mobileHeight: 700,
  });
  const { ref: inViewRef, isInView } = useInView({ rootMargin: '0px' });

  return (
    <RemotionErrorBoundary>
      <div
        ref={(el) => {
          if (containerRef) (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          if (inViewRef) (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        className="w-full overflow-hidden"
      >
        {isInView ? (
          <Player
            component={ServicePillarsComposition}
            durationInFrames={450}
            fps={60}
            compositionWidth={compositionWidth}
            compositionHeight={compositionHeight}
            style={{ width: '100%', display: 'block' }}
            autoPlay={!prefersReducedMotion}
            loop={false}
            controls={false}
            clickToPlay={false}
          />
        ) : (
          <div style={{ width: '100%', height: compositionHeight, background: '#010108' }} />
        )}
      </div>
    </RemotionErrorBoundary>
  );
};
