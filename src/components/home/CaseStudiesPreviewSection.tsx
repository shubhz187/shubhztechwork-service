import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/data/case-studies';
import { CaseStudyCard } from '@/components/case-studies/CaseStudyCard';

export const CaseStudiesPreviewSection = () => (
  <section className="py-10 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">
          Our Work
        </p>
        <h2 className="section-title">
          Case Studies
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real projects. Real outcomes. See how we've helped clients build, scale, and secure their technology.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={study.slug} study={study} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 text-center"
      >
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          View All Case Studies <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);
