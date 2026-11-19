"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "./Icons";
import { StudioPlayer } from "./StudioPlayer";
import { renderSong, revokeAudio } from "@/lib/music-engine";

type Take = {
  title: string;
  meta: string;
  gradient: [string, string];
  src: string;
  downloadName: string;
  bpm: number;
  keyName: string;
};

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  result?: Take;
};

const STYLES = ["Indie pop", "Lo-fi", "Cinematic", "Electronic", "R&B", "Hip-Hop"];
const GRADIENTS: [string, string][] = [
  ["#ffbe2e", "#ff6a45"],
  ["#7b5cff", "#00c2ff"],
  ["#22d3a6", "#4b7bff"],
  ["#ff9ec4", "#ffc44d"],
];

export function StudioClient({ brief, persona }: { brief: string; persona: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "user", text: brief },
    {
      id: 2,
      role: "assistant",
      text: `On it. I hear ${persona === "producer" ? "a producer session" : "a full arrangement"} in this. Pick a style and press Generate — the studio layers real audio waveforms in your browser, right now.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [style, setStyle] = useState("Indie pop");
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [take, setTake] = useState(0);
  const [current, setCurrent] = useState<Take | null>(null);
  const [error, setError] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const sourceUrls = useRef<string[]>([]);
  const latestSrc = useRef<string | null>(null);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, generating]);

  useEffect(() => {
    return () => {
      sourceUrls.current.forEach((url) => revokeAudio(url));
      revokeAudio(latestSrc.current);
    };
  }, []);

  const generate = async (text: string) => {
    if (!text.trim() || generating) return;
    const prompt = text.trim();
    const nextTake = take + 1;
    setTake(nextTake);
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: prompt }]);
    setInput("");
    setGenerating(true);
    setProgress(0);
    setError(null);

    // Honest progress animation while the offline audio graph renders.
    const ticker = window.setInterval(() => {
      setProgress((value) => Math.min(92, value + 6));
    }, 70);

    try {
      const song = await renderSong({ brief: prompt, style, take: nextTake });
      window.clearInterval(ticker);
      setProgress(100);

      const src = URL.createObjectURL(song.blob);
      sourceUrls.current.push(src);
      const result: Take = {
        title: song.title,
        meta: `${style} · ${song.keyName} · ${song.bpm} BPM · Take ${nextTake}`,
        gradient: GRADIENTS[nextTake % GRADIENTS.length],
        src,
        downloadName: `flow-ai-music-take-${nextTake}.wav`,
        bpm: song.bpm,
        keyName: song.keyName,
      };
      setCurrent(result);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: `Take ${nextTake} is ready — ${song.bars} bars of ${style} built from layered sine, triangle and sawtooth waves in your browser. Press play to hear it, or download the WAV.`,
          result,
        },
      ]);
    } catch (err) {
      window.clearInterval(ticker);
      setError(err instanceof Error ? err.message : "Audio synthesis failed in this browser.");
    } finally {
      setGenerating(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void generate(input);
  };

  const minutes = current ? Math.round((current.bpm ? 8 * 4 * 60 / current.bpm : 0)) : 0;
  const lengthLabel = current
    ? `${Math.floor(minutes / 60)}:${(minutes % 60).toString().padStart(2, "0")}`
    : "3:12";

  return (
    <div className="studio-layout">
      <aside className="studio-panel studio-side" aria-label="Sessions">
        <h2>Sessions</h2>
        <div className="session-list">
          <span className="session-item is-active">Current session</span>
          <span className="session-item">Sunset drive idea</span>
          <span className="session-item">Vlog underscore</span>
          <span className="session-item">Chorus rewrite</span>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" style={{ width: "100%", marginTop: 16 }} data-track="cta_click" data-placement="studio_new">
          + New session
        </button>
      </aside>

      <section className="studio-panel studio-main" aria-label="Creation conversation">
        <div className="chat-feed" ref={feedRef}>
          {messages.map((message) => (
            <div key={message.id} className={`msg${message.role === "user" ? " msg-user" : ""}`}>
              {message.text}
              {message.result && (
                <div className="gen-card gen-card-audio">
                  <span
                    className="gen-art"
                    style={{
                      background: `linear-gradient(135deg, ${message.result.gradient[0]}, ${message.result.gradient[1]})`,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong>{message.result.title}</strong>
                    <span>{message.result.meta}</span>
                  </div>
                </div>
              )}
              {message.result && (
                <StudioPlayer
                  src={message.result.src}
                  title={message.result.title}
                  durationLabel={message.result.meta.split(" · ")[1] ?? lengthLabel}
                  downloadName={message.result.downloadName}
                />
              )}
              <small>{message.role === "user" ? "You" : "Flow AI Music Producer"}</small>
            </div>
          ))}
          {generating && (
            <div className="msg">
              Synthesizing take {take + 1}… <strong>{progress}%</strong>
              <div className="progress">
                <div className="progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <small>Layering waveforms locally with the Web Audio API</small>
            </div>
          )}
          {error && <div className="msg studio-error" role="alert">{error}</div>}
        </div>

        <div className="composer-bar">
          <div className="style-chips" role="group" aria-label="Style">
            {STYLES.map((item) => (
              <button
                key={item}
                type="button"
                className={`style-chip${style === item ? " is-active" : ""}`}
                aria-pressed={style === item}
                onClick={() => setStyle(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <form className="composer-row" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="studio-input">
              Describe what to change
            </label>
            <input
              id="studio-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Describe a new song or a change…"
              disabled={generating}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={generating}
              data-track="brief_submit"
              data-placement="studio"
            >
              {generating ? "Working…" : "Generate"}
            </button>
          </form>
        </div>
      </section>

      <aside className="studio-panel studio-aside" aria-label="Track parameters">
        <h2>Current track</h2>
        <div className="param-row"><span>Tempo</span><b>{current ? `${current.bpm} BPM` : "104 BPM"}</b></div>
        <div className="param-row"><span>Key</span><b>{current ? current.keyName : "F major"}</b></div>
        <div className="param-row"><span>Length</span><b>{lengthLabel}</b></div>
        <div className="param-row"><span>Vocals</span><b>Instrumental</b></div>
        <div className="param-row"><span>Stems</span><b>Mixed WAV</b></div>
        <div className="param-row"><span>Style</span><b>{style}</b></div>
        {current ? (
          <a className="btn btn-primary" style={{ width: "100%", marginTop: 18 }} href={current.src} download={current.downloadName} data-track="studio_download">
            <Icon name="download" size={17} /> Download WAV
          </a>
        ) : (
          <button type="button" className="btn btn-ghost" style={{ width: "100%", marginTop: 18 }} disabled title="Generate a track first">
            <Icon name="download" size={17} /> Download
          </button>
        )}
        <p className="aside-note">
          Local synthesis: sine, triangle and sawtooth waves are layered into
          chords, bass and melody with the Web Audio API. Rendered on your
          device — no upload, no account, no model call.
        </p>
      </aside>
    </div>
  );
}
