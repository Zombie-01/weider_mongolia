import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Paper, type PaperTone } from "../Paper";
import { LineReveal, Reveal } from "../motion";
import { bb } from "../BrandButton";
import { ArchivePhoto } from "../legacy/ArchivePhoto";
import { img } from "@/data/images";
import { cn } from "@/lib/utils";

export function PhilosophySection() {
  return (
    <section id="brand" aria-labelledby="brand-title" className="relative scroll-mt-16 overflow-hidden bg-brand-black py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="label-mono text-xs text-brand-red">02 / Яагаад WEIDER гэж?</p>
        <h2 id="brand-title" className="display ink-rough mt-4 text-[16vw] text-on-dark md:text-[8.5vw]">
          <LineReveal>Тамирчдын брэнд.</LineReveal>
          <LineReveal delay={0.1}>
            <span className="text-outline">Одоо Монголд.</span>
          </LineReveal>
        </h2>
      </div>

      {/* 01 identity */}
      <Pillar
        n="01"
        title="Монгол зан чанар"
        line="Хэн гэдгээ мэд. Юуг бүтээж байгаагаа мэд."
        tone="red"
        seed={401}
      >
        <div className="relative aspect-[4/5] w-full">
          <Paper tone="photo" seed={402} className="left-[8%] top-0 h-[70%] w-[60%] rotate-[-3deg]" amp={3}>
            <img src={img.flag} alt="Монгол Улсын төрийн далбаа" loading="lazy" className="h-full w-full object-cover" />
          </Paper>
          <Paper tone="photo" seed={403} className="bottom-0 right-0 h-[66%] w-[62%] rotate-[2deg]" amp={3}>
            <img src={img.athlete} alt="Тамирчны хөрөг" loading="lazy" className="photo-bw h-full w-full bg-paper object-cover object-top" />
          </Paper>
        </div>
      </Pillar>

      {/* 02 performance */}
      <Pillar
        n="02"
        title="Гүйцэтгэл"
        line="Зорилготой бэлтгэл. Сахилга баттай гүйцэтгэл."
        tone="blue"
        seed={404}
        flip
      >
        <div className="group relative aspect-[4/5] w-full">
          <Paper tone="photo" seed={405} className="inset-0" amp={2} fiberAmp={0.6}>
            <img
              src={img.chalk}
              alt="Штанга дээгүүр цацагдах магни"
              loading="lazy"
              className="h-full w-full object-cover grayscale contrast-125 transition-transform duration-1000 group-hover:scale-110"
            />
          </Paper>
        </div>
      </Pillar>

      {/* 03 heritage -> /legacy */}
      <Pillar
        n="03"
        title="90 жилийн өв"
        line="1936 оноос хойш бодибилдингийн түүхийг бүтээлцсэн брэнд."
        tone="paper"
        seed={406}
        cta={
          <Link to="/legacy" className={bb({ variant: "red", size: "md" })}>
            Өв түүхийг үзэх
          </Link>
        }
      >
        <Link to="/legacy" className="group relative block aspect-[4/5] w-full" aria-label="Өв түүхийг үзэх">
          <Paper tone="photo" seed={407} className="inset-0 rotate-[-2deg]" amp={2.4}>
            <ArchivePhoto
              image="arnold"
              imgClassName="transition-transform duration-1000 group-hover:scale-105"
            />
          </Paper>
        </Link>
      </Pillar>
    </section>
  );
}

function Pillar({
  n,
  title,
  line,
  tone,
  seed,
  flip,
  cta,
  children,
}: {
  n: string;
  title: string;
  line: string;
  tone: PaperTone;
  seed: number;
  flip?: boolean;
  cta?: ReactNode;
  children: ReactNode;
}) {
  const dark = tone !== "paper";
  return (
    <div className="relative mt-20 md:mt-28">
      <Paper
        tone={tone}
        seed={seed}
        className={cn("inset-y-0 w-full md:w-[78%]", flip ? "right-0" : "left-0")}
        amp={flip ? [2, 0, 2, 2] : [2, 2, 2, 0]}
      />
      <div
        className={cn(
          "relative mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20",
          dark ? "text-on-dark" : "text-ink",
        )}
      >
        <div className={cn("md:col-span-6", flip && "md:order-2 md:col-start-7")}>
          <Reveal>
            <span className={cn("display block text-[30vw] leading-[0.75] md:text-[14vw]", dark ? "text-outline" : "text-outline outline-ink")}>
              {n}
            </span>
          </Reveal>
          <h3 className="display ink-rough mt-2 text-6xl md:text-8xl">
            <LineReveal>{title}</LineReveal>
          </h3>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md font-label text-xl font-bold leading-snug md:text-2xl">{line}</p>
          </Reveal>
          {cta && (
            <Reveal delay={0.25} className="mt-8">
              {cta}
            </Reveal>
          )}
        </div>
        <div className={cn("md:col-span-5", flip ? "md:order-1 md:col-start-1" : "md:col-start-8")}>
          <Reveal y={60}>{children}</Reveal>
        </div>
      </div>
    </div>
  );
}
