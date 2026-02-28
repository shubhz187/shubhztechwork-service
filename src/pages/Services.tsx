import { useDocumentTitle } from '@/hooks/use-document-title';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SectionTitle } from '@/components/SectionTitle';
import { ServiceCard } from '@/components/ServiceCard';
import { motion } from 'framer-motion';
import { ServicesHeroPlayer } from '@/components/services/ServicesHeroPlayer';
import { ShieldCheck } from 'lucide-react';

const serviceCategories = [
  { label: 'Security', hash: '#security' },
  { label: 'Cloud & Infra', hash: '#infrastructure' },
  { label: 'DevOps & SRE', hash: '#devops' },
  { label: 'Graphics', hash: '#graphics' },
  { label: 'IT Solutions', hash: '#itsolutions' },
  { label: 'Gen AI', hash: '#genai' },
];

const securityServices = [
  {
    title: 'DevSecOps',
    iconType: 'devsecops' as const,
    description: 'Shift-left security embedded across CI/CD pipelines — SAST, DAST, container scanning, and policy-as-code from day one.',
  },
  {
    title: 'Vulnerability Management',
    iconType: 'vulnerability' as const,
    description: 'Continuous vulnerability scanning, risk-prioritized remediation, and patch management to shrink your attack surface.',
  },
  {
    title: 'Cybersecurity',
    iconType: 'cybersecurity' as const,
    description: 'End-to-end cybersecurity posture management — endpoint protection, SIEM, threat intelligence, and incident response.',
  },
  {
    title: 'Networking',
    iconType: 'networking' as const,
    description: 'Secure network architecture with micro-segmentation, Zero Trust access, firewalls, and encrypted traffic inspection.',
  },
  {
    title: 'Auditing & Compliance',
    iconType: 'auditing' as const,
    description: 'Regulatory compliance readiness for HIPAA, SOC 2, ISO 27001, and NIST — audit preparation, gap analysis, and remediation.',
  },
];

const infrastructureServices = [
  {
    title: 'Cloud',
    iconType: 'cloud' as const,
    description: 'Secure cloud deployments on AWS and Azure with compliance-ready architectures, autoscaling, and cost optimization.',
  },
  {
    title: 'Virtualization',
    iconType: 'virtualization' as const,
    description: 'Enterprise virtualization with isolated workloads, resource efficiency, and hardened hypervisor configurations.',
  },
  {
    title: 'Data Center',
    iconType: 'datacenter' as const,
    description: 'Data center design, migration, and management with redundancy, physical security, and disaster recovery built in.',
  },
  {
    title: 'Serverless & Microservices',
    iconType: 'serverless' as const,
    description: 'Event-driven serverless functions and containerized microservices for scalable, zero-trust application architectures.',
  },
];

const devopsServices = [
  {
    title: 'Monitoring',
    iconType: 'monitoring' as const,
    description: 'Real-time infrastructure and application monitoring with proactive alerting and SLA-driven dashboards.',
  },
  {
    title: 'Logging',
    iconType: 'logging' as const,
    description: 'Centralized log aggregation, retention, and search across distributed systems for security forensics and debugging.',
  },
  {
    title: 'Observability',
    iconType: 'observability' as const,
    description: 'Full-stack observability with traces, metrics, and logs correlated to accelerate root-cause analysis.',
  },
  {
    title: 'Incident Management & Alerting',
    iconType: 'incident' as const,
    description: 'Structured incident response with on-call routing, escalation policies, and blameless postmortems.',
  },
  {
    title: 'Automation',
    iconType: 'automation' as const,
    description: 'End-to-end workflow automation — from provisioning to deployment — reducing manual error and accelerating delivery.',
  },
  {
    title: 'Infrastructure as Code',
    iconType: 'iac' as const,
    description: 'Declarative infrastructure provisioning with Terraform, Pulumi, and Ansible for repeatable, auditable deployments.',
  },
];

const graphicsServices = [
  {
    title: 'Animation',
    iconType: 'animation' as const,
    description: 'Motion design and animated visuals that bring brands and products to life across web and video.',
  },
  {
    title: 'Game Development',
    iconType: 'gamedev' as const,
    description: 'Game design and development from concept to launch — mechanics, art, and cross-platform deployment.',
  },
  {
    title: 'Digital Marketing',
    iconType: 'marketing' as const,
    description: 'Data-driven digital marketing — SEO, paid media, and analytics to grow traffic and conversions.',
  },
];

const itSolutionsServices = [
  {
    title: 'Data Warehousing',
    iconType: 'datawarehouse' as const,
    description: 'Centralized data warehouse architecture for unified analytics, reporting, and compliance-ready data retention.',
  },
  {
    title: 'Data Visualization',
    iconType: 'datavis' as const,
    description: 'Interactive dashboards and visual analytics that transform complex data into actionable insights.',
  },
  {
    title: 'Data Transformation',
    iconType: 'datatransform' as const,
    description: 'ETL/ELT pipelines that clean, normalize, and transform raw data into analysis-ready datasets.',
  },
];

const genAIServices = [
  {
    title: 'AI Integration',
    iconType: 'aiintegration' as const,
    description: 'Seamless AI integration into existing workflows — APIs, model serving, and enterprise-grade inference pipelines.',
  },
  {
    title: 'LLM Engineering',
    iconType: 'llm' as const,
    description: 'LLM fine-tuning, prompt engineering, RAG architectures, and model evaluation for production-grade AI.',
  },
  {
    title: 'AI Agents',
    iconType: 'aiagents' as const,
    description: 'Autonomous AI agents for customer support, data processing, and workflow automation with human-in-the-loop guardrails.',
  },
];

const Services = () => {
  useDocumentTitle('Services | ShubhzTechWork', 'Security-first technology services: cybersecurity, cloud infrastructure, DevOps & SRE, IT solutions, and Gen AI.');
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

        {/* Security Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="container mx-auto px-4 mb-8"
        >
          <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-xl border border-primary/15 bg-primary/5 text-sm text-muted-foreground">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <span className="text-center">
              <span className="font-semibold text-foreground">Security-first engineering</span>
              {' '}&mdash; HIPAA-ready &middot; Zero Trust &middot; SOC 2 aligned &middot; 24/7 threat-aware
            </span>
          </div>
        </motion.div>

        {/* Services Sections */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">

            {/* Security — First */}
            <div id="security" className="mb-12 md:mb-24">
              <SectionTitle title="Security" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {securityServices.map((service, index) => (
                  <ServiceCard key={service.title} {...service} delay={index * 0.1} />
                ))}
              </div>
            </div>

            {/* Infrastructure */}
            <div id="infrastructure" className="mb-12 md:mb-24">
              <SectionTitle title="Infrastructure" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {infrastructureServices.map((service, index) => (
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
              <SectionTitle title="IT Solutions" />
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
