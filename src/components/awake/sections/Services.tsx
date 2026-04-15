import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Cloud, ShieldCheck, Workflow, Sparkles, Cpu, Palette, BarChart3 } from "lucide-react";
import { MaskRevealText } from "../MaskRevealText";
import { AwakeButton } from "../AwakeButton";

/** Awake's "innovation grid" pattern, colored tinted tiles with icon + label.
 *  Each tile is ~227×184 on desktop, border-radius 16, padding 32, flex-col gap-32. */
const services = [
  { title: "Cloud Infrastructure", slug: "/services#cloud",     Icon: Cloud,       tint: "#A484E9" /* purple */ },
  { title: "DevOps & SRE",         slug: "/services#devops",    Icon: Workflow,    tint: "#F4889A" /* pink */   },
  { title: "Security",             slug: "/services#security",  Icon: ShieldCheck, tint: "#70B5FF" /* blue */   },
  { title: "Gen AI & Automation",  slug: "/services#ai",        Icon: Sparkles,    tint: "#FFAF68" /* orange */ },
  { title: "Graphics & Design",    slug: "/services#graphics",  Icon: Palette,     tint: "#79D45E" /* green */  },
  { title: "IT Solutions",         slug: "/services#it",        Icon: Cpu,         tint: "#F6E683" /* yellow */ },
];

export const Services = () => (
  <section id="services" className="relative py-24 md:py-32 bg-background">
    <div className="container-lg">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="eyebrow">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet" />
            Services
          </div>
          <h2 className="mt-4 max-w-3xl text-display-2 font-display leading-[1.08]">
            <MaskRevealText serifAccents={["craft"]}>
              {"What we build, ship, and craft."}
            </MaskRevealText>
          </h2>
          <p className="mt-6 max-w-xl text-foreground/60 leading-relaxed">
            Six disciplines, one senior team. Every engagement is handled by the same engineers
            you meet on day one.
          </p>
        </div>
        <AwakeButton to="/services" variant="outline" className="shrink-0">
          All services
        </AwakeButton>
      </div>

      {/* Innovation grid, colored tinted tiles */}
      <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
        {services.map(({ title, slug, Icon, tint }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: Math.min(i * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={slug}
              className="group relative flex h-full min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1"
              style={{ backgroundColor: `${tint}33` /* 20% alpha */ }}
            >
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-background"
                style={{ color: tint }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div className="mt-16">
                <h3 className="text-[17px] md:text-[18px] font-display font-medium leading-[1.3] text-foreground">
                  {title}
                </h3>
                <span
                  className="mt-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 opacity-0 transition-all duration-500 group-hover:opacity-100"
                  aria-hidden
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12 L12 4 M6 4 H12 V10" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Inline stats strip, subtle reinforcement below grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-foreground/55"
      >
        <span className="inline-flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Senior-level engineers
        </span>
        <span>·</span>
        <span>Outcome-based engagements</span>
        <span>·</span>
        <span>Compliance-ready builds</span>
        <span>·</span>
        <span>Production-grade AI</span>
      </motion.div>
    </div>
  </section>
);
