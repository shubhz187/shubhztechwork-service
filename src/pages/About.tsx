import { useMemo } from 'react';
import { usePageMeta } from '@/hooks/use-page-meta';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AboutSection } from '@/components/AboutSection';

const About = () => {
  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About ShubhzTechWork',
    url: 'https://services.shubhztechwork.com/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'ShubhzTechWork',
      foundingDate: '2024',
      founders: [
        { '@type': 'Person', name: 'Nirmit Dagli', jobTitle: 'Founder & CEO' },
        { '@type': 'Person', name: 'Shubham Kadam', jobTitle: 'Co-Founder & CFO' },
        { '@type': 'Person', name: 'Kunal Shinde', jobTitle: 'Co-Founder & CTO' },
      ],
    },
  }), []);

  usePageMeta({
    title: 'About Us | ShubhzTechWork',
    description: 'Meet the team behind ShubhzTechWork — founded on trust, curiosity, and the belief that great technology starts simple.',
    canonicalPath: '/about',
    jsonLd,
  });
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-20">
        <h1 className="sr-only">About ShubhzTechWork</h1>
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
