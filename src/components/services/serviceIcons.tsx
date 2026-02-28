import {
  Cloud,
  Layers,
  Server,
  Zap,
  ShieldCheck,
  ScanSearch,
  Lock,
  Network,
  ClipboardCheck,
  Activity,
  FileText,
  Eye,
  AlertTriangle,
  Cog,
  Terminal,
  Play,
  Gamepad2,
  TrendingUp,
  Database,
  BarChart3,
  ArrowLeftRight,
  Puzzle,
  Brain,
  Bot,
} from 'lucide-react';

export type ServiceIconType =
  | 'cloud' | 'virtualization' | 'datacenter' | 'serverless'
  | 'devsecops' | 'vulnerability' | 'cybersecurity' | 'networking' | 'auditing'
  | 'monitoring' | 'logging' | 'observability' | 'incident' | 'automation' | 'iac'
  | 'animation' | 'gamedev' | 'marketing'
  | 'datawarehouse' | 'datavis' | 'datatransform'
  | 'aiintegration' | 'llm' | 'aiagents';

interface ServiceIconEntry {
  icon: React.ReactElement;
  color: string;
}

const SIZE = 32;

export const serviceIconMap: Record<ServiceIconType, ServiceIconEntry> = {
  // ── Infrastructure ──
  cloud:          { icon: <Cloud size={SIZE} />,          color: '#3B82F6' },
  virtualization: { icon: <Layers size={SIZE} />,         color: '#8B5CF6' },
  datacenter:     { icon: <Server size={SIZE} />,         color: '#6366F1' },
  serverless:     { icon: <Zap size={SIZE} />,            color: '#F59E0B' },

  // ── Security ──
  devsecops:     { icon: <ShieldCheck size={SIZE} />,     color: '#10B981' },
  vulnerability: { icon: <ScanSearch size={SIZE} />,      color: '#EF4444' },
  cybersecurity: { icon: <Lock size={SIZE} />,            color: '#EF4444' },
  networking:    { icon: <Network size={SIZE} />,         color: '#3B82F6' },
  auditing:      { icon: <ClipboardCheck size={SIZE} />,  color: '#8B5CF6' },

  // ── DevOps & SRE ──
  monitoring:    { icon: <Activity size={SIZE} />,        color: '#F97316' },
  logging:       { icon: <FileText size={SIZE} />,        color: '#6366F1' },
  observability: { icon: <Eye size={SIZE} />,             color: '#06B6D4' },
  incident:      { icon: <AlertTriangle size={SIZE} />,   color: '#EF4444' },
  automation:    { icon: <Cog size={SIZE} />,             color: '#F97316' },
  iac:           { icon: <Terminal size={SIZE} />,        color: '#10B981' },

  // ── Graphics ──
  animation:     { icon: <Play size={SIZE} />,            color: '#EC4899' },
  gamedev:       { icon: <Gamepad2 size={SIZE} />,        color: '#A855F7' },
  marketing:     { icon: <TrendingUp size={SIZE} />,      color: '#F97316' },

  // ── IT Solutions ──
  datawarehouse: { icon: <Database size={SIZE} />,        color: '#3B82F6' },
  datavis:       { icon: <BarChart3 size={SIZE} />,       color: '#06B6D4' },
  datatransform: { icon: <ArrowLeftRight size={SIZE} />,  color: '#8B5CF6' },

  // ── Gen AI ──
  aiintegration: { icon: <Puzzle size={SIZE} />,          color: '#A855F7' },
  llm:           { icon: <Brain size={SIZE} />,           color: '#EC4899' },
  aiagents:      { icon: <Bot size={SIZE} />,             color: '#A855F7' },
};
