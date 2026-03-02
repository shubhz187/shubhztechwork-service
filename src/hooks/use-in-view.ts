import { useRef, useState, useEffect, startTransition } from 'react';

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  // Default to once: false so players unmount when off-screen to save memory
  // Default to a large rootMargin (800px) so the mount stutter happens far before the element is visible
  const { rootMargin = '800px', threshold = 0, once = false } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Use startTransition so the heavy Remotion React tree mount doesn't block the scroll event
        startTransition(() => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setIsInView(false);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, isInView };
}
