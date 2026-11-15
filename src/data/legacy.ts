/**
 * WEIDER LEGACY — content and archive image registry for /legacy.
 *
 * HISTORICAL ACCURACY
 * Every fact below comes from the approved brief. Do not add dates, titles, quotes,
 * relationships or endorsements that are not verified.
 *
 * IMAGES
 * Only authentic, properly licensed archival photographs belong here — never AI-generated
 * images of real people. Until a licensed file exists, `src` stays undefined and the page
 * renders a labelled placeholder that states what is required.
 * To add one: put the file in src/assets/archive/, import it below, set `src` and `credit`.
 */

import joePortraitImg from "@/assets/archive/joePortrait.jpg";
import weiderMagazineImg from "@/assets/archive/weiderMagazine.jpg";
import arnoldImg from "@/assets/archive/arnold.jpg";
import ferrignoImg from "@/assets/archive/ferrigno.jpg";
import columbuImg from "@/assets/archive/columbu.jpg";
import scottImg from "@/assets/archive/scott.jpg";
import globalCultureImg from "@/assets/archive/globalCulture.jpg";
import pumpingIronImg from "@/assets/archive/pumpingIron.jpg";
import joePortraitCropImg from "@/assets/archive/joePortraitCrop.jpg";

export interface ArchiveImage {
  id: string;
  /** Imported licensed image. Undefined = placeholder is shown. */
  src?: string;
  alt: string;
  /** Shown on the placeholder: what photo is needed. */
  requirement: string;
  /** Required whenever `src` is set, e.g. "© Weider Health & Fitness archive". */
  credit?: string;
  /** Year or era printed on the placeholder / caption. */
  era?: string;
  /** CSS object-position, to keep the subject in frame when cropped. */
  position?: string;
}

const archive = <T extends Record<string, ArchiveImage>>(a: T) => a;

