import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Paper } from "../Paper";
import { Crosshair } from "../Crosshair";
import { LineReveal, Reveal } from "../motion";
import { img } from "@/data/images";

export function IdentitySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section ref={ref} aria-labelledby="identity-title" className="relative overflow-hidden bg-brand-black">
      <div className="relative h-[110vh] min-h-[640px]">
        <motion.img
          src={img.mountains}
          alt="Монголын уул, тал нутаг"
          loading="lazy"
          style={{ y: bgY }}
          className="photo-bw absolute inset-0 h-[120%] w-full -translate-y-[10%] object-cover"
        />
        <div className="absolute inset-0 bg-ink/35" />
        {/* national colour strip */}
        <div className="absolute left-0 top-0 flex h-full w-3 flex-col md:w-5" aria-hidden>
          <span className="flex-1 bg-brand-red" />
          <span className="flex-1 bg-brand-blue" />
          <span className="flex-1 bg-brand-red" />
        </div>
        <Crosshair className="right-8 top-24 w-10 text-on-dark" />

        <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-center px-8 md:px-14">
          <p className="label-mono text-xs text-brand-yellow">04 / Монгол зан чанар</p>
          <h2 id="identity-title" className="display ink-rough mt-4 text-[15vw] text-on-dark md:text-[8.5vw]">
            <LineReveal>Хүчтэй хүмүүс.</LineReveal>
            <LineReveal delay={0.12}>
              <span className="text-brand-yellow">Хүчирхэг үндэстэн.</span>
            </LineReveal>
          </h2>
        </div>

        <motion.div
          style={{ y: cardY }}
          className="absolute bottom-[8%] right-[4%] hidden w-[34vw] max-w-[520px] md:block"
        >
          <div className="relative rotate-2">
            <Paper tone="paper" seed={801} className="inset-0" amp={3} />
            <div className="relative p-8 text-ink">
              <p className="font-label text-xl font-bold leading-snug">
                Монголын уудам тал нутгаас эхлээд фитнес төвийн хана хүртэл хүч чадал бол бидний зан чанарын нэг хэсэг.
              </p>
              <p className="mt-4 font-label text-lg font-semibold leading-snug text-ink-soft">
                Бид илүү хүчтэй, эрүүл, эелдэг, зоригтой үеийг бүтээхэд итгэдэг.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative md:hidden">
        <Paper tone="paper" seed={802} className="inset-0" amp={[4, 0, 0, 0]} />
        <Reveal className="relative p-6 text-ink">
          <p className="font-label text-xl font-bold leading-snug">
            Монголын уудам тал нутгаас эхлээд фитнес төвийн хана хүртэл хүч чадал бол бидний зан чанарын нэг хэсэг.
          </p>
          <p className="mt-4 font-label text-lg font-semibold leading-snug text-ink-soft">
            Бид илүү хүчтэй, эрүүл, эелдэг, зоригтой үеийг бүтээхэд итгэдэг.
          </p>
        </Reveal>
      </div>

      <div className="relative grid md:grid-cols-12">
        <div className="relative h-[60vh] md:col-span-8">
          <Paper tone="photo" seed={803} className="inset-0" amp={[3, 0, 0, 0]} fiberAmp={0.8}>
            <img src={img.runner} alt="Тал нутгаар гүйж буй тамирчин" loading="lazy" className="photo-bw h-full w-full object-cover" />
          </Paper>
        </div>
        <div className="relative md:col-span-4">
          <Paper tone="red" seed={804} className="inset-0" amp={[3, 0, 0, 3]} />
          <div className="relative flex h-full flex-col justify-end gap-2 p-8 md:p-10">
            {["Хүчтэй", "Эрүүл", "Эелдэг", "Зоригтой"].map((w, i) => (
              <Reveal key={w} delay={i * 0.08}>
                <p className="display text-6xl text-on-dark md:text-7xl">{w}.</p>
              </Reveal>
            ))}
            <Reveal delay={0.4}>
              <p className="display text-6xl text-ink md:text-7xl">Монгол.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
