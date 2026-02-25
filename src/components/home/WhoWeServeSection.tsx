import { motion } from 'framer-motion';
import { WhoWeServePlayer } from './WhoWeServePlayer';

export const WhoWeServeSection = () => (
  <section className="py-10 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <WhoWeServePlayer />
      </motion.div>
    </div>
  </section>
);
