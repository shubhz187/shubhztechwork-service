import { useEffect, useRef, useState } from "react";
import { useInView, animate, useMotionValue, useTransform } from "framer-motion";

const stats = [
  { value: 5,  suffix: "+", label: "Projects shipped" },
  { value: 15, suffix: "+", label: "Years of experience" },
];

const Counter = ({ to }: { to: number }) => {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (inView) animate(mv, to, { duration: 2.2, ease: [0.22, 1, 0.36, 1] });
  }, [inView, mv, to]);

  return <span ref={ref}>{display}</span>;
};

export const StatsRow = () => (
  <section className="container-lg py-24 md:py-32">
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-6">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col items-start ${i > 0 ? "sm:border-l sm:border-foreground/10 sm:pl-10" : ""}`}
        >
          <div className="text-display-2 font-display leading-none">
            {s.suffix === "+" && (
              <span className="serif-italic text-foreground/50 text-[0.65em] align-top mr-1">+</span>
            )}
            <Counter to={s.value} />
          </div>
          <p className="mt-4 text-base text-foreground/60 max-w-[220px]">{s.label}</p>
        </div>
      ))}
    </div>
  </section>
);
