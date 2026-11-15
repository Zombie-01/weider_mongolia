import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/weider/SiteShell";
import { PageHeader } from "@/components/weider/PageHeader";
import { Paper } from "@/components/weider/Paper";
import { Reveal } from "@/components/weider/motion";
import { bb } from "@/components/weider/BrandButton";
import { categories, findCategory, productSlots } from "@/data/products";
import { img } from "@/data/images";

export const Route = createFileRoute("/products/$category")({
  loader: ({ params }) => {
    const category = findCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.category.name ?? "Category";
    return {
      meta: [
        { title: `${name} — WEIDER Mongolia` },
        { name: "description", content: `WEIDER Mongolia ${name}. Product details coming soon.` },
        { property: "og:title", content: `${name} — WEIDER Mongolia` },
        { property: "og:description", content: `WEIDER Mongolia ${name} collection.` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <PageHeader kicker="404" title={["Not found."]} tone="blue">
        <Link to="/products" className={bb({ variant: "yellow" }, "mt-8")}>
          Back to products
        </Link>
      </PageHeader>
    </SiteShell>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const slots = productSlots(category);
  const tone = category.tone === "black" ? "blue" : category.tone;
  return (
    <SiteShell>
      <PageHeader kicker={`${category.number} / Category`} title={[category.name]} tone={tone} />

      {/* product detail template — fill with real product data */}
      <section className="bg-brand-black px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-2 md:items-center">
          <Reveal className="group relative aspect-square">
            <Paper tone="photo" seed={1200} className="inset-0" amp={2} fiberAmp={0.6}>
              <img
                src={img.jars}
                alt="Placeholder product photo"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </Paper>
            <span className="label-bold absolute left-5 top-5 bg-brand-yellow px-3 py-1 text-xs text-ink">
              Placeholder image
            </span>
          </Reveal>
          <div className="text-on-dark">
            <p className="label-mono text-xs text-brand-yellow">Featured product</p>
            <h2 className="display mt-3 text-6xl md:text-8xl">{slots[0]?.name}</h2>
            <p className="mt-6 max-w-md font-label text-lg font-semibold text-muted-foreground">
              Product description, flavours, sizes and usage will appear here once WEIDER Mongolia
              product data is provided.
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <Link to="/contact" className={bb({ variant: "red", size: "lg" })}>
                Contact to order
              </Link>
              <Link to="/products" className={bb({ variant: "outline" }, "text-on-dark")}>
                All categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <Paper tone="paper" seed={1201} className="inset-0" amp={[2, 0, 0, 0]} shadow={false} />
        <div className="relative mx-auto max-w-[1600px] px-5 py-20 text-ink md:px-10">
          <h2 className="display text-5xl md:text-7xl">In this category</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {slots.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.08} className="group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Paper tone="photo" seed={1210 + i} className="inset-0" amp={2}>
                    <img src={img.jars} alt="Placeholder product photo" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </Paper>
                </div>
                <p className="display mt-4 text-3xl">{s.name}</p>
                <p className="label-mono mt-1 text-[11px] text-brand-red">{s.note}</p>
              </Reveal>
            ))}
          </div>
          <nav aria-label="Other categories" className="mt-16 flex flex-wrap gap-2">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to="/products/$category"
                  params={{ category: c.slug }}
                  className="label-mono border-2 border-ink px-3 py-2 text-xs hover:bg-ink hover:text-on-dark"
                >
                  {c.number} {c.name}
                </Link>
              ))}
          </nav>
        </div>
      </section>
    </SiteShell>
  );
}
