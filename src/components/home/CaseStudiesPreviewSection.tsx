import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { caseStudies } from '@/data/case-studies';
import { SectionGlow } from './SectionGlow';

export const CaseStudiesPreviewSection = () => (
  <section className="py-12 md:py-24 relative overflow-hidden section-divider-gradient">
    <SectionGlow blobs={[
      { color: '#ff6644', opacity: 0.05, size: '500px', top: '-120px', left: '-100px' },
      { color: '#4488ff', opacity: 0.04, size: '450px', bottom: '-140px', right: '-80px', delay: '4s' },
    ]} />
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-14"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study, index) => (
          <motion.article
            key={study.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Link to={`/case-studies/${study.slug}`} className="block group">
              <div className="relative glass-card rounded-xl overflow-hidden card-hover h-full">
                <div className={`h-2 bg-gradient-to-r ${study.gradient}`} />

                {study.comingSoon && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      <Clock className="w-2.5 h-2.5" />
                      Coming Soon
                    </span>
                  </div>
                )}

                <div className="p-5">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border border-primary/20 font-semibold text-[11px] mb-3"
                  >
                    {study.industry}
                  </Badge>

                  <h3 className="font-display text-lg font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {study.client}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {study.subtitle}
                  </p>

                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 md:mt-8 text-center"
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
