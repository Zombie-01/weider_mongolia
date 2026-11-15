import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** Brutalist CTA styles: hard edges, offset ink shadow, condensed caps. */
export const brandButton = cva(
  "group relative inline-flex items-center gap-3 font-display uppercase tracking-wide transition-[transform,box-shadow,background-color,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-x-[3px] active:translate-y-[3px]",
  {
    variants: {
      variant: {
        red: "bg-brand-red text-on-dark shadow-[6px_6px_0_0_var(--ink)] hover:bg-brand-yellow hover:text-ink",
        yellow:
          "bg-brand-yellow text-ink shadow-[6px_6px_0_0_var(--brand-red)] hover:bg-on-dark",
        ink: "bg-ink text-on-dark shadow-[6px_6px_0_0_var(--brand-red)] hover:bg-brand-blue",
        outline:
          "border-2 border-current bg-transparent text-current hover:bg-on-dark hover:text-ink",
      },
      size: {
        md: "px-6 py-3 text-xl",
        lg: "px-8 py-4 text-2xl md:text-3xl",
      },
    },
    defaultVariants: { variant: "red", size: "md" },
  },
);

export type BrandButtonVariants = VariantProps<typeof brandButton>;
export const bb = (v?: BrandButtonVariants, className?: string) => cn(brandButton(v), className);
