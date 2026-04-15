import { motion } from "framer-motion";
import { MaskRevealText } from "../MaskRevealText";

const awards = [
  { name: "AWS Advanced Partner", desc: "Recognized for cloud architecture excellence and scale delivery.",   year: 2025 },
  { name: "ISO 27001 Certified",  desc: "Audited information-security management across build and ops.",       year: 2024 },
  { name: "Industry Recognition", desc: "Honored for design + engineering work across portfolio verticals.",   year: 2023 },
];

export const Awards = () => (
  <section id="awards" className="py-24 md:py-32 bg-secondary">
    <div className="container-lg">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Recognition</span>
          <h2 className="mt-4 max-w-3xl text-display-2 font-display leading-[1.02]">
            <MaskRevealText serifAccents={["awards", "accolades"]}>
              {"A few awards and accolades along the way."}
            </MaskRevealText>
          </h2>
        </div>
      </div>

      <div className="mt-14 border-t border-foreground/10">
        {awards.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-12 items-center gap-4 border-b border-foreground/10 py-8"
          >
            <span className="col-span-1 font-serif text-xl italic text-foreground/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="col-span-6 text-xl md:text-2xl font-display">{a.name}</h3>
            <p className="col-span-3 hidden md:block text-foreground/60 text-[15px]">{a.desc}</p>
            <span className="col-span-5 md:col-span-2 text-right text-2xl md:text-3xl font-display font-semibold tabular-nums text-foreground">
              {a.year}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
