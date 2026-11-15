import type { PaperTone } from "@/components/weider/Paper";

/**
 * Product categories. Real products, ingredients and photos are not supplied yet —
 * every product below is an explicit placeholder slot to be replaced with real data.
 */
export interface Category {
  slug: string;
  number: string;
  name: string;
  tone: Exclude<PaperTone, "photo" | "paper">;
}

export const categories: Category[] = [
  { slug: "protein", number: "01", name: "Protein", tone: "red" },
  { slug: "creatine", number: "02", name: "Creatine", tone: "blue" },
  { slug: "pre-workout", number: "03", name: "Pre-Workout", tone: "orange" },
  { slug: "amino-acids", number: "04", name: "Amino Acids", tone: "yellow" },
  { slug: "vitamins-minerals", number: "05", name: "Vitamins & Minerals", tone: "black" },
  { slug: "sports-nutrition", number: "06", name: "Sports Nutrition", tone: "red" },
];

export interface ProductSlot {
  id: string;
  name: string;
  note: string;
}

/** Placeholder product slots per category, kept generic until real data arrives. */
export function productSlots(category: Category): ProductSlot[] {
  return [1, 2, 3].map((n) => ({
    id: `${category.slug}-${n}`,
    name: `${category.name} — Product ${String(n).padStart(2, "0")}`,
    note: "Product details coming soon",
  }));
}

export function findCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
