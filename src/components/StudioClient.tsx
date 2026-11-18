"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "./Icons";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  result?: { title: string; meta: string; gradient: [string, string] };
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
      text: `On it. I hear ${persona === "producer" ? "a producer session" : "a full arrangement"} in this. Writing structure, lyrics and vocal direction now — you can change any single section afterwards.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [style, setStyle] = useState("Indie pop");
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [take, setTake] = useState(1);
  const feedRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, generating]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const generate = (text: string) => {
    if (!text.trim() || generating) return;
    const nextTake = take + 1;
    setTake(nextTake);
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: text.trim() }]);
    setInput("");
    setGenerating(true);
    setProgress(0);
    progressRef.current = 0;

    timerRef.current = setInterval(() => {
      const next = Math.min(100, progressRef.current + 5);
      progressRef.current = next;
      setProgress(next);
      if (next < 100) return;

      if (timerRef.current) clearInterval(timerRef.current);
      setGenerating(false);
      const words = text.trim().split(/\s+/).slice(0, 3).join(" ");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: `Take ${nextTake} is ready. ${style} arrangement, full vocals and separated stems. Tell me which section to change next.`,
          result: {
            title: words.charAt(0).toUpperCase() + words.slice(1),
            meta: `${style} · 3:12 · Take ${nextTake}`,
            gradient: GRADIENTS[nextTake % GRADIENTS.length],
          },
        },
      ]);
    }, 90);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    generate(input);
  };

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
                <div className="gen-card">
                  <span
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      flexShrink: 0,
                      background: `linear-gradient(135deg, ${message.result.gradient[0]}, ${message.result.gradient[1]})`,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <strong>{message.result.title}</strong>
                    <span>{message.result.meta}</span>
                  </div>
                  <Icon name="play" size={18} />
                </div>
              )}
              <small>{message.role === "user" ? "You" : "Flow AI Music Producer"}</small>
            </div>
          ))}
          {generating && (
            <div className="msg">
              Composing take {take + 1}… <strong>{progress}%</strong>
              <div className="progress">
                <div className="progress-bar" style={{ width: `${progress}%` }} />
              </div>
              <small>Generating arrangement, vocals and stems</small>
            </div>
          )}
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
              placeholder="Make the chorus wider, or describe a new song…"
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
        <div className="param-row"><span>Tempo</span><b>104 BPM</b></div>
        <div className="param-row"><span>Key</span><b>F major</b></div>
        <div className="param-row"><span>Length</span><b>3:12</b></div>
        <div className="param-row"><span>Vocals</span><b>Lead + backing</b></div>
        <div className="param-row"><span>Stems</span><b>4 tracks</b></div>
        <div className="param-row"><span>Style</span><b>{style}</b></div>
        <button type="button" className="btn btn-ghost" style={{ width: "100%", marginTop: 18 }} aria-disabled="true" title="Downloads are disabled in demo mode">
          <Icon name="download" size={17} /> Download
        </button>
        <p className="aside-note">
          Demo mode: the studio simulates generation locally. No audio is
          uploaded and no account is required.
        </p>
      </aside>
    </div>
  );
}
