import { motion } from 'framer-motion';
import { ServiceIconPlayer } from './services/ServiceIconPlayer';
import { ServiceIconType } from './services/ServiceIconComposition';

interface ServiceCardProps {
  title: string;
  description: string;
  delay?: number;
  iconType?: ServiceIconType;
}

export const ServiceCard = ({ title, description, delay = 0, iconType }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center px-4 py-6 flex flex-col items-center"
    >
      {iconType && (
        <div className="mb-4">
          <ServiceIconPlayer iconType={iconType} />
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-foreground mb-4">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};
