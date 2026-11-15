import type { ReactNode } from "react";
import { Paper, type PaperTone } from "./Paper";
import { Crosshair } from "./Crosshair";
import { LineReveal } from "./motion";

/** Torn-paper page opener used by inner pages. */
export function PageHeader({
  kicker,
  title,
  tone = "red",
  children,
}: {
  kicker: string;
  title: string[];
  tone?: Exclude<PaperTone, "photo">;
  children?: ReactNode;
}) {
  const dark = tone !== "paper" && tone !== "yellow" && tone !== "orange";
  return (
    <header className="relative overflow-hidden bg-brand-black pt-28">
      <Paper tone={tone} seed={title.join("").length * 13} className="inset-x-0 bottom-0 top-16" amp={[0, 0, 3, 0]} />
      <div className={`relative mx-auto max-w-[1600px] px-5 pb-20 pt-10 md:px-10 ${dark ? "text-on-dark" : "text-ink"}`}>
        <Crosshair className="right-6 top-4 w-8" />
        <p className="label-mono text-xs">{kicker}</p>
        <h1 className="display ink-rough mt-4 text-[17vw] md:text-[9vw]">
          {title.map((t, i) => (
            <LineReveal key={t} inView={false} delay={0.1 + i * 0.1}>
              {t}
            </LineReveal>
          ))}
        </h1>
        {children}
      </div>
    </header>
  );
}
