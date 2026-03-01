import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label: string;
  children: React.ReactNode;
  subtitle?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  children,
  subtitle,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="text-center mb-8 md:mb-14"
  >
    <p
      className="text-primary font-semibold uppercase mb-2 font-sans"
      style={{ fontSize: 13, letterSpacing: 3 }}
    >
      {label}
    </p>

    <h2
      className="font-display font-bold text-foreground"
      style={{ fontSize: 'clamp(22px, 5vw, 36px)', letterSpacing: -1, lineHeight: 1.2 }}
    >
      {children}
    </h2>

    {subtitle && (
      <motion.p
        className="text-muted-foreground max-w-2xl mx-auto mt-4 text-sm md:text-base"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);
