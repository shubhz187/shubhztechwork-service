import {
  SiAmazonwebservices,
  SiGooglecloud,
  SiDigitalocean,
  SiVmware,
  SiRedhatopenshift,
  SiAwslambda,
  SiAmazons3,
  SiAmazondynamodb,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiAnsible,
  SiPulumi,
  SiGithubactions,
  SiArgo,
  SiHelm,
  SiNginx,
  SiLinux,
  SiGnubash,
  SiPython,
  SiAmazoncloudwatch,
  SiElasticsearch,
  SiPrometheus,
  SiGrafana,
  SiOpentelemetry,
  SiMysql,
  SiPostgresql,
  SiOracle,
  SiMongodb,
  SiRedis,
  SiOpenai,
  SiLangchain,
  SiOllama,
  SiAmazonapigateway,
} from 'react-icons/si';

import {
  Cloud,
  KeyRound,
  Smartphone,
  GitBranch,
  Activity,
  ShieldCheck,
  ShieldAlert,
  ClipboardCheck,
  Bug,
  Shield,
  Globe,
  Lock,
  ShieldHalf,
  Eye,
  ScanLine,
  Bot,
  Brain,
  Puzzle,
  Layers,
  Sparkles,
  Network,
  Search,
  DatabaseZap,
  Headphones,
  MessageSquare,
  Key,
} from 'lucide-react';

export type TechIconType =
  // Cloud & Infrastructure
  | 'aws' | 'azure' | 'gcp' | 'digitalocean' | 'vmware' | 'openshift'
  | 'awslambda' | 's3' | 'dynamodb' | 'entraid' | 'intune'
  // DevOps & SRE
  | 'docker' | 'kubernetes' | 'terraform' | 'jenkins' | 'ansible' | 'pulumi' | 'cicd'
  | 'githubactions' | 'argocd' | 'helm' | 'nginx' | 'linux' | 'bash' | 'python'
  // Monitoring & Observability
  | 'cloudwatch' | 'azuremonitor' | 'elk' | 'prometheus' | 'grafana' | 'opentelemetry'
  // Security
  | 'cybersecurity' | 'devsecops' | 'auditing' | 'vulnerability'
  | 'crowdstrike' | 'zscaler' | 'cyberark' | 'defender' | 'wazuh' | 'nessus'
  // Databases
  | 'mysql' | 'postgresql' | 'oracle' | 'mongodb' | 'redis'
  // AI & LLM
  | 'agenticai' | 'llmengineering' | 'aiintegration'
  | 'bedrock' | 'azureopenai' | 'vertexai' | 'langchain' | 'langgraph' | 'ollama' | 'faiss' | 'ragvectordb'
  // Contact Center
  | 'amazonconnect' | 'amazonlex' | 'awssts' | 'apigateway';

interface TechIconEntry {
  icon: React.ReactElement;
  color: string;
}

const SIZE = 32;

