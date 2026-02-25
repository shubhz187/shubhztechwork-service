import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import type { CaseStudy } from '@/data/case-studies';

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
  >
    <Link to={`/case-studies/${study.slug}`} className="block group">
      <div className="relative bg-card border border-border rounded-xl overflow-hidden card-hover shadow-card">
        <div className={`h-3 bg-gradient-to-r ${study.gradient}`} />

        {/* Coming Soon badge overlay */}
        {study.comingSoon && (
          <div className="absolute top-5 right-4 z-10">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              <Clock className="w-3 h-3" />
              Coming Soon
            </span>
          </div>
        )}

        <div className="p-6">
          {/* Industry + project type */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border border-primary/20 font-semibold whitespace-nowrap shrink-0"
            >
              {study.industry}
            </Badge>
            <span className="text-xs text-muted-foreground text-right mt-0.5">
              {study.projectType}
            </span>
          </div>

          {/* Client name */}
          <h3 className="font-display text-xl font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {study.client}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
            {study.excerpt}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-secondary/40 rounded-xl">
            {study.highlights.map((h) => (
              <div key={h.label} className="text-center">
                <p className="font-display font-bold text-lg text-foreground">{h.value}</p>
                <p className="text-xs text-muted-foreground">{h.label}</p>
              </div>
            ))}
          </div>

          {/* Tech stack + CTA */}
          <div className="flex flex-wrap gap-2 items-center justify-between pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {study.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md font-medium"
                >
                  {tech}
                </span>
              ))}
              {study.stack.length > 4 && (
                <span className="text-xs text-muted-foreground px-1 py-1">
                  +{study.stack.length - 4}
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
              {study.comingSoon ? (
                <>Coming Soon <Clock className="w-4 h-4" /></>
              ) : (
                <>View Details <ArrowRight className="w-4 h-4" /></>
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  </motion.article>
);
