import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/weider/SiteShell";
import { PageHeader } from "@/components/weider/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — WEIDER Mongolia" },
      { name: "description", content: "WEIDER Mongolia Terms & Conditions." },
      { property: "og:title", content: "Terms & Conditions — WEIDER Mongolia" },
      { property: "og:description", content: "WEIDER Mongolia Terms & Conditions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <PageHeader kicker="Legal" title={["Terms &", "conditions."]} tone="paper" />
      <section className="bg-brand-black px-5 py-20 md:px-10">
        <div className="mx-auto max-w-3xl font-label text-lg font-medium leading-relaxed text-on-dark">
          <p className="label-mono text-xs text-brand-yellow">Draft</p>
          <p className="mt-4">
            The official WEIDER Mongolia Terms & Conditions will be published here. Until then, contact us
            with any questions.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