export const techIconMap: Record<TechIconType, TechIconEntry> = {
  // ── Cloud & Infrastructure ──
  aws:          { icon: <SiAmazonwebservices size={SIZE} />,  color: '#FF9900' },
  azure:        { icon: <Cloud size={SIZE} />,                color: '#0078D4' },
  gcp:          { icon: <SiGooglecloud size={SIZE} />,        color: '#4285F4' },
  digitalocean: { icon: <SiDigitalocean size={SIZE} />,       color: '#0080FF' },
  vmware:       { icon: <SiVmware size={SIZE} />,             color: '#607D8B' },
  openshift:    { icon: <SiRedhatopenshift size={SIZE} />,    color: '#EE0000' },
  awslambda:    { icon: <SiAwslambda size={SIZE} />,          color: '#FF9900' },
  s3:           { icon: <SiAmazons3 size={SIZE} />,           color: '#569A31' },
  dynamodb:     { icon: <SiAmazondynamodb size={SIZE} />,     color: '#4053D6' },
  entraid:      { icon: <KeyRound size={SIZE} />,             color: '#0078D4' },
  intune:       { icon: <Smartphone size={SIZE} />,           color: '#0078D4' },

  // ── DevOps & SRE ──
  docker:        { icon: <SiDocker size={SIZE} />,            color: '#2496ED' },
  kubernetes:    { icon: <SiKubernetes size={SIZE} />,        color: '#326CE5' },
  terraform:     { icon: <SiTerraform size={SIZE} />,         color: '#844FBA' },
  jenkins:       { icon: <SiJenkins size={SIZE} />,           color: '#D24939' },
  ansible:       { icon: <SiAnsible size={SIZE} />,           color: '#EE0000' },
  pulumi:        { icon: <SiPulumi size={SIZE} />,            color: '#8A3391' },
  cicd:          { icon: <GitBranch size={SIZE} />,           color: '#F97316' },
  githubactions: { icon: <SiGithubactions size={SIZE} />,     color: '#2088FF' },
  argocd:        { icon: <SiArgo size={SIZE} />,              color: '#EF7B4D' },
  helm:          { icon: <SiHelm size={SIZE} />,              color: '#0F1689' },
  nginx:         { icon: <SiNginx size={SIZE} />,             color: '#009639' },
  linux:         { icon: <SiLinux size={SIZE} />,             color: '#FCC624' },
  bash:          { icon: <SiGnubash size={SIZE} />,           color: '#4EAA25' },
  python:        { icon: <SiPython size={SIZE} />,            color: '#3776AB' },

  // ── Monitoring & Observability ──
  cloudwatch:    { icon: <SiAmazoncloudwatch size={SIZE} />,  color: '#FF4F8B' },
  azuremonitor:  { icon: <Activity size={SIZE} />,            color: '#0078D4' },
  elk:           { icon: <SiElasticsearch size={SIZE} />,     color: '#005571' },
  prometheus:    { icon: <SiPrometheus size={SIZE} />,        color: '#E6522C' },
  grafana:       { icon: <SiGrafana size={SIZE} />,           color: '#F46800' },
  opentelemetry: { icon: <SiOpentelemetry size={SIZE} />,     color: '#F5A800' },

  // ── Security ──
  cybersecurity: { icon: <ShieldCheck size={SIZE} />,         color: '#EF4444' },
  devsecops:     { icon: <ShieldAlert size={SIZE} />,         color: '#F97316' },
  auditing:      { icon: <ClipboardCheck size={SIZE} />,      color: '#8B5CF6' },
  vulnerability: { icon: <Bug size={SIZE} />,                 color: '#EF4444' },
  crowdstrike:   { icon: <Shield size={SIZE} />,              color: '#FF4438' },
  zscaler:       { icon: <Globe size={SIZE} />,               color: '#0090D1' },
  cyberark:      { icon: <Lock size={SIZE} />,                color: '#24B8D0' },
  defender:      { icon: <ShieldHalf size={SIZE} />,          color: '#0078D4' },
  wazuh:         { icon: <Eye size={SIZE} />,                 color: '#3AABE6' },
  nessus:        { icon: <ScanLine size={SIZE} />,            color: '#00B388' },

  // ── Databases ──
  mysql:      { icon: <SiMysql size={SIZE} />,      color: '#4479A1' },
  postgresql: { icon: <SiPostgresql size={SIZE} />,  color: '#4169E1' },
  oracle:     { icon: <SiOracle size={SIZE} />,      color: '#F80000' },
  mongodb:    { icon: <SiMongodb size={SIZE} />,     color: '#47A248' },
  redis:      { icon: <SiRedis size={SIZE} />,       color: '#FF4438' },

  // ── AI & LLM ──
  agenticai:      { icon: <Bot size={SIZE} />,              color: '#A855F7' },
  llmengineering: { icon: <Brain size={SIZE} />,            color: '#EC4899' },
  aiintegration:  { icon: <Puzzle size={SIZE} />,           color: '#8B5CF6' },
  bedrock:        { icon: <Layers size={SIZE} />,           color: '#FF9900' },
  azureopenai:    { icon: <SiOpenai size={SIZE} />,         color: '#412991' },
  vertexai:       { icon: <Sparkles size={SIZE} />,         color: '#4285F4' },
  langchain:      { icon: <SiLangchain size={SIZE} />,      color: '#1C3C3C' },
  langgraph:      { icon: <Network size={SIZE} />,          color: '#10B981' },
  ollama:         { icon: <SiOllama size={SIZE} />,         color: '#FFFFFF' },
  faiss:          { icon: <Search size={SIZE} />,           color: '#4285F4' },
  ragvectordb:    { icon: <DatabaseZap size={SIZE} />,      color: '#06B6D4' },

  // ── Contact Center ──
  amazonconnect: { icon: <Headphones size={SIZE} />,        color: '#FF9900' },
  amazonlex:     { icon: <MessageSquare size={SIZE} />,     color: '#FF9900' },
  awssts:        { icon: <Key size={SIZE} />,               color: '#DD344C' },
  apigateway:    { icon: <SiAmazonapigateway size={SIZE} />,color: '#FF4F8B' },
};
