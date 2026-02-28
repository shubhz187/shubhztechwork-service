import { motion } from 'framer-motion';
import { HowWeWorkPlayer } from './HowWeWorkPlayer';
import { SectionGlow } from './SectionGlow';

export const HowWeWorkSection = () => (
  <section className="py-12 md:py-20 relative overflow-hidden section-divider-gradient">
    <SectionGlow blobs={[
      { color: '#4488ff', opacity: 0.04, size: '550px', bottom: '-180px', left: '-120px', delay: '2s' },
    ]} />
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
