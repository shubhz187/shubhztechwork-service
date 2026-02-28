import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TechMarqueePlayer } from './TechMarqueePlayer';
import { SectionGlow } from './SectionGlow';

export const TechStackSection = () => (
  <section className="py-12 md:py-20 relative overflow-hidden section-divider-gradient">
    <SectionGlow blobs={[
      { color: '#22ccaa', opacity: 0.04, size: '500px', top: '50%', right: '-150px', delay: '1s' },
    ]} />
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <TechMarqueePlayer />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-2 md:mt-4 text-center"
      >
        <Link
          to="/technologies"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          View All Technologies <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);
