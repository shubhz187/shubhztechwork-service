import { motion } from "framer-motion";
import { MaskRevealText } from "../MaskRevealText";
import { AwakeButton } from "../AwakeButton";
import { useContactDialog } from "../ContactDialog";

export const Hero = () => {
  const { open } = useContactDialog();
  return (
  <section className="relative pt-40 pb-24 md:pt-48 md:pb-32">
    <div className="container-lg relative z-10">
      {/* Eyebrow pill */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-center"
      >
        <span className="pill">
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-green"
          />
          Available for new projects · 2026
        </span>
      </motion.div>

      {/* Headline */}
      <h1 className="mt-10 text-center text-display-1 font-display leading-[1.1] max-w-4xl mx-auto">
        <MaskRevealText
          immediate
          stagger={80}
          delay={250}
          serifAccents={["tackle", "biggest", "Gen"]}
        >
          {"We help teams tackle the biggest technology challenges, from cloud to Gen AI."}
        </MaskRevealText>
      </h1>

      {/* Subhead */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-10 max-w-2xl text-center text-lg text-foreground/70 leading-relaxed"
      >
        At ShubhzTechWork, we guide startups and enterprises from strategy to production,
        shipping secure, scalable infrastructure that actually holds up under pressure.
      </motion.p>

      {/* CTA — social proof (avatars + stars + trust) disabled, will re-enable later */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 flex flex-col items-center gap-10"
      >
        <AwakeButton type="button" onClick={open} variant="primary">
          Get started
        </AwakeButton>
      </motion.div>

    </div>
  </section>
  );
};
