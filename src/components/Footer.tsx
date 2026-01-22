import { Github, Linkedin, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="font-display font-bold text-sm text-primary-foreground">SZ</span>
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                ShubhzTechWork
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              Simplifying Tech, Amplifying Growth. Your trusted partner for cutting-edge software solutions.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="#fullstack" className="text-muted-foreground hover:text-foreground transition-colors">Full Stack Development</a></li>
              <li><a href="#infrastructure" className="text-muted-foreground hover:text-foreground transition-colors">Cloud Infrastructure</a></li>
              <li><a href="#databases" className="text-muted-foreground hover:text-foreground transition-colors">Database Solutions</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">DevOps & SRE</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 ShubhzTechWork. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
