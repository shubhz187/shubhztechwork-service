import { TechIconType } from './techIcons';

export interface Technology {
  name: string;
  description: string;
  iconType: TechIconType;
}

export interface TechCategory {
  id: string;
  label: string;
  technologies: Technology[];
}

export const techCategories: TechCategory[] = [
  {
    id: 'cloud',
    label: 'Cloud & Infra',
    technologies: [
      { name: 'AWS', description: 'Deployed and scaled applications on cloud infrastructure', iconType: 'aws' },
      { name: 'Microsoft Azure', description: 'Managed cloud services and enterprise solutions', iconType: 'azure' },
      { name: 'Google Cloud', description: "Built and optimized workloads on Google's cloud", iconType: 'gcp' },
      { name: 'Digital Ocean', description: 'Simple, scalable, and cost-effective cloud infrastructure', iconType: 'digitalocean' },
      { name: 'VMware', description: 'Virtualization and cloud computing for enterprise IT modernization', iconType: 'vmware' },
      { name: 'OpenShift', description: 'Kubernetes-based platform simplifying container deployment and management', iconType: 'openshift' },
      { name: 'AWS Lambda', description: 'Serverless compute for event-driven applications without managing servers', iconType: 'awslambda' },
      { name: 'Amazon S3', description: 'Scalable object storage for data backup, archival, and analytics', iconType: 's3' },
      { name: 'DynamoDB', description: 'Fully managed NoSQL database for high-performance applications', iconType: 'dynamodb' },
      { name: 'Azure Entra ID', description: 'Cloud-based identity and access management for enterprise security', iconType: 'entraid' },
      { name: 'Intune', description: 'Cloud endpoint management for devices, apps, and compliance policies', iconType: 'intune' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & SRE',
    technologies: [
      { name: 'Docker', description: 'Container platform for building, shipping, and running applications', iconType: 'docker' },
      { name: 'Kubernetes', description: 'Container orchestration automating deployment, scaling, and management', iconType: 'kubernetes' },
      { name: 'Terraform', description: 'Infrastructure as code for declarative cloud provisioning', iconType: 'terraform' },
      { name: 'Jenkins', description: 'Open-source automation server for CI/CD pipelines', iconType: 'jenkins' },
      { name: 'Ansible', description: 'Agentless automation for configuration management and deployment', iconType: 'ansible' },
      { name: 'Pulumi', description: 'Infrastructure as code using general-purpose programming languages', iconType: 'pulumi' },
      { name: 'CI/CD', description: 'Continuous integration and deployment for automated software delivery', iconType: 'cicd' },
      { name: 'GitHub Actions', description: 'Workflow automation directly integrated with GitHub repositories', iconType: 'githubactions' },
      { name: 'ArgoCD', description: 'GitOps continuous delivery tool for Kubernetes deployments', iconType: 'argocd' },
      { name: 'Helm', description: 'Kubernetes package manager for templated application deployments', iconType: 'helm' },
      { name: 'NGINX', description: 'High-performance web server, reverse proxy, and load balancer', iconType: 'nginx' },
      { name: 'Linux', description: 'Open-source operating system powering servers and cloud infrastructure', iconType: 'linux' },
      { name: 'Bash / PowerShell', description: 'Shell scripting for automation, system admin, and task orchestration', iconType: 'bash' },
      { name: 'Python', description: 'Versatile language for scripting, automation, and backend development', iconType: 'python' },
    ],
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    technologies: [
      { name: 'CloudWatch', description: 'AWS monitoring for applications and infrastructure metrics', iconType: 'cloudwatch' },
      { name: 'Azure Monitor', description: 'Telemetry collection and analysis for Azure environments', iconType: 'azuremonitor' },
      { name: 'ELK Stack', description: 'Centralized logging and analytics with Elasticsearch, Logstash, Kibana', iconType: 'elk' },
      { name: 'Prometheus', description: 'Open-source monitoring and alerting toolkit for time-series metrics', iconType: 'prometheus' },
      { name: 'Grafana', description: 'Visualization and dashboarding for metrics from multiple data sources', iconType: 'grafana' },
      { name: 'OpenTelemetry', description: 'Vendor-neutral observability framework for traces, metrics, and logs', iconType: 'opentelemetry' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    technologies: [
      { name: 'Cybersecurity', description: 'Protecting systems, networks, and data from cyber threats and attacks', iconType: 'cybersecurity' },
      { name: 'DevSecOps', description: 'Security-first approach integrated into DevOps workflows', iconType: 'devsecops' },
      { name: 'Auditing', description: 'Ensuring adherence to security policies, regulations, and standards', iconType: 'auditing' },
      { name: 'Vuln Management', description: 'Identifying, assessing, and mitigating security weaknesses', iconType: 'vulnerability' },
      { name: 'CrowdStrike', description: 'Cloud-native endpoint protection and threat intelligence platform', iconType: 'crowdstrike' },
      { name: 'Zscaler', description: 'Zero trust cloud security for internet and private access', iconType: 'zscaler' },
      { name: 'CyberArk', description: 'Privileged access management and identity security solutions', iconType: 'cyberark' },
      { name: 'MS Defender', description: 'Enterprise threat protection across endpoints, identities, and cloud', iconType: 'defender' },
      { name: 'Wazuh / SIEM', description: 'Open-source security monitoring, intrusion detection, and compliance', iconType: 'wazuh' },
      { name: 'Nessus / Qualys', description: 'Vulnerability scanning and assessment for security posture management', iconType: 'nessus' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    technologies: [
      { name: 'MySQL', description: 'Efficient and scalable relational database solutions', iconType: 'mysql' },
      { name: 'PostgreSQL', description: 'Advanced relational database with powerful SQL capabilities', iconType: 'postgresql' },
      { name: 'Oracle', description: 'Enterprise-grade database with high availability and optimization', iconType: 'oracle' },
      { name: 'MongoDB', description: 'NoSQL document-based data storage for flexible schemas', iconType: 'mongodb' },
      { name: 'Redis', description: 'In-memory data store for high-speed caching and real-time processing', iconType: 'redis' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & LLM',
    technologies: [
      { name: 'Agentic AI', description: 'Autonomous AI systems that perceive, reason, and act towards goals', iconType: 'agenticai' },
      { name: 'LLM Engineering', description: 'Optimizing, fine-tuning, and deploying large language models', iconType: 'llmengineering' },
      { name: 'AI Integration', description: 'Seamlessly incorporating AI into existing systems and workflows', iconType: 'aiintegration' },
      { name: 'AWS Bedrock', description: 'Managed service for building generative AI applications on AWS', iconType: 'bedrock' },
      { name: 'Azure OpenAI', description: 'Enterprise-grade access to OpenAI models via Azure cloud', iconType: 'azureopenai' },
      { name: 'Vertex AI', description: 'Google Cloud ML platform for building and deploying AI models', iconType: 'vertexai' },
      { name: 'LangChain', description: 'Framework for building applications powered by language models', iconType: 'langchain' },
      { name: 'LangGraph', description: 'Graph-based orchestration for multi-agent LLM workflows', iconType: 'langgraph' },
      { name: 'Ollama', description: 'Run large language models locally with simple deployment', iconType: 'ollama' },
      { name: 'FAISS', description: 'High-performance similarity search and vector clustering library', iconType: 'faiss' },
      { name: 'RAG / Vector DB', description: 'Retrieval-augmented generation with vector database integration', iconType: 'ragvectordb' },
    ],
  },
  {
    id: 'contactcenter',
    label: 'Contact Center',
    technologies: [
      { name: 'Amazon Connect', description: 'Cloud-based contact center service for customer engagement', iconType: 'amazonconnect' },
      { name: 'Amazon Lex', description: 'Conversational AI for building chatbots and voice interfaces', iconType: 'amazonlex' },
      { name: 'AWS STS', description: 'Temporary security credentials for cross-account and federated access', iconType: 'awssts' },
      { name: 'API Gateway', description: 'Managed API gateway for creating, publishing, and securing APIs', iconType: 'apigateway' },
    ],
  },
];
