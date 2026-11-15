import { archiveImages, type ArchiveImage } from "@/data/legacy";

/** Image credits and outstanding archive requirements, generated from the registry. */
export function ImageCredits() {
  const all = Object.values(archiveImages) as ArchiveImage[];
  const missing = all.filter((a) => !a.src).length;
  return (
    <section
      aria-labelledby="credits-title"
      className="relative bg-ink-soft px-5 py-16 text-on-dark md:px-10"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="credits-title" className="label-bold text-sm">
            Зургийн эх сурвалж
          </h2>
          {missing > 0 && (
            <p className="label-mono text-[10px] text-brand-yellow">
              {missing} архивын зураг лицензтэй эх сурвалжаас хүлээгдэж байна
            </p>
          )}
        </div>
        <ul className="mt-6 grid gap-x-8 gap-y-2 text-sm md:grid-cols-2 lg:grid-cols-3">
          {all.map((a) => (
            <li key={a.id} className="flex gap-3 border-t border-on-dark/10 py-2 font-label">
              <span className="label-mono shrink-0 text-[10px] text-on-dark/50">{a.id}</span>
              <span className="text-on-dark/80">
                {a.src
                  ? (a.credit ?? "Эх сурвалж тодорхойгүй — оруулах шаардлагатай")
                  : a.requirement}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl font-label text-xs leading-relaxed text-on-dark/55">
          Түүхэн бодит зургийг зөвхөн албан ёсны WEIDER, Olympia архив болон лицензтэй редакцийн эх
          сурвалжаас ашиглана. Бодит хүмүүсийн түүхэн зургийг хиймэл оюунаар үүсгэхгүй.
        </p>
      </div>
    </section>
  );
}
