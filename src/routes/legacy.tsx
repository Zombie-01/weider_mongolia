import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/weider/SiteShell";
import { ChapterNav } from "@/components/weider/legacy/ChapterNav";
import { LegacyIntro } from "@/components/weider/legacy/LegacyIntro";
import { FounderSection } from "@/components/weider/legacy/FounderSection";
import { LegendsSection } from "@/components/weider/legacy/LegendsSection";
import { TimelineSection } from "@/components/weider/legacy/TimelineSection";
import { GoldenEraSection } from "@/components/weider/legacy/GoldenEraSection";
import { LegacyContinues } from "@/components/weider/legacy/LegacyContinues";
import { ImageCredits } from "@/components/weider/legacy/ImageCredits";

export const Route = createFileRoute("/legacy")({
  head: () => ({
    meta: [
      { title: "WEIDER-ийн өв — Хүч чадлын түүх | WEIDER Mongolia" },
      {
        name: "description",
        content:
          "1936 оноос хойш: Жо Вейдер, IFBB, Mr. Olympia болон бодибилдингийн түүхийг бүтээсэн домогт тамирчдын тухай интерактив баримтат түүх.",
      },
      { property: "og:title", content: "WEIDER-ийн өв — Хүч чадлын түүх" },
      { property: "og:description", content: "90 жил. Нэг өв. Тоолшгүй домог." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LegacyPage,
});

function LegacyPage() {
  return (
    <SiteShell>
      <div lang="mn">
        <ChapterNav />
        <LegacyIntro />
        <FounderSection />
        <LegendsSection />
        <TimelineSection />
        <GoldenEraSection />
        <LegacyContinues />
        <ImageCredits />
      </div>
    </SiteShell>
  );
}
