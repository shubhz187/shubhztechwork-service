import { ComponentType } from "react";
import {
  SiAmazonwebservices, SiGooglecloud, SiDigitalocean, SiVmware, SiRedhatopenshift,
  SiAwslambda, SiAmazons3, SiAmazondynamodb,
  SiDocker, SiKubernetes, SiTerraform, SiJenkins, SiAnsible, SiPulumi,
  SiGithubactions, SiArgo, SiHelm, SiNginx, SiLinux, SiGnubash, SiPython,
  SiAmazoncloudwatch, SiElastic, SiPrometheus, SiGrafana, SiOpentelemetry,
  SiMysql, SiPostgresql, SiOracle, SiMongodb, SiRedis,
  SiLangchain, SiOllama,
} from "react-icons/si";
import { Cloud, Shield, Lock, Activity, Database, Bot, Brain, Sparkles, Headphones, Server } from "lucide-react";

/** Map technology name → brand logo. Falls back to a themed lucide icon per
 *  category for anything not in this table. */
const map: Record<string, ComponentType<{ className?: string; size?: number }>> = {
  AWS: SiAmazonwebservices,
  "Microsoft Azure": Cloud,
  "Google Cloud": SiGooglecloud,
  "Digital Ocean": SiDigitalocean,
  VMware: SiVmware,
  OpenShift: SiRedhatopenshift,
  "AWS Lambda": SiAwslambda,
  "Amazon S3": SiAmazons3,
  DynamoDB: SiAmazondynamodb,
  "Azure Entra ID": Shield,
  Intune: Server,

  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  Jenkins: SiJenkins,
  Ansible: SiAnsible,
  Pulumi: SiPulumi,
  "CI/CD": Activity,
  "GitHub Actions": SiGithubactions,
  ArgoCD: SiArgo,
  Helm: SiHelm,
  NGINX: SiNginx,
  Linux: SiLinux,
  "Bash / PowerShell": SiGnubash,
  Python: SiPython,

  CloudWatch: SiAmazoncloudwatch,
  "Azure Monitor": Activity,
  "ELK Stack": SiElastic,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
  OpenTelemetry: SiOpentelemetry,

  Cybersecurity: Shield,
  DevSecOps: Shield,
  Auditing: Lock,
  "Vuln Management": Lock,
  CrowdStrike: Shield,
  Zscaler: Shield,
  CyberArk: Lock,
  "MS Defender": Shield,
  "Wazuh / SIEM": Shield,
  "Nessus / Qualys": Lock,

  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  Oracle: SiOracle,
  MongoDB: SiMongodb,
  Redis: SiRedis,

  "Agentic AI": Bot,
  "LLM Engineering": Brain,
  "AI Integration": Sparkles,
  "AWS Bedrock": Sparkles,
  "Azure OpenAI": Sparkles,
  "Vertex AI": Sparkles,
  LangChain: SiLangchain,
  LangGraph: Sparkles,
  Ollama: SiOllama,
  FAISS: Brain,
  "RAG / Vector DB": Database,

  "Amazon Connect": Headphones,
  "Amazon Lex": Headphones,
  "AWS STS": Shield,
  "API Gateway": Activity,
};

const fallbackByCategory: Record<string, ComponentType<{ className?: string; size?: number }>> = {
  cloud: Cloud,
  devops: Activity,
  monitoring: Activity,
  security: Shield,
  databases: Database,
  ai: Sparkles,
  contactcenter: Headphones,
};

export const getTechLogo = (name: string, categoryId: string) =>
  map[name] ?? fallbackByCategory[categoryId] ?? Cloud;
