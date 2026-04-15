import { motion } from "framer-motion";
import { Twitter, Linkedin } from "lucide-react";
import { MaskRevealText } from "../MaskRevealText";

const team = [
  { name: "Nirmit Dagli",  role: "Founder & CEO",        initials: "ND", tint: "bg-violet/20" },
  { name: "Shubham Kadam", role: "Co-Founder & CFO",     initials: "SK", tint: "bg-orange/30" },
  { name: "Kunal Shinde",  role: "Co-Founder & CTO",     initials: "KS", tint: "bg-green/25" },
];

export const Team = () => (
  <section id="team" className="py-24 md:py-32">
    <div className="container-lg">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="eyebrow">Team</span>
          <h2 className="mt-4 max-w-3xl text-display-2 font-display leading-[1.02]">
            <MaskRevealText serifAccents={["small", "sharp"]}>
              {"A small, sharp team behind every build."}
            </MaskRevealText>
          </h2>
        </div>
        <p className="max-w-sm text-foreground/60">
          We stay deliberately lean so every client works with seniors, not handoffs.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[22px] border border-foreground/10 bg-card"
          >
            <div className={`aspect-[16/10] ${m.tint} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-foreground/10 font-display text-3xl font-medium text-foreground/80">
                  {m.initials}
                </div>
              </div>
              <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/5" />
              {/* Social reveal */}
              <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 opacity-0 translate-y-2 transition-all duration-500 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
                <a
                  href="#"
                  aria-label={`${m.name} on Twitter`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-foreground/90"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#"
                  aria-label={`${m.name} on LinkedIn`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-foreground/90"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 p-5">
              <div>
                <h3 className="text-base font-display font-medium">{m.name}</h3>
                <p className="mt-0.5 text-xs text-foreground/60">{m.role}</p>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
