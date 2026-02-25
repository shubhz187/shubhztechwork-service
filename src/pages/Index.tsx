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
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicePillarsSection />
      <HowWeWorkSection />
      <CaseStudiesPreviewSection />
      <TechStackSection />
      <WhoWeServeSection />
      <WhyUsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
