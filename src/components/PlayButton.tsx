"use client";

import { useState } from "react";
import { Icon } from "./Icons";

export function PlayButton({ trackId, title }: { trackId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <button
      type="button"
      className={`play-btn${playing ? " is-playing" : ""}`}
      aria-label={`${playing ? "Pause" : "Preview"} ${title}`}
      aria-pressed={playing}
      onClick={() => setPlaying((v) => !v)}
      data-track="demo_play"
      data-track-id={trackId}
    >
      {playing ? (
        <span className="equalizer" aria-hidden="true">
          <i style={{ animationDelay: "0s" }} />
          <i style={{ animationDelay: "0.2s" }} />
          <i style={{ animationDelay: "0.4s" }} />
          <i style={{ animationDelay: "0.1s" }} />
        </span>
      ) : (
        <Icon name="play" size={22} />
      )}
    </button>
  );
}
