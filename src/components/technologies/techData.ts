export interface Technology {
  name: string;
  description: string;
}

export interface TechCategory {
  id: string;
  label: string;
  technologies: Technology[];
}

export const techCategories: TechCategory[] = [
  {
    id: "cloud",
    label: "Cloud & Infra",
    technologies: [
      { name: "AWS", description: "Deployed and scaled applications on cloud infrastructure" },
      { name: "Microsoft Azure", description: "Managed cloud services and enterprise solutions" },
      { name: "Google Cloud", description: "Built and optimized workloads on Google's cloud" },
      { name: "Digital Ocean", description: "Simple, scalable, and cost-effective cloud infrastructure" },
      { name: "VMware", description: "Virtualization and cloud computing for enterprise IT" },
      { name: "OpenShift", description: "Kubernetes-based platform for container deployment" },
      { name: "AWS Lambda", description: "Serverless compute for event-driven applications" },
      { name: "Amazon S3", description: "Scalable object storage for data backup and analytics" },
      { name: "DynamoDB", description: "Fully managed NoSQL database for high-performance apps" },
      { name: "Azure Entra ID", description: "Cloud-based identity and access management" },
      { name: "Intune", description: "Cloud endpoint management for devices and apps" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & SRE",
    technologies: [
      { name: "Docker", description: "Container platform for building, shipping, and running applications" },
      { name: "Kubernetes", description: "Container orchestration automating deployment and scaling" },
      { name: "Terraform", description: "Infrastructure as code for declarative cloud provisioning" },
      { name: "Jenkins", description: "Open-source automation server for CI/CD pipelines" },
      { name: "Ansible", description: "Agentless automation for configuration management" },
      { name: "Pulumi", description: "Infrastructure as code using general-purpose programming languages" },
      { name: "CI/CD", description: "Continuous integration and deployment for automated delivery" },
      { name: "GitHub Actions", description: "Workflow automation integrated with GitHub repositories" },
      { name: "ArgoCD", description: "GitOps continuous delivery tool for Kubernetes" },
      { name: "Helm", description: "Kubernetes package manager for templated deployments" },
      { name: "NGINX", description: "High-performance web server and reverse proxy" },
      { name: "Linux", description: "Open-source OS powering servers and cloud infrastructure" },
      { name: "Bash / PowerShell", description: "Shell scripting for automation and orchestration" },
      { name: "Python", description: "Versatile language for scripting, automation, and backend" },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring",
    technologies: [
      { name: "CloudWatch", description: "AWS monitoring for applications and infrastructure metrics" },
      { name: "Azure Monitor", description: "Telemetry collection and analysis for Azure" },
      { name: "ELK Stack", description: "Centralized logging with Elasticsearch, Logstash, Kibana" },
      { name: "Prometheus", description: "Open-source monitoring and alerting toolkit" },
      { name: "Grafana", description: "Visualization and dashboarding for metrics" },
      { name: "OpenTelemetry", description: "Vendor-neutral observability framework" },
    ],
  },
  {
    id: "security",
    label: "Security",
    technologies: [
      { name: "Cybersecurity", description: "Protecting systems, networks, and data from threats" },
      { name: "DevSecOps", description: "Security integrated into DevOps workflows" },
      { name: "Auditing", description: "Ensuring adherence to security policies and regulations" },
      { name: "Vuln Management", description: "Identifying, assessing, and mitigating weaknesses" },
      { name: "CrowdStrike", description: "Cloud-native endpoint protection and threat intelligence" },
      { name: "Zscaler", description: "Zero-trust cloud security for internet and private access" },
      { name: "CyberArk", description: "Privileged access management and identity security" },
      { name: "MS Defender", description: "Enterprise threat protection across endpoints" },
      { name: "Wazuh / SIEM", description: "Security monitoring, intrusion detection, and compliance" },
      { name: "Nessus / Qualys", description: "Vulnerability scanning and assessment" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    technologies: [
      { name: "MySQL", description: "Efficient and scalable relational database solutions" },
      { name: "PostgreSQL", description: "Advanced relational database with powerful SQL capabilities" },
      { name: "Oracle", description: "Enterprise-grade database with high availability" },
      { name: "MongoDB", description: "NoSQL document-based data storage for flexible schemas" },
      { name: "Redis", description: "In-memory data store for caching and real-time processing" },
    ],
  },
  {
    id: "ai",
    label: "AI & LLM",
    technologies: [
      { name: "Agentic AI", description: "Autonomous AI systems that perceive, reason, and act" },
      { name: "LLM Engineering", description: "Optimizing, fine-tuning, and deploying language models" },
      { name: "AI Integration", description: "Incorporating AI into existing systems and workflows" },
      { name: "AWS Bedrock", description: "Managed service for building generative AI on AWS" },
      { name: "Azure OpenAI", description: "Enterprise-grade access to OpenAI models via Azure" },
      { name: "Vertex AI", description: "Google Cloud ML platform for building AI models" },
      { name: "LangChain", description: "Framework for building applications powered by LLMs" },
      { name: "LangGraph", description: "Graph-based orchestration for multi-agent LLM workflows" },
      { name: "Ollama", description: "Run large language models locally" },
      { name: "FAISS", description: "High-performance similarity search and vector clustering" },
      { name: "RAG / Vector DB", description: "Retrieval-augmented generation with vector DBs" },
    ],
  },
  {
    id: "contactcenter",
    label: "Contact Center",
    technologies: [
      { name: "Amazon Connect", description: "Cloud-based contact center for customer engagement" },
      { name: "Amazon Lex", description: "Conversational AI for chatbots and voice interfaces" },
      { name: "AWS STS", description: "Temporary security credentials for federated access" },
      { name: "API Gateway", description: "Managed API gateway for creating and securing APIs" },
    ],
  },
];
