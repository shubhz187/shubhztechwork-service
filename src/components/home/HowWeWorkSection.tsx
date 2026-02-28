import { motion } from 'framer-motion';
import { HowWeWorkPlayer } from './HowWeWorkPlayer';

export const HowWeWorkSection = () => (
  <section className="py-12 md:py-20 relative overflow-hidden section-divider-gradient">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <HowWeWorkPlayer />
      </motion.div>
    </div>
  </section>
);
