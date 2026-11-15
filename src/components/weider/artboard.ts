export type Box = { left: string; top: string; width?: string; height?: string };

/** Hero artboard is 1920x1080. These helpers turn artboard pixels into fluid units. */
export const W = 1920;
export const H = 1080;

export const ab = (x: number, y: number, w?: number, h?: number): Box => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  ...(w !== undefined ? { width: `${(w / W) * 100}%` } : {}),
  ...(h !== undefined ? { height: `${(h / H) * 100}%` } : {}),
});

/** font size / length in artboard px -> container query width units */
export const u = (px: number) => `${(px / W) * 100}cqw`;
