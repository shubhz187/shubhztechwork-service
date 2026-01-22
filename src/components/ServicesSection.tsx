import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle';
import { TechCard } from './TechCard';

const fullStackTech = [
  {
    name: 'Web Development',
    description: 'Built responsive, scalable, and secure full-stack web applications using modern frameworks, databases, and cloud technologies',
    image: 'https://cdn-icons-png.flaticon.com/512/1336/1336494.png',
  },
  {
    name: 'React.js',
    description: 'Built dynamic and reusable UI components with a virtual DOM.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png',
  },
  {
    name: 'Angular',
    description: 'Developed scalable enterprise-grade SPAs with TypeScript',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
  },
  {
    name: 'Vue.js',
    description: 'Created lightweight and reactive web applications efficiently',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png',
  },
  {
    name: 'Node.JS',
    description: 'Built fast and scalable server-side applications using JavaScript.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png',
  },
  {
    name: 'Django',
    description: 'Developed secure, database-driven web applications with Python.',
    image: 'https://static.djangoproject.com/img/logos/django-logo-positive.png',
  },
];

const infrastructureTech = [
  {
    name: 'AWS',
    description: 'Deployed and scaled applications on cloud infrastructure',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png',
  },
  {
    name: 'Microsoft Azure',
    description: 'Managed cloud services and enterprise solutions',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/1200px-Microsoft_Azure.svg.png',
  },
  {
    name: 'Google Cloud Platform',
    description: 'Built and optimized workloads on Google\'s cloud',
    image: 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg',
  },
  {
    name: 'Digital Ocean',
    description: 'A cloud computing platform offering simple, scalable, and cost-effective infrastructure solutions for developers and businesses.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/DigitalOcean_logo.svg/2560px-DigitalOcean_logo.svg.png',
  },
  {
    name: 'VMware',
    description: 'A leading virtualization technology provider offering solutions for cloud computing, software-defined data centers, and enterprise IT modernization.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vmware.svg/2560px-Vmware.svg.png',
  },
  {
    name: 'OpenShift',
    description: 'A Kubernetes-based container platform by Red Hat that simplifies application deployment, scaling, and management.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/OpenShift-LogoType.svg/2560px-OpenShift-LogoType.svg.png',
  },
];

const databaseTech = [
  {
    name: 'MySQL',
    description: 'Designed efficient and scalable database solutions',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/MySQL_logo.svg/2560px-MySQL_logo.svg.png',
  },
  {
    name: 'PostgreSQL',
    description: 'Managed relational databases with powerful SQL capabilities',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1985px-Postgresql_elephant.svg.png',
  },
  {
    name: 'Oracle',
    description: 'Managed enterprise-grade databases, optimized queries, and ensured high availability using Oracle Database solutions.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/2560px-Oracle_logo.svg.png',
  },
  {
    name: 'MongoDB',
    description: 'Handled NoSQL document-based data storage effectively',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png',
  },
  {
    name: 'Redis',
    description: 'Implemented high-speed caching and real-time data processing',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Redis_Logo.svg/2560px-Redis_Logo.svg.png',
  },
];

const devopsTech = [
  {
    name: 'Terraform',
    description: 'Defined and deployed infrastructure with a declarative approach',
    image: 'https://www.datocms-assets.com/2885/1620155116-brandhcterraformverticalcolor.svg',
  },
  {
    name: 'Kubernetes',
    description: 'An open-source container orchestration platform that automates deployment, scaling, and management of containerized applications',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/2109px-Kubernetes_logo_without_workmark.svg.png',
  },
  {
    name: 'Jenkins',
    description: 'A widely used open-source automation server that facilitates continuous integration and continuous delivery (CI/CD) pipelines',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Jenkins_logo.svg/1200px-Jenkins_logo.svg.png',
  },
  {
    name: 'Ansible',
    description: 'Managed infrastructure using code in various programming languages',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Ansible_logo.svg/1664px-Ansible_logo.svg.png',
  },
  {
    name: 'Pulumi',
    description: 'Automated IT configurations and infrastructure provisioning',
    image: 'https://www.pulumi.com/logos/brand/avatar-on-white.svg',
  },
  {
    name: 'CI/CD',
    description: 'A software development approach integrating Continuous Integration and Continuous Deployment to automate code testing and delivery.',
    image: 'https://cdn-icons-png.flaticon.com/512/6577/6577286.png',
  },
];

