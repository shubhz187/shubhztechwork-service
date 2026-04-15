import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useMotionValue, useTransform } from "framer-motion";
import { usePageMeta } from "@/hooks/use-page-meta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/awake/sections/PageHero";
import { CollaborateCTA } from "@/components/awake/sections/CollaborateCTA";
import { ContactSection } from "@/components/awake/sections/ContactSection";
import { techCategories } from "@/components/technologies/techData";
import { getTechLogo } from "@/components/technologies/techLogos";
import { MaskRevealText } from "@/components/awake/MaskRevealText";

const tintByCategory: Record<string, { solid: string; soft: string }> = {
  cloud:        { solid: "#A484E9", soft: "#A484E91a" },
  devops:       { solid: "#FFAF68", soft: "#FFAF681a" },
  monitoring:   { solid: "#F6E683", soft: "#F6E68333" },
  security:     { solid: "#F4889A", soft: "#F4889A1f" },
  databases:    { solid: "#79D45E", soft: "#79D45E1a" },
  ai:           { solid: "#70B5FF", soft: "#70B5FF1a" },
  contactcenter:{ solid: "#A484E9", soft: "#A484E91a" },
};

/** Wraps children in a div that flips `data-visible` when it scrolls into view.
 *  Child `.reveal-item` elements transition based on `--reveal-delay`.
 *  Uses IntersectionObserver directly to avoid Framer-viewport edge cases with Lenis. */
const RevealOnScroll = ({
  children,
  threshold = 0.12,
  className,
}: { children: ReactNode; threshold?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold]);
  return (
    <div ref={ref} data-visible={visible} className={className}>
      {children}
    </div>
  );
};

const CountUp = ({ to }: { to: number }) => {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    const u = rounded.on("change", (v) => setDisplay(v));
    return () => u();
  }, [rounded]);
  useEffect(() => {
    if (inView) animate(mv, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
  }, [inView, mv, to]);
  return <span ref={ref}>{display}</span>;
};

const Technologies = () => {
  usePageMeta({
    title: "Technologies | ShubhzTechWork",
    description:
      "61 technologies across cloud, DevOps, monitoring, security, databases, AI, and contact center, the stack we build with.",
    canonicalPath: "/technologies",
  });

  const [active, setActive] = useState<string>(techCategories[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    techCategories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const totalTools = techCategories.reduce((s, c) => s + c.technologies.length, 0);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Technologies"
          title="The stack we build, ship, and operate with."
          accents={["stack", "build"]}
          subtitle={`${totalTools} tools across cloud, observability, security, databases, and AI, chosen for what holds up under production load.`}
        >
          <div className="flex flex-wrap gap-2">
            {techCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => scrollTo(c.id)}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card px-4 py-2 text-sm text-foreground/70 transition-all hover:border-foreground hover:bg-foreground hover:text-background"
              >
                {c.label}
                <span className="font-serif italic text-foreground/40">{c.technologies.length}</span>
              </button>
            ))}
          </div>
        </PageHero>

        {/* Sticky category rail */}
        <div className="sticky top-[84px] z-30 border-y border-foreground/10 bg-background/80 backdrop-blur-lg">
          <div className="container-lg overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 py-3 min-w-max">
              {techCategories.map((c) => {
                const tint = tintByCategory[c.id]?.solid ?? "#A484E9";
                const isActive = active === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => scrollTo(c.id)}
                    className="group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-colors"
                    style={{ color: isActive ? tint : undefined }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                      style={{ background: isActive ? tint : "currentColor", opacity: isActive ? 1 : 0.3 }}
                    />
                    <span className={isActive ? "font-medium" : "text-foreground/60"}>{c.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="tech-rail-active"
                        className="absolute inset-0 -z-10 rounded-full border"
                        style={{ borderColor: `${tint}55`, backgroundColor: `${tint}12` }}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {techCategories.map((cat, gi) => {
          const tint = tintByCategory[cat.id] ?? tintByCategory.cloud;
          const [featured, ...rest] = cat.technologies;
          const FeaturedLogo = getTechLogo(featured.name, cat.id);
          return (
            <section
              key={cat.id}
              id={cat.id}
              className={`scroll-mt-32 py-24 md:py-28 ${gi % 2 === 1 ? "bg-secondary" : ""}`}
            >
              <div className="container-lg">
                {/* Category header */}
                <div className="flex items-end justify-between gap-6 border-b border-foreground/10 pb-8">
                  <div className="flex items-end gap-6">
                    <span
                      className="font-serif italic text-display-2 leading-none"
                      style={{ color: tint.solid }}
                    >
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <span className="eyebrow">Category</span>
                      <h2 className="mt-2 text-display-3 font-display">
                        <MaskRevealText>{cat.label}</MaskRevealText>
                      </h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-4xl md:text-5xl font-semibold text-foreground tabular-nums">
                      <CountUp to={cat.technologies.length} />
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground/50">
                      Tools deployed
                    </p>
                  </div>
                </div>

                {/* Featured tile + compact grid reveal together when category
                    scrolls into view. Pure CSS cascade; each tile adds its own delay. */}
                <RevealOnScroll threshold={0.12}>
                  <div
                    className="reveal-item mt-10 overflow-hidden rounded-[28px] relative"
                    style={{ backgroundColor: tint.soft, ["--reveal-delay" as never]: "0ms" }}
                  >
                    <div className="relative grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
                      <div>
                        <span className="eyebrow" style={{ color: tint.solid }}>Featured</span>
                        <h3 className="mt-3 text-display-3 font-display">{featured.name}</h3>
                        <p className="mt-4 max-w-xl text-foreground/70 leading-relaxed">
                          {featured.description}
                        </p>
                      </div>
                      <div
                        className="flex h-32 w-32 items-center justify-center rounded-3xl bg-background shadow-sm md:h-40 md:w-40"
                        style={{ color: tint.solid }}
                      >
                        <FeaturedLogo size={64} />
                      </div>
                    </div>
                    <div
                      className="pointer-events-none absolute -bottom-1 -right-1 h-40 w-40 rounded-full blur-3xl"
                      style={{ backgroundColor: tint.solid, opacity: 0.12 }}
                    />
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {rest.map((t, i) => {
                      const Logo = getTechLogo(t.name, cat.id);
                      return (
                        <div
                          key={`${cat.id}-${t.name}`}
                          className="reveal-item group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card p-5 hover:border-foreground/30 hover:-translate-y-0.5"
                          style={{ ["--reveal-delay" as never]: `${120 + Math.min(i * 40, 480)}ms` }}
                        >
                        <div
                          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                          style={{ backgroundColor: tint.solid }}
                        />
                        <div className="relative flex items-center gap-3">
                          <span
                            className="h-10 w-10 shrink-0 rounded-xl grid place-items-center"
                            style={{ backgroundColor: tint.soft, color: tint.solid }}
                          >
                            <Logo size={20} />
                          </span>
                          <span className="text-[15px] font-medium text-foreground">{t.name}</span>
                        </div>
                        <p className="relative mt-3 text-[13px] leading-relaxed text-foreground/60 line-clamp-2">
                          {t.description}
                        </p>
                        </div>
                      );
                    })}
                  </div>
                </RevealOnScroll>
              </div>
            </section>
          );
        })}

        <CollaborateCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Technologies;
