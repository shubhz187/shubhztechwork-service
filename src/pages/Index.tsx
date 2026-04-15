import { usePageMeta } from "@/hooks/use-page-meta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Hero } from "@/components/awake/sections/Hero";
import { ValuesMarquee } from "@/components/awake/sections/ValuesMarquee";
import { StatsRow } from "@/components/awake/sections/StatsRow";
import { Services } from "@/components/awake/sections/Services";
import { PortfolioGrid } from "@/components/awake/sections/PortfolioGrid";
import { CollaborateCTA } from "@/components/awake/sections/CollaborateCTA";
import { Team } from "@/components/awake/sections/Team";
// import { Testimonials } from "@/components/awake/sections/Testimonials";
import { FAQAccordion } from "@/components/awake/sections/FAQAccordion";
import { FooterCTA } from "@/components/awake/sections/FooterCTA";
import { ContactSection } from "@/components/awake/sections/ContactSection";

const Index = () => {
  usePageMeta({
    title: "ShubhzTechWork - Simplifying Tech, Amplifying Growth",
    description:
      "End-to-end technology solutions, from architecture to production. We build, secure, and scale the infrastructure your business runs on.",
    canonicalPath: "/",
  });
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ValuesMarquee />
        <StatsRow />
        <Services />
        <PortfolioGrid />
        <CollaborateCTA />
        <Team />
        {/* <Testimonials /> */}
        <FAQAccordion />
        <ContactSection />
        <FooterCTA />
      </main>
      <Footer />
    </>
  );
};

export default Index;
