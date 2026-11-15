import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/weider/SiteShell";
import { PageHeader } from "@/components/weider/PageHeader";
import { CategoryTile } from "@/components/weider/CategoryTile";
import { Reveal } from "@/components/weider/motion";
import { bb } from "@/components/weider/BrandButton";
import { categories } from "@/data/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Бүтээгдэхүүн — WEIDER Mongolia" },
      { name: "description", content: "WEIDER бүтээгдэхүүн Монголд: уураг, креатин, дасгалын өмнөх, амин хүчил, витамин ба эрдэс, спортын хоол тэжээл." },
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
          Зургаан ангилал, нэг стандарт. Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл, зураг болон нөөцийн
          мэдээллийг бэлтгэж байна.
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
        <div className="mx-auto mt-16 max-w-[1600px]">
          <Link to="/contact" className={bb({ variant: "yellow", size: "lg" })}>
            Захиалга өгөх
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
