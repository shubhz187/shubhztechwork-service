import { useMemo } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/awake/sections/PageHero";
import { StatsRow } from "@/components/awake/sections/StatsRow";
import { Team } from "@/components/awake/sections/Team";
// import { Testimonials } from "@/components/awake/sections/Testimonials";
import { CollaborateCTA } from "@/components/awake/sections/CollaborateCTA";
import { ContactSection } from "@/components/awake/sections/ContactSection";
import { MaskRevealText } from "@/components/awake/MaskRevealText";

const pillars = [
  { title: "Clarity", body: "We name trade-offs plainly. Less magic, more architecture you can reason about." },
  { title: "Craft",   body: "Small team, senior people. No handoffs that lose context; work is done by the people you spoke with." },
  { title: "Care",    body: "We only take on work we can do excellently. Fewer clients, deeper partnerships, better outcomes." },
];

const About = () => {
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About ShubhzTechWork",
      url: "https://services.shubhztechwork.com/about",
    }),
    [],
  );

  usePageMeta({
    title: "About Us | ShubhzTechWork",
    description: "Meet the team behind ShubhzTechWork, founded on trust, curiosity, and the belief that great technology starts simple.",
    canonicalPath: "/about",
    jsonLd,
  });

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHero
          eyebrow="About us"
          title="A small team with big engineering convictions."
          accents={["engineering", "convictions"]}
          subtitle="We believe simple is hard, and that the best technology feels quietly reliable. That belief shapes how we hire, how we engage, and how we ship."
        />

        <section className="py-20 md:py-28 bg-secondary">
          <div className="container-lg grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="eyebrow">Our principles</span>
              <h2 className="mt-4 text-display-3 font-display leading-[1.05]">
                <MaskRevealText serifAccents={["lean", "principles"]}>
                  {"Three lean principles guide the work."}
                </MaskRevealText>
              </h2>
            </div>
            <div className="md:col-span-8 grid gap-5 sm:grid-cols-3">
              {pillars.map((p) => (
                <div key={p.title} className="rounded-[28px] border border-foreground/10 bg-card p-7">
                  <h3 className="font-serif text-4xl italic text-violet">{p.title}</h3>
                  <p className="mt-4 text-foreground/70 leading-relaxed text-[15px]">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsRow />
        <Team />
        {/* <Testimonials /> */}
        <CollaborateCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default About;
