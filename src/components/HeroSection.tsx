import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';
export const HeroSection = () => {
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
    </div>

    {/* Animated Grid Overlay */}
    <div className="absolute inset-0 opacity-20">
      <div className="w-full h-full" style={{
        backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
        backgroundSize: '60px 60px'
      }} />
    </div>

    {/* Glowing Orbs */}
    <motion.div animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3]
    }} transition={{
      duration: 4,
      repeat: Infinity
    }} className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
    <motion.div animate={{
      scale: [1.2, 1, 1.2],
      opacity: [0.2, 0.4, 0.2]
    }} transition={{
      duration: 5,
      repeat: Infinity
    }} className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[100px]" />

    {/* Content */}
    <div className="relative z-10 container mx-auto px-4 text-center">
      <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }}>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-foreground">Simplifying Tech,</span>
          <br />
          <span className="text-gradient-primary">Amplifying Growth</span>
        </h1>
      </motion.div>

      <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.4
      }} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
        We provide cutting-edge technology to drive your business forward.
        From innovative software solutions to cloud infrastructure, we've got you covered.
      </motion.p>

      <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.6
      }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#contact" className="bg-foreground text-background font-semibold px-8 py-4 rounded-lg hover:bg-foreground/90 transition-all shadow-elevated text-lg">
          GET STARTED TODAY
        </a>
        <Link to="/technologies" className="border border-primary text-primary font-semibold px-8 py-4 rounded-lg hover:bg-primary/10 transition-all text-lg">
          View Technologies
        </Link>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.5
      }} className="absolute bottom-10 left-1/2 -translate-x-1/2">

      </motion.div>
    </div>
  </section>;
};