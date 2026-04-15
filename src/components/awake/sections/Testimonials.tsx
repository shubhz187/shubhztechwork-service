import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MaskRevealText } from "../MaskRevealText";

const quotes = [
  {
    body: "ShubhzTechWork transformed a brittle pipeline into a production-grade platform. Their depth across infra and AI is rare.",
    name: "Sarah Mitchell",
    role: "Head of Platform, Chipsland",
  },
  {
    body: "Every engagement felt like senior pair-programming at scale. Fewer meetings, more shipped features, zero surprise.",
    name: "Daniel Okafor",
    role: "CTO, Northlane",
  },
  {
    body: "They treated our compliance and security posture as seriously as our feature velocity. That combination is rare.",
    name: "Priya Ramanathan",
    role: "VP Engineering, Auralyx",
  },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, []);
  const q = quotes[i];

  return (
    <section className="relative py-24 md:py-32 bg-secondary">
      <div className="container-lg grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="eyebrow">Customer stories</span>
          <h2 className="mt-4 text-display-3 font-display leading-[1.05]">
            <MaskRevealText serifAccents={["words", "clients"]}>
              {"Words from the clients we've shipped with."}
            </MaskRevealText>
          </h2>

          <div className="mt-10 rounded-[28px] border border-foreground/10 bg-card p-8">
            <span className="font-serif text-5xl italic text-violet">91%</span>
            <p className="mt-3 text-foreground/70 max-w-xs leading-relaxed">
              of our clients renew or refer us within 12 months of first engagement.
            </p>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="relative rounded-[32px] border border-foreground/10 bg-card p-8 md:p-12 min-h-[360px]">
            <span className="absolute -top-6 left-10 font-serif text-[120px] leading-none italic text-violet/30 select-none">
              "
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mt-6 text-2xl md:text-3xl leading-[1.3] font-display text-foreground">
                  {q.body}
                </p>
                <div className="mt-10 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{q.name}</p>
                    <p className="text-sm text-foreground/60">{q.role}</p>
                  </div>
                  <div className="flex gap-2">
                    {quotes.map((_, k) => (
                      <button
                        key={k}
                        onClick={() => setI(k)}
                        aria-label={`Show testimonial ${k + 1}`}
                        className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-foreground" : "w-2 bg-foreground/25"}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
