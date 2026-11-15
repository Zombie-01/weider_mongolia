import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { tornPath, type Pt } from "@/lib/torn";

export type PaperTone = "paper" | "red" | "blue" | "black" | "yellow" | "orange" | "photo";

const toneClass: Record<PaperTone, string> = {
  paper: "bg-paper text-ink",
  red: "bg-brand-red text-on-dark",
  blue: "bg-brand-blue text-on-dark",
  black: "bg-brand-black text-on-dark",
  yellow: "bg-brand-yellow text-ink",
  orange: "bg-brand-orange text-ink",
  photo: "bg-brand-black text-on-dark",
};

/** default crumple strength per tone (0 = none) */
const toneCrumple: Record<PaperTone, number> = {
  paper: 0,
  red: 0.35,
  blue: 0.35,
  black: 0,
  yellow: 0.3,
  orange: 0.3,
  photo: 0,
};

interface PaperProps {
  tone?: PaperTone;
  seed: number;
  shape?: Pt[];
  /** inward torn amplitude (percent) per edge */
  amp?: number | number[];
  /** white exposed paper fibre behind the torn edge */
  fiber?: boolean;
  fiberAmp?: number | number[];
  steps?: number;
  shadow?: boolean;
  /** crumpled-paper texture strength 0..1 */
  crumple?: number;
  className?: string;
  innerClassName?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** A sheet of torn paper. Position it with className/style; children fill the sheet. */
export function Paper({
  tone = "paper",
  seed,
  shape,
  amp = 1.5,
  fiber = true,
  fiberAmp,
  steps,
  shadow = true,
  crumple,
  className,
  innerClassName,
  style,
  children,
}: PaperProps) {
  const outer = tornPath(seed, shape, { amp: fiberAmp ?? scale(amp, 0.55), steps });
  const inner = tornPath(seed + 101, shape, { amp, steps });
  const c = crumple ?? toneCrumple[tone];
  const flat = tone === "paper" || tone === "red" || tone === "blue";
  return (
    <div className={cn("absolute", shadow && "shadow-paper", className)} style={style}>
      {fiber && (
        <div className="absolute inset-0 bg-paper paper-tex" style={{ clipPath: outer }} />
      )}
      <div
        className={cn(
          "absolute inset-0 overflow-hidden grain",
          toneClass[tone],
          flat && "paper-tex",
          innerClassName,
        )}
        style={{ clipPath: fiber ? inner : outer }}
      >
        {children}
        {c > 0 && (
          <div
            aria-hidden
            className="crumple-tex pointer-events-none absolute inset-0"
            style={{ opacity: c, backgroundPosition: `${(seed * 37) % 100}% ${(seed * 53) % 100}%` }}
          />
        )}
      </div>
    </div>
  );
}

function scale(a: number | number[], k: number) {
  return Array.isArray(a) ? a.map((v) => v * k) : a * k;
}
