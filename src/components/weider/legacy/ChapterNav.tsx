import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { chapters } from "@/data/legacy";
import { cn } from "@/lib/utils";

/** Fixed chapter index (desktop). The red marker slides between chapters as you scroll. */
export function ChapterNav() {
  const [active, setActive] = useState<string>(chapters[0].id);

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((e): e is HTMLElement => !!e);
    const onScroll = () => {
      const mid = window.innerHeight * 0.45;
      let current: string = chapters[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= mid) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Бүлгүүд"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 mix-blend-difference xl:block"
    >
      <ol className="flex flex-col gap-3">
        {chapters.map((c) => {
          const on = c.id === active;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on ? "true" : undefined}
                className="group relative flex items-center gap-3 py-0.5 text-on-dark"
              >
                <span className="relative block h-[2px] w-6 bg-on-dark/40">
                  {on && (
                    <motion.span
                      layoutId="chapter-marker"
                      className="absolute inset-y-[-1px] left-0 w-full bg-on-dark"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "label-mono text-[10px] transition-opacity",
                    on ? "opacity-100" : "opacity-50",
                  )}
                >
                  {c.n}
                </span>
                <span
                  className={cn(
                    "label-bold text-[11px] transition-all duration-300",
                    "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                  )}
                >
                  {c.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
