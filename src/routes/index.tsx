import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/weider/SiteShell";
import { HeroCollage } from "@/components/weider/HeroCollage";
import { MobileHero } from "@/components/weider/sections/MobileHero";
import { HeroCtaBand } from "@/components/weider/sections/HeroCtaBand";
import { StorySection } from "@/components/weider/sections/StorySection";
import { PhilosophySection } from "@/components/weider/sections/PhilosophySection";
import { ProductsSection } from "@/components/weider/sections/ProductsSection";
import { DisciplineSection } from "@/components/weider/sections/DisciplineSection";
import { IdentitySection } from "@/components/weider/sections/IdentitySection";
import { CommunitySection } from "@/components/weider/sections/CommunitySection";
import { FinalStatement } from "@/components/weider/sections/FinalStatement";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WEIDER Mongolia — Хязгаараа дав" },
      {
        name: "description",
        content:
          "WEIDER — 1936 оноос хойшхи дэлхийн спортын хоол тэжээлийн брэнд одоо Монголд. Уураг, креатин, амин хүчил, витамин болон спортын хоол тэжээл.",
      },
      { property: "og:title", content: "WEIDER Mongolia — Хязгаараа дав" },
      {
        property: "og:description",
        content: "Хөлс хүч болно. WEIDER одоо Монголд.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell navHiddenAtTop>
      <div className="hidden md:block">
        <HeroCollage />
      </div>
      <div className="md:hidden">
        <MobileHero />
      </div>
      <HeroCtaBand />
      <StorySection />
      <PhilosophySection />
      <ProductsSection />
      <DisciplineSection />
      <IdentitySection />
      <CommunitySection />
      <FinalStatement />
    </SiteShell>
  );
}
