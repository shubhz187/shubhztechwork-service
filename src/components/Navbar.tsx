import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AwakeButton } from "@/components/awake/AwakeButton";
import { useContactDialog } from "@/components/awake/ContactDialog";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/technologies", label: "Technologies" },
  { to: "/case-studies", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/blogs", label: "Blogs" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { open: openContact } = useContactDialog();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "pt-3" : "pt-5",
      )}
    >
      <div className="container-lg">
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-full px-5 py-2.5 transition-all duration-500",
            scrolled
              ? "border border-foreground/10 bg-background/80 backdrop-blur-xl shadow-sm"
              : "border border-transparent",
          )}
        >
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="ShubhzTechWork home">
            <img src="/logo.png" alt="ShubhzTechWork" className="h-11 w-11 object-contain" />
            <span className="font-serif italic text-[22px] leading-none tracking-tight hidden sm:inline">
              ShubhzTechWork
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "group relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                    isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{l.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-foreground/5"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <AwakeButton type="button" onClick={openContact} variant="primary" size="sm" className="hidden md:inline-flex">
            Let's talk
          </AwakeButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden mt-3 rounded-[28px] border border-foreground/10 bg-background/95 backdrop-blur-xl p-5 shadow-lg"
            >
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          isActive ? "bg-foreground/5 text-foreground" : "text-foreground/70",
                        )
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
                <li className="mt-2 flex justify-center">
                  <AwakeButton type="button" onClick={openContact} variant="primary" size="sm">
                    Let's talk
                  </AwakeButton>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
