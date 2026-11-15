import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Crosshair } from "../Crosshair";
import { LineReveal, Magnetic, Reveal } from "../motion";
import { bb } from "../BrandButton";

export function FinalStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const logoX = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

  return (
    <section ref={ref} aria-labelledby="final-title" className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-brand-black px-5 pt-28 md:px-10">
      <Crosshair className="left-6 top-10 w-8 text-on-dark" />
      <Crosshair className="right-6 top-10 w-8 text-on-dark" />
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <h2 id="final-title" className="display ink-rough text-[28vw] leading-[0.8] text-brand-yellow md:col-span-8 md:text-[15vw]">
          <LineReveal>Хөлс</LineReveal>
          <LineReveal delay={0.1}>хүч</LineReveal>
          <LineReveal delay={0.2}>болно.</LineReveal>
        </h2>
        <div className="md:col-span-4 md:pb-6 md:text-right">
          {["Хүмүүс.", "Ахиц.", "Боломж.", "Монгол."].map((w, i) => (
            <Reveal key={w} delay={0.2 + i * 0.08}>
              <p className="label-bold text-2xl text-on-dark md:text-3xl">{w}</p>
            </Reveal>
          ))}
          <Reveal delay={0.6} className="mt-8">
            <Magnetic>
              <Link to="/products" className={bb({ variant: "red", size: "lg" })}>
                WEIDER бүтээгдэхүүн үзэх
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
      <motion.p
        aria-hidden
        style={{ x: logoX }}
        lang="en"
        className="display mt-16 select-none whitespace-nowrap text-[31vw] leading-[0.75] text-on-dark"
      >
        WEIDER<span className="align-top font-label text-[5vw] font-bold">®</span>
      </motion.p>
    </section>
  );
}
