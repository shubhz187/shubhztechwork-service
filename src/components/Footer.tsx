import { Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '@/assets/image.png';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
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
              <a href="https://twitter.com/ShubhzTechWork" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="https://linkedin.com/company/shubhztechwork" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="https://github.com/shubhztechwork" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services#infrastructure" className="text-muted-foreground hover:text-foreground transition-colors">Cloud Infrastructure</Link></li>
              <li><Link to="/services#security" className="text-muted-foreground hover:text-foreground transition-colors">Security</Link></li>
              <li><Link to="/services#devops" className="text-muted-foreground hover:text-foreground transition-colors">DevOps & SRE</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><a href="/#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
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
            <span className="text-muted-foreground">Privacy Policy</span>
            <span className="text-muted-foreground">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
