import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { Paper } from "../Paper";
import { Crosshair } from "../Crosshair";
import { LineReveal, Magnetic, Reveal } from "../motion";
import { bb } from "../BrandButton";
import { ArchivePhoto } from "./ArchivePhoto";
import { continues } from "@/data/legacy";
import { img } from "@/data/images";
import { MOTION_OK, gsap, useGsap } from "@/lib/gsap";

/**
 * 06 — the hand-off. A pinned stage dissolves the archive into modern Mongolian
 * training photography while the narrative lines arrive one by one.
 */
export function LegacyContinues() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (mm) => {
    mm.add(MOTION_OK, () => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-line]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-stage]",
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1,
        },
      });
      tl.fromTo(
        "[data-modern]",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 2, ease: "power2.inOut" },
        0.4,
      )
        .fromTo(
          "[data-modern-img]",
          { scale: 1.25 },
          { scale: 1, duration: 2.4, ease: "none" },
          0.4,
        )
        .to("[data-vintage]", { scale: 1.12, filter: "blur(4px)", duration: 2, ease: "none" }, 0.4);
      lines.forEach((l, i) => {
        tl.fromTo(
          l,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          0.2 + i * 0.45,
        ).to(l, { opacity: 0.5, duration: 0.3 }, 0.2 + i * 0.45 + 0.55);
      });
      tl.fromTo(
        "[data-finale]",
        { opacity: 0, scale: 1.4 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power4.out" },
        0.2 + lines.length * 0.45,
      ).fromTo(
        "[data-tear-final]",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.6, ease: "power3.out" },
        0.2 + lines.length * 0.45,
      );
    });
  });

  return (
    <section
      id="legacy-continues"
      ref={ref}
      aria-labelledby="continues-title"
      className="relative scroll-mt-16 bg-brand-black text-on-dark"
    >
      <div data-stage className="relative h-svh min-h-[620px] overflow-hidden">
        {/* past */}
        <div data-vintage className="absolute inset-0">
          <ArchivePhoto image="goldenStage" caption={false} />
          <div className="absolute inset-0 bg-[oklch(0.7_0.12_60)] opacity-15 mix-blend-multiply" />
        </div>
        {/* present */}
        <div data-modern className="absolute inset-0" style={{ clipPath: "inset(100% 0 0 0)" }}>
          <img
            data-modern-img
            src={img.mountains}
            alt="Монголын уул, тал нутаг"
            loading="lazy"
            className="photo-bw absolute inset-0 h-full w-full object-cover"
          />
          <img
            src={img.athlete}
            alt="Монгол тамирчин"
            loading="lazy"
            className="absolute bottom-0 right-[2%] h-[86%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] md:right-[8%]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-ink/85 via-ink/40 to-transparent" />
          {/* national colour strip */}
          <div className="absolute left-0 top-0 flex h-full w-3 flex-col md:w-5" aria-hidden>
            <span className="flex-1 bg-brand-red" />
            <span className="flex-1 bg-brand-blue" />
            <span className="flex-1 bg-brand-red" />
          </div>
        </div>

        <Crosshair className="right-6 top-24 w-8 text-on-dark" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-8 md:px-14">
          <p className="label-mono text-xs text-brand-yellow">{continues.kicker}</p>
          <h2 id="continues-title" className="display ink-rough mt-3 text-[15vw] md:text-[6.5vw]">
            <LineReveal>{continues.headline[0]}</LineReveal>
            <LineReveal delay={0.1}>
              <span className="text-brand-yellow">{continues.headline[1]}</span>
            </LineReveal>
          </h2>
          <div className="mt-8 flex max-w-2xl flex-col gap-2 md:gap-3">
            {continues.narrative.map((l) => (
              <p
                key={l}
                data-line
                className="font-label text-xl font-bold leading-snug md:text-3xl"
              >
                {l}
              </p>
            ))}
          </div>
          <div className="relative mt-8 self-start">
            <div data-tear-final className="absolute inset-0">
              <Paper tone="red" seed={1601} className="inset-0 -rotate-2" amp={6} />
            </div>
            <p data-finale className="display relative px-6 py-3 text-7xl md:text-9xl">
              {continues.finale}
            </p>
          </div>
        </div>
      </div>

      {/* sign-off */}
      <div className="relative overflow-hidden px-5 pb-16 pt-28 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col gap-2">
            {continues.closing.map((c, i) => (
              <Reveal key={c} delay={i * 0.1}>
                <p
                  className={
                    i === 1
                      ? "display text-[10vw] text-brand-red md:text-7xl"
                      : "display text-[9vw] md:text-6xl"
                  }
                >
                  {c}
                </p>
              </Reveal>
            ))}
          </div>
          <div
            lang="en"
            className="mt-24 flex flex-col gap-8 border-t-2 border-on-dark/20 pt-10 md:flex-row md:items-end md:justify-between"
          >
            <h3 className="display ink-rough text-[20vw] leading-[0.8] md:text-[11vw]">
              <LineReveal>Weider</LineReveal>
              <LineReveal delay={0.1}>Mongolia</LineReveal>
              <LineReveal delay={0.2}>
                <span className="text-brand-yellow">Beyond your limits.</span>
              </LineReveal>
            </h3>
            <Reveal delay={0.3} className="shrink-0">
              <Magnetic>
                <Link to="/products" lang="mn" className={bb({ variant: "red", size: "lg" })}>
                  Бүтээгдэхүүн үзэх
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
