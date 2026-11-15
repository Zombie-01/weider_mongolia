import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Paper } from "./Paper";
import { productsIn, type Category } from "@/data/products";
import { productImage } from "./ProductImage";
import { img } from "@/data/images";
import { cn } from "@/lib/utils";

/** Category entry: torn colour sheet with a placeholder product photo that reveals on hover. */
export function CategoryTile({ category, index }: { category: Category; index: number }) {
  const items = productsIn(category.slug);
  const shot = items.map((p) => productImage(p.id)).find(Boolean);
  const darkText = category.tone === "yellow" || category.tone === "orange";
  return (
    <Link
      to="/products/$category"
      params={{ category: category.slug }}
      data-cursor="Нээх"
      className="group relative block aspect-[4/5] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"
    >
      <Paper
        tone={category.tone}
        seed={500 + index * 7}
        className={cn(
          "inset-0 transition-transform duration-500 group-hover:-translate-y-2",
          index % 2 ? "group-hover:rotate-1" : "group-hover:-rotate-1",
        )}
        amp={2.5}
      >
        <img
          src={shot ?? img.jars}
          alt=""
          loading="lazy"
          className="absolute inset-x-0 bottom-0 h-[70%] w-full object-contain p-6 opacity-0 drop-shadow-[0_16px_20px_rgba(0,0,0,0.4)] transition-all duration-700 [clip-path:inset(100%_0_0_0)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:opacity-100 group-focus-visible:[clip-path:inset(0_0_0_0)]"
        />
        <div className={cn("relative flex h-full flex-col justify-between p-6", darkText ? "text-ink" : "text-on-dark")}>
          <div className="flex items-start justify-between">
            <span className="label-mono text-xs">{category.number} / Ангилал</span>
            <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover:rotate-45" />
          </div>
          <div className="transition-transform duration-500 group-hover:-translate-y-[180%]">
            <h3 className="display text-5xl md:text-6xl">{category.name}</h3>
            <p lang="en" className="label-mono mt-2 text-[11px] opacity-80">
              {category.latin}
            </p>
            <p className="label-mono mt-1 text-[11px] opacity-80">{items.length} бүтээгдэхүүн</p>
          </div>
        </div>
      </Paper>
    </Link>
  );
}
