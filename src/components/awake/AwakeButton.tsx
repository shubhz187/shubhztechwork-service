import { forwardRef, ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes, useState } from "react";
import { Link } from "react-router-dom";
import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "on-dark";
type Size = "sm" | "md";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

interface AsLink extends CommonProps {
  to: string;
  href?: never;
  type?: never;
}
interface AsAnchor extends CommonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "type"> {
  href: string;
  to?: never;
  type?: never;
}
interface AsButton extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  type: "button" | "submit" | "reset";
  to?: never;
  href?: never;
}

type Props = AsLink | AsAnchor | AsButton;

let uidCounter = 0;

const ArrowSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12 L12 4 M6 4 H12 V10" />
  </svg>
);

/** Awake-style CTA. Hover: text + icon badge swap horizontal positions via
 *  Framer Motion `layout`, padding mirrors (pl-5/pr-2 → pl-2/pr-5) so the
 *  button stays visually balanced in both states. Works as Link, <a>, or <button>. */
export const AwakeButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>(
  ({ variant = "primary", size = "md", children, className, ...rest }, ref) => {
    const [hovered, setHovered] = useState(false);
    const [groupId] = useState(() => `btn-${++uidCounter}`);

    const sizing = size === "sm"
      ? "gap-2 py-1.5 text-[14px]"
      : "gap-2.5 py-2 text-[15px]";
    const base = cn(
      "group/btn inline-flex items-center rounded-full font-medium transition-[padding,background-color,color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
      sizing,
    );
    const padding = size === "sm"
      ? (hovered ? "pl-1.5 pr-4" : "pl-4 pr-1.5")
      : (hovered ? "pl-2 pr-5"   : "pl-5 pr-2");

    const shell =
      variant === "primary"
        ? "bg-foreground text-background hover:bg-foreground/90"
        : variant === "on-dark"
          ? "bg-background text-foreground hover:bg-background/90"
          : "bg-transparent text-foreground border border-foreground/25 hover:border-foreground hover:bg-foreground hover:text-background";

    const badge =
      variant === "primary"
        ? "bg-background text-foreground"
        : variant === "on-dark"
          ? "bg-foreground text-background"
          : "bg-foreground/5 text-foreground group-hover/btn:bg-background group-hover/btn:text-foreground";

    const spring = { type: "spring" as const, stiffness: 380, damping: 28 };

    const textEl = (
      <motion.span key="label" layout layoutId={`${groupId}-label`} transition={spring} className="whitespace-nowrap">
        {children}
      </motion.span>
    );

    const badgeEl = (
      <motion.span
        key="badge"
        layout
        layoutId={`${groupId}-badge`}
        transition={spring}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full",
          size === "sm" ? "h-7 w-7" : "h-8 w-8",
          badge,
        )}
      >
        <ArrowSvg className="h-3 w-3" />
      </motion.span>
    );

    const content = (
      <LayoutGroup id={groupId}>
        {hovered ? (<>{badgeEl}{textEl}</>) : (<>{textEl}{badgeEl}</>)}
      </LayoutGroup>
    );

    const merged = cn(base, padding, shell, className);
    const handlers = {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setHovered(true),
      onBlur: () => setHovered(false),
    };

    if ("to" in rest && rest.to !== undefined) {
      const { to, ...anchorRest } = rest;
      return (
        <Link ref={ref as never} to={to} className={merged} {...handlers} {...(anchorRest as never)}>
          {content}
        </Link>
      );
    }

    if ("href" in rest && rest.href !== undefined) {
      const { href, ...anchorRest } = rest as AsAnchor;
      return (
        <a ref={ref as never} href={href} className={merged} {...handlers} {...anchorRest}>
          {content}
        </a>
      );
    }

    const { type, ...btnRest } = rest as AsButton;
    return (
      <button
        ref={ref as never}
        type={type}
        className={merged}
        {...handlers}
        {...btnRest}
      >
        {content}
      </button>
    );
  },
);
AwakeButton.displayName = "AwakeButton";
