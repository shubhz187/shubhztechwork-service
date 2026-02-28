import { useDocumentTitle } from '@/hooks/use-document-title';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AboutSection } from '@/components/AboutSection';

const About = () => {
  useDocumentTitle('About Us | ShubhzTechWork');
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-20">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
