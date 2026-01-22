import { motion } from 'framer-motion';
import { Server, Network, Shield, BarChart3, Cpu, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Server,
    title: 'Data Center',
    description: 'A facility housing critical IT infrastructure, including servers, storage, and networking, to support enterprise applications and services.',
  },
  {
    icon: Network,
    title: 'Networking',
    description: 'The backbone of digital communication, enabling data exchange between devices through wired and wireless connections',
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Enterprise-grade security solutions to protect your infrastructure and data from cyber threats.',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights with our advanced analytics and visualization tools.',
  },
  {
    icon: Cpu,
    title: 'DevOps & SRE',
    description: 'Streamline your development pipeline with continuous integration, deployment, and site reliability engineering.',
  },
  {
    icon: Sparkles,
    title: 'Gen AI',
    description: 'Leverage generative AI to automate workflows, enhance productivity, and create intelligent solutions.',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="technologies" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Our Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to accelerate your digital transformation journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-gradient-card rounded-2xl border border-border card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
