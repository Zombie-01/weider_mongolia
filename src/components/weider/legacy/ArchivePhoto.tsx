import { archiveImages, type ArchiveImage, type ArchiveKey } from "@/data/legacy";
import { cn } from "@/lib/utils";

/**
 * An archival photograph from the central registry. When no licensed file has been
 * supplied yet it renders a catalogue-card placeholder that names the required image,
 * so nothing fake ever stands in for a real historical photo.
 */
export function ArchivePhoto({
  image,
  className,
  imgClassName,
  caption = true,
  loading = "lazy",
}: {
  image: ArchiveKey;
  className?: string;
  imgClassName?: string;
  /** show credit (photo) or requirement (placeholder) text */
  caption?: boolean;
  loading?: "lazy" | "eager";
}) {
  const a = archiveImages[image] as ArchiveImage;

  if (a.src) {
    return (
      <figure
        className={cn("relative h-full w-full overflow-hidden bg-ink grain-light", className)}
      >
        <img
          src={a.src}
          alt={a.alt}
          loading={loading}
          style={a.position ? { objectPosition: a.position } : undefined}
          className={cn("photo-archive h-full w-full object-cover", imgClassName)}
        />
        {caption && a.credit && (
          <figcaption className="label-mono absolute bottom-2 right-2 bg-ink/70 px-2 py-1 text-[9px] text-on-dark/80">
            {a.credit}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure
      role="img"
      aria-label={`${a.alt} — зураг хүлээгдэж байна`}
      className={cn(
        "@container relative h-full w-full overflow-hidden bg-ink-soft text-on-dark grain-light",
        className,
      )}
    >
      {/* halftone + crumple, so the empty frame still reads as printed archive matter */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1.4px)",
          backgroundSize: "7px 7px",
        }}
      />
      <div aria-hidden className="crumple-screen absolute inset-0 opacity-25" />
      <div aria-hidden className="absolute inset-[4%] border border-on-dark/25" />
      {a.era && (
        <span
          aria-hidden
          className="display text-outline absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[22cqw] leading-none opacity-40"
        >
          {a.era.replace(/[^0-9–]/g, "").slice(0, 4) || a.era}
        </span>
      )}
      <span className="label-mono absolute left-[7%] top-[7%] text-[max(9px,2.6cqw)] text-on-dark/70">
        Архив № {a.id}
      </span>
      {a.era && (
        <span className="label-mono absolute right-[7%] top-[7%] text-[max(9px,2.6cqw)] text-brand-yellow">
          {a.era}
        </span>
      )}
      {caption && (
        <figcaption className="absolute inset-x-[7%] bottom-[7%]">
          <span className="label-bold inline-block bg-brand-yellow px-2 py-1 text-[max(9px,2.6cqw)] text-ink">
            Зураг шаардлагатай
          </span>
          <span className="mt-2 block font-label text-[max(10px,3.2cqw)] font-semibold leading-snug text-on-dark/85">
            {a.requirement}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
