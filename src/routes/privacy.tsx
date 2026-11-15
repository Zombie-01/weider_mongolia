import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/weider/SiteShell";
import { PageHeader } from "@/components/weider/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Нууцлалын бодлого — WEIDER Mongolia" },
      { name: "description", content: "WEIDER Mongolia — Нууцлалын бодлого." },
      { property: "og:title", content: "Нууцлалын бодлого — WEIDER Mongolia" },
      { property: "og:description", content: "WEIDER Mongolia — Нууцлалын бодлого." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <PageHeader kicker="Эрх зүй" title={["Нууцлалын", "бодлого."]} tone="paper" />
      <section className="bg-brand-black px-5 py-20 md:px-10">
        <div className="mx-auto max-w-3xl font-label text-lg font-medium leading-relaxed text-on-dark">
          <p className="label-mono text-xs text-brand-yellow">Төсөл</p>
          <p className="mt-4">
            WEIDER Mongolia-гийн албан ёсны нууцлалын бодлого энд удахгүй нийтлэгдэнэ. Асуулт байвал бидэнтэй холбогдоно уу.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
