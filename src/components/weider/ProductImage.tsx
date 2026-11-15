import { useState } from "react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import logo from "@/assets/brand/weider-man.png";

/** Packshots dropped into src/assets/products/<id>.(png|jpg|webp) are picked up automatically. */
const files = import.meta.glob<string>("../../assets/products/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

const byId: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  const id = path.split("/").pop()!.replace(/\.(png|jpe?g|webp)$/, "");
  byId[id] = url;
}

export const productImage = (id: string): string | undefined => byId[id];

/** Product packshot on a light stage, or a branded placeholder when no file exists yet. */
export function ProductImage({
  product,
  className,
  imgClassName,
  eager,
}: {
  product: Product;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const src = productImage(product.id);
  const [broken, setBroken] = useState(false);

  if (src && !broken) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        <img
          src={src}
          alt={`${product.brand} ${product.name}${product.size ? ` ${product.size}` : ""}`}
          loading={eager ? "eager" : "lazy"}
          onError={() => setBroken(true)}
          className={cn(
            "h-full w-full object-contain p-[8%]",
            // white-background JPGs melt into the paper; transparent PNGs get a cast shadow
            /\.jpe?g(\?|$)/.test(src) ? "mix-blend-multiply" : "drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)]",
            imgClassName,
          )}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${product.name} — бүтээгдэхүүний зураг удахгүй`}
      className={cn("@container relative grid h-full w-full place-items-center overflow-hidden", className)}
    >
      <img src={logo} alt="" aria-hidden className="w-[38%] opacity-15" />
      <div className="absolute inset-x-[8%] bottom-[8%] text-center">
        <p lang="en" className="display text-[9cqw] leading-none opacity-70">
          {product.name}
        </p>
        <p className="label-mono mt-2 text-[max(9px,2.6cqw)] opacity-60">Зураг удахгүй</p>
      </div>
    </div>
  );
}
