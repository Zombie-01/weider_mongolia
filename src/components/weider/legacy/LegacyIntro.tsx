import { useRef } from "react";
import { Paper } from "../Paper";
import { Crosshair } from "../Crosshair";
import { LineReveal, Reveal } from "../motion";
import { ArchivePhoto } from "./ArchivePhoto";
import { intro } from "@/data/legacy";
import { MOTION_OK, gsap, useGsap } from "@/lib/gsap";

/** 01 — full-screen opener. Scrolling opens the archive portrait from a slit to full bleed. */
export function LegacyIntro() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-stage]",
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 1,
        },
      });
      tl.fromTo(
        "[data-photo]",
        { clipPath: "inset(26% 38% 26% 38%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut" },
        0,
      )
        .fromTo("[data-photo-inner]", { scale: 1.35 }, { scale: 1, ease: "power2.out" }, 0)
        .to("[data-headline]", { yPercent: -18, ease: "none" }, 0)
        .fromTo("[data-tear]", { xPercent: -105 }, { xPercent: 0, ease: "power3.out" }, 0.35)
        .fromTo("[data-tear-blue]", { xPercent: 105 }, { xPercent: 0, ease: "power3.out" }, 0.5)
        .fromTo("[data-scrollhint]", { opacity: 1 }, { opacity: 0, duration: 0.15 }, 0);
    });
  });

  return (
    <section
      id="legacy-intro"
      ref={ref}
      aria-labelledby="legacy-title"
      className="relative bg-brand-black text-on-dark"
    >
      <div data-stage className="relative h-svh min-h-[600px] overflow-hidden">
        <div data-photo className="absolute inset-0" style={{ clipPath: "inset(26% 38% 26% 38%)" }}>
          <div data-photo-inner className="absolute inset-0">
            <ArchivePhoto image="joePortrait" caption={false} loading="eager" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-ink/60" />
        </div>

        {/* torn red + blue strips slide in as the photo opens */}
        <div data-tear className="absolute bottom-[14%] left-0 h-[18%] w-[46%]">
          <Paper tone="red" seed={1101} className="inset-0" amp={[3, 6, 3, 0]} />
        </div>
        <div data-tear-blue className="absolute right-0 top-[18%] h-[10%] w-[30%]">
          <Paper tone="blue" seed={1102} className="inset-0" amp={[3, 0, 3, 6]} />
        </div>

        <Crosshair className="left-6 top-24 w-8 text-on-dark" />
        <Crosshair className="bottom-8 right-6 w-8 text-on-dark" />

        <div
          data-headline
          className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-5 pt-16 md:px-10"
        >
          <p className="label-mono text-xs text-brand-yellow md:text-sm">{intro.label}</p>
          <h1
            id="legacy-title"
            className="display ink-rough mt-5 text-[19vw] drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)] md:text-[10.5vw]"
          >
            {intro.headline.map((l, i) => (
              <LineReveal key={l} inView={false} delay={0.15 + i * 0.12}>
                <span className={i === 2 ? "text-brand-yellow" : undefined}>{l}</span>
              </LineReveal>
            ))}
          </h1>
        </div>

        <p
          data-scrollhint
          className="label-mono absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] text-on-dark/70"
        >
          Доош гүйлгэ ↓
        </p>
      </div>

      {/* supporting text on paper */}
      <div className="relative">
        <Paper tone="paper" seed={1103} className="inset-0" amp={[1.4, 0, 0, 0]} shadow={false} />
        <div className="relative mx-auto grid max-w-[1600px] gap-10 px-5 py-24 text-ink md:grid-cols-12 md:px-10 md:py-32">
          <p className="label-bold text-xs md:col-span-3">01 / Өв</p>
          <div className="flex flex-col gap-8 md:col-span-8">
            {intro.text.map((t, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <p className="font-label text-2xl font-bold leading-tight md:text-4xl">{t}</p>
              </Reveal>
            ))}
            <Reveal delay={0.2} className="relative mt-4 self-start">
              <Paper tone="red" seed={1104} className="inset-0 -rotate-1" amp={6} />
              <p className="display relative px-6 py-4 text-5xl text-on-dark md:text-7xl">
                {intro.name}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