export const archiveImages = archive({
  joePortrait: {
    id: "A-001",
    src: joePortraitImg,
    alt: "Жо Вейдер 2008 оны Mr. Olympia тэмцээний тайзан дээр тамирчдын дунд",
    credit: "Eddie Maloney / Wikimedia Commons, CC BY-SA 2.0",
    requirement: "Жо Вейдерийн хар цагаан хөрөг (албан ёсны WEIDER архив)",
    era: "2008",
    position: "47% 55%",
  },
  joePortraitCrop: {
    id: "A-016",
    src: joePortraitCropImg,
    alt: "Жо Вейдер 2008 оны Mr. Olympia тэмцээний тайзан дээр",
    credit: "Eddie Maloney / Wikimedia Commons, CC BY-SA 2.0 (тайрсан)",
    requirement: "Жо Вейдерийн хар цагаан хөрөг (албан ёсны WEIDER архив)",
    era: "2008",
  },
  joeAtWork: {
    id: "A-002",
    alt: "Жо Вейдер ажлын байрандаа",
    requirement: "Жо Вейдер сэтгүүл / редакцийн ажил дээрээ (лицензтэй редакцийн зураг)",
    era: "1950-иад",
  },
  weiderMagazine: {
    id: "A-003",
    src: weiderMagazineImg,
    alt: "Жо Вейдерийн 1972 оны хэвлэмэл сурталчилгаа — Ларри Скотт, Дэйв Дрэйпер, Рэг Льюис (Inside Wrestling сэтгүүлийн ар нүүр)",
    credit: "Unknown author / Wikimedia Commons, Public domain",
    requirement: "Баталгаажсан WEIDER сэтгүүлийн нүүр (эх хэвлэлийн скан)",
    era: "1940–1970",
  },
  ifbbFounding: {
    id: "A-004",
    alt: "Жо, Бен Вейдер нар",
    requirement: "Жо, Бен Вейдер ах дүү хамтдаа (албан ёсны IFBB / WEIDER архив)",
    era: "1946",
  },
  olympia1965: {
    id: "A-005",
    alt: "1965 оны анхны Mr. Olympia тэмцээн",
    requirement: "1965 оны анхны Mr. Olympia тэмцээний зураг (албан ёсны Olympia архив)",
    era: "1965",
  },
  arnold: {
    id: "A-006",
    src: arnoldImg,
    alt: "Арнольд Шварценеггер тайзан дээр, 1974 оны Mr. Olympia-гийн өмнө",
    credit: "Madison Square Garden Center / Wikimedia Commons, Public domain",
    requirement: "Арнольд Шварценеггерийн тайзан дээрх хар цагаан зураг (лицензтэй)",
    era: "1970-аад",
  },
  ferrigno: {
    id: "A-007",
    src: ferrignoImg,
    alt: "Лу Ферриньо, 2012 оны хөрөг",
    credit: "Glenn Francis (Toglenn) / Wikimedia Commons, CC BY-SA 3.0",
    requirement: "Лу Ферриньогийн тэмцээний архивын зураг (лицензтэй)",
    era: "1970-аад",
  },
  columbu: {
    id: "A-008",
    src: columbuImg,
    alt: "Франко Колумбу Сардинид поз үзүүлж буй нь, 1970-аад оны эхэн",
    credit: "Unknown author / Wikimedia Commons, Public domain",
    requirement: "Франко Колумбугийн тэмцээний архивын зураг (лицензтэй)",
    era: "1970-аад",
  },
  scott: {
    id: "A-009",
    src: scottImg,
    alt: "Ларри Скотт, 1960-аад оны хар цагаан зураг",
    credit: "Gene Mozee / Wikimedia Commons, Public domain",
    requirement: "Ларри Скотт — 1965 оны Mr. Olympia (лицензтэй)",
    era: "1965",
  },
  oliva: {
    id: "A-010",
    alt: "Серхио Олива, архивын зураг",
    requirement: "Серхио Оливагийн тэмцээний архивын зураг (лицензтэй)",
    era: "1960–70-аад",
  },
  goldenStage: {
    id: "A-011",
    alt: "Алтан үеийн бодибилдингийн тэмцээний тайз",
    requirement: "1970-аад оны бодибилдингийн тэмцээний тайз (лицензтэй)",
    era: "1970-аад",
  },
  pumpingIron: {
    id: "A-015",
    src: pumpingIronImg,
    alt: 'Арнольд Шварценеггер Gold\'s Gym-д "Pumping Iron" баримтат киноны зураг авалтын үеэр бэлтгэл хийж буй нь, 1975',
    credit: "Harry Chase, Los Angeles Times / Wikimedia Commons, CC BY 4.0",
    requirement: "1970-аад оны бэлтгэлийн заалны архивын зураг (лицензтэй)",
    era: "1975",
  },
  venice2006: {
    id: "A-012",
    alt: "Venice Muscle Beach, 2006",
    requirement: "2006 оны Venice Muscle Beach Hall of Fame ёслол (лицензтэй)",
    era: "2006",
  },
  hallOfFame2014: {
    id: "A-013",
    alt: "Олон улсын спортын алдрын танхим, 2014",
    requirement: "2014 оны International Sports Hall of Fame ёслол (лицензтэй)",
    era: "2014",
  },
  globalCulture: {
    id: "A-014",
    src: globalCultureImg,
    alt: "Арнольд Шварценеггер IFBB-ийн тугийг барин 1981 оны Дэлхийн наадмын нээлтэд",
    credit: "Jeff in CA / Wikimedia Commons, CC BY-SA 4.0",
    requirement: "1980–90-ээд оны WEIDER / фитнесийн соёлын архивын зураг (лицензтэй)",
    era: "1980–1990",
  },
});

export type ArchiveKey = keyof typeof archiveImages;

/* ---------------- 01 INTRO ---------------- */

export const intro = {
  label: "EST. 1936 — Хүч чадлын өв",
  headline: ["90 жил.", "Нэг өв.", "Тоолшгүй домог."],
  text: [
    "Бодибилдинг юу болж чадахыг дэлхий мэдэхээс өмнө нэгэн хүнд алсын хараа байжээ.",
    "Илүү хүчирхэг бие, илүү тэвчээртэй сэтгэлийг төлөвшүүлж, олон үеийн аваргуудад урам өгөх алсын хараа.",
  ],
  name: "Түүний нэр — Жо Вейдер.",
};

/* ---------------- 02 FOUNDER ---------------- */

