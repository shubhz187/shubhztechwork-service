import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion } from 'framer-motion';
import { prepareWithSegments, layoutWithLines, LayoutLine } from '@chenglou/pretext';

interface AnimatedFluidTextProps {
  text: string;
  defaultFont?: string; // Fallback font if computed style fails
  lineHeight?: number; // Optional exact line height (defaults to computed)
  className?: string;
  animationType?: 'fluid' | 'scramble';
  delay?: number;
  align?: 'left' | 'center' | 'right';
}

export const AnimatedFluidText: React.FC<AnimatedFluidTextProps> = ({
  text,
  defaultFont = '16px sans-serif',
  lineHeight = 24,
  className = '',
  animationType = 'scramble',
  delay = 0,
  align = 'left',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LayoutLine[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useLayoutEffect(() => {
    if (!isClient || !containerRef.current) return;

    const measureLayout = () => {
      const el = containerRef.current;
      if (!el) return;

      const computedStyle = window.getComputedStyle(el);
      // Construct font string (e.g. "400 16px Inter")
      const font = computedStyle.font || `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}` || defaultFont;
      
      const parsedLineHeight = parseFloat(computedStyle.lineHeight);
      const activeLineHeight = isNaN(parsedLineHeight) ? lineHeight : parsedLineHeight;

      const maxWidth = el.clientWidth;
      if (maxWidth === 0) return;

      try {
        const prepared = prepareWithSegments(text, font, { whiteSpace: 'normal' } as any);
        const result = layoutWithLines(prepared, maxWidth, activeLineHeight);
        setLines(result.lines);
        setContainerHeight(result.height);
      } catch (err) {
        console.error("Pretext layout failed", err);
      }
    };

    measureLayout();

    const resizeObserver = new ResizeObserver(() => {
      measureLayout();
    });
    
    resizeObserver.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [text, isClient, defaultFont, lineHeight]);

  // Scramble variants
  const scrambleVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)', rotate: Math.random() * 20 - 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      rotate: 0,
      transition: {
        delay: delay + custom * 0.1,
        type: 'spring' as const,
        damping: 12,
        stiffness: 100
      }
    })
  };

  // Fluid variant expects layout animations
  if (animationType === 'fluid') {
    return (
      <div 
        ref={containerRef} 
        className={`relative w-full ${className}`} 
        style={{ height: containerHeight ? `${containerHeight}px` : 'auto' }}
      >
        {lines.length === 0 && <span className="opacity-0">{text}</span>}
        {lines.map((line, i) => {
          const containerWidth = containerRef.current?.clientWidth || parseInt(className.match(/w-\[?(\d+)px\]?/)?.[1] || '0') || 1000;
          let leftPos = 0;
          if (align === 'center') leftPos = (containerWidth - line.width) / 2;
          if (align === 'right') leftPos = containerWidth - line.width;

          return (
          <motion.div
            key={`${line.text}-${i}`}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", bounce: 0, duration: 0.7 }}
            className="absolute whitespace-pre origin-left"
            style={{ top: i * lineHeight, left: leftPos }}
          >
            {line.text}
          </motion.div>
          );
        })}
      </div>
    );
  }

  // Scramble variant
  return (
    <div 
      ref={containerRef} 
      className={`relative w-full ${className}`} 
      style={{ height: containerHeight ? `${containerHeight}px` : 'auto' }}
    >
      {lines.length === 0 && <span className="opacity-0">{text}</span>}
      {lines.map((line, i) => {
        const containerWidth = containerRef.current?.clientWidth || parseInt(className.match(/w-\[?(\d+)px\]?/)?.[1] || '0') || 1000;
        let leftPos = 0;
        if (align === 'center') leftPos = (containerWidth - line.width) / 2;
        if (align === 'right') leftPos = containerWidth - line.width;

        return (
        <motion.div
          key={i}
          custom={i}
          variants={scrambleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="absolute whitespace-pre origin-left"
          style={{ top: i * lineHeight, left: leftPos }}
        >
          {line.text}
        </motion.div>
        );
      })}
    </div>
  );
};
