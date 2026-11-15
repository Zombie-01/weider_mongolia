import { useRef, useState } from "react";
import { Paper } from "../Paper";
import { LineReveal, Reveal } from "../motion";
import { ArchivePhoto } from "./ArchivePhoto";
import { AnimatedYear } from "./AnimatedYear";
import { timeline } from "@/data/legacy";
import { gsap, useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const DESKTOP = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/**
 * 04 — interactive timeline. Desktop: the section pins and the milestones travel
 * horizontally while a big year counter rolls to the active date. Mobile and reduced
 * motion: a vertical spine with the same cards.
 */
export function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [horizontal, setHorizontal] = useState(false);
  const item = timeline.items[active]!;

  useGsap(ref, (mm, el) => {
    mm.add(DESKTOP, () => {
      setHorizontal(true);
      const track = el.querySelector<HTMLElement>("[data-track]")!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const n = timeline.items.length;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: "[data-pin]",
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => setActive(Math.min(n - 1, Math.round(st.progress * (n - 1)))),
        },
      });
      gsap.fromTo(
        "[data-progress]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-pin]",
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
          },
        },
      );
      // each archive photo wipes open as its card crosses the stage
      gsap.utils.toArray<HTMLElement>("[data-item]").forEach((card) => {
        gsap.fromTo(
          card.querySelector("[data-img]"),
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 92%",
              end: "left 45%",
              scrub: true,
            },
          },
        );
      });
      return () => setHorizontal(false);
    });
  });

  return (
    <section
      id="legacy-timeline"
      ref={ref}
      aria-labelledby="timeline-title"
      className="relative scroll-mt-16 bg-brand-black text-on-dark"
    >
      <div data-pin className="relative overflow-hidden md:h-svh">
        <Paper
          tone="blue"
          seed={1401}
          className="inset-x-0 top-0 h-[44%]"
          amp={[0, 0, 2.5, 0]}
          shadow={false}
        />

        <div className="relative mx-auto flex max-w-[1600px] items-end justify-between gap-6 px-5 pt-24 md:px-10 md:pt-28">
          <div>
            <p className="label-mono text-xs text-brand-yellow">{timeline.kicker}</p>
            <h2 id="timeline-title" className="display ink-rough mt-3 text-[15vw] md:text-[5vw]">
              <LineReveal>{timeline.headline[0]}</LineReveal>
              <LineReveal delay={0.1}>{timeline.headline[1]}</LineReveal>
            </h2>
          </div>
          {/* rolling year indicator */}
          <div aria-live="polite" className={cn("hidden text-right", horizontal && "md:block")}>
            <AnimatedYear
              value={item.year}
              suffix={item.label.length > 4 ? "+" : ""}
              duration={0.7}
              className="display block text-[9vw] leading-[0.8] text-brand-yellow"
            />
            <p className="label-bold mt-2 text-xs">{item.title}</p>
          </div>
        </div>

        {/* progress rail */}
        <div
          className={cn(
            "relative mx-5 mt-6 hidden h-[3px] bg-on-dark/20 md:mx-10",
            horizontal && "md:block",
          )}
        >
          <div data-progress className="absolute inset-0 origin-left bg-brand-red" />
          <ol className="absolute inset-x-0 -top-[5px] flex justify-between">
            {timeline.items.map((t, i) => (
              <li
                key={t.label}
                className={cn(
                  "h-[13px] w-[13px] rounded-full border-2 transition-colors duration-300",
                  i <= active
                    ? "border-brand-red bg-brand-red"
                    : "border-on-dark/40 bg-brand-black",
                )}
              />
            ))}
          </ol>
        </div>

        <ol
          data-track
          className="relative mt-12 flex flex-col gap-14 px-5 pb-24 md:mt-10 md:w-max md:flex-row md:gap-10 md:px-10 md:pb-0"
        >
          {timeline.items.map((t, i) => (
            <li
              key={t.label}
              data-item
              className="relative border-l-2 border-brand-red pl-6 md:w-[min(560px,42vw)] md:shrink-0 md:border-l-0 md:pl-0"
            >
              <Reveal y={horizontal ? 0 : 40}>
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    className={cn(
                      "display md:text-7xl",
                      t.label.length > 6 ? "text-5xl" : "text-7xl",
                      i % 2 ? "text-on-dark" : "text-brand-yellow",
                    )}
                  >
                    {t.label}
                  </span>
                  <span className="label-mono text-[10px] text-on-dark/60">{t.context}</span>
                </div>
                <div
                  data-img
                  className="group relative mt-4 aspect-[16/10] w-full md:aspect-auto md:h-[min(28vh,320px)]"
                  data-cursor={t.label}
                >
                  <Paper tone="photo" seed={1410 + i} className="inset-0" amp={1.6} fiberAmp={0.6}>
                    <ArchivePhoto
                      image={t.image}
                      imgClassName="transition-transform duration-1000 group-hover:scale-105"
                    />
                  </Paper>
                </div>
                <h3 className="display mt-5 text-4xl md:text-4xl">{t.title}</h3>
                <p className="mt-3 max-w-md font-label text-lg font-semibold leading-snug text-on-dark/85">
                  {t.text}
                </p>
              </Reveal>
            </li>
          ))}
          <li aria-hidden className="hidden w-[10vw] shrink-0 md:block" />
        </ol>
      </div>
    </section>
  );
}
