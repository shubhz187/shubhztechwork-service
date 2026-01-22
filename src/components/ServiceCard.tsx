import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  delay?: number;
}

export const ServiceCard = ({ title, description, delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center px-4 py-6"
    >
      <h3 className="font-display text-xl font-semibold text-foreground mb-4">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};
