import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePageMeta } from "@/hooks/use-page-meta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/awake/sections/PageHero";
import { CollaborateCTA } from "@/components/awake/sections/CollaborateCTA";
import { ContactSection } from "@/components/awake/sections/ContactSection";
import { MaskRevealText } from "@/components/awake/MaskRevealText";
import { ArrowUpRight } from "@/components/awake/decorative/OrbitStars";
import {
  Shield, Cloud, Workflow, Server, Database, Sparkles, Cpu, Palette,
  BarChart3, Eye, Activity, Rocket, Code2, Waypoints, FileCheck, Globe,
  Gamepad2, MousePointer2, LayoutDashboard, Zap, Bot, Brain, Lock,
} from "lucide-react";

const groups = [
  {
    id: "security",
    label: "Security",
    headline: "Security embedded, not bolted on.",
    accents: ["embedded"],
    items: [
      { title: "DevSecOps",               Icon: Shield,     desc: "Shift-left security, SAST, DAST, container scanning, policy-as-code across CI/CD." },
      { title: "Vulnerability Management",Icon: Lock,       desc: "Continuous scanning, risk-prioritized remediation, and patch orchestration." },
      { title: "Cybersecurity",           Icon: Eye,        desc: "Endpoint protection, SIEM, threat intel, and 24/7 incident response." },
      { title: "Networking",              Icon: Waypoints,  desc: "Zero-trust segmentation, encrypted traffic inspection, and hardened firewalls." },
      { title: "Auditing & Compliance",   Icon: FileCheck,  desc: "HIPAA, SOC 2, ISO 27001, NIST, audit prep, gap analysis, remediation." },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Infrastructure",
    headline: "Cloud built to scale with your business.",
    accents: ["scale"],
    items: [
      { title: "Cloud",                Icon: Cloud,  desc: "AWS, Azure, GCP, compliance-ready architectures, autoscaling, cost-optimized." },
      { title: "Virtualization",       Icon: Server, desc: "Isolated workloads, resource efficiency, and hardened hypervisor configs." },
      { title: "Data Center",          Icon: Database, desc: "Design, migration, redundancy, physical security, DR built-in." },
      { title: "Serverless & Microservices", Icon: Zap, desc: "Event-driven functions and containers for zero-trust, elastic systems." },
    ],
  },
  {
    id: "devops",
    label: "DevOps & SRE",
    headline: "Ship fast, without breaking things.",
    accents: ["fast"],
    items: [
      { title: "Monitoring",               Icon: Activity,  desc: "Real-time infra and app monitoring, proactive alerts, SLA dashboards." },
      { title: "Logging",                  Icon: BarChart3, desc: "Centralized aggregation, retention, and search across distributed systems." },
      { title: "Observability",            Icon: Eye,       desc: "Traces + metrics + logs correlated for fast root-cause analysis." },
      { title: "Incident Management",      Icon: Rocket,    desc: "On-call routing, escalation policies, blameless postmortems." },
      { title: "Automation",               Icon: Workflow,  desc: "End-to-end automation, provisioning, deploys, ops, that eliminates toil." },
      { title: "Infrastructure as Code",   Icon: Code2,     desc: "Terraform, Pulumi, Ansible, repeatable, auditable, versioned infra." },
    ],
  },
  {
    id: "graphics",
    label: "Graphics & Design",
    headline: "Design systems that travel across surfaces.",
    accents: ["travel"],
    items: [
      { title: "Animation",        Icon: MousePointer2, desc: "Motion that brings products and brands to life across web and video." },
      { title: "Game Development", Icon: Gamepad2,      desc: "Concept → launch, mechanics, art, and cross-platform deployment." },
      { title: "Digital Marketing",Icon: Globe,         desc: "SEO, paid media, analytics, data-driven growth programs." },
    ],
  },
  {
    id: "it",
    label: "IT Solutions",
    headline: "Operations that quietly just work.",
    accents: ["quietly"],
    items: [
      { title: "Data Warehousing",     Icon: Database,       desc: "Unified analytics, reporting, and compliance-ready data retention." },
      { title: "Data Visualization",   Icon: LayoutDashboard,desc: "Dashboards that turn complex data into decisions." },
      { title: "Data Transformation",  Icon: Workflow,       desc: "ETL/ELT pipelines that clean, normalize, and ready data for analysis." },
    ],
  },
  {
    id: "ai",
    label: "Gen AI",
    headline: "AI that holds up in production.",
    accents: ["production"],
    items: [
      { title: "AI Integration",  Icon: Cpu,     desc: "APIs, model serving, and enterprise-grade inference pipelines." },
      { title: "LLM Engineering", Icon: Brain,   desc: "Fine-tuning, prompt engineering, RAG, and evaluation harnesses." },
      { title: "AI Agents",       Icon: Bot,     desc: "Autonomous agents with human-in-the-loop guardrails for real work." },
    ],
  },
];

const Services = () => {
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Technology Services",
    url: "https://services.shubhztechwork.com/services",
    provider: { "@type": "Organization", name: "ShubhzTechWork" },
  }), []);

  usePageMeta({
    title: "Services | ShubhzTechWork",
    description: "Security-first services: cybersecurity, cloud infrastructure, DevOps & SRE, IT solutions, and Gen AI.",
    canonicalPath: "/services",
    jsonLd,
  });

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="Services"
          title="Everything your stack needs, built with craft."
          accents={["craft"]}
          subtitle="Six disciplines, one team, senior engineers embedded across security, cloud, DevOps, design, IT operations, and Gen AI."
        >
          <div className="flex flex-wrap gap-2">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(g.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card px-4 py-2 text-sm text-foreground/70 transition-all hover:border-foreground hover:bg-foreground hover:text-background"
              >
                {g.label}
              </a>
            ))}
          </div>
        </PageHero>

        {groups.map((g, gi) => (
          <section key={g.id} id={g.id} className={`scroll-mt-24 py-20 md:py-28 ${gi % 2 === 1 ? "bg-secondary" : ""}`}>
            <div className="container-lg">
              <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="eyebrow">{g.label}</span>
                  <h2 className="mt-3 max-w-2xl text-display-3 font-display leading-[1.05]">
                    <MaskRevealText serifAccents={g.accents}>{g.headline}</MaskRevealText>
                  </h2>
                </div>
                <Palette className="hidden md:block h-8 w-8 text-foreground/20" strokeWidth={1} />
              </div>

              <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {g.items.map((svc, i) => (
                  <motion.article
                    key={`${g.id}-${svc.title}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: Math.min(i * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
                    className="group rounded-[28px] border border-foreground/10 bg-card p-8 hover:-translate-y-1 hover:border-foreground/30"
                  >
                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5">
                        <svc.Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                      </span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100 group-hover:border-foreground">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl md:text-2xl font-display">{svc.title}</h3>
                    <p className="mt-3 text-foreground/65 leading-relaxed text-[15px]">{svc.desc}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        ))}

        <CollaborateCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Services;
