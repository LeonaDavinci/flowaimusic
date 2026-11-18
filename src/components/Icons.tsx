import type { CSSProperties, ReactNode } from "react";

export type IconName =
  | "song"
  | "video"
  | "vocal"
  | "remix"
  | "fx"
  | "play"
  | "pause"
  | "note"
  | "spark"
  | "split"
  | "download"
  | "sliders"
  | "arrow"
  | "heart"
  | "grid"
  | "shield";

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

const paths: Record<IconName, ReactNode> = {
  song: (
    <>
      <path d="M9 18V5l10-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="16" cy="16" r="3" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="5" width="14" height="14" rx="3" />
      <path d="m17 10 4-2.5v9L17 14z" />
    </>
  ),
  vocal: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
    </>
  ),
  remix: (
    <>
      <path d="M4 7h11a4 4 0 0 1 0 8H8" />
      <path d="m11 12-3 3 3 3M4 17h3" />
    </>
  ),
  fx: (
    <>
      <path d="M3 12h3l2-6 3 12 3-9 2 5h5" />
    </>
  ),
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />,
  pause: (
    <>
      <rect x="7" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
  note: (
    <>
      <path d="M6 18V7l10-2v11" />
      <circle cx="4" cy="18" r="2" />
      <circle cx="14" cy="16" r="2" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M18 17l.7 2 .3-.7.7-.3-2-.7z" />
    </>
  ),
  split: (
    <>
      <path d="M4 6h5l6 12h5M4 18h5l3-6M16 6h4M16 18h4" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v11m0 0 4-4m-4 4-4-4M4 19h16" />
    </>
  ),
  sliders: (
    <>
      <path d="M5 4v6m0 4v6M12 4v3m0 4v9M19 4v9m0 4v3" />
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="9" r="2" />
      <circle cx="19" cy="15" r="2" />
    </>
  ),
  arrow: <path d="M5 12h13m-5-5 5 5-5 5" />,
  heart: (
    <path d="M12 20s-7-4.4-7-9.2A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7 2.8C19 15.6 12 20 12 20z" />
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.6-3.2 7.7-8 9-4.8-1.3-8-4.4-8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

export function Icon({ name, size = 22, className, style }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" width={36} height={36} alt="" decoding="async" />
    </span>
  );
}
