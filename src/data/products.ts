import type { PaperTone } from "@/components/weider/Paper";

/**
 * WEIDER Mongolia catalogue.
 *
 * Source: the importer's own product posts on facebook.com/WeiderMongolia (names, key
 * figures, prices and serving counts are copied from those posts). Prices are in MNT (₮)
 * and are the posted retail prices — update here when they change.
 *
 * Product photos are picked up automatically from src/assets/products/<id>.(png|jpg|webp);
 * a product without a file shows a branded placeholder.
 */

export type CategorySlug =
  | "protein"
  | "creatine"
  | "amino-acids"
  | "energy-gels"
  | "hydration"
  | "l-carnitine";

export interface Category {
  slug: CategorySlug;
  number: string;
  name: string;
  /** English name as printed on packaging / used by the brands. */
  latin: string;
  tone: Exclude<PaperTone, "photo" | "paper">;
  blurb: string;
}

export const categories: Category[] = [
  {
    slug: "protein",
    number: "01",
    name: "Уураг ба масс",
    latin: "Protein & Mass Gainer",
    tone: "red",
    blurb: "Булчингийн өсөлт, сэргэлтэд зориулсан шар сүүний уураг, уургийн холимог, масс нэмэгч.",
  },
  {
    slug: "creatine",
    number: "02",
    name: "Креатин",
    latin: "Creatine",
    tone: "blue",
    blurb: "Creapure® түүхий эдтэй 100% цэвэр креатин моногидрат.",
  },
  {
    slug: "amino-acids",
    number: "03",
    name: "Амин хүчил",
    latin: "Amino Acids",
    tone: "orange",
    blurb: "Бэлтгэлийн өмнө, дундуур, дараа уух EAA, BCAA болон шингэн амин хүчлүүд.",
  },
  {
    slug: "energy-gels",
    number: "04",
    name: "Энергийн гель",
    latin: "Energy Gels",
    tone: "yellow",
    blurb: "Victory Endurance — гүйлт, дугуй, триатлон, урт хугацааны ачаалалд зориулсан гель.",
  },
  {
    slug: "hydration",
    number: "05",
    name: "Шингэн нөхөгч",
    latin: "Hydration",
    tone: "black",
    blurb: "Электролит, эрдэс бодисыг нөхөж, шингэний тэнцвэрийг хадгална.",
  },
  {
    slug: "l-carnitine",
    number: "06",
    name: "L-карнитин",
    latin: "L-Carnitine",
    tone: "red",
    blurb: "Carnipure® түүхий эдтэй, хурдан шимэгддэг шингэн L-карнитин.",
  },
];

export type Brand = "WEIDER" | "Victory Endurance";

export interface Fact {
  value: string;
  label: string;
}

export interface Product {
  id: string;
  category: CategorySlug;
  brand: Brand;
  /** Official product name (Latin, as on the pack). */
  name: string;
  /** Mongolian descriptor used in WEIDER Mongolia posts. */
  title: string;
  /** Pack size, when known. */
  size?: string;
  flavor?: string;
  servings: number;
  /** Retail price in MNT. */
  price: number;
  /** Key figures per serving, as posted. */
  facts: Fact[];
  /** Short badges: gluten-free, vegan, caffeine… */
  tags?: string[];
  /** Carbohydrate ratio (glucose : fructose) for gels. */
  ratio?: string;
  madeInGermany?: boolean;
  note?: string;
}

