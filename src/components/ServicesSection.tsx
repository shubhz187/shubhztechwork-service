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

        {/* Databases Section */}
        <div id="databases">
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
      </div>
    </section>
  );
};
