import type { PaperTone } from "@/components/weider/Paper";

/**
 * Product categories. Real products, ingredients and photos are not supplied yet —
 * every product below is an explicit placeholder slot to be replaced with real data.
 */
export interface Category {
  slug: string;
  number: string;
  name: string;
  /** English category name as printed on WEIDER packaging. */
  latin: string;
  tone: Exclude<PaperTone, "photo" | "paper">;
}

export const categories: Category[] = [
  { slug: "protein", number: "01", name: "Уураг", latin: "Protein", tone: "red" },
  { slug: "creatine", number: "02", name: "Креатин", latin: "Creatine", tone: "blue" },
  { slug: "pre-workout", number: "03", name: "Дасгалын өмнөх", latin: "Pre-Workout", tone: "orange" },
  { slug: "amino-acids", number: "04", name: "Амин хүчил", latin: "Amino Acids", tone: "yellow" },
  { slug: "vitamins-minerals", number: "05", name: "Витамин ба эрдэс", latin: "Vitamins & Minerals", tone: "black" },
  { slug: "sports-nutrition", number: "06", name: "Спортын хоол тэжээл", latin: "Sports Nutrition", tone: "red" },
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
    name: `${category.name} — Бүтээгдэхүүн ${String(n).padStart(2, "0")}`,
    note: "Дэлгэрэнгүй мэдээлэл удахгүй",
  }));
}

export function findCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
