import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { SectionTitle } from './SectionTitle';
import { AboutHeroPlayer } from './about/AboutHeroPlayer';

const teamMembers = [
  {
    name: 'Nirmit Dagli',
    role: 'Founder & CEO',
    bio: 'Visionary leader driving the strategic vision and operations of the company.',
    initials: 'ND',
    linkedin: 'https://www.linkedin.com/in/nirmit-dagli-62857916a',
    email: 'nirmit.dagli@shubhztechwork.com',
  },
  {
    name: 'Shubham Kadam',
    role: 'Co-Founder & CFO',
    bio: 'Financial expert ensuring sustainable growth and strong financial foundations.',
    initials: 'SK',
    linkedin: 'https://www.linkedin.com/in/nirmit-dagli-62857916a',
    email: 'shubham.kadam@shubhztechwork.com',
  },
  {
    name: 'Kunal Shinde',
    role: 'CoFounder & CTO',
    bio: 'Technical mastermind building scalable architectures and leading engineering.',
    initials: 'KS',
    linkedin: 'https://www.linkedin.com/in/kunal-shinde-5a91211b5',
    email: 'kunal.shinde@shubhztechwork.com',
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-12 md:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/50 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle title="About Us" />

        {/* Remotion Hero */}
        <div className="mb-16">
          <AboutHeroPlayer />
        </div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-10 md:mb-20"
        >
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Our Story
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            ShubhzTechWork started in the most honest way possible with one friend casually saying, "Let's start a business," and the other saying, "Yes."
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            What began as a simple conversation between friends turned into a serious journey of building, learning, and solving real problems through technology. We started small, took on real work, kept improving, and grew through consistency, trust, and results.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Today, ShubhzTechWork has evolved into a technology partner focused on building practical, scalable solutions across development, cloud, DevOps, security, and AI. But our foundation remains the same: stay curious, build with purpose, and keep technology simple enough to be useful.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            We believe the best solutions are not the most complicated ones they're the ones that actually work, scale well, and make life easier for businesses.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From a single "yes" to a growing vision, ShubhzTechWork is built on action, trust, and the belief that great things can start from one small idea.
          </p>
        </motion.div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 text-center card-hover group flex flex-col items-center justify-between"
            >
              <div className="w-full h-full flex flex-col items-center">
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 active:scale-95"
                  aria-label={`LinkedIn profile for ${member.name}`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 active:scale-95"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
