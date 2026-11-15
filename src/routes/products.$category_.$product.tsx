import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/weider/SiteShell";
import { Paper } from "@/components/weider/Paper";
import { Crosshair } from "@/components/weider/Crosshair";
import { Reveal } from "@/components/weider/motion";
import { bb } from "@/components/weider/BrandButton";
import { ProductImage } from "@/components/weider/ProductImage";
import { ProductCard } from "@/components/weider/ProductCard";
import {
  findCategory,
  findProduct,
  formatPrice,
  perServing,
  productsIn,
} from "@/data/products";
import { site } from "@/data/site";

export const Route = createFileRoute("/products/$category_/$product")({
  loader: ({ params }) => {
    const product = findProduct(params.product);
    const category = findCategory(params.category);
    if (!product || !category || product.category !== category.slug) throw notFound();
    return { product, category };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name}${p.size ? ` ${p.size}` : ""} — WEIDER Mongolia` : "WEIDER Mongolia";
    const desc = p ? `${p.title}. ${formatPrice(p.price)} / ${p.servings} удаа.` : "WEIDER Mongolia";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <section className="bg-brand-black px-5 pb-24 pt-40 text-on-dark md:px-10">
        <h1 className="display text-7xl">Бүтээгдэхүүн олдсонгүй.</h1>
        <Link to="/products" className={bb({ variant: "yellow" }, "mt-8")}>
          Бүх бүтээгдэхүүн
        </Link>
      </section>
    </SiteShell>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p, category } = Route.useLoaderData();
  const related = productsIn(category.slug).filter((r) => r.id !== p.id).slice(0, 4);

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-brand-black pt-24 text-on-dark">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <nav aria-label="Замчлал" className="label-mono flex flex-wrap gap-2 text-[10px] text-on-dark/60">
            <Link to="/products" className="hover:text-brand-yellow">
              Бүтээгдэхүүн
            </Link>
            <span>/</span>
            <Link to="/products/$category" params={{ category: category.slug }} className="hover:text-brand-yellow">
              {category.name}
            </Link>
          </nav>
        </div>

        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 pb-20 pt-8 md:grid-cols-12 md:px-10">
          {/* packshot */}
          <Reveal className="relative aspect-square md:col-span-6">
            <Paper tone="paper" seed={1700} className="inset-0" amp={2} fiberAmp={0.6}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#fff_0%,transparent_70%)]" />
              <ProductImage product={p} eager className="text-ink" />
            </Paper>
            <Crosshair className="-right-2 -top-2 w-8 text-on-dark" />
          </Reveal>

          {/* details */}
          <div className="md:col-span-6 md:pl-6">
            <p lang="en" className="label-mono text-xs text-brand-yellow">
              {p.brand} · {category.latin}
            </p>
            <h1 lang="en" className="display ink-rough mt-3 text-6xl md:text-8xl">
              {p.name}
            </h1>
            <p className="mt-4 font-label text-xl font-bold leading-snug md:text-2xl">{p.title}</p>

            <dl className="mt-8 grid grid-cols-2 gap-px border-2 border-on-dark/20 bg-on-dark/20 sm:grid-cols-4">
              {[
                ["Хэмжээ", p.size ?? "—"],
                ["Амт", p.flavor ?? "—"],
                ["Хэрэглээ", `${p.servings} удаа`],
                ["1 удаа", `≈ ${formatPrice(perServing(p))}`],
              ].map(([k, v]) => (
                <div key={k} className="bg-brand-black p-4">
                  <dt className="label-mono text-[10px] text-on-dark/60">{k}</dt>
                  <dd lang={k === "Амт" ? "en" : undefined} className="mt-1 font-label text-base font-bold">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-end gap-6">
              <p className="display text-6xl text-brand-yellow md:text-7xl">{formatPrice(p.price)}</p>
              {p.madeInGermany && (
                <span className="label-mono mb-2 border-2 border-on-dark px-2 py-1 text-[10px]">
                  Made in Germany
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href={site.facebook} target="_blank" rel="noreferrer" className={bb({ variant: "red", size: "lg" })}>
                Facebook-ээр захиалах
              </a>
              <Link to="/contact" className={bb({ variant: "outline" }, "text-on-dark")}>
                Холбогдох
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* facts */}
      <section className="relative">
        <Paper tone="paper" seed={1701} className="inset-0" amp={[2, 0, 0, 0]} shadow={false} />
        <div className="relative mx-auto max-w-[1600px] px-5 py-20 text-ink md:px-10">
          <h2 className="display text-5xl md:text-7xl">Нэг удаагийн хэмжээнд</h2>
          <ul className="mt-10 grid border-l-2 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
            {p.facts.map((f) => (
              <li key={f.label} className="border-b-2 border-r-2 border-ink p-6">
                <p className="display text-5xl text-brand-red">{f.value}</p>
                <p className="mt-2 font-label text-base font-bold leading-snug">{f.label}</p>
              </li>
            ))}
          </ul>
          {(p.tags?.length || p.ratio) && (
            <div className="mt-8 flex flex-wrap gap-2">
              {p.ratio && (
                <span className="label-bold bg-ink px-3 py-2 text-xs text-on-dark">
                  Нүүрс усны харьцаа {p.ratio}
                </span>
              )}
              {p.tags?.map((t) => (
                <span key={t} className="label-bold border-2 border-ink px-3 py-1.5 text-xs">
                  {t}
                </span>
              ))}
            </div>
          )}
          {p.note && <p className="mt-6 max-w-2xl font-label text-sm text-ink-soft">{p.note}</p>}
          <p className="mt-10 max-w-2xl font-label text-xs leading-relaxed text-ink-soft">
            Үзүүлэлтүүд нь WEIDER Mongolia-гийн албан ёсны мэдээллээс авсан нэг удаагийн хэмжээ юм.
            Хэрэглэхийн өмнө савлагаан дээрх зааврыг уншина уу.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-brand-black px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[1600px]">
            <h2 className="display text-5xl text-on-dark md:text-6xl">Мөн үзэх</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <ProductCard key={r.id} product={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
