import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <h2 className="section-title">{title}</h2>
      <div className="flex items-center justify-center gap-2">
        <div className="w-20 h-1 bg-gradient-primary rounded-full" />
        <div className="w-3 h-3 rounded-full bg-accent" />
        <div className="w-20 h-1 bg-gradient-primary rounded-full" />
      </div>
    </motion.div>
  );
};
