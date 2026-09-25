import type { ReactNode } from "react";

export type Box = readonly [number, number, number, number];
export type PieceKind = "rise" | "fade" | "mask" | "zoom" | "quote";

export function pageSrc(n: number) {
  return `/brochure-pages/page-${String(n).padStart(2, "0")}.jpg`;
}

/**
 * A region of the original page. The image stays full-size and is only
 * clipped, so when the motion settles the artwork is unchanged.
 */
export function Piece({
  src,
  box,
  kind = "rise",
  delay = 0,
  hover = false,
  className = "",
  children,
}: {
  src: string;
  box: Box;
  kind?: PieceKind;
  delay?: number;
  hover?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const [l, t, w, h] = box;
  const right = 1 - l - w;
  const bottom = 1 - t - h;
  return (
    <div
      className={`br-piece br-${kind} ${hover ? "br-can-hover" : ""} ${className}`}
      style={{
        ["--d" as string]: `${delay}ms`,
        ["--t" as string]: `${t * 100}%`,
        ["--r" as string]: `${right * 100}%`,
        ["--b" as string]: `${bottom * 100}%`,
        ["--l" as string]: `${l * 100}%`,
        ["--ox" as string]: `${(l + w / 2) * 100}%`,
        ["--oy" as string]: `${(t + h / 2) * 100}%`,
        clipPath: `inset(${t * 100}% ${right * 100}% ${bottom * 100}% ${l * 100}%)`,
        transformOrigin: `${(l + w / 2) * 100}% ${(t + h / 2) * 100}%`,
      }}
    >
      <div className="br-hit">
        <img src={src} alt="" draggable={false} />
        {children}
      </div>
    </div>
  );
}

/** Circular window onto an icon in the original artwork. */
export function IconCrop({
  src,
  cx,
  cy,
  diameter = 0.055,
}: {
  src: string;
  cx: number;
  cy: number;
  diameter?: number;
}) {
  const w = diameter;
  const h = diameter * (1400 / 2489);
  const l = cx - w / 2;
  const t = cy - h / 2;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-full">
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          width: `${(1 / w) * 100}%`,
          height: `${(1 / h) * 100}%`,
          left: `${(-l / w) * 100}%`,
          top: `${(-t / h) * 100}%`,
          maxWidth: "none",
        }}
      />
    </div>
  );
}
