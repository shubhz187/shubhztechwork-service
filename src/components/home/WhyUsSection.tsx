import { motion } from 'framer-motion';
import { WhyUsPlayer } from './WhyUsPlayer';
import { SectionGlow } from './SectionGlow';

export const WhyUsSection = () => (
  <section className="py-12 md:py-20 relative overflow-hidden section-divider-gradient">
    <SectionGlow blobs={[
      { color: '#ff6644', opacity: 0.04, size: '500px', bottom: '-150px', right: '-100px', delay: '5s' },
    ]} />
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
