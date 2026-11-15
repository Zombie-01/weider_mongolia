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
      { title: "Products — WEIDER Mongolia" },
      { name: "description", content: "Explore the WEIDER Mongolia collection: protein, creatine, pre-workout, amino acids, vitamins & minerals and sports nutrition." },
      { property: "og:title", content: "Products — WEIDER Mongolia" },
      { property: "og:description", content: "Fuel your potential. The WEIDER Mongolia collection." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SiteShell>
      <PageHeader kicker="04 / Performance" title={["Fuel your", "potential."]} tone="red">
        <p className="mt-6 max-w-xl font-label text-lg font-semibold">
          Six categories, one standard. Full product details, photography and availability are
          being prepared.
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
            Contact us to order
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
