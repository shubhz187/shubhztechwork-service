import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MaskRevealText } from "../MaskRevealText";
import { RoundArrow } from "../decorative/OrbitStars";
import { AwakeButton } from "../AwakeButton";
import { caseStudies } from "@/data/case-studies";

export const PortfolioGrid = () => {
  const featured = caseStudies.slice(0, 4);
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container-lg">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className="mt-4 max-w-3xl text-display-2 font-display leading-[1.02]">
              <MaskRevealText serifAccents={["recent", "wins"]}>
                {"A few recent wins from teams we work with."}
              </MaskRevealText>
            </h2>
          </div>
          <AwakeButton to="/case-studies" variant="outline" className="shrink-0">
            All projects
          </AwakeButton>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {featured.map((cs, i) => {
            const bgFallback = [
              "from-violet/40 to-violet/10",
              "from-orange/50 to-orange/10",
              "from-green/40 to-green/10",
              "from-pink/40 to-pink/10",
            ][i % 4];
            return (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/case-studies/${cs.slug}`}
                  className="portfolio-card group block aspect-[5/4] md:aspect-[4/3]"
                >
                  <div className={`portfolio-img absolute inset-0 bg-gradient-to-br ${bgFallback}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-7xl md:text-8xl italic text-foreground/15 select-none">
                        {cs.client.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-6 left-6 right-6 z-10 text-background">
                    <span className="pill !bg-background/90 !text-foreground !border-transparent">
                      {cs.industry}
                    </span>
                    <h3 className="mt-4 text-2xl md:text-3xl font-display text-foreground transition-colors group-hover:text-background">
                      {cs.client}
                    </h3>
                  </div>
                  <div className="round-arrow absolute bottom-6 right-6 z-10 text-foreground">
                    <RoundArrow size={56} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
