import { useDocumentTitle } from '@/hooks/use-document-title';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicePillarsSection } from '@/components/home/ServicePillarsSection';
import { HowWeWorkSection } from '@/components/home/HowWeWorkSection';
import { CaseStudiesPreviewSection } from '@/components/home/CaseStudiesPreviewSection';
import { TechStackSection } from '@/components/home/TechStackSection';
import { WhoWeServeSection } from '@/components/home/WhoWeServeSection';
import { WhyUsSection } from '@/components/home/WhyUsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  useDocumentTitle('ShubhzTechWork - Simplifying Tech, Amplifying Growth', 'End-to-end technology solutions — from architecture to production. We build, secure, and scale the infrastructure your business runs on.');
  return (
    <div className="min-h-screen bg-background homepage-dark">
      <Navbar />
      <main id="main-content">
      <HeroSection />
      <ServicePillarsSection />
      <HowWeWorkSection />
      <CaseStudiesPreviewSection />
      <TechStackSection />
      <WhoWeServeSection />
      <WhyUsSection />
      <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
