import { useEffect, useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/use-page-meta";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RelatedCaseStudies } from "@/components/case-studies/RelatedCaseStudies";
import { getCaseStudyBySlug, getRelatedCaseStudies } from "@/data/case-studies";
import { MaskRevealText } from "@/components/awake/MaskRevealText";
import { SanitizedHtml } from "@/lib/sanitize-html";

const CaseStudyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudyBySlug(slug || "");

  const jsonLd = useMemo(() => {
    if (!study) return undefined;
    return [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: study.client,
        description: study.metaDescription,
        author: { "@type": "Organization", name: "ShubhzTechWork" },
        publisher: {
          "@type": "Organization",
          name: "ShubhzTechWork",
          logo: { "@type": "ImageObject", url: "https://services.shubhztechwork.com/logo.png" },
        },
        url: `https://services.shubhztechwork.com/case-studies/${study.slug}`,
      },
    ];
  }, [study]);

  usePageMeta({
    title: study ? study.metaTitle : "Case Studies | ShubhzTechWork",
    description: study ? study.metaDescription : undefined,
    canonicalPath: study ? `/case-studies/${study.slug}` : "/case-studies",
    ogType: "article",
    jsonLd,
  });

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!study) return <Navigate to="/case-studies" replace />;
  const related = getRelatedCaseStudies(study.slug);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="relative pt-36 pb-12 md:pt-44 md:pb-16">
          <div className="container-md relative z-10">
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> All case studies
            </Link>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
              <span className="pill">{study.industry}</span>
              <span className="text-foreground/40">·</span>
              <span className="text-foreground/60">{study.projectType}</span>
              {study.comingSoon && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background text-xs font-medium px-3 py-1.5">
                  <Clock className="h-3 w-3" /> Coming soon
                </span>
              )}
            </div>
            <h1 className="mt-8 text-display-2 font-display leading-[1.02] max-w-5xl">
              <MaskRevealText immediate stagger={50}>{study.client}</MaskRevealText>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-6 max-w-3xl text-lg text-foreground/70 leading-relaxed"
            >
              {study.subtitle}
            </motion.p>
          </div>
        </section>

        <section className="container-md pb-10">
          <div className="grid gap-4 rounded-[28px] border border-foreground/10 bg-card p-6 md:grid-cols-3 md:gap-0 md:p-0">
            {study.highlights.map((h, i) => (
              <div
                key={h.label}
                className={`flex flex-col items-start md:p-8 ${i > 0 ? "md:border-l md:border-foreground/10" : ""}`}
              >
                <p className="font-display text-3xl md:text-4xl font-semibold text-foreground">{h.value}</p>
                <p className="mt-2 text-sm text-foreground/60">{h.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <span key={tech} className="pill">{tech}</span>
            ))}
          </div>
        </section>

        <motion.article
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="container-sm pb-20 md:pb-28"
        >
          <SanitizedHtml html={study.content} className="prose-awake" />
        </motion.article>

        {related.length > 0 && (
          <section className="border-t border-foreground/10 py-20 md:py-28">
            <div className="container-lg">
              <RelatedCaseStudies studies={related} />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default CaseStudyDetailPage;
