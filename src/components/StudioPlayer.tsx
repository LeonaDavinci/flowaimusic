"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";

type Props = {
  src: string;
  title: string;
  durationLabel: string;
  downloadName: string;
  downloadHref?: string;
};

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function StudioPlayer({ src, title, durationLabel, downloadName, downloadHref }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const progress = length > 0 ? (current / length) * 100 : 0;

  return (
    <div className="studio-player">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setCurrent(0); }}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setLength(e.currentTarget.duration)}
      />
      <button
        type="button"
        className="studio-play-btn"
        onClick={toggle}
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        aria-pressed={playing}
        data-track="studio_play"
      >
        <Icon name={playing ? "pause" : "play"} size={16} />
      </button>
      <div className="studio-player-track">
        <div className="studio-player-bar" role="presentation">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="studio-player-meta">
          <strong>{title}</strong>
          <span>{durationLabel}</span>
          <span>{formatTime(current)} / {formatTime(length || 0)}</span>
        </div>
      </div>
      <a
        className="studio-download-btn"
        href={downloadHref || src}
        download={downloadHref ? undefined : downloadName}
        aria-label={`Download ${title}`}
        data-track="studio_download"
      >
        <Icon name="download" size={16} />
        <span>{downloadName.endsWith(".mp3") ? "MP3" : "WAV"}</span>
      </a>
    </div>
  );
}
