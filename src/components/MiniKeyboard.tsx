"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const KEYS = [
  { label: "C", frequency: 261.63 },
  { label: "D", frequency: 293.66 },
  { label: "E", frequency: 329.63 },
  { label: "F", frequency: 349.23 },
  { label: "G", frequency: 392.0 },
  { label: "A", frequency: 440.0 },
  { label: "B", frequency: 493.88 },
  { label: "C", frequency: 523.25 },
];

export function MiniKeyboard() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [note, setNote] = useState("Click a key to play a note");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      void ctxRef.current?.close();
    };
  }, []);

  const play = useCallback((index: number) => {
    const key = KEYS[index];
    try {
      const AudioCtx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) {
        setNote("Web Audio is not available in this browser");
        return;
      }
      if (!ctxRef.current) ctxRef.current = new AudioCtx();
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") void ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      sub.type = "sine";
      osc.frequency.value = key.frequency;
      sub.frequency.value = key.frequency / 2;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.24, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);
      osc.connect(gain);
      sub.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      sub.start(now);
      osc.stop(now + 0.78);
      sub.stop(now + 0.78);
    } catch {
      setNote("Audio could not start — try clicking a key again");
    }

    setActive(index);
    setNote(`Now playing ${key.label}${index === 7 ? "5" : "4"} · ${Math.round(key.frequency)} Hz`);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(null), 320);
  }, []);

  return (
    <div className="keyboard">
      <div className="keyboard-top">
        <div>
          <strong>Mini Keyboard</strong>
          <span style={{ display: "block", marginTop: 2 }}>Grand Piano · built as a Space</span>
        </div>
        <span>8 keys · C4 → C5</span>
      </div>
      <div className="keys" role="group" aria-label="Playable mini keyboard">
        {KEYS.map((key, index) => (
          <button
            key={`${key.label}-${index}`}
            type="button"
            className={`key${active === index ? " is-active" : ""}`}
            aria-label={`Play ${key.label}${index === 7 ? "5" : "4"}`}
            onClick={() => play(index)}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" && ctxRef.current?.state === "running") {
                play(index);
              }
            }}
            data-track="demo_play"
            data-note={key.label}
          >
            {key.label}
          </button>
        ))}
      </div>
      <div className="keyboard-foot">
        <code>flowaimusic.com/spaces/piano</code>
        <span className="keyboard-note" role="status">
          {note}
        </span>
      </div>
    </div>
  );
}