export const products: Product[] = [
  /* ---------- 01 protein & mass ---------- */
  {
    id: "protein-80-plus",
    category: "protein",
    brand: "WEIDER",
    name: "Protein 80 Plus",
    title: "Шингэлтээрээ ялгаатай 4 уургийн холимог",
    size: "2 кг",
    flavor: "Chocolate",
    servings: 66,
    price: 660000,
    facts: [
      { value: "24 гр", label: "4 төрлийн уургийн холимог" },
      { value: "0 гр", label: "Сахар" },
      { value: "0 гр", label: "Өөх тос" },
      { value: "400 мг", label: "Кальци" },
      { value: "B6", label: "Витамин ба амин хүчлүүд" },
    ],
    madeInGermany: true,
  },
  {
    id: "premium-whey-500",
    category: "protein",
    brand: "WEIDER",
    name: "Premium Whey Protein",
    title: "Ультра шүүлтүүрээр шүүсэн дээд зэргийн шар сүүний уураг",
    size: "500 гр",
    flavor: "Chocolate-Nougat",
    servings: 16,
    price: 170000,
    facts: [
      { value: "24 гр", label: "Уураг, үүнээс 20% изолят" },
      { value: "2 гр", label: "Л-глютамин" },
      { value: "0", label: "Аспартам" },
      { value: "B6", label: "Витамин ба амин хүчлүүд" },
    ],
    madeInGermany: true,
  },
  {
    id: "premium-whey-2300",
    category: "protein",
    brand: "WEIDER",
    name: "Premium Whey Protein",
    title: "Ультра шүүлтүүрээр шүүсэн дээд зэргийн шар сүүний уураг",
    size: "2.3 кг",
    flavor: "Vanilla-Caramel",
    servings: 76,
    price: 650000,
    facts: [
      { value: "24 гр", label: "Уураг, үүнээс 20% изолят" },
      { value: "2 гр", label: "Л-глютамин" },
      { value: "0", label: "Аспартам" },
      { value: "B6", label: "Витамин ба амин хүчлүүд" },
    ],
    madeInGermany: true,
  },
  {
    id: "mega-mass-3000",
    category: "protein",
    brand: "WEIDER",
    name: "Mega Mass 4000",
    title: "Цогц найрлагатай, биеийн ерөнхий масс нэмэх уураг",
    size: "3 кг",
    flavor: "Strawberry",
    servings: 20,
    price: 410000,
    facts: [
      { value: "48 гр", label: "4 төрлийн уургийн холимог" },
      { value: "800+", label: "Ккал нүүрс ус" },
      { value: "3.4 гр", label: "Креатин (Creapure®)" },
      { value: "0", label: "Аспартам" },
      { value: "+", label: "Витамин, амин хүчлүүд" },
    ],
    madeInGermany: true,
  },
  {
    id: "mega-mass-7000",
    category: "protein",
    brand: "WEIDER",
    name: "Mega Mass 4000",
    title: "Цогц найрлагатай, биеийн ерөнхий масс нэмэх уураг",
    size: "7 кг",
    flavor: "Chocolate",
    servings: 46,
    price: 690000,
    facts: [
      { value: "48 гр", label: "4 төрлийн уургийн холимог" },
      { value: "800+", label: "Ккал нүүрс ус" },
      { value: "3.4 гр", label: "Креатин (Creapure®)" },
      { value: "0", label: "Аспартам" },
      { value: "+", label: "Витамин, амин хүчлүүд" },
    ],
    madeInGermany: true,
  },

  /* ---------- 02 creatine ---------- */
  {
    id: "pure-creatine",
    category: "creatine",
    brand: "WEIDER",
    name: "Pure Creatine",
    title: "Маш нарийн ширхэгтэй, нунтаг 100% цэвэр креатин",
    size: "250 гр",
    servings: 73,
    price: 170000,
    facts: [
      { value: "3,400 мг", label: "Креатин" },
      { value: "100%", label: "Цэвэр моногидрат" },
      { value: "Creapure®", label: "Чанарын хатуу стандарт, өндөр цэвэршилт" },
    ],
    madeInGermany: true,
  },

  /* ---------- 03 amino acids ---------- */
  {
    id: "premium-amino",
    category: "amino-acids",
    brand: "WEIDER",
    name: "Premium Amino",
    title: "Бэлтгэлийн дундуур уудаг дээд зэргийн амин хүчил",
    size: "800 гр",
    flavor: "Tropical Punch",
    servings: 20,
    price: 180000,
    facts: [
      { value: "8,800 мг", label: "Үл орлох 9 амин хүчил" },
      { value: "6,000 мг", label: "BCAA" },
      { value: "1,500 мг", label: "Л-глютамин" },
      { value: "139 / 64 мг", label: "Кальци / магни" },
      { value: "10.3 гр", label: "Уураг" },
    ],
    madeInGermany: true,
  },
  {
    id: "premium-eaa",
    category: "amino-acids",
    brand: "WEIDER",
    name: "Premium EAA",
    title: "Бэлтгэлийн дундуур уудаг үл орлох 9 амин хүчил",
    size: "325 гр",
    flavor: "Multifruit",
    servings: 25,
    price: 160000,
    facts: [
      { value: "10,195 мг", label: "Үл орлох 9 амин хүчил" },
      { value: "6,282 мг", label: "BCAA" },
      { value: "0 гр", label: "Сахар" },
      { value: "8.1 гр", label: "Уураг" },
    ],
    tags: ["Веган эх үүсвэр"],
    madeInGermany: true,
  },
  {
    id: "amino-power-liquid",
    category: "amino-acids",
    brand: "WEIDER",
    name: "Amino Power Liquid",
    title: "Илүү хурдан шимэгдэх чадвартай шингэн амин хүчлийн комплекс",
    size: "1000 мл",
    flavor: "Cola",
    servings: 22,
    price: 230000,
    facts: [
      { value: "23,000 мг", label: "Амин хүчил" },
      { value: "23 гр", label: "Уураг" },
      { value: "+", label: "Таурин, Л-лейцин" },
      { value: "0", label: "Аспартам" },
      { value: "B6", label: "Витамин" },
    ],
    madeInGermany: true,
  },
  {
    id: "amino-blast",
    category: "amino-acids",
    brand: "WEIDER",
    name: "Amino Blast Mega Forte",
    title: "Шот савлагаатай шингэн амин хүчил",
    size: "20 × 25 мл",
    flavor: "Apple-Cherry",
    servings: 20,
    price: 300000,
    facts: [
      { value: "13,300 мг", label: "20 төрлийн амин хүчил" },
      { value: "3,100 мг", label: "L-Arginine" },
      { value: "3,100 мг", label: "L-Ornithine" },
      { value: "13.6 гр", label: "Уураг" },
      { value: "B1, B2, B6", label: "Витаминууд" },
    ],
    madeInGermany: true,
  },

  /* ---------- 04 energy gels (Victory Endurance) ---------- */
  {
    id: "energy-up-caffeine",
    category: "energy-gels",
    brand: "Victory Endurance",
    name: "Energy Up! Gel + Caffeine",
    title: "Кофеин агуулсан энергийн гель",
    size: "24 × 40 гр",
    flavor: "Tropical",
    servings: 24,
    price: 360000,
    ratio: "2:1",
    facts: [
      { value: "100", label: "Ккал илчлэг" },
      { value: "25 гр", label: "Нүүрс ус" },
      { value: "12 / 6.1 / 6.1 гр", label: "Глюкоз / фруктоз / сахароз" },
      { value: "60 мг", label: "Кофеин" },
      { value: "100 мг", label: "Натри" },
      { value: "0.25 гр", label: "Давс" },
    ],
    tags: ["Глютенгүй", "Веган", "+Натри", "+Кофеин"],
  },
  {
    id: "energy-up",
    category: "energy-gels",
    brand: "Victory Endurance",
    name: "Energy Up! Gel",
    title: "Натри агуулсан энергийн гель",
    size: "24 × 40 гр",
    flavor: "Orange",
    servings: 24,
    price: 360000,
    ratio: "2:1",
    facts: [
      { value: "104", label: "Ккал илчлэг" },
      { value: "26 гр", label: "Нүүрс ус" },
      { value: "12.5 / 6.3 / 6.3 гр", label: "Глюкоз / фруктоз / сахароз" },
      { value: "100 мг", label: "Натри" },
      { value: "0.25 гр", label: "Давс" },
      { value: "0", label: "Кофеин" },
    ],
    tags: ["Глютенгүй", "Веган", "+Натри", "Кофеингүй"],
  },
  {
    id: "hydro-energy",
    category: "energy-gels",
    brand: "Victory Endurance",
    name: "Hydro Energy Gel",
    title: "Амин хүчил болон электролит агуулсан энергийн гель",
    size: "24 × 70 гр",
    flavor: "Apple",
    servings: 24,
    price: 360000,
    ratio: "1:1",
    facts: [
      { value: "95", label: "Ккал илчлэг" },
      { value: "24 гр", label: "Нүүрс ус" },
      { value: "300 мг", label: "BCAA" },
      { value: "84 / 94 мг", label: "Магни / кали" },
      { value: "49.7 мг", label: "Таурин" },
      { value: "75.6 мг", label: "Аргинин" },
      { value: "B1, B6", label: "Витамин" },
    ],
  },
  {
    id: "hi-carbo-boost",
    category: "energy-gels",
    brand: "Victory Endurance",
    name: "Hi-Carbo Boost",
    title: "Электролит агуулсан энергийн гель",
    size: "12 ширхэг",
    flavor: "Berry · Citrus",
    servings: 12,
    price: 180000,
    ratio: "1:0.8",
    facts: [
      { value: "180", label: "Ккал илчлэг" },
      { value: "45 гр", label: "Нүүрс ус, үүнээс 23 гр сахар" },
      { value: "0 гр", label: "Өөх тос" },
      { value: "200 мг", label: "Натри" },
      { value: "0.5 гр", label: "Давс" },
      { value: "+", label: "Хурдан шингэдэг мальтодекстрин" },
    ],
    tags: ["Нэг төрөл нь +кофеин"],
  },
  {
    id: "energy-boost",
    category: "energy-gels",
    brand: "Victory Endurance",
    name: "Energy Boost Gel",
    title: "Кофеин агуулсан энергийн гель",
    size: "24 × 42 гр",
    flavor: "Red Energy · Cola",
    servings: 24,
    price: 360000,
    ratio: "1.2:1",
    facts: [
      { value: "97", label: "Ккал илчлэг" },
      { value: "24 гр", label: "Нүүрс ус" },
      { value: "60.5 мг", label: "Кофеин" },
      { value: "50 мг", label: "Таурин" },
      { value: "75.6 мг", label: "Л-аргинин" },
      { value: "63 / 92 мг", label: "Магни / кали" },
      { value: "0.84 мг", label: "Тиамин (B1)" },
    ],
    tags: ["+Витамин B6", "+Таурин", "+Л-аргинин", "+Кофеин"],
  },

  /* ---------- 05 hydration ---------- */
  {
    id: "hydration",
    category: "hydration",
    brand: "WEIDER",
    name: "Premium Hydration",
    title: "Дээд зэргийн шингэн нөхөгч",
    size: "10 × 7 гр",
    servings: 10,
    price: 85000,
    facts: [
      { value: "300 мг", label: "Кали" },
      { value: "240 мг", label: "Хлорид" },
      { value: "160 мг", label: "Натри" },
      { value: "85 / 80 мг", label: "Магни / кальци" },
      { value: "500 мг", label: "Таурин" },
      { value: "2,000 мг", label: "Кокосын усны нунтаг" },
      { value: "300 мг", label: "Глютамин пептид" },
      { value: "25 мг", label: "Шим тэжээлийн шингээлтийг дэмжигч" },
    ],
    note: "CocoVico®, Glutapep®, AstraGin® нь патентлагдсан, өндөр чанарын түүхий эд.",
    madeInGermany: true,
  },

  /* ---------- 06 L-carnitine ---------- */
  {
    id: "l-carnitine-liquid",
    category: "l-carnitine",
    brand: "WEIDER",
    name: "L-Carnitine Liquid",
    title: "Илүү хурдан шимэгдэх чадвартай шингэн өөх шатаагч",
    size: "20 × 25 мл",
    flavor: "Citrus",
    servings: 20,
    price: 210000,
    facts: [
      { value: "1,800 мг", label: "Л-карнитин" },
      { value: "82.5 мг", label: "Холин" },
      { value: "Carnipure®", label: "Чанарын хатуу стандарт, дээд зэргийн түүхий эд" },
    ],
    madeInGermany: true,
  },
];

export const formatPrice = (mnt: number) => `${mnt.toLocaleString("en-US")}₮`;

/** Price of one serving, rounded to 100₮. */
export const perServing = (p: Product) => Math.round(p.price / p.servings / 100) * 100;

export function findCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function productsIn(slug: CategorySlug) {
  return products.filter((p) => p.category === slug);
}

export function findProduct(id: string) {
  return products.find((p) => p.id === id);
}
