"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "./Icons";
import { StudioPlayer } from "./StudioPlayer";
import { renderSong, revokeAudio } from "@/lib/music-engine";

type MusicModelOption = { id: string; label: string; credits: number; blurb: string };

type StudioConfig = {
  seeapiReady: boolean;
  signedIn: boolean;
  models: MusicModelOption[];
  defaultModel: string | null;
  usage?: {
    plan: string;
    creditsRemaining: number | null;
    downloadsRemaining: number | null;
    freeUsed: boolean;
  } | null;
};

type TaskTrack = {
  id: string | null;
  title: string | null;
  lyrics: string | null;
  tags: string | null;
  duration: number | null;
  audioUrl: string | null;
  streamAudioUrl: string | null;
  imageUrl: string | null;
  preview: boolean;
};

type Take = {
  title: string;
  meta: string;
  gradient: [string, string];
  src: string;
  cover?: string | null;
  downloadName: string;
  bpm: number;
  keyName: string;
  taskId?: string | null;
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

const POLL_INTERVAL_MS = 4000;
const POLL_MAX_MS = 6 * 60 * 1000;

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
  const [instrumental, setInstrumental] = useState(false);
  const [studio, setStudio] = useState<StudioConfig | null>(null);
  const [modelId, setModelId] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressNote, setProgressNote] = useState("Layering waveforms locally with the Web Audio API");
  const [take, setTake] = useState(0);
  const [current, setCurrent] = useState<Take | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastErrorKind, setLastErrorKind] = useState<"signIn" | "subscribe" | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const sourceUrls = useRef<string[]>([]);
  const latestSrc = useRef<string | null>(null);
  const pollAbort = useRef(false);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, generating]);

  useEffect(() => {
    return () => {
      pollAbort.current = true;
      sourceUrls.current.forEach((url) => revokeAudio(url));
      revokeAudio(latestSrc.current);
    };
  }, []);

  useEffect(() => {
    let alive = true;
    fetch("/api/music/config", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: StudioConfig | null) => {
        if (!alive || !data) return;
        setStudio(data);
        setModelId((prev) => prev || data.defaultModel || data.models[0]?.id || "");
      })
      .catch(() => {
        /* config probe is optional — local engine still works */
      });
    return () => {
      alive = false;
    };
  }, []);

  const pushMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  /* ----------------------------------------------------- SeeAPI (AI models) */
  const generateWithSeeApi = async (
    prompt: string,
    model: MusicModelOption,
  ): Promise<Take | null> => {
    setProgressNote(`Generating with ${model.label} via SeeAPI…`);
    const res = await fetch("/api/music/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, style, model: model.id, instrumental }),
    });
    const body = await res.json().catch(() => null);

    if (res.status === 401 || body?.code === "NOT_SIGNED_IN") {
      throw Object.assign(new Error("Sign in with Google to generate AI music."), {
        signIn: true,
      });
    }
    if (body?.code === "FREE_USED" || body?.subscribe) {
      throw Object.assign(
        new Error("Your free generation has been used. Subscribe to a plan to keep creating."),
        { subscribe: true },
      );
    }
    if (!res.ok) {
      throw new Error(body?.error || "The AI music service could not start this generation.");
    }

    const statusUrl: string = body?.statusUrl;
    const taskId: string | null = typeof body?.id === "string" ? body.id : null;
    const startedAt = Date.now();
    setProgress(12);

    while (!pollAbort.current) {
      if (Date.now() - startedAt > POLL_MAX_MS) {
        throw new Error("The generation is taking unusually long. Try again in a minute.");
      }
      await new Promise((resolve) => window.setTimeout(resolve, POLL_INTERVAL_MS));
      const pollRes = await fetch(statusUrl, { cache: "no-store" });
      if (!pollRes.ok) continue; // transient upstream hiccup — keep polling
      const task = (await pollRes.json()) as {
        status: string;
        stage?: string | null;
        error?: string | null;
        tracks?: TaskTrack[];
        audioUrl?: string | null;
      };
      if (task.stage === "text") setProgress(Math.max(progress, 35));
      if (task.stage === "first") setProgress(Math.max(progress, 65));
      if (task.status === "succeeded") {
        const track =
          task.tracks?.find((t) => t.audioUrl) ||
          task.tracks?.find((t) => t.streamAudioUrl) ||
          null;
        const src = track?.audioUrl || track?.streamAudioUrl || task.audioUrl;
        if (!src) throw new Error("The generation finished but returned no audio URL.");
        const seconds = track?.duration ? Math.round(track.duration) : null;
        return {
          title: track?.title || `Take ${take + 1}`,
          meta: `${model.label}${style ? ` · ${style}` : ""}${seconds ? ` · ${seconds}s` : ""}`,
          gradient: GRADIENTS[take % GRADIENTS.length],
          src,
          cover: track?.imageUrl || null,
          downloadName: "flow-ai-music-take.mp3",
          bpm: 0,
          keyName: track?.tags ? String(track.tags).slice(0, 40) : "",
          taskId,
        };
      }
      if (["failed", "canceled", "expired", "refunded"].includes(task.status)) {
        throw new Error(task.error || `The AI music task ${task.status}.`);
      }
    }
    throw new Error("Generation stopped.");
  };

  /* ---------------------------------------------------- local (Web Audio) */
  const generateLocally = async (prompt: string, nextTake: number) => {
    setProgressNote("Layering waveforms locally with the Web Audio API");
    const song = await renderSong({ brief: prompt, style, take: nextTake });
    const src = URL.createObjectURL(song.blob);
    sourceUrls.current.push(src);
    return {
      title: song.title,
      meta: `${style} · ${song.keyName} · ${song.bpm} BPM · Take ${nextTake}`,
      gradient: GRADIENTS[nextTake % GRADIENTS.length],
      src,
      cover: null,
      downloadName: `flow-ai-music-take-${nextTake}.wav`,
      bpm: song.bpm,
      keyName: song.keyName,
    } as Take;
  };

  const generate = async (text: string) => {
    if (!text.trim() || generating) return;
    const prompt = text.trim();
    const nextTake = take + 1;
    const model = studio?.models.find((m) => m.id === modelId) || studio?.models[0];
    const useAi = Boolean(studio?.seeapiReady && studio?.signedIn && model);

    setTake(nextTake);
    pushMessage({ id: Date.now(), role: "user", text: prompt });
    setInput("");
    setGenerating(true);
    setProgress(0);
    setError(null);
    setProgressNote(
      useAi ? `Generating with ${model!.label} via SeeAPI…` : "Layering waveforms locally with the Web Audio API",
    );

    const ticker = window.setInterval(() => {
      setProgress((value) => Math.min(92, value + 6));
    }, 70);

    try {
      const result: Take | null = useAi
        ? await generateWithSeeApi(prompt, model!)
        : await generateLocally(prompt, nextTake);
      if (!result) throw new Error("Generation failed.");
      window.clearInterval(ticker);
      setProgress(100);
      setCurrent(result);
      latestSrc.current = result.src;
      const flavor = useAi
        ? `${model!.label} generated this take${result.cover ? " with cover art" : ""}. Press play to hear it, or download the MP3.`
        : `Take ${nextTake} is ready — built from layered sine, triangle and sawtooth waves in your browser. Press play to hear it, or download the WAV.`;
      pushMessage({
        id: Date.now() + 1,
        role: "assistant",
        text: flavor,
        result,
      });
    } catch (err) {
      window.clearInterval(ticker);
      const message = err instanceof Error ? err.message : "Generation failed.";
      const kind = (err as { signIn?: boolean; subscribe?: boolean })?.subscribe
        ? "subscribe"
        : (err as { signIn?: boolean })?.signIn
          ? "signIn"
          : null;
      setLastErrorKind(kind);
      setError(message);
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
  const aiPath = Boolean(studio?.seeapiReady && studio?.signedIn);

  /* AI takes download through the server proxy so the usage ledger can count
     them; local Web Audio takes keep their direct blob URL. */
  const downloadHref = (take: Take) =>
    take.taskId && /^https?:\/\//i.test(take.src)
      ? `/api/music/download?task=${encodeURIComponent(take.taskId)}&src=${encodeURIComponent(take.src)}&name=${encodeURIComponent(take.downloadName)}`
      : take.src;

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
                  {message.result.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="gen-art" src={message.result.cover} alt="" width={56} height={56} />
                  ) : (
                    <span
                      className="gen-art"
                      style={{
                        background: `linear-gradient(135deg, ${message.result.gradient[0]}, ${message.result.gradient[1]})`,
                      }}
                    />
                  )}
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
                  downloadHref={downloadHref(message.result)}
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
              <small>{progressNote}</small>
            </div>
          )}
          {error && (
            <div className="msg studio-error" role="alert">
              {error}
              {lastErrorKind === "subscribe" ? (
                <a className="btn btn-primary btn-sm" href="/pricing" data-track="cta_click" data-placement="studio_subscribe">
                  View plans
                </a>
              ) : lastErrorKind === "signIn" ? (
                <a className="btn btn-primary btn-sm" href="/api/auth/google/start?next=/studio">
                  Sign in with Google
                </a>
              ) : null}
            </div>
          )}
        </div>

        <div className="composer-bar">
          {studio?.seeapiReady && studio.models.length > 0 && (
            <div className="style-chips" role="group" aria-label="AI music model">
              {studio.models.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  className={`style-chip${modelId === model.id ? " is-active" : ""}`}
                  title={model.blurb}
                  aria-pressed={modelId === model.id}
                  onClick={() => setModelId(model.id)}
                >
                  {model.label}
                </button>
              ))}
            </div>
          )}
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
            <button
              type="button"
              className={`style-chip${instrumental ? " is-active" : ""}`}
              aria-pressed={instrumental}
              onClick={() => setInstrumental((value) => !value)}
            >
              {instrumental ? "Instrumental" : "With vocals"}
            </button>
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
        <div className="param-row"><span>Model</span><b>{aiPath ? (studio?.models.find((m) => m.id === modelId)?.label || "AI Music") : "Local synthesis"}</b></div>
        <div className="param-row"><span>Tempo</span><b>{current ? (current.bpm ? `${current.bpm} BPM` : "—") : "104 BPM"}</b></div>
        <div className="param-row"><span>Key / tags</span><b>{current ? (current.keyName || "—") : "F major"}</b></div>
        <div className="param-row"><span>Length</span><b>{lengthLabel}</b></div>
        <div className="param-row"><span>Vocals</span><b>{instrumental ? "Instrumental" : "Vocal song"}</b></div>
        <div className="param-row"><span>Format</span><b>{aiPath ? "MP3 + cover" : "Mixed WAV"}</b></div>
        <div className="param-row"><span>Style</span><b>{style}</b></div>
        {aiPath && studio?.usage && (
          <div className="param-row">
            <span>Credits left</span>
            <b>{studio.usage.creditsRemaining ?? "—"}</b>
          </div>
        )}
        {aiPath && studio?.usage && (
          <div className="param-row">
            <span>Downloads left</span>
            <b>{studio.usage.downloadsRemaining ?? "—"}</b>
          </div>
        )}
        {current ? (
          <a className="btn btn-primary" style={{ width: "100%", marginTop: 18 }} href={downloadHref(current)} download={current.taskId ? undefined : current.downloadName} data-track="studio_download">
            <Icon name="download" size={17} /> Download {current.downloadName.endsWith(".mp3") ? "MP3" : "WAV"}
          </a>
        ) : (
          <button type="button" className="btn btn-ghost" style={{ width: "100%", marginTop: 18 }} disabled title="Generate a track first">
            <Icon name="download" size={17} /> Download
          </button>
        )}
        <p className="aside-note">
          {aiPath
            ? `AI takes are generated by ${studio?.models.find((m) => m.id === modelId)?.label || "the selected AI music model"} via SeeAPI at the model's default length. Your first take is free — after that, plans include monthly credits and downloads.`
            : "Sign in with Google to generate your first free AI track with the SeeAPI music models."}
        </p>
      </aside>
    </div>
  );
}
