import { PlusIcon } from "../decorative/OrbitStars";

const values = ["Reliability", "Security", "Scale", "Automation", "Intelligence", "Velocity"];

export const ValuesMarquee = () => (
  <section aria-label="Core values" className="relative overflow-hidden py-10 md:py-14 border-y border-foreground/10 bg-cream">
    <div className="flex gap-14 animate-marquee-x pause-on-hover">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center gap-14 shrink-0">
          {values.map((v, i) => (
            <div key={`${copy}-${i}`} className="flex items-center gap-14">
              <span className="text-display-3 font-display font-medium tracking-tight text-foreground whitespace-nowrap">
                {v}
              </span>
              <PlusIcon size={24} className="text-foreground/40 animate-spin-slow" />
            </div>
          ))}
        </div>
      ))}
    </div>
  </section>
);
