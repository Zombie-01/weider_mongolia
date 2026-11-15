import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Paper } from "./Paper";

export function SiteFooter() {
  return (
    <footer className="relative">
      <Paper tone="paper" seed={991} className="inset-0" amp={[2, 0, 0, 0]} shadow={false} />
      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-5 pb-10 pt-20 text-ink md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="font-display text-7xl leading-none">
            WEIDER<sup className="font-label text-2xl">®</sup>
          </p>
          <p className="label-bold mt-2 text-xs">Mongolia</p>
          <p className="mt-6 max-w-sm font-label text-lg font-semibold leading-snug">
            Building a stronger, healthier, kinder, and braver Mongolia through discipline,
            performance, and personal transformation.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-4">
          <div className="flex flex-col gap-3">
            <p className="label-mono text-[11px] text-brand-red">Explore</p>
            <Link to="/" hash="story" className="label-bold text-sm hover:text-brand-red">About</Link>
            <Link to="/legacy" className="label-bold text-sm hover:text-brand-red">Legacy</Link>
            <Link to="/products" className="label-bold text-sm hover:text-brand-red">Products</Link>
            <Link to="/" hash="community" className="label-bold text-sm hover:text-brand-red">Community</Link>
            <Link to="/contact" className="label-bold text-sm hover:text-brand-red">Contact</Link>
          </div>
          <div className="flex flex-col gap-3">
            <p className="label-mono text-[11px] text-brand-red">Legal</p>
            <Link to="/privacy" className="label-bold text-sm hover:text-brand-red">Privacy policy</Link>
            <Link to="/terms" className="label-bold text-sm hover:text-brand-red">Terms &amp; conditions</Link>
          </div>
        </nav>
        <div className="md:col-span-3">
          <p className="label-mono text-[11px] text-brand-red">Follow</p>
          <div className="mt-3 flex gap-3">
            {[
              { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/" },
              { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/" },
              { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-12 w-12 place-items-center border-2 border-ink transition-colors hover:bg-ink hover:text-on-dark"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 border-t-2 border-ink pt-6 md:col-span-12 md:flex-row">
          <p className="display text-3xl md:text-4xl">Built different for a brighter tomorrow.</p>
          <p className="label-mono self-end text-[11px]">© {new Date().getFullYear()} Weider Mongolia</p>
        </div>
      </div>
    </footer>
  );
}
