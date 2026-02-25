import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

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

interface Props {
    iconType: TechIconType;
}

const IconSVG: React.FC<{ iconType: TechIconType; progress: number; pulse: number }> = ({
    iconType,
    progress,
    pulse,
}) => {
    const dash = interpolate(progress, [0, 1], [100, 0]);
    const opacity = interpolate(progress, [0, 0.3], [0, 1]);
    const scale = 1 + pulse * 0.04;

    const strokeProps = {
        stroke: CORAL,
        strokeWidth: 2,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        fill: 'none',
        strokeDasharray: 100,
        strokeDashoffset: dash,
        opacity,
    };

    const icons: Record<TechIconType, React.ReactNode> = {
        // ── Infrastructure ──
        aws: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" {...strokeProps} />
                <path d="M6 22 C 10 24 14 24 18 22" {...strokeProps} />
            </svg>
        ),
        azure: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M8 20 L14 4 L20 14 L10 14 L16 20 L8 20" {...strokeProps} />
                <line x1="4" y1="20" x2="20" y2="20" {...strokeProps} />
            </svg>
        ),
        gcp: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 3 L21 8 L21 16 L12 21 L3 16 L3 8 Z" {...strokeProps} />
                <circle cx="12" cy="12" r="3.5" {...strokeProps} />
            </svg>
        ),
        digitalocean: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 2 C7 8 5 12 5 16 A7 7 0 0 0 19 16 C19 12 17 8 12 2 Z" {...strokeProps} />
                <circle cx="12" cy="15" r="2" {...strokeProps} />
            </svg>
        ),
        vmware: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <rect x="3" y="4" width="18" height="6" rx="1" {...strokeProps} />
                <rect x="3" y="14" width="18" height="6" rx="1" {...strokeProps} />
                <line x1="12" y1="10" x2="12" y2="14" {...strokeProps} />
                <line x1="8" y1="7" x2="8.01" y2="7" {...strokeProps} strokeWidth={3} />
                <line x1="8" y1="17" x2="8.01" y2="17" {...strokeProps} strokeWidth={3} />
            </svg>
        ),
        openshift: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="12" r="9" {...strokeProps} />
                <path d="M8 15 L12 8 L16 15" {...strokeProps} />
                <line x1="12" y1="8" x2="12" y2="18" {...strokeProps} />
            </svg>
        ),

        // ── DevOps ──
        terraform: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M10 3 L16 6 L16 12 L10 9 Z" {...strokeProps} />
                <path d="M3 7 L9 10 L9 16 L3 13 Z" {...strokeProps} />
                <path d="M10 11 L16 14 L16 20 L10 17 Z" {...strokeProps} />
            </svg>
        ),
        kubernetes: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="12" r="9" {...strokeProps} />
                <line x1="12" y1="12" x2="12" y2="4" {...strokeProps} />
                <line x1="12" y1="12" x2="19" y2="8" {...strokeProps} />
                <line x1="12" y1="12" x2="19" y2="16" {...strokeProps} />
                <line x1="12" y1="12" x2="12" y2="20" {...strokeProps} />
                <line x1="12" y1="12" x2="5" y2="16" {...strokeProps} />
                <line x1="12" y1="12" x2="5" y2="8" {...strokeProps} />
                <circle cx="12" cy="12" r="2" {...strokeProps} />
            </svg>
        ),
        jenkins: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <rect x="4" y="3" width="16" height="14" rx="3" {...strokeProps} />
                <line x1="12" y1="17" x2="12" y2="21" {...strokeProps} />
                <line x1="8" y1="21" x2="16" y2="21" {...strokeProps} />
                <circle cx="12" cy="10" r="2" {...strokeProps} />
                <path d="M8 7 L10 7" {...strokeProps} />
                <path d="M14 7 L16 7" {...strokeProps} />
            </svg>
        ),
        ansible: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="12" r="9" {...strokeProps} />
                <path d="M12 6 L7 18" {...strokeProps} />
                <path d="M12 6 L17 18" {...strokeProps} />
                <path d="M9 13 L17 18" {...strokeProps} />
            </svg>
        ),
        pulumi: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M6 20 L6 14 L10 14 L10 10 L14 10 L14 6 L18 6 L18 20" {...strokeProps} />
                <line x1="6" y1="20" x2="18" y2="20" {...strokeProps} />
                <path d="M12 4 L10 6 M12 4 L14 6" {...strokeProps} />
                <line x1="12" y1="4" x2="12" y2="2" {...strokeProps} />
            </svg>
        ),
        cicd: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 12 C12 8 7 5 4 9 C1 13 5 17 12 12 C12 8 17 5 20 9 C23 13 19 17 12 12" {...strokeProps} />
                <path d="M19 7 L21 9 L19 11" {...strokeProps} />
            </svg>
        ),

        // ── Monitoring ──
        cloudwatch: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" {...strokeProps} />
                <circle cx="12" cy="13" r="2" {...strokeProps} />
                <path d="M12 13 L14 10" {...strokeProps} />
            </svg>
        ),
        azuremonitor: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <rect x="3" y="4" width="18" height="13" rx="2" {...strokeProps} />
                <line x1="8" y1="21" x2="16" y2="21" {...strokeProps} />
                <line x1="12" y1="17" x2="12" y2="21" {...strokeProps} />
                <path d="M7 13 A5 5 0 0 1 17 13" {...strokeProps} />
                <path d="M12 13 L14 9" {...strokeProps} />
            </svg>
        ),
        elk: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <line x1="3" y1="6" x2="14" y2="6" {...strokeProps} />
                <line x1="3" y1="12" x2="12" y2="12" {...strokeProps} />
                <line x1="3" y1="18" x2="16" y2="18" {...strokeProps} />
                <circle cx="18" cy="10" r="4" {...strokeProps} />
                <line x1="21" y1="13" x2="23" y2="15" {...strokeProps} />
            </svg>
        ),

        // ── Security ──
        cybersecurity: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 2 L20 6 L20 12 C20 17 12 22 12 22 C12 22 4 17 4 12 L4 6 Z" {...strokeProps} />
                <circle cx="12" cy="11" r="2" {...strokeProps} />
                <line x1="12" y1="13" x2="12" y2="16" {...strokeProps} />
            </svg>
        ),
        devsecops: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 2 L20 6 L20 12 C20 17 12 22 12 22 C12 22 4 17 4 12 L4 6 Z" {...strokeProps} />
                <path d="M9 10 L7 12 L9 14" {...strokeProps} />
                <path d="M15 10 L17 12 L15 14" {...strokeProps} />
                <line x1="13" y1="9" x2="11" y2="15" {...strokeProps} />
            </svg>
        ),
        auditing: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M9 2 L15 2 L15 4 L17 4 C19 4 19 6 19 6 L19 22 L5 22 L5 6 C5 4 7 4 9 4 L9 2" {...strokeProps} />
                <path d="M8 10 L10 12 L14 8" {...strokeProps} />
                <path d="M8 15 L10 17 L14 13" {...strokeProps} />
            </svg>
        ),
        vulnerability: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <ellipse cx="12" cy="14" rx="4" ry="6" {...strokeProps} />
                <line x1="12" y1="8" x2="12" y2="20" {...strokeProps} />
                <path d="M8 10 L5 6" {...strokeProps} />
                <path d="M16 10 L19 6" {...strokeProps} />
                <path d="M8 14 L4 14" {...strokeProps} />
                <path d="M16 14 L20 14" {...strokeProps} />
            </svg>
        ),

        // ── Databases ──
        mysql: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <ellipse cx="12" cy="5" rx="8" ry="3" {...strokeProps} />
                <path d="M4 5 L4 19 C4 21 8 22 12 22 C16 22 20 21 20 19 L20 5" {...strokeProps} />
                <path d="M4 12 C4 14 8 15 12 15 C16 15 20 14 20 12" {...strokeProps} />
                <path d="M20 8 C22 7 22 10 21 11" {...strokeProps} />
            </svg>
        ),
        postgresql: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <ellipse cx="12" cy="5" rx="8" ry="3" {...strokeProps} />
                <path d="M4 5 L4 19 C4 21 8 22 12 22 C16 22 20 21 20 19 L20 5" {...strokeProps} />
                <path d="M4 12 C4 14 8 15 12 15 C16 15 20 14 20 12" {...strokeProps} />
                <path d="M16 3 C18 2 20 4 19 7 C18 9 17 10 17 13" {...strokeProps} />
            </svg>
        ),
        oracle: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <ellipse cx="12" cy="7" rx="8" ry="3" {...strokeProps} />
                <path d="M4 7 L4 19 C4 21 8 22 12 22 C16 22 20 21 20 19 L20 7" {...strokeProps} />
                <path d="M4 13 C4 15 8 16 12 16 C16 16 20 15 20 13" {...strokeProps} />
                <path d="M12 2 L14.5 4.5 L12 7 L9.5 4.5 Z" {...strokeProps} />
            </svg>
        ),
        mongodb: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 2 C8 6 6 11 6 15 C6 19 9 22 12 22 C15 22 18 19 18 15 C18 11 16 6 12 2 Z" {...strokeProps} />
                <line x1="12" y1="6" x2="12" y2="18" {...strokeProps} />
            </svg>
        ),
        redis: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 2 L22 12 L12 22 L2 12 Z" {...strokeProps} />
                <line x1="2" y1="12" x2="22" y2="12" {...strokeProps} />
                <line x1="12" y1="2" x2="12" y2="22" {...strokeProps} />
            </svg>
        ),

        // ── Cloud & Infrastructure (new) ──
        awslambda: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 2 L6 22 L12 17 L18 22 Z" {...strokeProps} />
                <line x1="12" y1="2" x2="12" y2="17" {...strokeProps} />
            </svg>
        ),
        s3: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M5 4 L19 4 L19 20 L5 20 Z" {...strokeProps} />
                <path d="M5 4 C3 4 2 5 2 6 L2 18 C2 19 3 20 5 20" {...strokeProps} />
                <path d="M19 4 C21 4 22 5 22 6 L22 18 C22 19 21 20 19 20" {...strokeProps} />
                <line x1="8" y1="9" x2="16" y2="9" {...strokeProps} />
                <line x1="8" y1="15" x2="16" y2="15" {...strokeProps} />
            </svg>
        ),
        dynamodb: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <rect x="4" y="4" width="16" height="16" rx="2" {...strokeProps} />
                <line x1="4" y1="10" x2="20" y2="10" {...strokeProps} />
                <line x1="4" y1="16" x2="20" y2="16" {...strokeProps} />
                <path d="M14 2 L10 8 L16 14 L12 22" {...strokeProps} />
            </svg>
        ),
        entraid: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="7" r="4" {...strokeProps} />
                <path d="M4 21 C4 16 8 13 12 13 C16 13 20 16 20 21" {...strokeProps} />
                <path d="M17 17 L19 15 L21 17" {...strokeProps} />
                <line x1="19" y1="15" x2="19" y2="21" {...strokeProps} />
            </svg>
        ),
        intune: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <rect x="6" y="2" width="12" height="20" rx="2" {...strokeProps} />
                <line x1="10" y1="19" x2="14" y2="19" {...strokeProps} />
                <path d="M10 10 L11.5 12 L15 8" {...strokeProps} />
            </svg>
        ),

        // ── DevOps & SRE (new) ──
        docker: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M2 13 C2 13 3 8 12 8 L12 6 L17 10 L12 14 L12 12 C5 12 2 13 2 13" {...strokeProps} />
                <rect x="4" y="9" width="2" height="2" {...strokeProps} />
                <rect x="7" y="9" width="2" height="2" {...strokeProps} />
                <rect x="7" y="6" width="2" height="2" {...strokeProps} />
                <rect x="10" y="6" width="2" height="2" {...strokeProps} />
                <path d="M2 14 C2 18 6 20 12 20 C18 20 22 18 22 14" {...strokeProps} />
            </svg>
        ),
        githubactions: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="12" r="9" {...strokeProps} />
                <path d="M8 12 L11 15 L16 9" {...strokeProps} />
                <path d="M12 3 C16 3 19 5 20 8" {...strokeProps} />
                <path d="M21 9 L20 8 L19 9" {...strokeProps} />
            </svg>
        ),
        argocd: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="6" r="3" {...strokeProps} />
                <circle cx="5" cy="18" r="2.5" {...strokeProps} />
                <circle cx="19" cy="18" r="2.5" {...strokeProps} />
                <line x1="12" y1="9" x2="5" y2="15.5" {...strokeProps} />
                <line x1="12" y1="9" x2="19" y2="15.5" {...strokeProps} />
                <line x1="12" y1="9" x2="12" y2="22" {...strokeProps} />
            </svg>
        ),
        helm: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="12" r="9" {...strokeProps} />
                <circle cx="12" cy="12" r="3" {...strokeProps} />
                <line x1="12" y1="3" x2="12" y2="9" {...strokeProps} />
                <line x1="12" y1="15" x2="12" y2="21" {...strokeProps} />
                <line x1="3" y1="12" x2="9" y2="12" {...strokeProps} />
                <line x1="15" y1="12" x2="21" y2="12" {...strokeProps} />
            </svg>
        ),
        nginx: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <rect x="3" y="4" width="18" height="16" rx="2" {...strokeProps} />
                <path d="M8 16 L8 8 L16 16 L16 8" {...strokeProps} />
            </svg>
        ),
        linux: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 2 C10 2 8 4 8 7 L8 12 C6 13 4 15 4 17 C4 20 6 21 8 21 L16 21 C18 21 20 20 20 17 C20 15 18 13 16 12 L16 7 C16 4 14 2 12 2" {...strokeProps} />
                <circle cx="10" cy="8" r="1" {...strokeProps} strokeWidth={3} />
                <circle cx="14" cy="8" r="1" {...strokeProps} strokeWidth={3} />
                <path d="M10 12 C10 13 14 13 14 12" {...strokeProps} />
            </svg>
        ),
        bash: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <rect x="2" y="3" width="20" height="18" rx="2" {...strokeProps} />
                <polyline points="6 10 10 13 6 16" {...strokeProps} />
                <line x1="12" y1="16" x2="18" y2="16" {...strokeProps} />
            </svg>
        ),
        python: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 2 C8 2 8 4 8 5 L8 8 L16 8 L16 9 L6 9 C4 9 2 10 2 14 C2 18 4 19 6 19 L8 19 L8 16 C8 14 10 13 12 13 L16 13 C18 13 19 12 19 10 L19 5 C19 3 17 2 12 2" {...strokeProps} />
                <circle cx="10" cy="5" r="1" {...strokeProps} strokeWidth={3} />
                <path d="M12 22 C16 22 16 20 16 19 L16 16 L8 16 L8 15 L18 15 C20 15 22 14 22 10 C22 6 20 5 18 5" {...strokeProps} />
                <circle cx="14" cy="19" r="1" {...strokeProps} strokeWidth={3} />
            </svg>
        ),

        // ── Monitoring & Observability (new) ──
        prometheus: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="12" r="9" {...strokeProps} />
                <path d="M12 4 L12 12 L16 16" {...strokeProps} />
                <line x1="8" y1="18" x2="16" y2="18" {...strokeProps} />
                <line x1="7" y1="15" x2="17" y2="15" {...strokeProps} />
            </svg>
        ),
        grafana: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <rect x="2" y="3" width="20" height="18" rx="2" {...strokeProps} />
                <polyline points="6 15 9 10 12 13 15 7 18 11" {...strokeProps} />
                <line x1="6" y1="7" x2="6.01" y2="7" {...strokeProps} strokeWidth={3} />
                <line x1="9" y1="7" x2="9.01" y2="7" {...strokeProps} strokeWidth={3} />
            </svg>
        ),
        opentelemetry: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="12" r="3" {...strokeProps} />
                <path d="M12 3 L12 9" {...strokeProps} />
                <path d="M19 5 L15 9" {...strokeProps} />
                <path d="M21 12 L15 12" {...strokeProps} />
                <path d="M19 19 L15 15" {...strokeProps} />
                <path d="M5 5 L9 9" {...strokeProps} />
                <path d="M3 12 L9 12" {...strokeProps} />
            </svg>
        ),

        // ── Security (new) ──
        crowdstrike: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 3 C8 3 4 6 4 10 C4 14 6 16 8 18 L12 22 L16 18 C18 16 20 14 20 10 C20 6 16 3 12 3" {...strokeProps} />
                <path d="M9 9 L12 7 L15 9 L15 14 L12 16 L9 14 Z" {...strokeProps} />
            </svg>
        ),
        zscaler: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" {...strokeProps} />
                <rect x="9" y="12" width="6" height="5" rx="1" {...strokeProps} />
                <path d="M11 12 L11 10 A1 1 0 0 1 13 10 L13 12" {...strokeProps} />
            </svg>
        ),
        cyberark: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <rect x="3" y="8" width="18" height="14" rx="3" {...strokeProps} />
                <path d="M7 8 L7 5 A5 5 0 0 1 17 5 L17 8" {...strokeProps} />
                <circle cx="12" cy="15" r="2" {...strokeProps} />
                <line x1="12" y1="17" x2="12" y2="19" {...strokeProps} />
            </svg>
        ),
        defender: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 2 L20 6 L20 12 C20 17 12 22 12 22 C12 22 4 17 4 12 L4 6 Z" {...strokeProps} />
                <path d="M8 12 L11 15 L16 9" {...strokeProps} />
            </svg>
        ),
        wazuh: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" {...strokeProps} />
                <circle cx="12" cy="12" r="3" {...strokeProps} />
                <path d="M12 12 L12 5" {...strokeProps} />
                <path d="M12 12 L18 8" {...strokeProps} />
            </svg>
        ),
        nessus: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="12" r="9" {...strokeProps} />
                <circle cx="12" cy="12" r="5" {...strokeProps} />
                <circle cx="12" cy="12" r="1.5" {...strokeProps} />
                <line x1="12" y1="1" x2="12" y2="3" {...strokeProps} />
                <line x1="12" y1="21" x2="12" y2="23" {...strokeProps} />
                <line x1="1" y1="12" x2="3" y2="12" {...strokeProps} />
                <line x1="21" y1="12" x2="23" y2="12" {...strokeProps} />
            </svg>
        ),

        // ── AI & LLM (new) ──
        bedrock: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M3 20 L21 20 L21 14 C21 14 18 12 12 12 C6 12 3 14 3 14 Z" {...strokeProps} />
                <path d="M3 14 L21 14 L21 9 C21 9 18 7 12 7 C6 7 3 9 3 9 Z" {...strokeProps} />
                <path d="M14 4 L15 2 M12 5 L12 3 M10 4 L9 2" {...strokeProps} />
            </svg>
        ),
        azureopenai: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 4 C8 4 4 7 4 12 C4 17 8 20 12 20 C16 20 20 17 20 12 C20 7 16 4 12 4" {...strokeProps} />
                <path d="M8 12 L10 10 L14 14 L16 12" {...strokeProps} />
                <path d="M9 17 L12 13 L15 17" {...strokeProps} />
            </svg>
        ),
        vertexai: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 3 L3 20 L21 20 Z" {...strokeProps} />
                <circle cx="12" cy="13" r="2.5" {...strokeProps} />
                <line x1="12" y1="3" x2="12" y2="10.5" {...strokeProps} />
            </svg>
        ),
        langchain: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M6 8 A3 3 0 1 1 12 8 A3 3 0 1 1 18 8" {...strokeProps} />
                <path d="M6 16 A3 3 0 1 0 12 16 A3 3 0 1 0 18 16" {...strokeProps} />
                <line x1="6" y1="11" x2="6" y2="13" {...strokeProps} />
                <line x1="12" y1="11" x2="12" y2="13" {...strokeProps} />
                <line x1="18" y1="11" x2="18" y2="13" {...strokeProps} />
            </svg>
        ),
        langgraph: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="6" cy="6" r="2.5" {...strokeProps} />
                <circle cx="18" cy="6" r="2.5" {...strokeProps} />
                <circle cx="6" cy="18" r="2.5" {...strokeProps} />
                <circle cx="18" cy="18" r="2.5" {...strokeProps} />
                <line x1="8.5" y1="6" x2="15.5" y2="6" {...strokeProps} />
                <line x1="6" y1="8.5" x2="6" y2="15.5" {...strokeProps} />
                <line x1="18" y1="8.5" x2="18" y2="15.5" {...strokeProps} />
                <line x1="8.5" y1="18" x2="15.5" y2="18" {...strokeProps} />
                <line x1="8" y1="8" x2="16" y2="16" {...strokeProps} />
            </svg>
        ),
        ollama: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 3 C8 3 6 6 6 9 L6 14 C6 17 8 20 10 21 L14 21 C16 20 18 17 18 14 L18 9 C18 6 16 3 12 3" {...strokeProps} />
                <circle cx="9" cy="10" r="1.5" {...strokeProps} />
                <circle cx="15" cy="10" r="1.5" {...strokeProps} />
                <path d="M9 15 C9 17 15 17 15 15" {...strokeProps} />
            </svg>
        ),
        faiss: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M4 4 L12 12" {...strokeProps} />
                <path d="M20 4 L12 12" {...strokeProps} />
                <path d="M4 20 L12 12" {...strokeProps} />
                <path d="M20 20 L12 12" {...strokeProps} />
                <circle cx="12" cy="12" r="3" {...strokeProps} />
                <path d="M10 10 L8 8 M14 10 L16 8 M10 14 L8 16 M14 14 L16 16" {...strokeProps} />
            </svg>
        ),
        ragvectordb: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <ellipse cx="12" cy="6" rx="8" ry="3" {...strokeProps} />
                <path d="M4 6 L4 18 C4 20 8 21 12 21 C16 21 20 20 20 18 L20 6" {...strokeProps} />
                <path d="M4 12 C4 14 8 15 12 15 C16 15 20 14 20 12" {...strokeProps} />
                <circle cx="18" cy="17" r="3" {...strokeProps} />
                <line x1="20" y1="19" x2="22" y2="21" {...strokeProps} />
            </svg>
        ),

        // ── Contact Center (new) ──
        amazonconnect: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M4 6 C4 4 6 2 10 2 L14 2 C18 2 20 4 20 6 L20 6" {...strokeProps} />
                <path d="M4 6 L4 11 C4 11 4 16 2 18" {...strokeProps} />
                <path d="M20 6 L20 11 C20 11 20 16 22 18" {...strokeProps} />
                <circle cx="12" cy="14" r="3" {...strokeProps} />
                <path d="M9 20 L15 20" {...strokeProps} />
                <line x1="12" y1="17" x2="12" y2="20" {...strokeProps} />
            </svg>
        ),
        amazonlex: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" {...strokeProps} />
                <path d="M8 10 L10 8 L12 10 L14 8 L16 10" {...strokeProps} />
            </svg>
        ),
        awssts: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="12" r="3" {...strokeProps} />
                <path d="M12 2 L12 5 M12 19 L12 22" {...strokeProps} />
                <path d="M4.93 4.93 L7.05 7.05 M16.95 16.95 L19.07 19.07" {...strokeProps} />
                <path d="M2 12 L5 12 M19 12 L22 12" {...strokeProps} />
                <path d="M4.93 19.07 L7.05 16.95 M16.95 7.05 L19.07 4.93" {...strokeProps} />
                <path d="M12 9 L12 7 L14 9 Z" {...strokeProps} />
            </svg>
        ),
        apigateway: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M4 4 L12 2 L20 4 L20 20 L12 22 L4 20 Z" {...strokeProps} />
                <line x1="12" y1="2" x2="12" y2="22" {...strokeProps} />
                <path d="M7 9 L10 12 L7 15" {...strokeProps} />
                <path d="M17 9 L14 12 L17 15" {...strokeProps} />
            </svg>
        ),

        // ── Gen AI ──
        agenticai: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M6 10 C6 6 18 6 18 10 L18 18 C18 20 6 20 6 18 Z" {...strokeProps} />
                <circle cx="9" cy="13" r="1.5" {...strokeProps} />
                <circle cx="15" cy="13" r="1.5" {...strokeProps} />
                <line x1="12" y1="6" x2="12" y2="3" {...strokeProps} />
                <circle cx="12" cy="2" r="1" {...strokeProps} />
                <path d="M8 3 C9 1 12 0 12 0" {...strokeProps} />
                <path d="M16 3 C15 1 12 0 12 0" {...strokeProps} />
            </svg>
        ),
        llmengineering: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 4 C8 4 4 7 4 12 C4 17 8 20 12 20 C16 20 20 17 20 12 C20 7 16 4 12 4" {...strokeProps} />
                <path d="M4 12 C6 12 8 10 10 12 C12 14 14 10 16 12 C18 14 20 12 20 12" {...strokeProps} />
                <circle cx="8" cy="8" r="1" {...strokeProps} strokeWidth={3} />
                <circle cx="16" cy="8" r="1" {...strokeProps} strokeWidth={3} />
                <circle cx="12" cy="16" r="1" {...strokeProps} strokeWidth={3} />
            </svg>
        ),
        aiintegration: (
            <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="12" r="3" {...strokeProps} />
                <path d="M12 1v4 M12 19v4 M4.22 4.22l2.83 2.83 M16.95 16.95l2.83 2.83 M1 12h4 M19 12h4 M4.22 19.78l2.83-2.83 M16.95 7.05l2.83-2.83" {...strokeProps} />
            </svg>
        ),
    };

    return (
        <div style={{ transform: `scale(${scale})`, transition: 'transform 0.1s' }}>
            {icons[iconType]}
        </div>
    );
};

