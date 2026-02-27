import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ServicePillarsPlayer } from './ServicePillarsPlayer';

export const ServicePillarsSection = () => (
  <section className="py-4 md:py-10 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <ServicePillarsPlayer />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-2 md:mt-4 text-center"
      >
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          Explore All Services <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);
