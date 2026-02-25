import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RelatedCaseStudies } from '@/components/case-studies/RelatedCaseStudies';
import { CaseStudyAnimation } from '@/components/case-studies/CaseStudyAnimation';
import { getCaseStudyBySlug, getRelatedCaseStudies } from '@/data/case-studies';

const renderContent = (htmlContent: string) => {
  const parts = htmlContent.split(/%%ANIMATION:(\w+)%%/);
  return parts.map((part, i) => {
    if (i % 2 === 0) {
      return part ? <div key={i} dangerouslySetInnerHTML={{ __html: part }} /> : null;
    }
    return <CaseStudyAnimation key={i} type={part} />;
  });
};

const CaseStudyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudyBySlug(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  const relatedStudies = getRelatedCaseStudies(study.slug);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <article className="container mx-auto px-4 py-12">
          {/* Back navigation */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to case studies
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl mx-auto mb-10"
          >
            {/* Industry + project type */}
            <div className="flex items-center gap-3 mb-6">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border border-primary/20 font-semibold"
              >
                {study.industry}
              </Badge>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-muted-foreground">
                {study.projectType}
              </span>
            </div>

            {/* Client name */}
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              {study.client}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {study.subtitle}
            </p>
          </motion.header>

          {/* Gradient divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className={`h-1 rounded-full bg-gradient-to-r ${study.gradient}`} />
          </motion.div>

          {study.comingSoon ? (
            <>
              {/* Coming Soon treatment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="max-w-3xl mx-auto"
              >
                {/* Coming Soon animation */}
                <CaseStudyAnimation type="comingSoon" />

                {/* Coming Soon banner */}
                <div className="mt-8 p-6 bg-secondary/40 border border-border rounded-xl text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-red-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-4">
                    <Clock className="w-4 h-4" />
                    Coming Soon
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-2">
                    This case study is currently being prepared. Check back soon for the full story.
                  </p>
                </div>

                {/* Highlights bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-secondary/40 rounded-xl mt-8 mb-4">
                  {study.highlights.map((h) => (
                    <div key={h.label} className="text-center">
                      <p className="font-display font-bold text-xl text-foreground">{h.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{h.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Teaser content */}
                <div className="blog-content">
                  {renderContent(study.content)}
                </div>

                {/* CTA back to case studies */}
                <div className="mt-10 text-center">
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Browse All Case Studies
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* Related case studies */}
              <div className="max-w-5xl mx-auto mt-16">
                <Separator className="mb-10" />
                <RelatedCaseStudies studies={relatedStudies} />
              </div>
            </>
          ) : (
            <>
              {/* Highlights bar */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="max-w-3xl mx-auto mb-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-secondary/40 rounded-xl mb-4">
                  {study.highlights.map((h) => (
                    <div key={h.label} className="text-center">
                      <p className="font-display font-bold text-xl text-foreground">{h.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{h.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {study.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Article content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-3xl mx-auto blog-content"
              >
                {renderContent(study.content)}
              </motion.div>

              {/* Related case studies */}
              <div className="max-w-5xl mx-auto mt-16">
                <Separator className="mb-10" />
                <RelatedCaseStudies studies={relatedStudies} />
              </div>
            </>
          )}
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudyDetailPage;
