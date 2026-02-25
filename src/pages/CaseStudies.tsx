import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CaseStudiesHeroPlayer } from '@/components/case-studies/CaseStudiesHeroPlayer';
import { CaseStudyCard } from '@/components/case-studies/CaseStudyCard';
import { caseStudies } from '@/data/case-studies';

const CaseStudies = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-20">
                {/* Remotion Hero */}
                <section className="container mx-auto px-4 py-10">
                    <CaseStudiesHeroPlayer />
                </section>

                {/* Case Studies Grid */}
                <section className="container mx-auto px-4 pb-24">
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
            </div>
            <Footer />
        </div>
    );
};

export default CaseStudies;
