import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { EASE, Magnetic } from "./motion";
import { bb } from "./BrandButton";
import { Paper } from "./Paper";
import logoWhite from "@/assets/brand/weider-man-white.png";

const NAV = [
  { label: "Бидний тухай", to: "/", hash: "story" },
  { label: "Бүтээгдэхүүн", to: "/products" },
  { label: "Өв түүх", to: "/legacy" },
  { label: "Нийгэмлэг", to: "/", hash: "community" },
  { label: "Холбоо барих", to: "/contact" },
] as const;

/**
 * Floating navigation. On the home page (desktop) it stays hidden over the brand-board
 * hero so the first screen matches the board exactly, then drops in once you scroll.
 */
export function SiteNav({ hideAtTop = false }: { hideAtTop?: boolean }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 140));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const hidden = hideAtTop && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          hidden && "md:pointer-events-none md:-translate-y-[110%]",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-5 py-3 md:px-10 transition-colors duration-500",
            scrolled || !hideAtTop ? "bg-ink/95 text-on-dark backdrop-blur" : "bg-ink/95 text-on-dark md:bg-transparent",
          )}
        >
          <Link to="/" lang="en" className="flex items-center gap-2 font-display text-3xl leading-none tracking-tight md:text-4xl">
            <img src={logoWhite} alt="" aria-hidden className="h-8 w-auto md:h-9" />
            <span>
              WEIDER<sup className="ml-0.5 font-label text-xs">®</sup>
            </span>
            <span className="label-mono ml-3 hidden align-middle text-[10px] text-brand-yellow lg:inline">
              Mongolia
            </span>
          </Link>
          <nav aria-label="Үндсэн цэс" className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                {...("hash" in n ? { hash: n.hash } : {})}
                className="label-mono group relative text-xs"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-red transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Magnetic>
              <Link to="/products" className={bb({ variant: "red", size: "md" }, "py-2 text-lg")}>
                Бүтээгдэхүүн
              </Link>
            </Magnetic>
          </div>
          <button
            type="button"
            aria-label="Цэс нээх"
            onClick={() => setOpen(true)}
            className="p-2 md:hidden"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
        <div
          aria-hidden
          className={cn(
            "h-2 w-full bg-brand-red transition-opacity duration-500",
            scrolled || !hideAtTop ? "opacity-100" : "opacity-100 md:opacity-0",
          )}
          style={{ clipPath: "polygon(0 0,100% 0,100% 30%,90% 80%,75% 40%,60% 100%,45% 30%,30% 90%,15% 40%,0 70%)" }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-brand-black"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Paper tone="red" seed={88} className="inset-x-0 top-0 h-[62%]" amp={[0, 0, 6, 0]} />
            <Paper tone="blue" seed={89} className="inset-x-0 bottom-0 h-[30%]" amp={[6, 0, 0, 0]} />
            <div className="relative flex h-full flex-col px-6 py-5">
              <div className="flex items-center justify-between text-on-dark">
                <span lang="en" className="font-display text-3xl">WEIDER®</span>
                <button type="button" aria-label="Цэс хаах" onClick={() => setOpen(false)} className="p-2">
                  <X className="h-8 w-8" />
                </button>
              </div>
              <nav aria-label="Гар утасны цэс" className="mt-10 flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.div
                    key={n.label}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE }}
                  >
                    <Link
                      to={n.to}
                      {...("hash" in n ? { hash: n.hash } : {})}
                      onClick={() => setOpen(false)}
                      className="display flex items-baseline gap-3 text-[16vw] text-on-dark"
                    >
                      <span className="label-mono text-xs text-brand-yellow">0{i + 1}</span>
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <p className="label-mono mt-auto text-xs text-on-dark">
                1936 оноос хойш · Одоо Монголд
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
