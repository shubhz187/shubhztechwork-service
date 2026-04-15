import { cn } from "@/lib/utils";

interface Props { className?: string; size?: number; color?: string; }

export const Star4 = ({ className, size = 32, color }: Props) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={cn("inline-block", className)}
    style={color ? { color } : undefined}
    aria-hidden
  >
    <path
      d="M16 0 C 16 10, 22 16, 32 16 C 22 16, 16 22, 16 32 C 16 22, 10 16, 0 16 C 10 16, 16 10, 16 0 Z"
      fill="currentColor"
    />
  </svg>
);

export const Orbit = ({ className, size = 200 }: Props) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    className={cn("pointer-events-none", className)}
    aria-hidden
  >
    <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" opacity="0.3" />
    <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" opacity="0.25" />
    <circle cx="100" cy="2" r="4" fill="currentColor" />
    <circle cx="170" cy="100" r="3" fill="currentColor" opacity="0.6" />
  </svg>
);

export const PlusIcon = ({ className, size = 20 }: Props) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden>
    <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const RoundArrow = ({ className, size = 56 }: Props) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden>
    <circle cx="32" cy="32" r="31" fill="currentColor" />
    <path
      d="M24 40 L40 24 M26 24 H40 V38"
      stroke="hsl(var(--background))"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const ArrowUpRight = ({ className, size = 16 }: Props) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className} aria-hidden>
    <path
      d="M4 12 L12 4 M6 4 H12 V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
