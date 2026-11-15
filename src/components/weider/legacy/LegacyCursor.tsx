import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Desktop-only follower cursor. A small ring tracks the pointer; over any element with
 * `data-cursor="label"` it grows into a red disc carrying that label. The native cursor
 * stays visible, so nothing depends on this for usability.
 */
export function LegacyCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(t ? t.getAttribute("data-cursor") : null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[65]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        animate={
          label
            ? {
                width: 104,
                height: 104,
                backgroundColor: "var(--brand-red)",
                borderColor: "var(--brand-red)",
              }
            : {
                width: 28,
                height: 28,
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: "var(--brand-yellow)",
              }
        }
        style={{ borderWidth: 2, borderStyle: "solid" }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              lang="mn"
              className="px-2 text-center font-label text-[11px] font-extrabold uppercase leading-tight tracking-[0.14em] text-on-dark"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
