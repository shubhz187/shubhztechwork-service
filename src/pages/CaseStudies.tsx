import { useMemo } from 'react';
import { usePageMeta } from '@/hooks/use-page-meta';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CaseStudiesHeroPlayer } from '@/components/case-studies/CaseStudiesHeroPlayer';
import { CaseStudyCard } from '@/components/case-studies/CaseStudyCard';
import { caseStudies } from '@/data/case-studies';

const CaseStudies = () => {
    const jsonLd = useMemo(() => ({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'ShubhzTechWork Case Studies',
      description: 'Real projects, real outcomes. See how we help clients build, scale, and secure their technology.',
      url: 'https://services.shubhztechwork.com/case-studies',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: caseStudies.map((study, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://services.shubhztechwork.com/case-studies/${study.slug}`,
          name: study.client,
        })),
      },
    }), []);

    usePageMeta({
      title: 'Case Studies | ShubhzTechWork',
      description: 'Real projects, real outcomes. See how we help clients build, scale, and secure their technology.',
      canonicalPath: '/case-studies',
      jsonLd,
    });
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main id="main-content" className="pt-20">
                {/* Remotion Hero */}
                <section className="container mx-auto px-4 py-10">
                    <CaseStudiesHeroPlayer />
                </section>

                {/* Case Studies Grid */}
                <section className="container mx-auto px-4 pb-12 md:pb-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {caseStudies.map((study, i) => (
                            <CaseStudyCard key={study.slug} study={study} index={i} />
                        ))}
                    </motion.div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CaseStudies;
