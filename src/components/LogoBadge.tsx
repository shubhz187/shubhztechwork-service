import { motion } from 'framer-motion';
import logoImg from '@/assets/logo.svg';

interface LogoBadgeProps {
  animated?: boolean;
  size?: number;
}

export const LogoBadge = ({ animated = false, size = 52 }: LogoBadgeProps) => {
  const padding = 8;
  const strokeWidth = 2;
  const offset = strokeWidth / 2;
  const rectSize = size - strokeWidth;
  const rx = 12;
  const imgSize = size - padding * 2;
  // Perimeter of rounded rect: 4 straights + 4 quarter-circle arcs
  const perimeter = 4 * (rectSize - 2 * rx) + 2 * Math.PI * rx;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logo-border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Static faint base border (always visible) */}
        <rect
          x={offset}
          y={offset}
          width={rectSize}
          height={rectSize}
          rx={rx}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          opacity={0.15}
        />

        {/* Gradient border — animated via Framer Motion or static */}
        <motion.rect
          x={offset}
          y={offset}
          width={rectSize}
          height={rectSize}
          rx={rx}
          fill="none"
          stroke="url(#logo-border-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={perimeter}
          initial={animated ? { strokeDashoffset: perimeter } : false}
          animate={animated ? { strokeDashoffset: 0 } : undefined}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          style={
            animated
              ? { filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.5))' }
              : { opacity: 0.7 }
          }
        />
      </svg>
      <img
        src={logoImg}
        alt=""
        width={imgSize}
        height={imgSize}
        className="absolute"
        style={{ top: padding, left: padding }}
      />
    </div>
  );
};
