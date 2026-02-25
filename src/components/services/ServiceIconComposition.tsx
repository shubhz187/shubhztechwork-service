import {
    AbsoluteFill,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';

const CORAL = 'hsl(6, 93%, 64%)';

export type ServiceIconType =
    | 'frontend'
    | 'backend'
    | 'database'
    | 'api'
    | 'cloud'
    | 'virtualization'
    | 'datacenter'
    | 'serverless'
    | 'devsecops'
    | 'vulnerability'
    | 'cybersecurity'
    | 'networking'
    | 'auditing'
    | 'monitoring'
    | 'logging'
    | 'observability'
    | 'incident'
    | 'automation'
    | 'iac'
    | 'animation'
    | 'gamedev'
    | 'marketing'
    | 'datawarehouse'
    | 'datavis'
    | 'datatransform'
    | 'aiintegration'
    | 'llm'
    | 'aiagents';

interface Props {
    iconType: ServiceIconType;
}

// Animated SVG icons — each drawn with stroke-dashoffset animation
const IconSVG: React.FC<{ iconType: ServiceIconType; progress: number; pulse: number }> = ({
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

    const icons: Record<ServiceIconType, React.ReactNode> = {
        frontend: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <polyline points="16 18 22 12 16 6" {...strokeProps} />
                <polyline points="8 6 2 12 8 18" {...strokeProps} />
            </svg>
        ),
        backend: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <rect x="2" y="3" width="20" height="14" rx="2" {...strokeProps} />
                <line x1="8" y1="21" x2="16" y2="21" {...strokeProps} />
                <line x1="12" y1="17" x2="12" y2="21" {...strokeProps} />
            </svg>
        ),
        database: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <ellipse cx="12" cy="5" rx="9" ry="3" {...strokeProps} />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" {...strokeProps} />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" {...strokeProps} />
            </svg>
        ),
        api: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" {...strokeProps} />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" {...strokeProps} />
            </svg>
        ),
        cloud: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" {...strokeProps} />
            </svg>
        ),
        virtualization: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <rect x="2" y="7" width="20" height="14" rx="2" {...strokeProps} />
                <path d="M16 3H8l-2 4h12l-2-4z" {...strokeProps} />
                <line x1="12" y1="12" x2="12" y2="16" {...strokeProps} />
                <line x1="10" y1="14" x2="14" y2="14" {...strokeProps} />
            </svg>
        ),
        datacenter: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <rect x="2" y="2" width="20" height="8" rx="2" {...strokeProps} />
                <rect x="2" y="14" width="20" height="8" rx="2" {...strokeProps} />
                <line x1="6" y1="6" x2="6.01" y2="6" {...strokeProps} strokeWidth={3} />
                <line x1="6" y1="18" x2="6.01" y2="18" {...strokeProps} strokeWidth={3} />
            </svg>
        ),
        serverless: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" {...strokeProps} />
            </svg>
        ),
        devsecops: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" {...strokeProps} />
            </svg>
        ),
        vulnerability: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <circle cx="11" cy="11" r="8" {...strokeProps} />
                <line x1="21" y1="21" x2="16.65" y2="16.65" {...strokeProps} />
                <line x1="11" y1="8" x2="11" y2="14" {...strokeProps} />
                <line x1="8" y1="11" x2="14" y2="11" {...strokeProps} />
            </svg>
        ),
        cybersecurity: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <rect x="3" y="11" width="18" height="11" rx="2" {...strokeProps} />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" {...strokeProps} />
            </svg>
        ),
        networking: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <circle cx="12" cy="5" r="2" {...strokeProps} />
                <circle cx="5" cy="19" r="2" {...strokeProps} />
                <circle cx="19" cy="19" r="2" {...strokeProps} />
                <line x1="12" y1="7" x2="5" y2="17" {...strokeProps} />
                <line x1="12" y1="7" x2="19" y2="17" {...strokeProps} />
                <line x1="5" y1="19" x2="19" y2="19" {...strokeProps} />
            </svg>
        ),
        auditing: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" {...strokeProps} />
                <polyline points="14 2 14 8 20 8" {...strokeProps} />
                <line x1="16" y1="13" x2="8" y2="13" {...strokeProps} />
                <line x1="16" y1="17" x2="8" y2="17" {...strokeProps} />
                <polyline points="10 9 9 9 8 9" {...strokeProps} />
            </svg>
        ),
        monitoring: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" {...strokeProps} />
            </svg>
        ),
        logging: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <line x1="8" y1="6" x2="21" y2="6" {...strokeProps} />
                <line x1="8" y1="12" x2="21" y2="12" {...strokeProps} />
                <line x1="8" y1="18" x2="21" y2="18" {...strokeProps} />
                <line x1="3" y1="6" x2="3.01" y2="6" {...strokeProps} strokeWidth={3} />
                <line x1="3" y1="12" x2="3.01" y2="12" {...strokeProps} strokeWidth={3} />
                <line x1="3" y1="18" x2="3.01" y2="18" {...strokeProps} strokeWidth={3} />
            </svg>
        ),
        observability: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" {...strokeProps} />
                <circle cx="12" cy="12" r="3" {...strokeProps} />
            </svg>
        ),
        incident: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" {...strokeProps} />
                <line x1="12" y1="9" x2="12" y2="13" {...strokeProps} />
                <line x1="12" y1="17" x2="12.01" y2="17" {...strokeProps} strokeWidth={3} />
            </svg>
        ),
        automation: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <polyline points="16 3 21 3 21 8" {...strokeProps} />
                <line x1="4" y1="20" x2="21" y2="3" {...strokeProps} />
                <polyline points="21 16 21 21 16 21" {...strokeProps} />
                <line x1="15" y1="15" x2="21" y2="21" {...strokeProps} />
                <line x1="4" y1="4" x2="9" y2="9" {...strokeProps} />
            </svg>
        ),
        iac: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <polyline points="4 17 10 11 4 5" {...strokeProps} />
                <line x1="12" y1="19" x2="20" y2="19" {...strokeProps} />
            </svg>
        ),
        animation: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <circle cx="12" cy="12" r="10" {...strokeProps} />
                <polygon points="10 8 16 12 10 16 10 8" {...strokeProps} />
            </svg>
        ),
        gamedev: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <line x1="6" y1="12" x2="10" y2="12" {...strokeProps} />
                <line x1="8" y1="10" x2="8" y2="14" {...strokeProps} />
                <line x1="15" y1="13" x2="15.01" y2="13" {...strokeProps} strokeWidth={3} />
                <line x1="18" y1="11" x2="18.01" y2="11" {...strokeProps} strokeWidth={3} />
                <rect x="2" y="6" width="20" height="12" rx="2" {...strokeProps} />
            </svg>
        ),
        marketing: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" {...strokeProps} />
                <polyline points="16 7 22 7 22 13" {...strokeProps} />
            </svg>
        ),
        datawarehouse: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" {...strokeProps} />
                <polyline points="9 22 9 12 15 12 15 22" {...strokeProps} />
            </svg>
        ),
        datavis: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <line x1="18" y1="20" x2="18" y2="10" {...strokeProps} />
                <line x1="12" y1="20" x2="12" y2="4" {...strokeProps} />
                <line x1="6" y1="20" x2="6" y2="14" {...strokeProps} />
            </svg>
        ),
        datatransform: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <polyline points="17 1 21 5 17 9" {...strokeProps} />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" {...strokeProps} />
                <polyline points="7 23 3 19 7 15" {...strokeProps} />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" {...strokeProps} />
            </svg>
        ),
        aiintegration: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <circle cx="12" cy="12" r="3" {...strokeProps} />
                <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" {...strokeProps} />
            </svg>
        ),
        llm: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" {...strokeProps} />
            </svg>
        ),
        aiagents: (
            <svg viewBox="0 0 24 24" width="40" height="40">
                <rect x="3" y="3" width="18" height="18" rx="2" {...strokeProps} />
                <circle cx="8.5" cy="8.5" r="1.5" {...strokeProps} />
                <circle cx="15.5" cy="8.5" r="1.5" {...strokeProps} />
                <path d="M8 13s1.5 2 4 2 4-2 4-2" {...strokeProps} />
            </svg>
        ),
    };

    return (
        <div style={{ transform: `scale(${scale})`, transition: 'transform 0.1s' }}>
            {icons[iconType]}
        </div>
    );
};

export const ServiceIconComposition: React.FC<Props> = ({ iconType }) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

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
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: `1.5px solid ${CORAL}`,
                    transform: `scale(${ringScale})`,
                    opacity: ringOpacity,
                }}
            />

            {/* Icon background */}
            <div
                style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '14px',
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
