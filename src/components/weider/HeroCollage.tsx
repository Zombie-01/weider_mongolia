import { Link } from "@tanstack/react-router";
import { motion, useScroll } from "framer-motion";
import { useRef, type ReactNode } from "react";
import type { MotionValue } from "framer-motion";
import { Paper } from "./Paper";
import { Crosshair } from "./Crosshair";
import { Drift, EASE } from "./motion";
import { ab, u, type Box } from "./artboard";
import { img } from "@/data/images";
import { categories } from "@/data/products";

/**
 * Desktop hero: a 1:1 recreation of the WEIDER Mongolia brand board, built from
 * separate layers (paper sheets, photos, live text) on a 1920x1080 artboard.
 */
export function HeroCollage() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });

  return (
    <section ref={ref} aria-label="Хязгаараа дав" className="artboard bg-brand-black">
      {/* ---------- back layers ---------- */}
      <Layer p={p} depth={-40} box={ab(1310, -30, 640, 780)} delay={0.05}>
        <Paper tone="blue" seed={3} className="inset-0" amp={[0, 0, 2.5, 3]} />
      </Layer>
      <Layer p={p} depth={-70} box={ab(820, -30, 600, 340)} delay={0.1}>
        <Paper tone="blue" seed={5} className="inset-0" amp={[0, 2, 4, 2]} />
      </Layer>
      <Layer p={p} depth={-20} box={ab(1165, 455, 575, 370)} delay={0.25}>
        <Paper tone="photo" seed={9} className="inset-0" amp={2.5}>
          <img src={img.mountains} alt="" className="photo-bw h-full w-full object-cover" />
        </Paper>
      </Layer>
      <Layer p={p} depth={-10} box={ab(1120, 860, 360, 240)} delay={0.3}>
        <Paper tone="photo" seed={11} className="inset-0" amp={[3, 3, 0, 3]}>
          <img
            src={img.mountains}
            alt=""
            className="photo-bw h-full w-full object-cover object-[70%_40%]"
          />
        </Paper>
      </Layer>
      <Layer p={p} depth={-90} box={ab(555, -30, 520, 830)} delay={0.15}>
        <Paper
          tone="red"
          seed={15}
          className="inset-0"
          shape={[
            [0, 0],
            [62, 0],
            [70, 30],
            [86, 58],
            [100, 92],
            [70, 100],
            [0, 100],
          ]}
          amp={[0, 1.5, 2, 2, 2, 2, 0]}
        />
      </Layer>
      <Layer p={p} depth={-120} box={ab(795, 100, 245, 350)} delay={0.35}>
        <Paper tone="photo" seed={17} className="inset-0" amp={3}>
          <img
            src={img.flag}
            alt=""
            className="h-full w-full origin-[18%_45%] scale-[1.7] object-cover object-left"
          />
        </Paper>
      </Layer>
      <Layer p={p} depth={-60} box={ab(1362, 14, 548, 572)} delay={0.4} rotate={-1.2}>
        <Paper
          tone="photo"
          seed={19}
          className="inset-0"
          shape={[
            [0, 0],
            [100, 0],
            [100, 66],
            [72, 78],
            [30, 100],
            [0, 100],
          ]}
          amp={[1.6, 1.6, 2, 2, 2, 1.6]}
          fiberAmp={0.4}
        >
          <img
            src={img.chalk}
            alt="Штанга дээр магни цацаж буй гар"
            className="h-full w-full origin-[42%_28%] scale-[1.15] object-cover grayscale contrast-125 brightness-125 transition-transform duration-[1.5s] hover:scale-[1.2]"
          />
        </Paper>
      </Layer>
      <Layer p={p} depth={-30} box={ab(1748, 375, 200, 300)} delay={0.5}>
        <Paper tone="black" seed={21} className="inset-0" amp={[3, 0, 3, 4]} />
      </Layer>
      <Layer p={p} depth={-15} box={ab(1340, 610, 620, 500)} delay={0.45} rotate={-1.5}>
        <Paper tone="black" seed={13} className="inset-0" amp={[2.5, 0, 0, 2.5]} />
      </Layer>

      {/* ---------- left paper stack ---------- */}
      <Layer p={p} depth={-50} box={ab(-20, 214, 950, 505)} delay={0.1}>
        <Paper
          tone="paper"
          seed={25}
          className="inset-0"
          shape={[
            [0, 0],
            [71, 0],
            [86, 45],
            [100, 82],
            [96, 100],
            [0, 100],
          ]}
          amp={[1.2, 1.4, 1.4, 2, 1.5, 0]}
        />
      </Layer>
      <Layer p={p} depth={-35} box={ab(270, 612, 680, 98)} delay={0.3} rotate={-2.5}>
        <Paper tone="red" seed={23} className="inset-0" amp={[10, 2, 10, 2]} />
      </Layer>
      <Layer p={p} depth={-80} box={ab(-20, -20, 618, 255)} delay={0}>
        <Paper tone="paper" seed={27} className="inset-0" amp={[0, 1.5, 6, 0]} />
      </Layer>
      <Layer p={p} depth={-20} box={ab(-20, 690, 628, 410)} delay={0.2}>
        <Paper tone="paper" seed={29} className="inset-0" amp={[3, 2.2, 0, 0]} />
      </Layer>
      <Layer p={p} depth={-10} box={ab(560, 925, 170, 175)} delay={0.4} rotate={6}>
        <Paper tone="blue" seed={31} className="inset-0" amp={4} />
      </Layer>

      {/* ---------- athlete ---------- */}
      <motion.div
        className="absolute"
        style={{ ...ab(772, -8, 735, 1102) }}
        initial={{ opacity: 0, scale: 1.06, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
      >
        <Drift progress={p} depth={-140} className="h-full w-full">
          <img
            src={img.athlete}
            alt="Монгол тамирчин, хар цагаан хөрөг"
            className="h-full w-full object-contain drop-shadow-[-0.2cqw_0_0_var(--brand-red)]"
            fetchPriority="high"
          />
        </Drift>
      </motion.div>

      {/* foil + jars */}
      <Layer p={p} depth={-25} box={ab(585, 690, 545, 400)} delay={0.55}>
        <Paper
          tone="photo"
          seed={35}
          className="inset-0 group"
          shape={[
            [0, 8],
            [46, 0],
            [100, 14],
            [100, 100],
            [0, 100],
          ]}
          amp={[3, 3, 0, 0, 2]}
        >
          <img
            src={img.jars}
            alt="WEIDER бүтээгдэхүүний сав (түр зураг)"
            className="h-full w-full object-cover object-[50%_30%] transition-transform duration-1000 group-hover:scale-105"
          />
        </Paper>
      </Layer>

      {/* red script tag */}
      <Layer p={p} depth={-60} box={ab(1078, 742, 322, 172)} delay={0.9} rotate={-9}>
        <Paper tone="red" seed={33} className="inset-0" amp={5}>
          <span
            className="absolute inset-0 flex items-center justify-center text-center font-script uppercase leading-[0.95] text-ink"
            style={{ fontSize: u(40), transform: "rotate(-6deg)" }}
          >
            Хүчирхэг
            <br />
            Монгол
          </span>
        </Paper>
      </Layer>

      {/* ---------- typography ---------- */}
      <Text x={40} y={49} delay={0.4}>
        <h1 className="sr-only">WEIDER Mongolia — Хязгаараа дав</h1>
        <span
          aria-hidden
          lang="en"
          className="ink-rough block origin-left font-display leading-none text-ink"
          style={{ fontSize: u(109), transform: "scaleX(1.2)" }}
        >
          WEIDER
        </span>
      </Text>
      <Text x={412} y={52} delay={0.5}>
        <span aria-hidden className="block font-label font-bold leading-none text-ink" style={{ fontSize: u(40) }}>
          ®
        </span>
      </Text>
      <Text x={34} y={178} delay={0.55}>
        <span className="label-bold block text-ink" style={{ fontSize: u(17) }}>
          1936 оноос хойш / Одоо Монголд
        </span>
      </Text>

      <CapLine x={32} capTop={258} size={182} sx={0.92} delay={0.6} className="text-ink">
        Хязгаараа
      </CapLine>
      <CapLine x={32} capTop={436} size={182} sx={0.92} delay={0.75} className="text-ink">
        дав.
      </CapLine>

      <Text x={35} y={630} delay={1}>
        <Lines size={16} lh={20} className="label-bold text-ink">
          {["Хүчтэй бие", "Тэвчээртэй сэтгэл", "Гэгээлэг Монгол"]}
        </Lines>
      </Text>

      {/* "1936 оноос хойш" annotation */}
      <Text x={786} y={578} delay={1.2}>
        <div className="relative text-ink" style={{ width: u(100), height: u(102) }}>
          <svg
            viewBox="0 0 100 102"
            className="absolute inset-0 h-full w-full"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M8 4v96M2 30h96M2 98h96M96 26v76" />
            <circle cx="30" cy="14" r="6" />
            <path d="M30 2v26M18 14h24" />
          </svg>
          <span
            className="label-mono absolute left-[12%] top-[34%] block font-semibold"
            style={{ fontSize: u(14), lineHeight: u(19), letterSpacing: "0.06em" }}
          >
            1936
            <br />
            оноос
            <br />
            хойш
          </span>
        </div>
      </Text>

      <Text x={34} y={744} delay={1}>
        <span className="label-bold block text-ink" style={{ fontSize: u(16) }}>
          Бүтээгдэхүүний ангилал
        </span>
      </Text>
      <Swatches />

      <div
        className="absolute bg-ink"
        style={{ ...ab(110, 997, 236), height: "1px" }}
        aria-hidden
      />
      <Text x={110} y={1006} delay={1.2}>
        <Lines size={16} lh={21} className="label-bold text-ink">
          {["Дэлхийн брэнд", "Одоо Монголд"]}
        </Lines>
      </Text>

      {/* red column copy */}
      <Text x={620} y={32} delay={0.9}>
        <Lines size={14.5} lh={20} className="label-mono text-on-dark">
          {["Сахилга бат", "ирээдүйг", "хүчирхэг", "болгоно"]}
        </Lines>
        <span className="mt-[1.3cqw] block bg-on-dark" style={{ width: u(44), height: "2px" }} />
      </Text>
      <Text x={620} y={166} delay={1}>
        <Lines size={15} lh={21} className="label-mono tracking-[0.03em] text-on-dark">
          {["01 / Бүтээгдэхүүн", "02 / Өв түүх", "03 / Нийгэмлэг"]}
        </Lines>
      </Text>

      <Text x={1238} y={146} delay={1.1}>
        <Lines size={14.5} lh={19.5} className="label-mono text-on-dark">
          {["Хүчтэй", "Эрүүл", "Эелдэг", "Зоригтой", "Монгол"]}
        </Lines>
      </Text>

      <Text x={1738} y={72} delay={1.2}>
        <Lines size={14.5} lh={19.5} className="label-mono text-center font-semibold text-on-dark">
          {["Бэлтгэл", "эрх чөлөөг", "бүтээнэ"]}
        </Lines>
        <span
          className="mx-auto mt-[0.9cqw] block bg-on-dark"
          style={{ width: u(34), height: "2px" }}
        />
      </Text>

      <Text x={1795} y={480} delay={1.3}>
        <Lines size={15.5} lh={20.5} className="label-bold text-center text-on-dark">
          {["Ижил", "хөдөлмөр", "илүү", "өндөр", "зорилт"]}
        </Lines>
      </Text>

      <Text x={1428} y={573} delay={1.3}>
        <Lines size={14.5} lh={20} className="label-mono text-on-dark">
          {["Эрүүл", "иргэд", "хүчирхэг", "үндэстэн"]}
        </Lines>
      </Text>

      <CenterLine cx={1654} cy={768} size={131} sx={1} rotate={-5.5} delay={0.95}>
        Хөлс
      </CenterLine>
      <CenterLine cx={1622} cy={889} size={126} sx={0.8} rotate={-5.5} delay={1.05}>
        Хүч болно
      </CenterLine>

      <Text x={1700} y={963} delay={1.4}>
        <Lines size={15.5} lh={20.5} className="label-bold w-[10cqw] text-right text-on-dark">
          {["Хүмүүс", "Ахиц", "Боломж", "Монгол"]}
        </Lines>
      </Text>

      {/* registration marks */}
      <Crosshair className="text-ink" style={{ ...ab(22, 22), width: u(36) }} />
      <Crosshair className="text-ink" style={{ ...ab(527, 22), width: u(36) }} />
      <Crosshair className="text-ink" style={{ ...ab(228, 643), width: u(36) }} />
      <Crosshair className="text-ink" style={{ ...ab(22, 1012), width: u(36) }} />
      <Crosshair className="text-on-dark/70" style={{ ...ab(1313, 30), width: u(30) }} />
      <Crosshair className="text-on-dark" style={{ ...ab(1862, 422), width: u(36) }} />
      <Crosshair className="text-on-dark" style={{ ...ab(1708, 1012), width: u(36) }} />
    </section>
  );
}

/** The colour sheets double as the product-category index (same order and colours). */
const SWATCHES = [
  { tone: "red", x: 22 },
  { tone: "blue", x: 112 },
  { tone: "orange", x: 197 },
  { tone: "yellow", x: 292 },
  { tone: "black", x: 386 },
  { tone: "photo", x: 480 },
] as const;

/** Short two-line labels that fit under an 80px sheet. */
const SWATCH_LABEL: Record<string, [string, string]> = {
  protein: ["Уураг ба", "масс"],
  creatine: ["Креатин", ""],
  "amino-acids": ["Амин", "хүчил"],
  "energy-gels": ["Энергийн", "гель"],
  hydration: ["Шингэн", "нөхөгч"],
  "l-carnitine": ["L-карни-", "тин"],
};

function Swatches() {
  return (
    <>
      {SWATCHES.map((s, i) => {
        const c = categories[i]!;
        const [l1, l2] = SWATCH_LABEL[c.slug] ?? [c.name, ""];
        return (
        <motion.div
          key={s.tone}
          className="absolute"
          style={ab(s.x, 786, 80, 122)}
          initial={{ opacity: 0, y: 20, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          whileHover={{ y: -6, rotate: i % 2 ? 2 : -2 }}
          transition={{ duration: 0.7, delay: 1 + i * 0.08, ease: EASE }}
        >
          <Paper
            tone={s.tone === "photo" ? "photo" : s.tone}
            seed={40 + i}
            className="inset-0"
            amp={5}
            fiber={false}
            crumple={s.tone === "photo" ? 0 : s.tone === "black" ? 0.25 : 0.9}
          >
            {s.tone === "photo" && (
              <div className="absolute inset-0 bg-brand-silver">
                <div className="crumple-tex absolute inset-0 opacity-100" />
              </div>
            )}
            {s.tone === "black" && (
              <div className="crumple-screen absolute inset-0 opacity-[0.12]" />
            )}
          </Paper>
          <Link
            to="/products/$category"
            params={{ category: c.slug }}
            aria-label={c.name}
            className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          />
          <span
            className="label-bold absolute left-0 block text-ink"
            style={{ top: "112%", fontSize: u(13), lineHeight: u(16), whiteSpace: "nowrap", letterSpacing: "0.04em" }}
          >
            {l1}
            <br />
            {l2}
          </span>
        </motion.div>
        );
      })}
    </>
  );
}

function Layer({
  p,
  depth,
  box,
  delay,
  rotate = 0,
  children,
}: {
  p: MotionValue<number>;
  depth: number;
  box: Box;
  delay: number;
  rotate?: number;
  children: ReactNode;
}) {
  return (
    <Drift progress={p} depth={depth} className="absolute" style={{ ...box, rotate }}>
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </Drift>
  );
}

function Text({
  x,
  y,
  delay,
  children,
}: {
  x: number;
  y: number;
  delay: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="absolute"
      style={ab(x, y)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Lines({
  children,
  size,
  lh,
  className,
}: {
  children: string[];
  size: number;
  lh: number;
  className?: string;
}) {
  return (
    <p className={className} style={{ fontSize: u(size), lineHeight: u(lh) }}>
      {children.map((l) => (
        <span key={l} className="block whitespace-nowrap">
          {l}
        </span>
      ))}
    </p>
  );
}

/** Display line positioned by its cap-height top (Anton: cap top sits 0.055em below the line box). */
function CapLine({
  x,
  capTop,
  size,
  sx,
  delay,
  className,
  children,
}: {
  x: number;
  capTop: number;
  size: number;
  sx: number;
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{ ...ab(x, capTop - size * 0.055 - 4), paddingTop: u(4) }}
    >
      <motion.span
        className={`ink-rough block origin-left whitespace-nowrap font-display uppercase ${className ?? ""}`}
        style={{ fontSize: u(size), lineHeight: 1, scaleX: sx }}
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </div>
  );
}

/** Display line positioned by its visual centre, for the tilted yellow statement. */
function CenterLine({
  cx,
  cy,
  size,
  sx,
  rotate,
  delay,
  children,
}: {
  cx: number;
  cy: number;
  size: number;
  sx: number;
  rotate: number;
  delay: number;
  children: ReactNode;
}) {
  return (
    <motion.span
      className="ink-rough absolute block whitespace-nowrap font-display uppercase text-brand-yellow"
      style={{
        ...ab(cx, cy),
        fontSize: u(size),
        lineHeight: 1,
        x: "-50%",
        y: "-50%",
        rotate,
        scaleX: sx,
      }}
      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}
