/**
 * Deterministic torn-paper clip-paths.
 * A base polygon (percent coordinates, clockwise) is subdivided and every point is pushed
 * inward by a seeded random amount, giving irregular, fibrous paper edges that render
 * identically on the server and in the browser.
 */

export type Pt = [number, number];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface TornOptions {
  /** Inward jitter per edge, in percent of the element. 0 keeps the edge straight. */
  amp?: number | number[] | undefined;
  /** Points per edge. */
  steps?: number | undefined;
}

export const RECT: Pt[] = [
  [0, 0],
  [100, 0],
  [100, 100],
  [0, 100],
];

export function tornPath(seed: number, shape: Pt[] = RECT, opts: TornOptions = {}): string {
  const rand = mulberry32(seed * 9301 + 49297);
  const steps = opts.steps ?? 34;
  const amps = Array.isArray(opts.amp) ? opts.amp : shape.map(() => (opts.amp as number) ?? 2);
  const out: string[] = [];

  for (let e = 0; e < shape.length; e++) {
    const [px, py] = shape[e]!;
    const [qx, qy] = shape[(e + 1) % shape.length]!;
    const amp = amps[e] ?? 0;
    const dx = qx - px;
    const dy = qy - py;
    const len = Math.hypot(dx, dy) || 1;
    // inward normal for a clockwise polygon in screen space (y down)
    const nx = -dy / len;
    const ny = dx / len;
    let wobble = rand();
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      let x = px + dx * t;
      let y = py + dy * t;
      if (amp > 0) {
        // low-frequency wobble + sharp fibre spikes
        wobble += (rand() - 0.5) * 0.5;
        wobble = Math.min(1, Math.max(0, wobble));
        const spike = rand() < 0.25 ? rand() * 0.6 : 0;
        const d = amp * (wobble * 0.7 + spike + rand() * 0.25);
        x += nx * d;
        y += ny * d;
        // jitter along the edge so teeth are uneven
        const along = (rand() - 0.5) * (len / steps) * 0.6;
        x += (dx / len) * along;
        y += (dy / len) * along;
      }
      out.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
    }
  }
  return `polygon(${out.join(",")})`;
}
