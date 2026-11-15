import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { tornPath } from "@/lib/torn";

type Mode = "default" | "link" | "label" | "hidden";

const TAG_CLIP = tornPath(4242, undefined, { amp: [10, 3, 10, 3], steps: 14 });
const INTERACTIVE = "a, button, [role='button'], summary, label, [data-cursor]";
const TEXT_INPUT = "input, textarea, select, [contenteditable='true']";

/**
 * Site-wide brand cursor (fine pointers only).
 * - a red registration dot sits exactly on the pointer;
 * - a printer's crosshair trails it on a spring, grows and turns 45° over links;
 * - over [data-cursor="label"] it becomes a torn red paper tag carrying the label;
 * - text fields keep the native caret.
 */
export function BrandCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("hidden");
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("brand-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      if (!t?.closest) return;
      if (t.closest(TEXT_INPUT)) return setMode("hidden");
      const labelled = t.closest("[data-cursor]");
      if (labelled) {
        setLabel(labelled.getAttribute("data-cursor") ?? "");
        return setMode("label");
      }
      setMode(t.closest(INTERACTIVE) ? "link" : "default");
    };
    const leave = () => setMode("hidden");
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      root.classList.remove("brand-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const hidden = mode === "hidden";
  const ringScale = mode === "link" ? 1.7 : mode === "label" ? 0 : 1;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      {/* trailing crosshair */}
      <motion.div className="absolute left-0 top-0" style={{ x: rx, y: ry }}>
        <motion.svg
          viewBox="0 0 40 40"
          width={40}
          height={40}
          className="-translate-x-1/2 -translate-y-1/2 overflow-visible text-on-dark [filter:drop-shadow(0_0_1px_var(--ink))_drop-shadow(0_0_1px_var(--ink))]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          animate={{
            scale: hidden ? 0 : down ? ringScale * 0.75 : ringScale,
            rotate: mode === "link" ? 45 : 0,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
        >
          <circle cx="20" cy="20" r="8" />
          <path d="M20 0v12M20 28v12M0 20h12M28 20h12" />
        </motion.svg>

        {/* torn paper label */}
        <AnimatePresence>
          {mode === "label" && label && (
            <motion.div
              key={label}
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0.4, rotate: -14, opacity: 0 }}
              animate={{ scale: down ? 0.9 : 1, rotate: -6, opacity: 1 }}
              exit={{ scale: 0.4, rotate: 8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            >
              <div className="relative shadow-paper">
                <div
                  className="paper-tex absolute inset-0 bg-paper"
                  style={{ clipPath: TAG_CLIP, transform: "scale(1.06)" }}
                />
                <div className="relative bg-brand-red" style={{ clipPath: TAG_CLIP }}>
                  <span className="label-bold block whitespace-nowrap px-5 py-2.5 text-[12px] text-on-dark">
                    {label}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* exact-position registration dot */}
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.span
          className="block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red ring-1 ring-on-dark"
          animate={{ scale: hidden || mode === "label" ? 0 : down ? 1.6 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  );
}
