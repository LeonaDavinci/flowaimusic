"use client";

import { useState } from "react";

type Props = {
  /** Small labels shown under the track title (genre, tempo, style, mood...). */
  tags: { label: string; value: string }[];
  /** Full shareable summary copied by the "Copy all" button. */
  summary: string;
};

/* Shareable, click-to-copy tag group. Every label is also plain text so
   crawlers and non-JS users still see the full spec. */
export function SongTags({ tags, summary }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* Clipboard may be blocked in insecure contexts; fall back to a hidden textarea. */
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1600);
  }

  return (
    <div className="song-share">
      <div className="song-tags">
        {tags.map((tag) => (
          <button
            type="button"
            className={`tag tag-copy${copied === tag.value ? " tag-copied" : ""}`}
            key={`${tag.label}-${tag.value}`}
            onClick={() => copy(tag.value, tag.value)}
            title={`Copy ${tag.value}`}
            aria-label={`Copy ${tag.value}`}
          >
            <span className="tag-label">{tag.label}</span>
            {tag.value}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="song-copy-all"
        onClick={() => copy(summary, "__all")}
        data-track="song_copy_all"
      >
        {copied === "__all" ? "Copied to clipboard" : "Copy full spec"}
      </button>
    </div>
  );
}
