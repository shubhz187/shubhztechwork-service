import { motion } from 'framer-motion';
import { WhoWeServePlayer } from './WhoWeServePlayer';
import { SectionGlow } from './SectionGlow';

export const WhoWeServeSection = () => (
  <section className="py-12 md:py-20 relative overflow-hidden section-divider-gradient">
    <SectionGlow blobs={[
      { color: '#4488ff', opacity: 0.04, size: '500px', top: '-130px', left: '-100px', delay: '3s' },
    ]} />
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
