import { motion } from "framer-motion";
import { MaskRevealText } from "../MaskRevealText";
import { AwakeButton } from "../AwakeButton";
import { useContactDialog } from "../ContactDialog";

export const CollaborateCTA = () => {
  const { open } = useContactDialog();
  return (
  <section className="relative py-24 md:py-32 bg-foreground text-background">
    <div className="container-md text-center">
      {/* Small eyebrow tagline, exactly like Awake's "See Our Work in Action." */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-[clamp(18px,2vw,24px)] font-display text-background/80"
      >
        See our work in action.
      </motion.p>

      {/* Larger headline (Awake: 48px) */}
      <h2 className="mt-4 text-[clamp(32px,4.5vw,56px)] font-display leading-[1.1] max-w-2xl mx-auto">
        <MaskRevealText serifAccents={["journey"]}>
          {"Start your journey with us."}
        </MaskRevealText>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <AwakeButton type="button" onClick={open} variant="on-dark">
          Let's collaborate
        </AwakeButton>
        <AwakeButton to="/case-studies" variant="outline" className="text-background border-background/25 hover:border-background hover:bg-background hover:text-foreground">
          View portfolio
        </AwakeButton>
      </motion.div>
    </div>
  </section>
  );
};
