import { useMemo } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/awake/sections/PageHero";
import { CollaborateCTA } from "@/components/awake/sections/CollaborateCTA";
import { ContactSection } from "@/components/awake/sections/ContactSection";
import { CaseStudyCard } from "@/components/case-studies/CaseStudyCard";
import { caseStudies } from "@/data/case-studies";

const CaseStudies = () => {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "ShubhzTechWork Case Studies",
      description: "Real projects, real outcomes.",
      url: "https://services.shubhztechwork.com/case-studies",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: caseStudies.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://services.shubhztechwork.com/case-studies/${s.slug}`,
          name: s.client,
        })),
      },
    }),
    [],
  );

  usePageMeta({
    title: "Case Studies | ShubhzTechWork",
    description: "Real projects, real outcomes. See how we help clients build, scale, and secure their technology.",
    canonicalPath: "/case-studies",
    jsonLd,
  });

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Selected work"
          title="A few builds we're genuinely proud of."
          accents={["proud", "genuinely"]}
          subtitle="Case studies across EdTech, FinTech, HealthTech, and developer tooling, architecture, trade-offs, and measured outcomes."
        />

        <section className="py-16 md:py-24">
          <div className="container-lg">
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {caseStudies.map((study, i) => (
                <CaseStudyCard key={study.slug} study={study} index={i} />
              ))}
            </div>
          </div>
        </section>

        <CollaborateCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default CaseStudies;
