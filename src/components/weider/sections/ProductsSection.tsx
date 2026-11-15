import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Paper } from "../Paper";
import { CategoryTile } from "../CategoryTile";
import { LineReveal, Magnetic, Reveal } from "../motion";
import { bb } from "../BrandButton";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductsSection() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="products" aria-labelledby="products-title" className="relative scroll-mt-16">
      <Paper tone="paper" seed={601} className="inset-0" amp={[1.5, 0, 1.5, 0]} />
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 text-ink md:px-10 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="label-bold text-xs">03 / Бүтээгдэхүүн</p>
            <h2 id="products-title" className="display ink-rough mt-4 text-[17vw] md:text-[9vw]">
              <LineReveal>Чадавхаа</LineReveal>
              <LineReveal delay={0.1}>тэжээ.</LineReveal>
            </h2>
          </div>
          <Reveal className="max-w-sm">
            <p className="font-label text-lg font-semibold leading-snug">
              WEIDER-ийн бүтээгдэхүүнийг таны бэлтгэлийн хэрэгцээгээр ангилсан. Бүтээгдэхүүний
              дэлгэрэнгүй мэдээлэл, зураг удахгүй нэмэгдэнэ.
            </p>
          </Reveal>
        </div>

        {/* category navigation */}
        <nav aria-label="Бүтээгдэхүүний ангилал" className="mt-12 flex flex-wrap gap-2 border-y-2 border-ink py-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/products/$category"
              params={{ category: c.slug }}
              onMouseEnter={() => setActive(c.slug)}
              onMouseLeave={() => setActive(null)}
              className={cn(
                "label-mono border-2 border-ink px-3 py-2 text-xs transition-colors",
                active === c.slug ? "bg-ink text-on-dark" : "hover:bg-ink hover:text-on-dark",
              )}
            >
              {c.number} {c.name}
            </Link>
          ))}
        </nav>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <div
                className={cn(
                  "transition-opacity duration-300",
                  active && active !== c.slug && "opacity-40",
                )}
              >
                <CategoryTile category={c} index={i} />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-6">
          <Magnetic>
            <Link to="/products" className={bb({ variant: "red", size: "lg" })}>
              Бүх бүтээгдэхүүн
            </Link>
          </Magnetic>
          <Link to="/contact" className="label-mono text-sm underline decoration-2 underline-offset-4 hover:text-brand-red">
            Нөөц, үнийн талаар асуух
          </Link>
        </div>
      </div>
    </section>
  );
}
