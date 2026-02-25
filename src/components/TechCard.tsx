import { motion } from 'framer-motion';
import { TechIconPlayer } from './technologies/TechIconPlayer';
import { TechIconType } from './technologies/TechIconComposition';

interface TechCardProps {
  name: string;
  description: string;
  image?: string;
  iconType?: TechIconType;
  delay?: number;
}

export const TechCard = ({ name, description, image, iconType, delay = 0 }: TechCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className="tech-card animated-border group bg-card border border-border"
    >
      <div className="tech-card-image bg-muted dark:bg-[hsl(0,0%,15%)] flex items-center justify-center">
        {iconType ? (
          <TechIconPlayer iconType={iconType} />
        ) : image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain max-h-40"
          />
        ) : null}
      </div>
      <div className="tech-card-content">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-foreground/80 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
