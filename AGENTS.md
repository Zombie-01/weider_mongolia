# WEIDER Mongolia — notes for coding agents

- The desktop first screen (HeroCollage) is a fixed 1920x1080 artboard positioned with ab()/u() in artboard pixels and scaled by container-query units; edit coordinates there, never with viewport breakpoints — it must stay a pixel-faithful recreation of the brand board.
- Site copy is Mongolian: <html lang="mn">, and [lang="mn"] rules in styles.css switch to Cyrillic faces (Fira Sans Extra Condensed / Golos Text / Caveat). Mark Latin brand marks such as the WEIDER logo lang="en" so they keep Anton. WEIDER Mongolia is the importer of the global brand, so avoid brand-agency wording such as "Brand direction" or "Material & color".
- Shared SVG filters (e.g. #ink-rough) live in SiteShell so every page can reference them; a CSS filter pointing at a missing SVG id hides the element.
- LineReveal observes its visible mask wrapper, not the translated inner line — an IntersectionObserver on a fully clipped element never fires.