export const founder = {
  kicker: "02 / Үүсгэн байгуулагч",
  headline: ["Домгуудын", "ард байсан хүн."],
  body: [
    "Жо Вейдер зүгээр нэг бизнесмэн байгаагүй.",
    "Тэрээр бодибилдингийг цөөн хүний сонирхол байснаас дэлхий нийтийн фитнесийн хөдөлгөөн болгон хувиргахад хувь нэмэр оруулсан анхдагч юм.",
    "Сэтгүүл, дасгалын мэдлэг, тэмцээн, спортын хоол тэжээлээр дамжуулан тэрээр олон үеийн тамирчдыг төлөвшүүлэхэд нөлөөлсөн.",
  ],
  milestones: [
    { year: 1936, text: "WEIDER эзэнт гүрнийг үүсгэн байгуулав." },
    {
      year: 1946,
      text: "Жо, Бен Вейдер нар Олон улсын бодибилдингийн холбоог (IFBB) үүсгэн байгуулав.",
    },
    { year: 1965, text: "Mr. Olympia тэмцээнийг үүсгэн байгуулав." },
  ],
};

/* ---------------- 03 LEGENDS ---------------- */

export interface Athlete {
  n: string;
  name: string;
  /** Latin spelling, shown small for recognition. */
  latin: string;
  title: string;
  story: string;
  highlights: string[];
  image: ArchiveKey;
}

export const legends = {
  kicker: "03 / Домгууд",
  headline: ["Сахилга батаар бүтсэн.", "Үүрд дурсагдах."],
  disclaimer:
    "Энэ хэсэг нь тамирчдын Жо Вейдер болон WEIDER-тэй холбоотой түүхэн замыг харуулна. Энэ нь тэд WEIDER MONGOLIA-гийн бүтээгдэхүүнийг сурталчилж байна гэсэн үг биш.",
  athletes: [
    {
      n: "01",
      name: "Арнольд Шварценеггер",
      latin: "Arnold Schwarzenegger",
      title: "Бэлгэ тэмдэг.",
      story:
        "Жо Вейдерийн хамгийн алдартай шавь. Арнольд Mr. Olympia-гийн долоон удаагийн аварга болж, бодибилдингийн түүхэн дэх хамгийн танигдсан хүмүүсийн нэг болсон.",
      highlights: ["Mr. Olympia — 7 удаа", "Алтан үе"],
      image: "arnold",
    },
    {
      n: "02",
      name: "Лу Ферриньо",
      latin: "Lou Ferrigno",
      title: "Гайхамшигт.",
      story:
        "Бодибилдингийн хамгийн танигдсан аваргуудын нэг. Онцгой галбир, домогт тэмцээний карьераараа дэлхий даяар алдартай.",
      highlights: ["Алтан үе"],
      image: "ferrigno",
    },
    {
      n: "03",
      name: "Франко Колумбу",
      latin: "Franco Columbu",
      title: "Хүчний цөм.",
      story:
        "Хүч чадал, тамирчны ур чадвар, тэмцээний амжилтаараа алдаршсан домогт бодибилдингчин.",
      highlights: ["Алтан үе"],
      image: "columbu",
    },
    {
      n: "04",
      name: "Ларри Скотт",
      latin: "Larry Scott",
      title: "Анхны аварга.",
      story: "1965 онд болсон анхны Mr. Olympia тэмцээний аварга.",
      highlights: ["Анхны Mr. Olympia — 1965"],
      image: "scott",
    },
    {
      n: "05",
      name: "Серхио Олива",
      latin: "Sergio Oliva",
      title: "Домог.",
      story:
        "Бодибилдингийн түүхэн дэх хамгийн гайхамшигт галбиртуудын нэг, Mr. Olympia-гийн гурван удаагийн аварга.",
      highlights: ["Mr. Olympia — 3 удаа"],
      image: "oliva",
    },
  ] satisfies Athlete[],
};

/* ---------------- 04 TIMELINE ---------------- */

export interface Milestone {
  /** Numeric year used by the animated year counter. */
  year: number;
  /** Printed label (eras keep their suffix). */
  label: string;
  title: string;
  text: string;
  /** Short context tag. */
  context: string;
  image: ArchiveKey;
}

