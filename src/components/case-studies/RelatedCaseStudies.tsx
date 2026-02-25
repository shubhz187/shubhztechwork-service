import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import type { CaseStudy } from '@/data/case-studies';

interface RelatedCaseStudiesProps {
  studies: CaseStudy[];
}

export const RelatedCaseStudies = ({ studies }: RelatedCaseStudiesProps) => (
  <div>
    <h2 className="font-display text-2xl font-semibold text-foreground mb-8">
      More Case Studies
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {studies.map((study, i) => (
        <motion.div
          key={study.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.08 }}
        >
          <Link to={`/case-studies/${study.slug}`} className="block group">
            <div className="bg-card border border-border rounded-xl overflow-hidden card-hover shadow-card">
              <div className={`h-2 bg-gradient-to-r ${study.gradient}`} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold"
                  >
                    {study.industry}
                  </Badge>
                  <span className="flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {study.client}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{study.excerpt}</p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);
