import { useDocumentTitle } from '@/hooks/use-document-title';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SectionTitle } from '@/components/SectionTitle';
import { ServiceCard } from '@/components/ServiceCard';
import { motion } from 'framer-motion';
import { ServicesHeroPlayer } from '@/components/services/ServicesHeroPlayer';

const serviceCategories = [
  { label: 'Cloud & Infra', hash: '#infrastructure' },
  { label: 'Security', hash: '#security' },
  { label: 'DevOps & SRE', hash: '#devops' },
  { label: 'Graphics', hash: '#graphics' },
  { label: 'IT Solutions', hash: '#itsolutions' },
  { label: 'Gen AI', hash: '#genai' },
];

const fullStackServices = [
  {
    title: 'Frontend Development',
    iconType: 'frontend' as const,
    description: "We make websites that don't look like they were designed in 1995. HTML, CSS, JavaScript – our weapons of choice. We'll make your site responsive, accessible, and hopefully, fast enough to keep your users from abandoning it in frustration. We're the pixel pushers, the layout lovers, the... sigh... browser compatibility wranglers.",
  },
  {
    title: 'Backend Development',
    iconType: 'backend' as const,
    description: "The brains behind the beauty. We handle the server-side logic, the database interactions, the stuff that makes your website actually work. Python, Java, Node.js – we speak them all. We're the architects, the engineers, the ones who keep the internet humming (and occasionally, rebooting).",
  },
  {
    title: 'Database',
    iconType: 'database' as const,
    description: "Data, data everywhere, nor any a byte to waste. We're the data wranglers, the SQL slingers, the NoSQL ninjas. We keep your precious information safe, organized, and readily available. Backups? You bet. Data loss? Not on our watch.",
  },
  {
    title: 'API Development',
    iconType: 'api' as const,
    description: "APIs: the internet's unsung heroes (and sometimes villains). We build the bridges that let your apps talk to each other, securely and efficiently. Our APIs are robust, scalable, and well-documented (because nobody likes a cryptic API). Think of us as the digital matchmakers, connecting services and data.",
  },
];

const infrastructureServices = [
  {
    title: 'Cloud',
    iconType: 'cloud' as const,
    description: "Need a home for your awesome projects? We've got cloud space! (Azure and AWS – the industry giants). We deploy, manage, and scale your applications so they can handle the internet's adoring masses (or at least a few users). We make sure your projects are reliable, secure, and always available, so you can focus on building amazing things.. No more \"it works on my machine\" excuses. Your projects are out there, thriving in the cloud (hopefully).",
  },
  {
    title: 'Virtualization',
    iconType: 'virtualization' as const,
    description: "One computer? Nah, we can do better. Virtualization lets us slice and dice a single machine into multiple virtual ones. It's like having a party in your apartment and pretending each room is a different house. More efficient, less hardware clutter, and fewer arguments about who gets the last slice of pizza.",
  },
  {
    title: 'Data Center',
    iconType: 'datacenter' as const,
    description: "Giant warehouses full of servers, humming and blinking? That's a data center! It's where we keep all the hardware that powers your favorite websites and apps. Think of it as the internet's central nervous system, but with more air conditioning and fewer feelings.",
  },
  {
    title: 'Serverless and Microservices',
    iconType: 'serverless' as const,
    description: "Big, clunky applications? So yesterday. We're all about microservices – tiny, independent pieces that work together like a well-oiled (or occasionally glitching) machine. And with serverless, we don't even have to manage the servers! It's like magic, but with more code and less actual rabbits. We just focus on building cool features, not babysitting hardware. It's the future of development, or at least, it's a future of development.",
  },
];

