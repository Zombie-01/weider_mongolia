import { useEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function register() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Runs GSAP code scoped to `scope` on the client only, and reverts every tween and
 * ScrollTrigger it created on unmount. Selector strings inside `setup` resolve within scope.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (mm: gsap.MatchMedia, el: HTMLElement) => void,
  deps: DependencyList = [],
) {
  useEffect(() => {
    register();
    const el = scope.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    setup(mm, el);
    // images and fonts change layout after mount; re-measure pinned sections
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(t);
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger };
