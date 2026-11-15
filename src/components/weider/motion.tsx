import { motion, useMotionValue, useSpring, type MotionValue, type MotionStyle, useTransform } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts content into view once. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={(style ?? {}) as MotionStyle}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Masked line reveal for big display type. The observer sits on the visible mask, not the hidden line. */
export function LineReveal({
  children,
  delay = 0,
  className,
  inView = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  inView?: boolean;
}) {
  const variants = { hidden: { y: "105%" }, shown: { y: "0%" } };
  return (
    <motion.span
      className={cn("block overflow-hidden pb-[0.04em]", className)}
      initial="hidden"
      {...(inView
        ? { whileInView: "shown", viewport: { once: true, amount: 0.2 } }
        : { animate: "shown" })}
    >
      <motion.span
        className="block"
        variants={variants}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Element that drifts with scroll progress. */
export function Drift({
  progress,
  depth,
  className,
  style,
  children,
}: {
  progress: MotionValue<number>;
  depth: number;
  className?: string;
  style?: MotionStyle;
  children: ReactNode;
}) {
  const y = useTransform(progress, [0, 1], [0, depth]);
  return (
    <motion.div className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}

/** Wraps a CTA so it gently follows the cursor. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
