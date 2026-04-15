import { useEffect, useRef, useState, ElementType } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "word" | "line";
  /** Fire once on mount regardless of scroll (hero headlines). */
  immediate?: boolean;
  serifAccents?: string[];
}

/** Wipe-up reveal of individual words (or lines). Each word sits inside an
 *  overflow-hidden wrapper and translates from 110% → 0.
 *
 *  Initial state is always painted *before* the in-view class flips, otherwise
 *  React + setTimeout can batch into the same paint and the transition never
 *  fires. We use a double-rAF gate to guarantee two paints.
 */
export const MaskRevealText = ({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 60,
  splitBy = "word",
  immediate = false,
  serifAccents = [],
}: Props) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf1 = 0, raf2 = 0, timer: number | undefined;

    const fire = () => {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          timer = window.setTimeout(() => setVisible(true), delay);
        });
      });
    };

    if (immediate) {
      fire();
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
        if (timer) clearTimeout(timer);
      };
    }

    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            fire();
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (timer) clearTimeout(timer);
    };
  }, [delay, immediate]);

  const pieces =
    splitBy === "word" ? children.split(/(\s+)/) : children.split("\n");

  return (
    <Tag
      ref={ref as never}
      className={cn("inline", className)}
      aria-label={children}
    >
      {pieces.map((piece, i) => {
        if (/^\s+$/.test(piece)) return <span key={i}>{piece}</span>;
        const isAccent = serifAccents.some(
          (a) => piece.replace(/[.,!?:;]/g, "").toLowerCase() === a.toLowerCase(),
        );
        return (
          <span
            key={i}
            aria-hidden
            className={cn("mask-reveal", visible && "in-view")}
          >
            <span
              style={{
                transitionDelay: visible ? `${i * stagger}ms` : "0ms",
              }}
              className={cn(isAccent && "serif-italic opacity-90")}
            >
              {piece}
            </span>
          </span>
        );
      })}
    </Tag>
  );
};
