import { Link } from "@tanstack/react-router";
import { Magnetic } from "../motion";
import { bb } from "../BrandButton";

/** Marquee band directly under the brand board, carrying the opening CTAs. */
export function HeroCtaBand() {
  const words = ["Stronger", "Healthier", "Kinder", "Braver", "Mongolia"];
  return (
    <section aria-label="Explore" className="relative z-10 hidden border-y-4 border-ink bg-brand-yellow text-ink md:block">
      <div className="flex items-center justify-between gap-8 px-10 py-6">
        <p className="display text-5xl lg:text-6xl">Discipline builds a stronger tomorrow.</p>
        <div className="flex shrink-0 gap-6">
          <Magnetic>
            <Link to="/" hash="story" className={bb({ variant: "ink", size: "md" })}>
              Explore the movement
            </Link>
          </Magnetic>
          <Magnetic>
            <Link to="/products" className={bb({ variant: "red", size: "md" })}>
              Discover Weider
            </Link>
          </Magnetic>
        </div>
      </div>
      <div className="overflow-hidden border-t-2 border-ink bg-ink py-2 text-on-dark">
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[...Array(4)].flatMap((_, k) =>
            words.map((w) => (
              <span key={`${k}-${w}`} className="label-mono text-sm">
                {w} <span className="text-brand-red">●</span>
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