const securityServices = [
  {
    title: 'DevSecOps',
    iconType: 'devsecops' as const,
    description: "Security shouldn't be an afterthought. DevSecOps is all about integrating security into the entire development process, from the first line of code to the final deployment. It's like building a house with reinforced walls and a really good security system, instead of just adding a lock to the front door after the burglars have already moved in.",
  },
  {
    title: 'Vulnerability Management',
    iconType: 'vulnerability' as const,
    description: "Found a hole in your website's defenses? Don't worry, we've got our digital patching kit ready. Vulnerability management is all about finding those weaknesses before the bad guys do. Think of it as regular checkups for your website, making sure everything is secure and up-to-date. Because nobody wants their website defaced with a picture of a rubber duck.",
  },
  {
    title: 'Cybersecurity',
    iconType: 'cybersecurity' as const,
    description: "Want your website to not get hacked? That's where we come in. We're the digital bouncers, keeping the cyber-criminals, script kiddies, and rogue squirrels away from your precious data. Think of us as the internet's immune system, fighting off viruses and other digital nasties. We'll help you sleep at night, knowing your website isn't being used to sell discount pharmaceuticals (unless that's your business model).",
  },
  {
    title: 'Networking',
    iconType: 'networking' as const,
    description: "Want your website to talk to other websites? That's networking! We're the digital plumbers, making sure all the connections are flowing smoothly. Think of it as building the internet's intricate highway system, so data can travel from point A to point B without getting lost (or stuck in traffic).",
  },
  {
    title: 'Auditing and Compliance',
    iconType: 'auditing' as const,
    description: "Want to avoid getting a visit from the internet police? We'll help you stay compliant with all the relevant regulations. Auditing and compliance is all about making sure we're doing things the right way, keeping your data safe and your business out of trouble. Think of us as the responsible adults of the internet, making sure everyone's playing nice (and following the rules).",
  },
];

const devopsServices = [
  {
    title: 'Monitoring',
    iconType: 'monitoring' as const,
    description: "Monitoring is like having a digital health check for your applications. We track key metrics and performance indicators to make sure everything is running smoothly. Think of it as the vital signs monitor for your systems, alerting us to any potential issues.",
  },
  {
    title: 'Logging',
    iconType: 'logging' as const,
    description: "Logs are like a detailed diary of everything that happens in your applications. They help us track down bugs, diagnose problems, and understand user behavior. Think of it as a digital detective's notebook, filled with clues.",
  },
  {
    title: 'Observability',
    iconType: 'observability' as const,
    description: "Want to understand the inner workings of your applications? Observability gives us deep insights into how your systems are behaving. It's not just what is happening, but why. Think of it as having a digital therapist for your applications.",
  },
  {
    title: 'Incident Management & Alerting',
    iconType: 'incident' as const,
    description: "Things break. It's a fact of life. Incident management and alerting ensures we know about it quickly, so we can fix it before it becomes a major problem. Think of us as the digital firefighters, always ready to put out the flames (hopefully before they spread).",
  },
  {
    title: 'Automation',
    iconType: 'automation' as const,
    description: "Want to automate all the tedious tasks that make your eyes glaze over? We can help. Automation lets us make computers do the boring stuff, so you can focus on the fun stuff (like brainstorming new cat video ideas).",
  },
  {
    title: 'Infrastructure as a Code',
    iconType: 'iac' as const,
    description: "Want to manage your infrastructure without pulling your hair out? IaC is the answer. We write code to define your servers, networks, and other digital bits and bobs. It's like having a blueprint for your entire infrastructure, so you can easily recreate it or make changes without resorting to duct tape and prayers.",
  },
];

const graphicsServices = [
  {
    title: 'Animation',
    iconType: 'animation' as const,
    description: "More than just moving pictures, animation is about imbuing images with personality and purpose. We craft narratives, evoke emotions, and build entire worlds through the art of motion. We're not just making things move; we're making them come alive.",
  },
  {
    title: 'Game Development',
    iconType: 'gamedev' as const,
    description: "Want to create the next big gaming sensation? We can help! From concept to coding to pixel-perfect polish, we bring your game ideas to life. We're talking character design, level creation, gameplay mechanics – all the ingredients for a truly addictive gaming experience. Just try not to blame us when your productivity plummets.",
  },
  {
    title: 'Digital Marketing',
    iconType: 'marketing' as const,
    description: "Got something amazing to offer? Digital marketing is how we convince the internet it's awesome. SEO, social media, targeted ads – we use all the digital wizardry to get your message heard (and hopefully, acted upon). Think of us as online hype machines, generating buzz and driving traffic to your digital doorstep.",
  },
];

