import { Link } from "react-router-dom";
import { Linkedin, Github } from "lucide-react";

const year = new Date().getFullYear();

const cols = [
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Technologies", to: "/technologies" },
      { label: "Work", to: "/case-studies" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blogs", to: "/blogs" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms-of-service" },
    ],
  },
];

export const Footer = () => (
  <footer className="relative overflow-hidden bg-foreground text-background">
    <div className="container-lg py-16 md:py-20">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" className="flex items-center gap-3.5">
            <img src="/logo.png" alt="" className="h-14 w-14 object-contain" />
            <span className="font-serif italic text-3xl leading-none tracking-tight">ShubhzTechWork</span>
          </Link>
          <p className="mt-6 max-w-md text-background/70 leading-relaxed">
            We help teams build, secure, and scale the infrastructure their business runs on,
            from cloud and DevOps to Gen AI and security.
          </p>
          <div className="mt-8 flex items-center gap-3">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/company/106167425", label: "LinkedIn" },
              { Icon: Github, href: "https://github.com/shubhz187", label: "GitHub" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-background/15 text-background/80 transition-all hover:border-background hover:bg-background hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h4 className="text-xs font-medium uppercase tracking-[0.22em] text-background/50">
              {col.title}
            </h4>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-background/80 hover:text-background transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-3">
          <h4 className="text-xs font-medium uppercase tracking-[0.22em] text-background/50">
            Get in touch
          </h4>
          <a
            href="mailto:info@shubhztechwork.com"
            className="mt-5 block font-serif text-2xl italic leading-tight text-background hover:opacity-80 transition-opacity"
          >
            info@<br />shubhztechwork.com
          </a>
          <p className="mt-4 text-sm text-background/60">Mumbai, Maharashtra, India</p>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-background/10 pt-8 md:flex-row md:items-center">
        <p className="text-sm text-background/50">© {year} ShubhzTechWork. All rights reserved.</p>
        <p className="text-sm text-background/50">Simplifying Tech, Amplifying Growth.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