export const TechIconComposition: React.FC<Props> = ({ iconType }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Draw-in progress (0→1 over first 40 frames)
    const drawProgress = spring({ frame, fps, config: { damping: 16, stiffness: 80 } });

    // Pulse: slow sine wave after draw-in
    const pulsePhase = Math.sin((frame / fps) * Math.PI * 1.2);

    // Glow ring pulse
    const ringScale = interpolate(frame % 60, [0, 60], [0.8, 1.4], { extrapolateRight: 'clamp' });
    const ringOpacity = interpolate(frame % 60, [0, 60], [0.5, 0], { extrapolateRight: 'clamp' });

    // Background circle
    const bgOpacity = interpolate(drawProgress, [0, 1], [0, 1]);

    return (
        <AbsoluteFill
            style={{
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Pulse ring */}
            <div
                style={{
                    position: 'absolute',
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    border: `1.5px solid ${CORAL}`,
                    transform: `scale(${ringScale})`,
                    opacity: ringOpacity,
                }}
            />

            {/* Icon background */}
            <div
                style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '16px',
                    background: `${CORAL}18`,
                    border: `1.5px solid ${CORAL}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: bgOpacity,
                }}
            >
                <IconSVG iconType={iconType} progress={drawProgress} pulse={pulsePhase} />
            </div>
        </AbsoluteFill>
    );
};
