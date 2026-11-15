import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/weider/SiteShell";
import { PageHeader } from "@/components/weider/PageHeader";
import { CategoryTile } from "@/components/weider/CategoryTile";
import { Reveal } from "@/components/weider/motion";
import { bb } from "@/components/weider/BrandButton";
import { ProductCard } from "@/components/weider/ProductCard";
import { categories, productsIn, products } from "@/data/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Бүтээгдэхүүн — WEIDER Mongolia" },
      { name: "description", content: "WEIDER болон Victory Endurance бүтээгдэхүүн Монголд: уураг, масс нэмэгч, креатин, амин хүчил, энергийн гель, шингэн нөхөгч, L-карнитин." },
      { property: "og:title", content: "Бүтээгдэхүүн — WEIDER Mongolia" },
      { property: "og:description", content: "Чадавхаа тэжээ. WEIDER бүтээгдэхүүн Монголд." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SiteShell>
      <PageHeader kicker="Бүтээгдэхүүн" title={["Чадавхаа", "тэжээ."]} tone="red">
        <p className="mt-6 max-w-xl font-label text-lg font-semibold">
          WEIDER болон Victory Endurance — зургаан ангиллын {products.length} бүтээгдэхүүн. Үнэ,
          найрлага, хэрэглээний мэдээллийг бүтээгдэхүүн бүрээс харна уу.
        </p>
      </PageHeader>
      <section className="bg-brand-black px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <CategoryTile category={c} index={i} />
            </Reveal>
          ))}
        </div>
        {categories.map((c) => (
          <div key={c.slug} id={c.slug} className="mx-auto mt-24 max-w-[1600px] scroll-mt-24">
            <div className="flex items-baseline justify-between gap-4 border-b-2 border-on-dark/20 pb-3 text-on-dark">
              <h2 className="display text-4xl md:text-6xl">
                <span className="mr-3 text-brand-yellow">{c.number}</span>
                {c.name}
              </h2>
              <Link
                to="/products/$category"
                params={{ category: c.slug }}
                className="label-mono shrink-0 text-xs hover:text-brand-yellow"
              >
                Ангилал үзэх →
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productsIn(c.slug).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        ))}
        <div className="mx-auto mt-16 max-w-[1600px]">
          <Link to="/contact" className={bb({ variant: "yellow", size: "lg" })}>
            Захиалга өгөх
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
