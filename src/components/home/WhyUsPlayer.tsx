import { Player } from '@remotion/player';
import { WhyUsComposition } from './WhyUsComposition';
import { useResponsivePlayer } from '@/hooks/use-responsive-player';
import { RemotionErrorBoundary } from '@/components/RemotionErrorBoundary';
import { useInView } from '@/hooks/use-in-view';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const WhyUsPlayer: React.FC = () => {
  const { containerRef, compositionWidth, compositionHeight } = useResponsivePlayer({
    desktopWidth: 1200,
    desktopHeight: 480,
    mobileHeight: 700,
  });
  const { ref: inViewRef, isInView } = useInView({ rootMargin: '200px', once: true });

  return (
    <RemotionErrorBoundary>
      <div ref={(el) => { (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el; (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }} className="w-full overflow-hidden">
        {isInView ? (
          <Player
            component={WhyUsComposition}
            durationInFrames={9000}
            fps={60}
            compositionWidth={compositionWidth}
            compositionHeight={compositionHeight}
            style={{ width: '100%', display: 'block' }}
            autoPlay={!prefersReducedMotion}
            loop={false}
                        muted
            controls={false}
            clickToPlay={false}
          />
        ) : (
          <div style={{ width: '100%', aspectRatio: `${compositionWidth}/${compositionHeight}`, background: '#010108' }} />
        )}
      </div>
    </RemotionErrorBoundary>
  );
};
