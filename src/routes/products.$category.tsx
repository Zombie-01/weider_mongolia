import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/weider/SiteShell";
import { PageHeader } from "@/components/weider/PageHeader";
import { Paper } from "@/components/weider/Paper";
import { Reveal } from "@/components/weider/motion";
import { bb } from "@/components/weider/BrandButton";
import { ProductCard } from "@/components/weider/ProductCard";
import { categories, findCategory, productsIn } from "@/data/products";
import { site } from "@/data/site";
import athleteEnergyUp from "@/assets/community/athlete-energy-up.jpg";
import athleteHiCarbo from "@/assets/community/athlete-hi-carbo.jpg";

export const Route = createFileRoute("/products/$category")({
  loader: ({ params }) => {
    const category = findCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category;
    const name = c?.name ?? "Ангилал";
    return {
      meta: [
        { title: `${name} — WEIDER Mongolia` },
        { name: "description", content: c ? `${c.name}: ${c.blurb}` : "WEIDER Mongolia" },
        { property: "og:title", content: `${name} — WEIDER Mongolia` },
        { property: "og:description", content: c?.blurb ?? "WEIDER Mongolia" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(c ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <PageHeader kicker="404" title={["Олдсонгүй."]} tone="blue">
        <Link to="/products" className={bb({ variant: "yellow" }, "mt-8")}>
          Бүтээгдэхүүн рүү буцах
        </Link>
      </PageHeader>
    </SiteShell>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = productsIn(category.slug);
  const tone = category.tone === "black" ? "blue" : category.tone;
  return (
    <SiteShell>
      <PageHeader
        kicker={`${category.number} / Ангилал · ${category.latin}`}
        title={[category.name]}
        tone={tone}
      >
        <p className="mt-6 max-w-xl font-label text-lg font-semibold">{category.blurb}</p>
        <p className="label-mono mt-4 text-xs">{items.length} бүтээгдэхүүн</p>
      </PageHeader>

      <section className="bg-brand-black px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {category.slug === "energy-gels" && (
        <section className="relative overflow-hidden bg-brand-black px-5 pb-20 md:px-10">
          <div className="mx-auto grid max-w-[1600px] items-center gap-10 md:grid-cols-12">
            <div className="grid grid-cols-2 gap-4 md:col-span-7">
              <Reveal className="relative aspect-[3/4] -rotate-2">
                <Paper tone="photo" seed={1250} className="inset-0" amp={2}>
                  <img
                    src={athleteEnergyUp}
                    alt="Тамирчин Victory Endurance Energy Up! гель барьж буй нь"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </Paper>
              </Reveal>
              <Reveal delay={0.1} className="relative mt-10 aspect-[3/4] rotate-2">
                <Paper tone="photo" seed={1251} className="inset-0" amp={2}>
                  <img
                    src={athleteHiCarbo}
                    alt="Тамирчин Victory Endurance Hi-Carbo Boost гель барьж буй нь"
                    loading="lazy"
                    className="h-full w-full object-cover object-[50%_30%]"
                  />
                </Paper>
              </Reveal>
            </div>
            <div className="text-on-dark md:col-span-5">
              <p className="label-mono text-xs text-brand-yellow">Тамирчдын сонголт</p>
              <h2 className="display mt-3 text-6xl md:text-7xl">Зам дээр, бэлтгэл дээр.</h2>
              <p className="mt-6 max-w-md font-label text-lg font-semibold text-on-dark/80">
                Манай тамирчид Victory Endurance-ийн гелийг бэлтгэл, уралдааны үеэр хэрэглэж байна.
              </p>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className={bb({ variant: "outline" }, "mt-8 text-on-dark")}
              >
                Instagram {site.instagramHandle}
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="relative">
        <Paper tone="paper" seed={1201} className="inset-0" amp={[2, 0, 0, 0]} shadow={false} />
        <div className="relative mx-auto max-w-[1600px] px-5 py-16 text-ink md:px-10">
          <h2 className="display text-4xl md:text-6xl">Бусад ангилал</h2>
          <nav aria-label="Бусад ангилал" className="mt-8 flex flex-wrap gap-2">
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
