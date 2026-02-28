import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroPlayer } from './HeroPlayer';

const SERVICE_LINES = [
  { prefix: 'We build your', highlight: 'Cloud Infrastructure' },
  { prefix: 'We secure your', highlight: 'AI Solutions' },
  { prefix: 'We scale your', highlight: 'DevOps Pipelines' },
  { prefix: 'We protect your', highlight: 'Security Systems' },
  { prefix: 'We manage your', highlight: 'IT Operations' },
];

const STATS = [
  { value: '6', label: 'Service Domains' },
  { value: '61+', label: 'Technologies' },
  { value: '5+', label: 'Industries' },
];

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICE_LINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#010108]"
    >
      {/* Remotion animated background */}
      <div className="absolute inset-0 z-0">
        <HeroPlayer />
      </div>

      {/* Bottom fade — blends hero into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[1]"
        style={{ background: 'linear-gradient(to bottom, transparent, #010108)' }}
      />

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        {/* Tagline */}
        <h1 className="font-display font-bold leading-[1.1] mb-6">
          <motion.span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Simplifying Tech,
          </motion.span>
          <motion.span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient-primary"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Amplifying Growth
          </motion.span>
        </h1>

        {/* Rotating service line */}
        <motion.div
          className="h-8 sm:h-10 relative overflow-hidden mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              className="absolute inset-x-0 text-base sm:text-lg md:text-xl text-white/70"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {SERVICE_LINES[activeIndex].prefix}{' '}
              <span className="text-white font-semibold">
                {SERVICE_LINES[activeIndex].highlight}
              </span>
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href="#contact"
            className="bg-gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-full hover:opacity-90 transition-all shadow-glow text-base tracking-wide"
          >
            Start a Project
          </a>
          <Link
            to="/case-studies"
            className="border border-white/20 text-white/90 font-medium px-8 py-3.5 rounded-full hover:bg-white/10 hover:border-white/30 transition-all text-base backdrop-blur-sm tracking-wide"
          >
            View Case Studies
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex items-center justify-center gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white font-display">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/50 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
