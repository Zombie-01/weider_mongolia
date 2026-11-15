import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Paper } from "../Paper";
import { Crosshair } from "../Crosshair";
import { EASE, LineReveal } from "../motion";
import { bb } from "../BrandButton";
import { img } from "@/data/images";

const SW = ["red", "blue", "orange", "yellow", "black"] as const;

/** Mobile composition of the brand board: same pieces, stacked for a narrow screen. */
export function MobileHero() {
  return (
    <section aria-label="Beyond your limits" className="relative overflow-hidden bg-brand-black pt-16">
      {/* top paper: logo + headline */}
      <div className="relative">
        <Paper tone="paper" seed={201} className="inset-0" amp={[0, 0, 3, 0]} shadow />
        <div className="relative px-5 pb-12 pt-6 text-ink">
          <Crosshair className="right-4 top-4 w-6" />
          <p className="label-bold text-[11px]">Mongolia / Brand direction</p>
          <h1 className="display ink-rough mt-3 text-[25vw] leading-[0.82]">
            <LineReveal inView={false} delay={0.2}>
              Beyond
            </LineReveal>
            <LineReveal inView={false} delay={0.35}>
              <span className="block whitespace-nowrap text-[18.5vw]">Your limits</span>
            </LineReveal>
          </h1>
          <p className="label-bold mt-4 text-xs leading-snug">
            Higher bodies
            <br />
            Stronger minds
            <br />
            Brighter Mongolia
          </p>
        </div>
      </div>

      {/* athlete over red / blue / flag */}
      <div className="relative -mt-4 h-[120vw]">
        <Paper tone="red" seed={202} className="left-0 top-0 h-[70%] w-[62%]" amp={3} />
        <Paper tone="blue" seed={203} className="right-0 top-[6%] h-[60%] w-[50%]" amp={3} />
        <Paper tone="photo" seed={204} className="left-[6%] top-[8%] h-[36%] w-[34%]" amp={4}>
          <img src={img.flag} alt="" className="h-full w-full origin-[18%_45%] scale-[1.7] object-cover object-left" />
        </Paper>
        <motion.img
          src={img.athlete}
          alt="Mongolian athlete, black and white portrait"
          className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[-4px_0_0_var(--brand-red)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
        />
        <p className="label-mono absolute right-4 top-[10%] text-right text-[10px] leading-relaxed text-on-dark">
          Stronger
          <br />
          Healthier
          <br />
          Kinder
          <br />
          Braver
          <br />
          Mongolia
        </p>
        <Paper tone="red" seed={205} className="bottom-[6%] right-[4%] h-24 w-44 rotate-[-9deg]" amp={6}>
          <span className="absolute inset-0 flex rotate-[-6deg] items-center justify-center text-center font-script text-2xl uppercase leading-none text-ink">
            Stronger
            <br />
            Mongolia
          </span>
        </Paper>
      </div>

      {/* strength is earned */}
      <div className="relative">
        <Paper tone="black" seed={206} className="inset-0" amp={[4, 0, 0, 0]} />
        <div className="relative px-5 pb-10 pt-10">
          <p className="display ink-rough -rotate-[5deg] text-[22vw] leading-[0.82] text-brand-yellow">
            Strength
            <br />
            is earned
          </p>
          <p className="label-mono mt-6 text-[11px] leading-relaxed text-on-dark">
            Discipline builds a stronger tomorrow
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/" hash="story" className={bb({ variant: "red" })}>
              Explore the movement
            </Link>
            <Link to="/products" className={bb({ variant: "outline" }, "text-on-dark")}>
              Discover Weider
            </Link>
          </div>
        </div>
      </div>

      {/* material & color */}
      <div className="relative">
        <Paper tone="paper" seed={207} className="inset-0" amp={[4, 0, 0, 0]} />
        <div className="relative px-5 pb-8 pt-8 text-ink">
          <p className="label-bold text-[11px]">03 / Material &amp; color</p>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {SW.map((t, i) => (
              <Paper key={t} tone={t} seed={210 + i} className="relative h-16 w-full" amp={6} fiber={false} crumple={t === "black" ? 0.2 : 0.9} />
            ))}
            <Paper tone="photo" seed={216} className="relative h-16 w-full" amp={6} fiber={false}>
              <div className="absolute inset-0 bg-brand-silver">
                <div className="crumple-tex absolute inset-0" />
              </div>
            </Paper>
          </div>
          <p className="label-bold mt-6 text-xs leading-snug">
            Built different
            <br />
            For a brighter tomorrow
          </p>
        </div>
      </div>
    </section>
  );
}
