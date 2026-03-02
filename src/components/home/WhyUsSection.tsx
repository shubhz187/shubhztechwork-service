import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Layers, Target, type LucideIcon } from 'lucide-react';

/* ── Data ─────────────────────────────────────────────── */

interface Differentiator {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

const differentiators: Differentiator[] = [
  {
    num: '01',
    title: 'End-to-End Delivery',
    desc: 'From architecture to production — we own it.',
    icon: Rocket,
  },
  {
    num: '02',
    title: 'Security-First',
    desc: 'Built-in compliance, not bolted on.',
    icon: ShieldCheck,
  },
  {
    num: '03',
    title: 'Modern Stack',
    desc: 'Cloud-native, AI-ready, performance-tuned.',
    icon: Layers,
  },
  {
    num: '04',
    title: 'Outcome-Driven',
    desc: 'We measure success by your growth metrics.',
    icon: Target,
  },
];

/* ── Section ──────────────────────────────────────────── */

export const WhyUsSection = () => (
  <section className="py-20 md:py-28 relative section-divider-gradient">
    {/* Background: vertical scan-line texture */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(249,95,78,0.015) 0px, rgba(249,95,78,0.015) 1px, transparent 1px, transparent 100px)',
      }}
    />

    {/* Asymmetric ambient glow */}
    <div
      className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(249,95,78,0.04), transparent 70%)' }}
    />

    <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 md:mb-20"
      >
        <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-[#f95f4e] uppercase block mb-3 font-sans">
          Why Us
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
          Why <span className="text-[#f95f4e]">ShubhzTechWork</span>
        </h2>
      </motion.div>

      {/* Differentiator strips */}
      <div>
        {differentiators.map((item, i) => (
          <DifferentiatorStrip
            key={item.num}
            item={item}
            index={i}
            isLast={i === differentiators.length - 1}
          />
        ))}
      </div>
    </div>
  </section>
);

/* ── Differentiator Strip ─────────────────────────────── */

function DifferentiatorStrip({
  item,
  index,
  isLast,
}: {
  item: Differentiator;
  index: number;
  isLast: boolean;
}) {
  const Icon = item.icon;
  const delay = 0.12 + index * 0.13;

  return (
    <div className="group relative">
      {/* Animated top rule — draws in from left */}
      <motion.div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, rgba(249,95,78,0.18), rgba(255,255,255,0.06) 50%, transparent)',
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: delay - 0.05, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Hover glow wash */}
      <div
        className="absolute inset-x-0 top-px bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, rgba(249,95,78,0.025), transparent 50%)' }}
      />

      {/* Content grid
          Mobile:  [num+icon] [title]  /  [________] [desc]
          Desktop: [num+icon] [title+line] [desc right-aligned]  */}
      <div className="grid grid-cols-[auto_1fr] md:grid-cols-[72px_1fr_1.2fr] gap-x-4 md:gap-x-10 gap-y-2 py-8 md:py-10 items-start md:items-center">
        {/* Number + Icon */}
        <motion.div
          className="flex items-center gap-3 md:flex-col md:items-center md:gap-1.5"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay }}
        >
          <span className="text-2xl md:text-3xl font-mono font-bold text-[#f95f4e]/20 group-hover:text-[#f95f4e]/45 transition-colors duration-500 select-none leading-none">
            {item.num}
          </span>
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-[#f95f4e]/20 group-hover:bg-[#f95f4e]/[0.04] transition-all duration-500">
            <Icon
              className="w-4 h-4 text-[#f95f4e]/50 group-hover:text-[#f95f4e]/80 transition-colors duration-500"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>

        {/* Title + expanding accent rule */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.08 }}
        >
          <h3 className="text-lg md:text-[22px] font-display font-bold text-white tracking-tight leading-tight">
            {item.title}
          </h3>
          <div className="w-8 h-[2px] bg-[#f95f4e]/25 mt-3 rounded-full group-hover:w-14 group-hover:bg-[#f95f4e]/50 transition-all duration-500" />
        </motion.div>

        {/* Description — aligns under title on mobile, right-aligned on desktop */}
        <motion.p
          className="col-start-2 md:col-start-auto text-[13px] md:text-[15px] text-white/35 group-hover:text-white/55 transition-colors duration-500 font-sans leading-relaxed md:text-right"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.15 }}
        >
          {item.desc}
        </motion.p>
      </div>

      {/* Bottom rule for last item */}
      {isLast && (
        <motion.div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, rgba(249,95,78,0.18), rgba(255,255,255,0.06) 50%, transparent)',
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </div>
  );
}
