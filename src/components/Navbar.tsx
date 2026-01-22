import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  { name: 'Full Stack Development', href: '#fullstack' },
  { name: 'Infrastructure', href: '#infrastructure' },
  { name: 'Databases', href: '#databases' },
  { name: 'DevOps & SRE', href: '#devops' },
  { name: 'Data Analytics', href: '#analytics' },
  { name: 'Gen AI', href: '#genai' },
];

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Contact Us', href: '#contact' },
  { name: 'Services', href: '#services', dropdown: services },
  { name: 'About Us', href: '#about' },
  { name: 'Technologies', href: '#technologies' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <span className="font-display font-bold text-lg text-primary-foreground">SZ</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground hidden sm:block">
              ShubhzTechWork
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="nav-link flex items-center gap-1 py-2 font-medium"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </a>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <div className="bg-popover border border-border rounded-xl shadow-elevated py-2 min-w-[220px]">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="bg-gradient-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-glow"
            >
              Subscribe
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <a
                      href={link.href}
                      className="block py-3 px-4 text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                    {link.dropdown && (
                      <div className="pl-6">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block py-2 px-4 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <a
                  href="#contact"
                  className="block mx-4 mt-4 bg-gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Subscribe
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
