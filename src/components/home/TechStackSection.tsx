import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TechStackRedesign } from './TechStackRedesign';

export const TechStackSection = () => (
  <section className="relative overflow-hidden w-full">
    <TechStackRedesign />

    <div className="bg-[#010108] w-full pb-20 pt-10 flex justify-center relative z-10 text-center">
      <Link
        to="/technologies"
        className="inline-flex items-center gap-2 text-[#22c55e] font-semibold hover:gap-3 transition-all"
      >
        View All Technologies <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </section>
);
