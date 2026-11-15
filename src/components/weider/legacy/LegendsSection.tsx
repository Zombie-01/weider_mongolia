import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Paper } from "../Paper";
import { EASE, LineReveal, Reveal } from "../motion";
import { ArchivePhoto } from "./ArchivePhoto";
import { legends, type Athlete } from "@/data/legacy";
import { cn } from "@/lib/utils";

/** Grid placement per athlete (desktop): one hero card, four supporting cards. */
const LAYOUT = [
  "md:col-span-6 md:row-span-2 aspect-[4/5] md:aspect-auto",
  "md:col-span-3 aspect-[3/4]",
  "md:col-span-3 aspect-[3/4] md:translate-y-10",
  "md:col-span-3 aspect-[3/4]",
  "md:col-span-3 aspect-[3/4] md:translate-y-10",
];

/** 03 — interactive hall of legends with shared-element biography modals. */
export function LegendsSection() {
  const [open, setOpen] = useState<Athlete | null>(null);

  return (
    <section
      id="legacy-legends"
      aria-labelledby="legends-title"
      className="relative scroll-mt-16 overflow-hidden bg-brand-black py-24 text-on-dark md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="label-mono text-xs text-brand-red">{legends.kicker}</p>
        <h2 id="legends-title" className="display ink-rough mt-4 text-[13vw] md:text-[7.5vw]">
          <LineReveal>{legends.headline[0]}</LineReveal>
          <LineReveal delay={0.1}>
            <span className="text-outline">{legends.headline[1]}</span>
          </LineReveal>
        </h2>

        <ul className="mt-16 grid gap-5 md:grid-flow-dense md:grid-cols-12 md:gap-6">
          {legends.athletes.map((a, i) => (
            <li key={a.n} className={cn("relative", LAYOUT[i])}>
              <Reveal delay={i * 0.06} className="h-full">
                <button
                  type="button"
                  onClick={() => setOpen(a)}
                  data-cursor="Намтар"
                  aria-label={`${a.name} — намтар унших`}
                  className="group relative block h-full w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-yellow"
                >
                  <motion.div layoutId={`legend-photo-${a.n}`} className="absolute inset-0">
                    <ArchivePhoto
                      image={a.image}
                      caption={false}
                      imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
                  {/* red tear wipes up on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-full translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[55%] group-focus-visible:translate-y-[55%]">
                    <Paper
                      tone="red"
                      seed={1300 + i}
                      className="inset-0"
                      amp={[4, 0, 0, 0]}
                      shadow={false}
                    />
                  </div>
                  <span className="display text-outline absolute right-4 top-3 text-6xl md:text-7xl">
                    {a.n}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <span className="label-bold inline-block bg-brand-yellow px-2 py-1 text-[11px] text-ink">
                      {a.title}
                    </span>
                    <p
                      className={cn(
                        "display mt-3",
                        i === 0 ? "text-5xl md:text-8xl" : "text-4xl md:text-5xl",
                      )}
                    >
                      {a.name}
                    </p>
                    <p lang="en" className="label-mono mt-2 text-[10px] text-on-dark/70">
                      {a.latin}
                    </p>
                    <p className="mt-3 max-h-0 overflow-hidden font-label text-sm font-semibold leading-snug opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                      {a.highlights.join(" · ")}
                    </p>
                  </div>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-20 max-w-3xl border-l-4 border-brand-red pl-5">
          <p className="label-mono text-[10px] text-brand-yellow">Тайлбар</p>
          <p className="mt-2 font-label text-sm font-medium leading-relaxed text-on-dark/75">
            {legends.disclaimer}
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && <LegendModal athlete={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}

function LegendModal({ athlete: a, onClose }: { athlete: Athlete; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      lang="mn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legend-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Хаах"
        onClick={onClose}
        className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
      />
      <div className="relative grid max-h-full w-full max-w-6xl overflow-y-auto bg-brand-black md:grid-cols-2">
        <motion.div
          layoutId={`legend-photo-${a.n}`}
          className="relative aspect-[4/5] md:aspect-auto md:min-h-[70vh]"
        >
          <ArchivePhoto image={a.image} />
        </motion.div>
        <motion.div
          className="relative flex flex-col p-8 text-on-dark md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6, ease: EASE } }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Хаах"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center border-2 border-on-dark transition-colors hover:bg-on-dark hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
          <span className="display text-outline text-7xl">{a.n}</span>
          <span className="label-bold mt-6 inline-block self-start bg-brand-red px-2 py-1 text-xs">
            {a.title}
          </span>
          <h3 id="legend-modal-title" className="display mt-4 text-6xl md:text-7xl">
            {a.name}
          </h3>
          <p lang="en" className="label-mono mt-2 text-[11px] text-on-dark/60">
            {a.latin}
          </p>
          <p className="mt-8 font-label text-xl font-semibold leading-relaxed md:text-2xl">
            {a.story}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {a.highlights.map((h) => (
              <li
                key={h}
                className="label-bold border-2 border-brand-yellow px-3 py-1.5 text-xs text-brand-yellow"
              >
                {h}
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-10 font-label text-xs leading-relaxed text-on-dark/55">
            {legends.disclaimer}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
