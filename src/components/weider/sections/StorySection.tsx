import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Paper } from "../Paper";
import { Crosshair } from "../Crosshair";
import { LineReveal, Reveal } from "../motion";
import { img } from "@/data/images";

const NARRATIVE = [
  "Every transformation begins with a decision.",
  "A decision to wake up earlier.",
  "To train harder.",
  "To push further.",
  "To stay disciplined when nobody is watching.",
];

export function StorySection() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="story" aria-labelledby="story-title" className="relative scroll-mt-16">
      {/* paper chapter */}
      <div className="relative">
        <Paper tone="paper" seed={301} className="inset-0" amp={[1.2, 0, 0, 0]} />
        <div className="relative mx-auto grid max-w-[1600px] gap-12 px-5 pb-24 pt-24 text-ink md:grid-cols-12 md:px-10 md:pt-32">
          <Crosshair className="right-6 top-10 w-8" />
          <div className="md:col-span-6 md:sticky md:top-28 md:self-start">
            <p className="label-bold text-xs">02 / The story</p>
            <h2 id="story-title" className="display ink-rough mt-4 text-[22vw] md:text-[11vw]">
              <LineReveal>More than</LineReveal>
              <LineReveal delay={0.1}>fitness.</LineReveal>
            </h2>
            <Reveal delay={0.2} className="relative mt-8 inline-block">
              <Paper tone="red" seed={302} className="inset-0 -rotate-2" amp={8} />
              <p className="label-mono relative px-6 py-4 text-sm text-on-dark md:text-base">
                A stronger nation starts with you.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-col gap-6 md:col-span-6 md:pt-40">
            {NARRATIVE.map((line, i) => (
              <Reveal key={line} delay={i * 0.05}>
                <p
                  className={
                    i === 0
                      ? "font-label text-3xl font-extrabold leading-tight md:text-5xl"
                      : "font-label text-2xl font-bold leading-tight text-ink-soft md:text-4xl"
                  }
                >
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* full width photo with statement */}
      <div ref={photoRef} className="relative h-[90vh] min-h-[520px] overflow-hidden bg-brand-black">
        <motion.img
          src={img.deadlift}
          alt="Athlete locking out a heavy deadlift"
          loading="lazy"
          style={{ y }}
          className="photo-bw absolute inset-0 h-[124%] w-full -translate-y-[12%] object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-transparent" />
        <Paper tone="black" seed={303} className="inset-x-0 top-0 h-6" amp={[0, 0, 40, 0]} shadow={false} fiber={false} />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 md:px-10 md:pb-20">
          <h3 className="display ink-rough text-[18vw] text-brand-yellow md:text-[10vw]">
            <LineReveal>Strength isn't given.</LineReveal>
            <LineReveal delay={0.15}>It is earned.</LineReveal>
          </h3>
        </div>
      </div>

      {/* red + blue chapter */}
      <div className="relative grid md:grid-cols-2">
        <div className="relative min-h-[60vh]">
          <Paper tone="red" seed={304} className="inset-0" amp={[2, 1, 0, 0]} shadow={false} />
          <div className="relative flex h-full flex-col justify-center gap-6 px-5 py-20 md:px-14">
            <Reveal>
              <p className="font-label text-3xl font-extrabold leading-tight text-on-dark md:text-5xl">
                We believe that stronger individuals create stronger communities.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-label text-2xl font-bold leading-tight text-ink md:text-4xl">
                And stronger communities build a stronger Mongolia.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="relative min-h-[60vh]">
          <Paper tone="blue" seed={305} className="inset-0" amp={[2, 0, 0, 1]} shadow={false} />
          <div className="relative flex h-full flex-col justify-center px-5 py-20 md:px-14">
            {["This is more than fitness.", "This is a mindset.", "This is a movement."].map((l, i) => (
              <Reveal key={l} delay={i * 0.12}>
                <p className="display text-6xl text-on-dark md:text-7xl lg:text-8xl">{l}</p>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <p className="label-mono mt-8 text-sm text-brand-yellow">— Weider Mongolia</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
