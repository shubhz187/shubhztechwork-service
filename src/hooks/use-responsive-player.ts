import { useRef, useState, useEffect, useCallback } from 'react';

const MOBILE_BREAKPOINT = 768;

interface ResponsivePlayerConfig {
  desktopWidth: number;
  desktopHeight: number;
  /** Height to use on mobile — defaults to desktopHeight */
  mobileHeight?: number;
}

interface ResponsivePlayerResult {
  containerRef: React.RefObject<HTMLDivElement>;
  compositionWidth: number;
  compositionHeight: number;
  isMobile: boolean;
}

export function useResponsivePlayer(config: ResponsivePlayerConfig): ResponsivePlayerResult {
  const { desktopWidth, desktopHeight, mobileHeight } = config;
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial state: avoid flash by using window width if available
  const getInitialWidth = () => {
    if (typeof window === 'undefined') return desktopWidth;
    return Math.min(window.innerWidth, desktopWidth);
  };

  const [containerWidth, setContainerWidth] = useState(getInitialWidth);

  const isMobile = containerWidth < MOBILE_BREAKPOINT;
  const compositionWidth = isMobile ? containerWidth : desktopWidth;
  const compositionHeight = isMobile && mobileHeight ? mobileHeight : desktopHeight;

  // Debounced ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new ResizeObserver((entries) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const entry = entries[0];
        if (entry) {
          const w = Math.round(entry.contentRect.width);
          if (w > 0) setContainerWidth(w);
        }
      }, 150);
    });

    observer.observe(el);

    // Immediate measurement
    const rect = el.getBoundingClientRect();
    if (rect.width > 0) setContainerWidth(Math.round(rect.width));

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return { containerRef, compositionWidth, compositionHeight, isMobile };
}
