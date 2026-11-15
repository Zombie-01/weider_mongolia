import { useRef } from "react";
import { Paper, type PaperTone } from "../Paper";
import { Crosshair } from "../Crosshair";
import { LineReveal, Reveal } from "../motion";
import { ArchivePhoto } from "./ArchivePhoto";
import { AnimatedYear } from "./AnimatedYear";
import { founder } from "@/data/legacy";
import { MOTION_OK, gsap, useGsap } from "@/lib/gsap";

const TONES: PaperTone[] = ["red", "blue", "black"];

/** 02 — the founder, laid out as a vintage magazine spread. */
export function FounderSection() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MOTION_OK, () => {
      gsap.fromTo(
        "[data-portrait]",
        { yPercent: 8, rotate: -4 },
        {
          yPercent: -8,
          rotate: -1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-spread]",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        "[data-inset]",
        { yPercent: 30 },
        {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-spread]",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      gsap.from("[data-milestone]", {
        yPercent: 40,
        opacity: 0,
        rotate: (i: number) => (i % 2 ? 4 : -4),
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-milestones]", start: "top 80%" },
      });
    });
  });

  return (
    <section
      id="legacy-founder"
      ref={ref}
      aria-labelledby="founder-title"
      className="relative scroll-mt-16 overflow-hidden"
    >
      <Paper
        tone="paper"
        seed={1201}
        className="inset-0"
        amp={[0, 0, 0, 0]}
        shadow={false}
        fiber={false}
      />
      <div
        data-spread
        className="relative mx-auto max-w-[1600px] px-5 pb-24 pt-20 text-ink md:px-10 md:pb-32 md:pt-28"
      >
        {/* magazine masthead rule */}
        <div className="flex items-end justify-between border-b-4 border-ink pb-2">
          <p className="label-bold text-xs">{founder.kicker}</p>
          <p lang="en" className="label-mono hidden text-[10px] md:block">
            The Weider Story · Vol. 01
          </p>
        </div>
        <div className="mt-1 h-px bg-ink" />

        <div className="mt-14 grid gap-14 md:grid-cols-12 md:gap-10">
          {/* portrait */}
          <div className="relative md:col-span-5">
            <div data-portrait className="relative aspect-[4/5] w-full" data-cursor="Архив">
              <Paper tone="photo" seed={1202} className="inset-0" amp={2.4}>
                <ArchivePhoto image="joePortrait" />
              </Paper>
              {/* tape */}
              <span
                aria-hidden
                className="absolute -top-3 left-[38%] h-8 w-28 rotate-3 bg-brand-yellow/80 mix-blend-multiply"
              />
            </div>
            <div data-inset className="absolute -bottom-10 -right-4 hidden w-[46%] md:block">
              <div className="relative aspect-[3/4] rotate-3">
                <Paper tone="photo" seed={1203} className="inset-0" amp={3}>
                  <ArchivePhoto image="weiderMagazine" />
                </Paper>
              </div>
            </div>
          </div>

          {/* copy */}
          <div className="relative md:col-span-7 md:pl-6">
            <Crosshair className="-top-6 right-0 w-8" />
            <h2 id="founder-title" className="display ink-rough text-[16vw] md:text-[7.4vw]">
              {founder.headline.map((l, i) => (
                <LineReveal key={l} delay={i * 0.1}>
                  <span className={i === 1 ? "text-brand-red" : undefined}>{l}</span>
                </LineReveal>
              ))}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
              {founder.body.map((p, i) => (
                <Reveal key={p} delay={i * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
                  <p
                    className={
                      i === 0
                        ? "font-label text-3xl font-extrabold leading-tight md:text-4xl"
                        : "font-label text-lg font-semibold leading-relaxed text-ink-soft first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-brand-red md:text-xl"
                    }
                  >
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* milestones */}
        <ol data-milestones className="mt-24 grid gap-6 md:mt-32 md:grid-cols-3">
          {founder.milestones.map((m, i) => (
            <li key={m.year} data-milestone className="relative min-h-[260px]">
              <Paper tone={TONES[i]!} seed={1210 + i} className="inset-0" amp={3.2} />
              <div className="relative flex h-full flex-col justify-between gap-8 p-8 text-on-dark">
                <span className="label-mono text-[10px] opacity-80">0{i + 1} / Түүхэн мөч</span>
                <AnimatedYear
                  value={m.year}
                  from={1900}
                  className="display block text-8xl md:text-[7vw]"
                />
                <p className="font-label text-xl font-bold leading-snug">{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
