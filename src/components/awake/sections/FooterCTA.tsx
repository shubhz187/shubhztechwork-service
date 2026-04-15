import { MaskRevealText } from "../MaskRevealText";
import { AwakeButton } from "../AwakeButton";
import { useContactDialog } from "../ContactDialog";

export const FooterCTA = () => {
  const { open } = useContactDialog();
  return (
  <section className="relative py-24 md:py-32">
    <div className="container-md text-center">
      <h2 className="text-[clamp(36px,5.5vw,80px)] font-display leading-[1.05] tracking-tight max-w-3xl mx-auto">
        <MaskRevealText serifAccents={["craft", "together"]}>
          {"Let's craft something unforgettable, together."}
        </MaskRevealText>
      </h2>

      <p className="mx-auto mt-10 max-w-xl text-foreground/70 leading-relaxed">
        Looking to elevate your platform, product, or stack? Tell us what you're building, we'll
        tell you how we can help, fast.
      </p>

      <div className="mt-12 inline-flex">
        <AwakeButton type="button" onClick={open} variant="primary">
          Let's talk
        </AwakeButton>
      </div>
    </div>
  </section>
  );
};
