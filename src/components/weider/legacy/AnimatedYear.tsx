import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * A year that rolls up like an odometer. With `from` it counts once when scrolled into
 * view; without it, it animates from the previous value whenever `value` changes.
 */
export function AnimatedYear({
  value,
  from,
  suffix = "",
  className,
  duration = 1.2,
}: {
  value: number;
  from?: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(from ?? value);
  const last = useRef(from ?? value);

  useEffect(() => {
    if (from !== undefined && !inView) return;
    if (reduce) {
      setShown(value);
      last.current = value;
      return;
    }
    const controls = animate(last.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    last.current = value;
    return () => controls.stop();
  }, [value, inView, from, reduce, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <span aria-hidden className="tabular-nums">
        {shown}
        {suffix}
      </span>
    </span>
  );
}