const monitoringTech = [
  {
    name: 'CloudWatch',
    description: 'Monitored AWS applications and infrastructure',
    image: 'https://cdn.worldvectorlogo.com/logos/aws-cloudwatch.svg',
  },
  {
    name: 'Azure Monitor',
    description: 'Collected and analyzed telemetry for Azure environments',
    image: 'https://cdn.worldvectorlogo.com/logos/azure-monitor.svg',
  },
  {
    name: 'ELK Stack',
    description: 'Provided observability for cloud services with centralized logging and analytics',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Elasticsearch_logo.svg/1280px-Elasticsearch_logo.svg.png',
  },
];

const securityTech = [
  {
    name: 'Cybersecurity',
    description: 'The practice of protecting systems, networks, and data from cyber threats, attacks, and unauthorized access.',
    image: 'https://cdn-icons-png.flaticon.com/512/2092/2092757.png',
  },
  {
    name: 'DevSecOps',
    description: 'A security-focused approach integrating security practices into DevOps workflows to ensure secure software development and deployment.',
    image: 'https://cdn-icons-png.flaticon.com/512/6213/6213731.png',
  },
  {
    name: 'Auditing & Compliance',
    description: 'The practice of reviewing and ensuring adherence to security policies, regulations, and industry standards.',
    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
  {
    name: 'Vulnerability Management',
    description: 'The continuous process of identifying, assessing, prioritizing, and mitigating security weaknesses in systems and software.',
    image: 'https://cdn-icons-png.flaticon.com/512/1161/1161388.png',
  },
];

const genAITech = [
  {
    name: 'Agentic AI',
    description: 'AI systems designed to autonomously perceive, reason, and act towards achieving specific goals with minimal human intervention',
    image: 'https://cdn-icons-png.flaticon.com/512/8637/8637099.png',
  },
  {
    name: 'LLM Engineering',
    description: 'The practice of optimizing, fine-tuning, and deploying large language models (LLMs) for various AI-driven applications',
    image: 'https://cdn-icons-png.flaticon.com/512/8637/8637457.png',
  },
  {
    name: 'AI Integration',
    description: 'The seamless incorporation of AI technologies into existing systems and workflows to enhance automation, decision-making, and efficiency',
    image: 'https://cdn-icons-png.flaticon.com/512/8637/8637562.png',
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Full Stack Section */}
        <div id="fullstack" className="mb-24">
          <SectionTitle title="Full Stack" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fullStackTech.map((tech, index) => (
              <TechCard
                key={tech.name}
                {...tech}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Infrastructure Section */}
        <div id="infrastructure" className="mb-24">
          <SectionTitle title="Infrastructure" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructureTech.map((tech, index) => (
              <TechCard
                key={tech.name}
                {...tech}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* DevOps Section */}
        <div id="devops" className="mb-24">
          <SectionTitle title="DevOps" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devopsTech.map((tech, index) => (
              <TechCard
                key={tech.name}
                {...tech}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Monitoring and Logging Section */}
        <div className="mb-24">
          <SectionTitle title="Monitoring and Logging" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monitoringTech.map((tech, index) => (
              <TechCard
                key={tech.name}
                {...tech}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div id="security" className="mb-24">
          <SectionTitle title="Security" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityTech.map((tech, index) => (
              <TechCard
                key={tech.name}
                {...tech}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Databases Section */}
        <div id="databases" className="mb-24">
          <SectionTitle title="Databases" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {databaseTech.map((tech, index) => (
              <TechCard
                key={tech.name}
                {...tech}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Gen AI Section */}
        <div id="genai">
          <SectionTitle title="Gen AI" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {genAITech.map((tech, index) => (
              <TechCard
                key={tech.name}
                {...tech}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
