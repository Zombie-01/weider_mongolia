import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteShell } from "@/components/weider/SiteShell";
import { PageHeader } from "@/components/weider/PageHeader";
import { Paper } from "@/components/weider/Paper";
import { Magnetic } from "@/components/weider/motion";
import { bb } from "@/components/weider/BrandButton";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — WEIDER Mongolia" },
      { name: "description", content: "Get in touch with WEIDER Mongolia about products, partnerships and the community." },
      { property: "og:title", content: "Contact — WEIDER Mongolia" },
      { property: "og:description", content: "Join the movement. Contact WEIDER Mongolia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const field =
  "w-full border-0 border-b-2 border-ink bg-transparent px-0 py-3 font-label text-lg font-semibold text-ink placeholder:text-ink/40 focus:border-brand-red focus:outline-none focus:ring-0";

function ContactPage() {
  const [topic, setTopic] = useState("Products");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `[${topic}] ${f.get("name") ?? ""}`;
    const body = `${f.get("message") ?? ""}\n\n— ${f.get("name") ?? ""} (${f.get("email") ?? ""})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <SiteShell>
      <PageHeader kicker="Contact" title={["Join the", "movement."]} tone="blue" />
      <section className="bg-brand-black px-5 py-20 md:px-10">
        <div className="relative mx-auto max-w-4xl">
          <Paper tone="paper" seed={1301} className="inset-0 -rotate-1" amp={1.5} />
          <form onSubmit={onSubmit} className="relative grid gap-8 p-8 text-ink md:p-14">
            <fieldset>
              <legend className="label-mono text-xs text-brand-red">Topic</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Products", "Partnership", "Community", "Other"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={`label-mono border-2 border-ink px-3 py-2 text-xs transition-colors ${topic === t ? "bg-ink text-on-dark" : "hover:bg-ink/10"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="block">
              <span className="label-mono text-xs">Name</span>
              <input name="name" required maxLength={100} className={field} placeholder="Your name" />
            </label>
            <label className="block">
              <span className="label-mono text-xs">Email</span>
              <input name="email" type="email" required maxLength={255} className={field} placeholder="you@example.com" />
            </label>
            <label className="block">
              <span className="label-mono text-xs">Message</span>
              <textarea name="message" required maxLength={2000} rows={5} className={field} placeholder="Tell us about your goals" />
            </label>
            <div>
              <Magnetic>
                <button type="submit" className={bb({ variant: "red", size: "lg" })}>
                  Send message
                </button>
              </Magnetic>
              <p className="label-mono mt-4 text-[11px] text-ink-soft">Opens your email app, addressed to {site.email}</p>
            </div>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
