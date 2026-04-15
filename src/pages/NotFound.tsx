import { usePageMeta } from "@/hooks/use-page-meta";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MaskRevealText } from "@/components/awake/MaskRevealText";
import { AwakeButton } from "@/components/awake/AwakeButton";

const NotFound = () => {
  usePageMeta({
    title: "Page Not Found | ShubhzTechWork",
    description: "The page you are looking for does not exist.",
    robots: "noindex, nofollow",
  });

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-6"
        >
          <p className="font-serif text-[clamp(140px,25vw,320px)] italic leading-none text-violet/40">404</p>
          <h1 className="mt-4 text-display-3 font-display">
            <MaskRevealText immediate serifAccents={["lost"]}>
              {"This page seems to be lost."}
            </MaskRevealText>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-foreground/60 leading-relaxed">
            The page you're looking for doesn't exist or has moved. Let's get you back on track.
          </p>
          <div className="mt-10 inline-flex">
            <AwakeButton to="/" variant="primary">
              Back home
            </AwakeButton>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
