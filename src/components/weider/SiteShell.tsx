import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { BrandCursor } from "./BrandCursor";

export function SiteShell({ children, navHiddenAtTop = false }: { children: ReactNode; navHiddenAtTop?: boolean }) {
  return (
    <>
      <svg aria-hidden className="pointer-events-none fixed h-0 w-0">
        <filter id="ink-rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="1.3" />
        </filter>
      </svg>
      <SiteNav hideAtTop={navHiddenAtTop} />
      <main>{children}</main>
      <SiteFooter />
      <div aria-hidden className="site-grain" />
      <BrandCursor />
    </>
  );
}
