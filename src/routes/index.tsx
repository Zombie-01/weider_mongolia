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
      { title: "WEIDER Mongolia — Beyond Your Limits" },
      {
        name: "description",
        content:
          "WEIDER Mongolia: building a stronger, healthier, kinder and braver Mongolia through discipline, performance and personal transformation.",
      },
      { property: "og:title", content: "WEIDER Mongolia — Beyond Your Limits" },
      {
        property: "og:description",
        content: "Strength is earned. A movement toward a stronger Mongolia.",
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
