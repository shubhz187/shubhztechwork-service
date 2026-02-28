import { useDocumentTitle } from '@/hooks/use-document-title';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { TechnologiesHeroPlayer } from '@/components/technologies/TechnologiesHeroPlayer';
import { TechCarousel } from '@/components/technologies/TechCarousel';
import { techCategories } from '@/components/technologies/techData';

const Technologies = () => {
  useDocumentTitle('Technologies | ShubhzTechWork', '61 technologies across cloud, DevOps, monitoring, security, databases, AI, and contact center.');
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">

      {/* Remotion Hero */}
      <section className="pt-28 pb-4 container mx-auto px-4">
        <TechnologiesHeroPlayer />
      </section>

      {/* Quick-nav pills */}
      <nav className="py-4 container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2">
          {techCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleScrollTo(cat.id)}
              className="px-4 py-2 rounded-full text-sm font-semibold border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-card/80 bg-card/50 transition-all hover:scale-105 active:scale-95"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Category Sections */}
      <div className="container mx-auto px-4 space-y-8 pb-16">
        {techCategories.map((cat) => (
          <motion.div
            key={cat.id}
            id={cat.id}
            className="scroll-mt-24 rounded-2xl border border-border bg-card/30 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Section header */}
            <div className="pt-6 pb-2 px-6">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-center">
                {cat.label}
              </h2>
              <p className="text-center text-muted-foreground text-sm mt-1">
                {cat.technologies.length} technologies
              </p>
            </div>

            {/* Carousel inside the box */}
            <TechCarousel technologies={cat.technologies} />
          </motion.div>
        ))}
      </div>
      </main>

      <Footer />
    </div>
  );
};

export default Technologies;
