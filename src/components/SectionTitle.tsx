import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
  // Split title to style "Our" differently if present
  const words = title.split(' ');
  const hasOur = words[0]?.toLowerCase() === 'our';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
        {hasOur ? (
          <>
            <span className="text-muted-foreground">{words[0]} </span>
            <span className="text-primary">{words.slice(1).join(' ')}</span>
          </>
        ) : (
          <span className="text-foreground">{title}</span>
        )}
      </h2>
      <div className="flex items-center justify-center gap-2">
        <div className="w-20 h-1 bg-gradient-primary rounded-full" />
        <div className="w-3 h-3 rounded-full bg-primary" />
        <div className="w-20 h-1 bg-gradient-primary rounded-full" />
      </div>
    </motion.div>
  );
};
