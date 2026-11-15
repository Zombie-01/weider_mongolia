import { useRef } from "react";
import { Paper } from "../Paper";
import { Crosshair } from "../Crosshair";
import { LineReveal } from "../motion";
import { ArchivePhoto } from "./ArchivePhoto";
import { goldenEra } from "@/data/legacy";
import { gsap, useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const DESKTOP = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const TILT = [-2.5, 1.5, -1, 2.5, -2, 1, -1.5, 2];
const SIZE = [
  "md:h-[56vh] md:w-[36vh]",
  "md:h-[48vh] md:w-[64vh] md:self-end",
  "md:h-[58vh] md:w-[42vh] md:self-start",
  "md:h-[58vh] md:w-[42vh]",
  "md:h-[50vh] md:w-[40vh] md:self-end",
  "md:h-[60vh] md:w-[44vh] md:self-start",
  "md:h-[56vh] md:w-[40vh]",
  "md:h-[46vh] md:w-[62vh] md:self-end",
];

/**
 * 05 — the golden era as a walk through an archive: warm film tones, sprocket rails, and
 * a pinned horizontal reel on desktop (native swipe with snap on mobile).
 */
export function GoldenEraSection() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm, el) => {
    mm.add(DESKTOP, () => {
      const reel = el.querySelector<HTMLElement>("[data-reel]")!;
      const distance = () => reel.scrollWidth - window.innerWidth;
      const tween = gsap.to(reel, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: "[data-pin]",
          start: "top top",
          end: () => `+=${distance() * 1.1}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
      // inner photos drift against the reel for depth
      gsap.utils.toArray<HTMLElement>("[data-frame-inner]").forEach((f) => {
        gsap.fromTo(
          f,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: f,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
      gsap.fromTo(
        "[data-giant]",
        { xPercent: 10 },
        {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-pin]",
            start: "top top",
            end: () => `+=${distance() * 1.1}`,
            scrub: true,
          },
        },
      );
    });
  });

  return (
    <section
      id="legacy-golden"
      ref={ref}
      aria-labelledby="golden-title"
      className="relative scroll-mt-16 text-on-dark"
      style={{
        background:
          "radial-gradient(120% 90% at 30% 20%, oklch(0.32 0.04 60) 0%, oklch(0.16 0.015 60) 60%, var(--brand-black) 100%)",
      }}
    >
      <div data-pin className="relative overflow-hidden py-20 md:flex md:h-svh md:flex-col md:py-0">
        <Sprockets className="top-0" />
        <Sprockets className="bottom-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-60 grain-light"
        />

        {/* giant drifting word behind the reel */}
        <p
          data-giant
          aria-hidden
          lang="en"
          className="display pointer-events-none absolute bottom-[4%] left-0 whitespace-nowrap text-[30vw] leading-none text-on-dark/[0.06]"
        >
          GOLDEN ERA · GOLDEN ERA
        </p>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-10 md:pt-24">
          <Crosshair className="right-6 top-0 w-8 md:top-14" />
          <p className="label-mono text-xs text-brand-orange">{goldenEra.kicker}</p>
          <h2 id="golden-title" className="display ink-rough mt-3 text-[14vw] md:text-[5.4vw]">
            <LineReveal>{goldenEra.headline[0]}</LineReveal>
            <LineReveal delay={0.1}>
              <span className="text-brand-orange">{goldenEra.headline[1]}</span>
            </LineReveal>
          </h2>
        </div>

        <div className="relative z-10 mt-10 flex-1 md:mt-6 md:flex md:items-center">
          <ul
            data-reel
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-5 pb-6 md:h-full md:w-max md:snap-none md:items-center md:gap-14 md:overflow-visible md:px-[8vw] md:pb-0"
          >
            {goldenEra.frames.map((f, i) => (
              <li
                key={f.caption + i}
                className={cn(
                  "relative h-[60vh] w-[78vw] shrink-0 snap-center md:snap-align-none",
                  SIZE[i],
                )}
                style={{ rotate: `${TILT[i]}deg` }}
                data-cursor="Архив"
              >
                <Paper tone="photo" seed={1500 + i} className="inset-0" amp={2.2} fiberAmp={0.8}>
                  <div data-frame-inner className="absolute inset-y-0 -left-[10%] w-[120%]">
                    <ArchivePhoto image={f.image} />
                  </div>
                  {/* warm film wash */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[oklch(0.7_0.12_60)] opacity-20 mix-blend-multiply"
                  />
                </Paper>
                <p className="label-bold absolute -bottom-7 left-0 text-[11px] text-on-dark/80">
                  <span className="mr-2 text-brand-orange">{String(i + 1).padStart(2, "0")}</span>
                  {f.caption}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** 35mm film sprocket rail. */
function Sprockets({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-x-0 z-20 h-5 bg-ink", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0 14px, oklch(0.32 0.04 60) 14px 26px, transparent 26px 40px)",
        backgroundSize: "40px 8px",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "0 50%",
      }}
    />
  );
}
