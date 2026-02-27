import { motion } from 'framer-motion';
import { WhyUsPlayer } from './WhyUsPlayer';

export const WhyUsSection = () => (
  <section className="py-6 md:py-20 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <WhyUsPlayer />
      </motion.div>
    </div>
  </section>
);
