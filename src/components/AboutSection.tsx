import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SectionTitle } from './SectionTitle';

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

const Counter = ({ value, suffix = '', label, delay = 0 }: CounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onViewportEnter={() => {
        if (!hasAnimated) {
          setHasAnimated(true);
          const controls = animate(0, value, {
            duration: 2,
            ease: 'easeOut',
            onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
          });
          return () => controls.stop();
        }
      }}
      className="text-center"
    >
      <div className="font-display text-5xl md:text-6xl font-bold text-primary mb-2">
        {displayValue}{suffix}
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
};

const stats = [
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
];

const teamMembers = [
  {
    name: 'Shubham Kumar',
    role: 'Founder & CEO',
    bio: 'Visionary tech leader with 10+ years in enterprise solutions and cloud architecture.',
    initials: 'SK',
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    bio: 'Full-stack expert specializing in scalable systems and AI integration.',
    initials: 'PS',
  },
  {
    name: 'Rahul Verma',
    role: 'Lead DevOps Engineer',
    bio: 'Infrastructure wizard who automates everything and keeps systems running 24/7.',
    initials: 'RV',
  },
  {
    name: 'Ananya Patel',
    role: 'Head of Design',
    bio: 'Creative director transforming complex ideas into beautiful, intuitive experiences.',
    initials: 'AP',
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/50 rounded-full blur-[80px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="About Us" />
        
        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Our Story
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Founded in 2018, ShubhzTechWork began with a simple mission: to make cutting-edge technology 
            accessible to businesses of all sizes. What started as a small team of passionate developers 
            has grown into a full-service technology partner trusted by companies worldwide.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We believe that great technology should simplify, not complicate. That's why we focus on 
            delivering solutions that are not only powerful but also intuitive and maintainable. 
            From startups to enterprises, we've helped hundreds of businesses transform their digital 
            presence and streamline their operations.
          </p>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 py-12 px-8 bg-card rounded-2xl border border-border shadow-card">
          {stats.map((stat, index) => (
            <Counter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Meet Our Team
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The brilliant minds behind ShubhzTechWork, dedicated to delivering excellence in every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center card-hover group"
            >
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <span className="font-display font-bold text-xl text-primary-foreground">
                  {member.initials}
                </span>
              </div>
              
              <h4 className="font-display font-semibold text-lg text-foreground mb-1">
                {member.name}
              </h4>
              <p className="text-primary font-medium text-sm mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-3xl">🚀</span>
            </div>
            <h4 className="font-display font-semibold text-lg text-foreground mb-2">Innovation</h4>
            <p className="text-muted-foreground text-sm">
              We stay ahead of the curve, embracing new technologies to deliver cutting-edge solutions.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-3xl">🤝</span>
            </div>
            <h4 className="font-display font-semibold text-lg text-foreground mb-2">Partnership</h4>
            <p className="text-muted-foreground text-sm">
              We work alongside our clients, treating their success as our own responsibility.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-3xl">✨</span>
            </div>
            <h4 className="font-display font-semibold text-lg text-foreground mb-2">Excellence</h4>
            <p className="text-muted-foreground text-sm">
              We never settle for "good enough" – every project receives our full dedication and expertise.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
