import { ReactNode } from "react";
import { motion } from "framer-motion";
import { MaskRevealText } from "../MaskRevealText";

interface Props {
  eyebrow: string;
  title: string;
  accents?: string[];
  subtitle?: string;
  children?: ReactNode;
}

export const PageHero = ({ eyebrow, title, accents = [], subtitle, children }: Props) => (
  <section className="relative pt-36 pb-20 md:pt-44 md:pb-24">
    <div className="container-lg relative z-10">
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="pill"
      >
        <span className="h-2 w-2 rounded-full bg-violet" />
        {eyebrow}
      </motion.span>
      <h1 className="mt-8 max-w-5xl text-display-1 font-display leading-[0.95]">
        <MaskRevealText immediate delay={150} stagger={55} serifAccents={accents}>
          {title}
        </MaskRevealText>
      </h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-8 max-w-2xl text-lg text-foreground/70 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      {children && <div className="mt-10">{children}</div>}
    </div>
  </section>
);
