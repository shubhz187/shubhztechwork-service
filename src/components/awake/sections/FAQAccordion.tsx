import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { MaskRevealText } from "../MaskRevealText";
import { PlusIcon } from "../decorative/OrbitStars";

const faqs = [
  {
    q: "What services does ShubhzTechWork offer?",
    a: "End-to-end technology services, Cloud Infrastructure, DevOps & SRE, Security, Gen AI & Automation, Graphics & Design, and Managed IT. We engage from strategy through build, ship, and operate.",
  },
  {
    q: "How long does a typical project take?",
    a: "Discovery engagements run 2–4 weeks. Platform builds and migrations typically run 6–16 weeks. Ongoing retainers operate monthly with clear sprint outcomes.",
  },
  {
    q: "How is pricing structured?",
    a: "Engagements are contact-driven. We scope each project against your goals and quote fixed-fee sprints, monthly retainers, or outcome-based contracts depending on what fits.",
  },
  {
    q: "Do you offer ongoing support after a project completes?",
    a: "Yes. Most clients move into an ops retainer: observability on-call, incident response, security posture, and continuous platform improvement.",
  },
  {
    q: "How often will I receive updates?",
    a: "Daily Slack/async updates, weekly demos, biweekly steering reviews. Every project has a shared board you can watch in real time.",
  },
  {
    q: "How do I get started?",
    a: "Use the contact form below or email info@shubhztechwork.com. We respond within one business day with a short intake call to scope fit.",
  },
];

export const FAQAccordion = () => (
  <section id="faq" className="py-24 md:py-32">
    <div className="container-md">
      <div className="text-center">
        <span className="eyebrow">Frequently asked</span>
        <h2 className="mt-4 text-display-2 font-display leading-[1.02]">
          <MaskRevealText serifAccents={["questions", "answered"]}>
            {"Questions, answered."}
          </MaskRevealText>
        </h2>
      </div>

      <Accordion.Root type="single" collapsible className="mt-14 border-t border-foreground/10">
        {faqs.map((f, i) => (
          <Accordion.Item key={i} value={`item-${i}`} className="faq-item border-b border-foreground/10 py-0">
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left">
                <span className="text-xl md:text-2xl font-display text-foreground">
                  {f.q}
                </span>
                <span className="faq-plus mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/15 group-hover:border-foreground">
                  <PlusIcon size={18} />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="pb-7 pr-16 text-foreground/70 leading-relaxed max-w-3xl"
              >
                {f.a}
              </motion.p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  </section>
);
