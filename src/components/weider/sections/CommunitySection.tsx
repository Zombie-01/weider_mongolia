import { Link } from "@tanstack/react-router";
import { Paper } from "../Paper";
import { LineReveal, Magnetic, Reveal } from "../motion";
import { bb } from "../BrandButton";
import { img } from "@/data/images";
import { site } from "@/data/site";
import athleteEnergyUp from "@/assets/community/athlete-energy-up.jpg";
import athleteHiCarbo from "@/assets/community/athlete-hi-carbo.jpg";
import { cn } from "@/lib/utils";

const TILES = [
  { label: "Бэлтгэлийн нийгэмлэг", src: img.community, cls: "md:col-span-7 md:row-span-2", pos: "50% 30%" },
  { label: "Манай тамирчид", src: athleteEnergyUp, cls: "md:col-span-5 md:row-span-2", pos: "50% 30%" },
  { label: "Victory Endurance", src: athleteHiCarbo, cls: "md:col-span-4", pos: "50% 35%" },
  { label: "Хувь хүний өөрчлөлт", src: img.recovery, cls: "md:col-span-4", pos: "50% 40%" },
  { label: "Эрүүл амьдралын хэв маяг", src: img.runner, cls: "md:col-span-4", pos: "30% 50%" },
];

export function CommunitySection() {
  return (
    <section id="community" aria-labelledby="community-title" className="relative scroll-mt-16">
      <Paper tone="blue" seed={901} className="inset-0" amp={[1.5, 0, 1.5, 0]} />
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="label-mono text-xs text-brand-yellow">05 / Нийгэмлэг</p>
            <h2 id="community-title" className="display ink-rough mt-4 text-[17vw] text-on-dark md:text-[9vw]">
              <LineReveal>Хүч</LineReveal>
              <LineReveal delay={0.1}>хуваалцахад өснө.</LineReveal>
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Magnetic>
              <a href={site.instagram} target="_blank" rel="noreferrer" className={bb({ variant: "yellow", size: "lg" })}>
                {site.instagramHandle}
              </a>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" className={bb({ variant: "outline", size: "lg" }, "text-on-dark")}>
                Хөдөлгөөнд нэгдэх
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="mt-14 grid auto-rows-[44vw] gap-5 md:auto-rows-[20vw] md:grid-cols-12">
          {TILES.map((t, i) => (
            <Reveal key={t.label} delay={(i % 3) * 0.08} className={cn("group relative", t.cls)}>
              <Paper tone="photo" seed={910 + i * 5} className="inset-0" amp={1.6} fiberAmp={0.6}>
                <img
                  src={t.src}
                  alt={t.label}
                  loading="lazy"
                  className="photo-bw h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  style={{ objectPosition: t.pos }}
                />
              </Paper>
              <span
                className={cn(
                  "label-bold absolute bottom-5 left-5 px-3 py-1.5 text-xs transition-colors",
                  i % 2 ? "bg-brand-yellow text-ink" : "bg-brand-red text-on-dark",
                  "group-hover:bg-paper group-hover:text-ink",
                )}
              >
                {t.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
