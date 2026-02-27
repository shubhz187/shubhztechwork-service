import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '@/assets/image.png';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:justify-between gap-8 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logoImg} alt="ShubhzTechWork" width={40} height={40} className="shrink-0" />
              <span className="font-display font-bold text-lg text-foreground">
                ShubhzTechWork
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              Simplifying Tech, Amplifying Growth. Your trusted partner for cutting-edge software solutions.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/106167425" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="https://github.com/shubhz187" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="mailto:info@shubhztechwork.com" aria-label="Email" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="hidden md:block md:text-right">
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/blogs" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; 2026 ShubhzTechWork. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
