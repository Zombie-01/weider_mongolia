import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/utils";

/** Catalogue card: packshot on paper, brand, name, size/flavour and price. */
export function ProductCard({ product: p, className }: { product: Product; className?: string }) {
  return (
    <Link
      to="/products/$category/$product"
      params={{ category: p.category, product: p.id }}
      className={cn(
        "group relative flex h-full flex-col bg-paper text-ink transition-transform duration-500 hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#fff_0%,var(--paper)_70%)]">
        <ProductImage
          product={p}
          imgClassName="transition-transform duration-700 group-hover:scale-105"
        />
        {p.madeInGermany && (
          <span className="label-mono absolute left-3 top-3 bg-ink px-2 py-1 text-[9px] text-on-dark">
            Made in Germany
          </span>
        )}
        <ArrowUpRight className="absolute right-3 top-3 h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t-2 border-ink p-5">
        <p lang="en" className="label-mono text-[10px] text-brand-red">
          {p.brand}
        </p>
        <h3 lang="en" className="display text-3xl leading-none">
          {p.name}
        </h3>
        <p className="font-label text-sm font-semibold leading-snug text-ink-soft">{p.title}</p>
        <p className="label-mono mt-auto pt-3 text-[10px] text-ink/70">
          {[p.size, p.flavor, `${p.servings} удаа`].filter(Boolean).join(" · ")}
        </p>
        <p className="display text-3xl text-brand-red">{formatPrice(p.price)}</p>
      </div>
    </Link>
  );
}
