import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Paper } from "../Paper";
import { LineReveal } from "../motion";
import { img } from "@/data/images";
import { cn } from "@/lib/utils";

const FRAMES = [
  { word: "Бэлтгэл", src: img.deadlift, pos: "50% 30%" },
  { word: "Хүч", src: img.chalk, pos: "40% 40%" },
  { word: "Сахилга", src: img.woman, pos: "50% 25%" },
  { word: "Сэргэлт", src: img.recovery, pos: "50% 40%" },
  { word: "Гүйцэтгэл", src: img.runner, pos: "30% 50%" },
  { word: "Тогтвортой", src: img.community, pos: "50% 30%" },
];

/** Scroll-driven sequence: vertical scroll moves a torn photo strip sideways. */
export function DisciplineSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 80));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const counter = useTransform(scrollYProgress, (v) =>
    String(Math.min(6, Math.floor(v * 6) + 1)).padStart(2, "0"),
  );

  return (
    <section ref={ref} aria-labelledby="discipline-title" className="relative bg-brand-black md:h-[420vh]">
      <div className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:overflow-hidden">
        <div className="flex items-end justify-between px-5 pt-24 md:px-10 md:pt-24">
          <h2 id="discipline-title" className="display ink-rough text-[18vw] text-on-dark md:text-[7.5vw]">
            <LineReveal>Бэлтгэл</LineReveal>
            <LineReveal delay={0.08}>
              <span className="text-brand-red">эрх чөлөөг</span>
            </LineReveal>
            <LineReveal delay={0.16}>бүтээнэ.</LineReveal>
          </h2>
          <div className="hidden text-right md:block">
            <motion.span className="display block text-8xl text-brand-yellow">{counter}</motion.span>
            <span className="label-mono text-xs text-on-dark">/ 06 зарчим</span>
          </div>
        </div>

        <div className="relative mt-10 flex-1 md:mt-6">
          <motion.ul
            ref={trackRef}
            style={{ x }}
            className="hidden h-full w-max items-center gap-10 pl-10 pr-10 md:flex"
          >
            {FRAMES.map((f, i) => (
              <Frame key={f.word} {...f} i={i} />
            ))}
          </motion.ul>
          <ul className="flex flex-col gap-10 px-5 pb-24 md:hidden">
            {FRAMES.map((f, i) => (
              <Frame key={f.word} {...f} i={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Frame({ word, src, pos, i }: { word: string; src: string; pos: string; i: number }) {
  const tilt = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-1"][i];
  return (
    <li className={cn("group relative h-[70vw] w-full shrink-0 md:h-[62vh] md:w-[44vh]", tilt)}>
      <Paper tone="photo" seed={700 + i * 3} className="inset-0" amp={2.5} fiberAmp={0.8}>
        <img
          src={src}
          alt={`${word} — бэлтгэлийн зураг`}
          loading="lazy"
          className="photo-bw h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          style={{ objectPosition: pos }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-transparent to-transparent" />
      </Paper>
      <span className="label-mono absolute left-5 top-5 text-xs text-on-dark">0{i + 1}</span>
      <span
        className={cn(
          "display absolute -bottom-4 left-4 text-6xl md:text-7xl",
          i % 2 ? "text-brand-yellow" : "text-on-dark",
        )}
      >
        {word}
      </span>
    </li>
  );
}