const itSolutionsServices = [
  {
    title: 'Data Warehousing',
    iconType: 'datawarehouse' as const,
    description: "We create a calm, organized sanctuary for your data. No more messy spreadsheets or scattered databases. A data warehouse brings all your information together in one harmonious location, ready for analysis and exploration. Think of it as a spa for your data, where it can relax and be its best self.",
  },
  {
    title: 'Data Visualization',
    iconType: 'datavis' as const,
    description: "Numbers and spreadsheets can be boring. Data visualization turns that data into compelling charts, graphs, and dashboards. We make complex information easy to understand at a glance. Think of us as data artists, painting a picture with your data.",
  },
  {
    title: 'Data Transformation',
    iconType: 'datatransform' as const,
    description: "Raw data can be a real mess. Data transformation is like giving it a makeover, cleaning it up, and making it presentable. We wrangle the chaos, standardize formats, and convert it into a usable form for analysis. Think of us as digital chefs, turning raw ingredients into a delicious data dish.",
  },
];

const genAIServices = [
  {
    title: 'AI Integration',
    iconType: 'aiintegration' as const,
    description: "AI is great—until it refuses to cooperate with your systems. We seamlessly integrate AI into your workflows, so it actually helps instead of causing chaos. No tantrums, no compatibility nightmares—just smooth, efficient AI magic. And no, it probably won't take your job.",
  },
  {
    title: 'LLM Engineering',
    iconType: 'llm' as const,
    description: "Wish your AI understood context (or at least stopped being weird)? Our LLM engineering makes it smarter, sharper, and (hopefully) less awkward. Think of it as a brain upgrade—minus the ethical dilemmas. Just don't ask it for life advice… it's still working on that.",
  },
  {
    title: 'AI Agents',
    iconType: 'aiagents' as const,
    description: "Drowning in tasks? Our AI agents automate customer service, data entry, and more, so your team can focus on what humans do best (besides complaining about meetings). No office drama, no coffee breaks—just pure productivity. But don't give them too much power… you've seen the movies.",
  },
];

const Services = () => {
  useDocumentTitle('Services | ShubhzTechWork', 'Explore our technology services: cloud infrastructure, security, DevOps & SRE, graphics, IT solutions, and Gen AI.');
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">

      {/* Remotion Hero */}
      <section className="pt-28 pb-4 container mx-auto px-4">
        <ServicesHeroPlayer />
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {serviceCategories.map((svc, i) => (
            <motion.a
              key={svc.label}
              href={svc.hash}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(svc.hash)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-full text-sm font-semibold border transition-all hover:scale-105 active:scale-95 cursor-pointer border-primary/20 text-primary hover:bg-primary hover:text-white bg-primary/5"
            >
              {svc.label}
            </motion.a>
          ))}
        </div>
      </section>

      {/* Services Sections */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">

          {/* Full Stack Development 
          <div id="fullstack" className="mb-12 md:mb-24">
            <SectionTitle title="Full Stack Development" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {fullStackServices.map((service, index) => (
                <ServiceCard key={service.title} {...service} delay={index * 0.1} />
              ))}
            </div>
          </div>
          */}

          {/* Infrastructure */}
          <div id="infrastructure" className="mb-12 md:mb-24">
            <SectionTitle title="Infrastructure" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {infrastructureServices.map((service, index) => (
                <ServiceCard key={service.title} {...service} delay={index * 0.1} />
              ))}
            </div>
          </div>

          {/* Security */}
          <div id="security" className="mb-12 md:mb-24">
            <SectionTitle title="Security" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {securityServices.map((service, index) => (
                <ServiceCard key={service.title} {...service} delay={index * 0.1} />
              ))}
            </div>
          </div>

          {/* DevOps & SRE */}
          <div id="devops" className="mb-12 md:mb-24">
            <SectionTitle title="DevOps & SRE" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {devopsServices.map((service, index) => (
                <ServiceCard key={service.title} {...service} delay={index * 0.1} />
              ))}
            </div>
          </div>

          {/* Graphics */}
          <div id="graphics" className="mb-12 md:mb-24">
            <SectionTitle title="Graphics" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {graphicsServices.map((service, index) => (
                <ServiceCard key={service.title} {...service} delay={index * 0.1} />
              ))}
            </div>
          </div>

          {/* IT Solutions */}
          <div id="itsolutions" className="mb-12 md:mb-24">
            <SectionTitle title="ShubhzTechWork IT Solutions" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {itSolutionsServices.map((service, index) => (
                <ServiceCard key={service.title} {...service} delay={index * 0.1} />
              ))}
            </div>
          </div>

          {/* Gen AI */}
          <div id="genai">
            <SectionTitle title="Gen AI" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {genAIServices.map((service, index) => (
                <ServiceCard key={service.title} {...service} delay={index * 0.1} />
              ))}
            </div>
          </div>

        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
