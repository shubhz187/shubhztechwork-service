import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroPlayer } from './HeroPlayer';

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end justify-center overflow-hidden bg-[#050508]"
    >
      {/* Unified Remotion hero animation (logo + circuit graph + tagline) */}
      <div className="absolute inset-0 z-0">
        <HeroPlayer />
      </div>

      {/* Subtle bottom gradient for CTA readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-[#050508]/70" />

      {/* SEO / accessibility — text is rendered visually inside Remotion */}
      <h1 className="sr-only">
        Simplifying Tech, Amplifying Growth
      </h1>
      <p className="sr-only">
        End-to-end technology solutions — from architecture to production.
        We build, secure, and scale the infrastructure your business runs on.
      </p>

      {/* CTA overlay — positioned at bottom */}
      <div className="relative z-10 container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="bg-gradient-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-all shadow-glow text-lg"
          >
            Start a Project
          </a>
          <Link
            to="/case-studies"
            className="border border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-all text-lg backdrop-blur-sm"
          >
            View Case Studies
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