export const timeline = {
  kicker: "04 / Он цагийн хэлхээс",
  headline: ["1936 оноос", "дэлхийд."],
  items: [
    {
      year: 1936,
      label: "1936",
      title: "Эхлэл",
      text: "Жо Вейдер WEIDER бизнесийг үүсгэн байгуулж, фитнесийн эзэнт гүрнээ босгож эхлэв.",
      context: "Үүсгэн байгуулалт",
      image: "joeAtWork",
    },
    {
      year: 1946,
      label: "1946",
      title: "Бодибилдингийн дэлхийн хөдөлгөөн",
      text: "Жо, Бен Вейдер нар IFBB-г үүсгэн байгуулав.",
      context: "Олон улсын холбоо",
      image: "ifbbFounding",
    },
    {
      year: 1965,
      label: "1965",
      title: "Mr. Olympia мэндэлсэн нь",
      text: "Анхны Mr. Olympia тэмцээн болов.",
      context: "Тэмцээн",
      image: "olympia1965",
    },
    {
      year: 1970,
      label: "1970-аад",
      title: "Алтан үе",
      text: "Бодибилдинг олон улсад хүлээн зөвшөөрөгдөж, Арнольд Шварценеггер хамгийн нөлөө бүхий хүмүүсийн нэг болов.",
      context: "Соёл",
      image: "pumpingIron",
    },
    {
      year: 1980,
      label: "1980–1990-ээд",
      title: "Дэлхийн фитнесийн соёл",
      text: "WEIDER-ийн нөлөө болон бодибилдингийн соёл олон улсад улам тэлсээр байв.",
      context: "Тэлэлт",
      image: "globalCulture",
    },
    {
      year: 2006,
      label: "2006",
      title: "Өв хүлээн зөвшөөрөгдөв",
      text: "Арнольд Шварценеггер Venice Muscle Beach-ийн Алдрын танхимд Жо Вейдерт Насан туршийн амжилтын шагнал гардуулав.",
      context: "Хүндэтгэл",
      image: "venice2006",
    },
    {
      year: 2014,
      label: "2014",
      title: "Олон улсын хүндэтгэл",
      text: "Жо, Бен, Бетти Вейдер нар Олон улсын спортын алдрын танхимд (International Sports Hall of Fame) багтав.",
      context: "Хүндэтгэл",
      image: "hallOfFame2014",
    },
    {
      year: 2026,
      label: "2026",
      title: "WEIDER-ийн 90 жил",
      text: "Түүх, шинэчлэл, фитнес, урам зоригийн есөн арван жил.",
      context: "Өнөөдөр",
      image: "weiderMagazine",
    },
  ] satisfies Milestone[],
};

/* ---------------- 05 GOLDEN ERA ---------------- */

export const goldenEra = {
  kicker: "05 / Алтан үе",
  headline: ["Алтан үе", "хэзээ ч мөхөхгүй."],
  frames: [
    { image: "arnold", caption: "Арнольд Шварценеггер" },
    { image: "pumpingIron", caption: "Gold's Gym, 1975" },
    { image: "ferrigno", caption: "Лу Ферриньо" },
    { image: "weiderMagazine", caption: "WEIDER сэтгүүл" },
    { image: "columbu", caption: "Франко Колумбу" },
    { image: "scott", caption: "Ларри Скотт" },
    { image: "oliva", caption: "Серхио Олива" },
    { image: "olympia1965", caption: "Сонгодог тэмцээн" },
  ] satisfies { image: ArchiveKey; caption: string }[],
};

/* ---------------- 06 LEGACY CONTINUES ---------------- */

export const continues = {
  kicker: "06 / Өв үргэлжилнэ",
  headline: ["Өв одоо", "чинийх."],
  narrative: [
    "Биднээс өмнөх үеийнхэн суурийг нь тавьсан.",
    "Аваргууд хязгаарыг давсан.",
    "Анхдагчид соёлыг өөрчилсөн.",
    "Сая сая хүн өөрийн хүчийг нээсэн.",
    "Одоо дараагийн бүлэг бидний гарт.",
  ],
  finale: "Монгол.",
  closing: [
    "WEIDER зөвхөн фитнесийн бүтээгдэхүүн зараагүй.",
    "WEIDER бодибилдингийн түүхийг бүтээлцсэн.",
    "Тэр өв Монголд үргэлжилж байна.",
  ],
};

/** Chapter index for the side navigation. */
export const chapters = [
  { id: "legacy-intro", n: "01", label: "Өв" },
  { id: "legacy-founder", n: "02", label: "Үүсгэн байгуулагч" },
  { id: "legacy-legends", n: "03", label: "Домгууд" },
  { id: "legacy-timeline", n: "04", label: "Он цаг" },
  { id: "legacy-golden", n: "05", label: "Алтан үе" },
  { id: "legacy-continues", n: "06", label: "Үргэлжлэл" },
] as const;
