"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "./Icons";

type Props = {
  trackId: string;
  title: string;
  /** Real master URL when the case has a published take. */
  src?: string | null;
};

/* When a track has real audio, this is a genuine play/pause control over the
   SeeAPI master; without audio it links to the case page. */
export function PlayButton({ trackId, title, src }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  if (!src) {
    return (
      <Link
        href={`/songs/${trackId}`}
        className="play-btn"
        aria-label={`Open the ${title} case page`}
        title="Sample track — open the case page"
        data-track="demo_play"
        data-track-id={trackId}
      >
        <Icon name="play" size={22} />
      </Link>
    );
  }

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      void audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className={`play-btn${playing ? " is-playing" : ""}`}
        aria-label={`${playing ? "Pause" : "Play"} ${title}`}
        aria-pressed={playing}
        onClick={toggle}
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
    </>
  );
}
