import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ShieldCheck, Gem, TrendingUp, type LucideIcon } from 'lucide-react';

/* ── Data ─────────────────────────────────────────────── */

interface Pillar {
  num: string;
  name: string;
  icon: LucideIcon;
  services: string[];
}

const pillars: Pillar[] = [
  {
    num: '01',
    name: 'Punctuality',
    icon: Clock,
    services: ['On-time Delivery', 'Agile Sprints', 'Reliable Support'],
  },
  {
    num: '02',
    name: 'Loyalty',
    icon: ShieldCheck,
    services: ['Long-term Vision', 'Dedicated Teams', 'Client Success'],
  },
  {
    num: '03',
    name: 'Value for Money',
    icon: Gem,
    services: ['Transparent Pricing', 'High ROI', 'Scalable Solutions'],
  },
  {
    num: '04',
    name: 'Growth',
    icon: TrendingUp,
    services: ['Business Scaling', 'Performance', 'Future-proof Tech'],
  },
];

/* ── Animation variants ───────────────────────────────── */

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15 + i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

/* ── Section ──────────────────────────────────────────── */

export const ServicePillarsSection = () => (
  <section className="py-20 md:py-28 relative section-divider-gradient">
    {/* Dot-grid texture */}
    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(249,95,78,0.04)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none" />

    {/* Ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(249,95,78,0.05), transparent 70%)' }}
    />

    <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 md:mb-20"
      >
        <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#f95f4e] uppercase block mb-3 font-sans">
          What We Do
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Four Pillars of{' '}
          <span className="text-[#f95f4e]">Excellence</span>
        </h2>
      </motion.div>

      {/* ── Card grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {pillars.map((pillar, i) => (
          <PillarCard key={pillar.num} pillar={pillar} index={i} />
        ))}
      </div>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 md:mt-16 text-center"
      >
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-[#f95f4e] font-semibold hover:gap-3 transition-all text-sm md:text-base"
        >
          Explore All Services <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);

/* ── Pillar Card ──────────────────────────────────────── */

function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const Icon = pillar.icon;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="group relative"
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-[#f95f4e]/25 transition-all duration-500 group-hover:bg-[#f95f4e]/70 group-hover:shadow-[0_0_10px_rgba(249,95,78,0.25)]" />

      <div className="relative overflow-hidden rounded-xl ml-3 border border-white/[0.06] bg-white/[0.02] p-7 md:p-8 transition-all duration-500 hover:border-white/[0.12] hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">

        {/* Scanning-line hover effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(249,95,78,0.03) 0%, transparent 40%)',
          }}
        />

        {/* Top row: icon + ordinal */}
        <div className="flex items-start justify-between mb-6 relative z-10">
          <div className="w-11 h-11 rounded-lg bg-[#f95f4e]/[0.07] border border-[#f95f4e]/[0.12] flex items-center justify-center transition-all duration-500 group-hover:bg-[#f95f4e]/[0.12] group-hover:border-[#f95f4e]/[0.25] group-hover:shadow-[0_0_24px_rgba(249,95,78,0.1)]">
            <Icon className="w-5 h-5 text-[#f95f4e]" strokeWidth={1.5} />
          </div>
          <span className="text-[32px] font-mono font-bold leading-none text-white/[0.04] select-none transition-colors duration-500 group-hover:text-[#f95f4e]/[0.08]">
            {pillar.num}
          </span>
        </div>

        {/* Pillar name */}
        <h3 className="relative z-10 text-lg md:text-xl font-display font-bold text-white mb-1.5 tracking-tight">
          {pillar.name}
        </h3>

        {/* Expanding separator */}
        <div className="relative z-10 w-8 h-px bg-[#f95f4e]/30 mb-5 transition-all duration-500 group-hover:w-12 group-hover:bg-[#f95f4e]/50" />

        {/* Service items */}
        <ul className="relative z-10 space-y-2.5">
          {pillar.services.map((svc) => (
            <li
              key={svc}
              className="flex items-center gap-2.5 text-[13px] text-white/40 tracking-wide transition-colors duration-300 group-hover:text-white/60"
            >
              <span className="w-1 h-1 rounded-full bg-[#f95f4e]/40 shrink-0" />
              {svc}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
