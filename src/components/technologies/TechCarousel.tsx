import { useState } from 'react';
import { motion } from 'framer-motion';
import { TechIconPlayer } from './TechIconPlayer';
import { Technology } from './techData';

interface TechCarouselProps {
  technologies: Technology[];
}

export const TechCarousel = ({ technologies }: TechCarouselProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="px-4 sm:px-6 pb-8 pt-2">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {technologies.map((tech, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <motion.div
              key={tech.iconType}
              className="relative"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
                ease: 'easeOut',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                animate={isHovered ? { scale: 1.08, y: -4 } : { scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 w-[105px] sm:w-[140px] rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card transition-colors cursor-default"
              >
                <TechIconPlayer iconType={tech.iconType} />
                <span className="text-xs sm:text-sm font-semibold text-foreground/90 text-center leading-snug max-w-full">
                  {tech.name}
                </span>
              </motion.div>

              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 w-60 p-3.5 rounded-lg bg-popover border border-border shadow-elevated text-sm text-muted-foreground leading-relaxed pointer-events-none"
                >
                  <p className="font-bold text-foreground mb-1">{tech.name}</p>
                  {tech.description}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
