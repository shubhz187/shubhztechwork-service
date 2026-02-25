import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import logoImg from '@/assets/image.png';

const services = [
  // { name: 'Full Stack Development', href: '/services#fullstack' },
  { name: 'Infrastructure', href: '/services#infrastructure' },
  { name: 'Security', href: '/services#security' },
  { name: 'DevOps & SRE', href: '/services#devops' },
  { name: 'Graphics', href: '/services#graphics' },
  { name: 'IT Solutions', href: '/services#itsolutions' },
  { name: 'Gen AI', href: '/services#genai' },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Contact Us', href: '/#contact' },
  { name: 'Services', href: '/services', dropdown: services },
  { name: 'About Us', href: '/about' },
  { name: 'Technologies', href: '/technologies' },
  { name: 'Blog', href: '/blogs' },
  { name: 'Case Studies', href: '/case-studies' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    // Handle hash navigation
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (location.pathname === path || (path === '/' && location.pathname === '/')) {
        // Same page, scroll to element
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
    const isExternal = href.startsWith('http');
    const isHashLink = href.includes('#');

    if (isExternal) {
      return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
    }

    if (isHashLink && href.startsWith('/#')) {
      // Hash link on home page
      return (
        <Link to={href} className={className} onClick={() => handleNavClick(href)}>
          {children}
        </Link>
      );
    }

    return (
      <Link to={href} className={className} onClick={() => handleNavClick(href)}>
        {children}
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="ShubhzTechWork" width={44} height={44} className="shrink-0" />
            <span className="font-display font-bold text-xl text-foreground hidden sm:block">
              ShubhzTechWork
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  href={link.href}
                  className="nav-link flex items-center gap-1 py-2 font-medium"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown className="w-4 h-4" />}
                </NavLink>

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
                          <NavLink
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/#contact"
              className="bg-gradient-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-glow"
            >
              Subscribe
            </Link>
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
                    <NavLink
                      href={link.href}
                      className="block py-3 px-4 text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                    >
                      {link.name}
                    </NavLink>
                    {link.dropdown && (
                      <div className="pl-6">
                        {link.dropdown.map((item) => (
                          <NavLink
                            key={item.name}
                            href={item.href}
                            className="block py-2 px-4 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-3 mx-4 mt-4">
                  <ThemeToggle />
                  <Link
                    to="/#contact"
                    className="flex-1 bg-gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Subscribe
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
