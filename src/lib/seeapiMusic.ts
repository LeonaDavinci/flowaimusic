import crypto from "node:crypto";

/* Server-only SeeAPI text-to-music plumbing (AI Music M1/M2/M3).
   Same generation contract as every SeeAPI model:
     POST {base}/v1/generations            → { generation: { id, status } }
     GET  {base}/v1/generations/{task_id}  → { generation: { status, stage, result.assets } }
   Key resolution mirrors lib/seeapiServer in buzzy-site. Never import
   this from a client component. */

export const SEEAPI_DEFAULT_BASE = "https://api.seeapi.com";

export type MusicModelId = "ai-music-m1" | "ai-music-m2" | "ai-music-m3";

export type MusicModelInfo = {
  id: MusicModelId;
  label: string;
  credits: number;
  blurb: string;
};

/* Cost per generation in Flow credits (24-35, by model): M1 24, M2 29,
   M3 35. One generation returns one full song. */
export const MUSIC_MODELS: MusicModelInfo[] = [
  {
    id: "ai-music-m1",
    label: "AI Music M1",
    credits: 24,
    blurb: "Fastest text-to-music route — vocal songs or instrumental tracks.",
  },
  {
    id: "ai-music-m2",
    label: "AI Music M2",
    credits: 29,
    blurb: "Balanced quality and speed for everyday songwriting.",
  },
  {
    id: "ai-music-m3",
    label: "AI Music M3",
    credits: 35,
    blurb: "Highest fidelity music generation — richer arrangement and vocals.",
  },
];

export function getMusicModel(id: string | null | undefined): MusicModelInfo | null {
  if (!id) return MUSIC_MODELS[0];
  return MUSIC_MODELS.find((m) => m.id === id) || null;
}

export function getSeeApiBase(): string {
  return (process.env.SEEAPI_API_BASE_URL || SEEAPI_DEFAULT_BASE).replace(/\/+$/, "");
}

export function getSeeApiKey(): string {
  return String(process.env.SEEAPI_API_KEY || process.env.SEEAPI_TOKEN || "").trim();
}

export function hasSeeApiKey(): boolean {
  return getSeeApiKey().length > 0;
}

export type MusicGenerationInput = {
  model: MusicModelInfo;
  prompt: string;
  style?: string;
  instrumental: boolean;
};

/* Normal mode (custom_mode=false): prompt describes the idea, style narrows
   the genre. Custom mode (title + lyrics) can ride the same builder later by
   passing custom: true with a title. */
export function buildMusicRequest({ model, prompt, style, instrumental }: MusicGenerationInput, extra?: {
  custom?: boolean;
  title?: string;
  lyrics?: string;
  vocalGender?: "m" | "f";
}): { model: string; endpoint: string; provider: string; input: Record<string, unknown> } {
  const text = String(prompt || "").trim().slice(0, 3000);
  const input: Record<string, unknown> = {
    custom_mode: extra?.custom === true,
    instrumental: instrumental === true,
    prompt: text,
  };
  if (extra?.custom === true) {
    if (extra.title) input.title = String(extra.title).slice(0, 80);
    if (extra.lyrics) input.lyrics = String(extra.lyrics).slice(0, 5000);
    /* Note: duration_seconds is never sent — SeeAPI only accepts it in
       custom mode and the models pick a sensible default length otherwise. */
    if (extra.vocalGender && !instrumental) input.vocal_gender = extra.vocalGender;
  }
  const tags = String(style || "").trim().slice(0, 1000);
  if (tags) input.style = tags;
  return { model: model.id, endpoint: "music-generation", provider: "seeapi", input };
}

/* -------------------------------------------------------------- errors --- */
export function normalizeUpstreamError(status: number, payload: unknown, text: string): {
  status: number;
  code: string;
  message: string;
} {
  const p = payload as Record<string, any> | null;
  const message =
    p?.error?.message ||
    p?.generation?.error?.message ||
    p?.message ||
    (typeof p?.error === "string" ? p.error : "") ||
    String(text || "").slice(0, 300) ||
    `SeeAPI returned HTTP ${status}.`;
  return {
    status: Number(status) || 502,
    code: p?.error?.code || "UPSTREAM",
    message,
  };
}

async function readJson(res: Response): Promise<{ text: string; json: any }> {
  const text = await res.text();
  let json: any = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* keep raw text */
  }
  return { text, json };
}

/* --------------------------------------------------------- generation --- */
export async function submitMusicGeneration(
  body: unknown,
  { idempotencyKey }: { idempotencyKey?: string } = {},
): Promise<{ res: Response; json: any; text: string }> {
  const key = getSeeApiKey();
  if (!key) throw new Error("SEEAPI_API_KEY is not configured.");
  const base = getSeeApiBase();
  const res = await fetch(`${base}/v1/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey || `flowaimusic-${crypto.randomUUID()}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const { text, json } = await readJson(res);
  return { res, json, text };
}

export async function fetchMusicGeneration(
  taskId: string,
): Promise<{ res: Response; json: any; text: string }> {
  const key = getSeeApiKey();
  if (!key) throw new Error("SEEAPI_API_KEY is not configured.");
  const base = getSeeApiBase();
  const res = await fetch(`${base}/v1/generations/${encodeURIComponent(taskId)}`, {
    headers: { Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  const { text, json } = await readJson(res);
  return { res, json, text };
}

/* ------------------------------------------------------------ parsing --- */
export function normalizeStatus(value: unknown): string {
  const v = String(value || "").toLowerCase();
  if (["succeeded", "success", "completed", "done"].includes(v)) return "succeeded";
  if (v === "canceled" || v === "cancelled") return "canceled";
  if (["failed", "error", "refunded", "expired"].includes(v)) return v === "error" ? "failed" : v;
  if (["processing", "running", "pending", "queued", "in_progress"].includes(v)) return "processing";
  return v || "unknown";
}

export type MusicTrack = {
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

export type MusicTask = {
  id: string | null;
  status: string;
  rawStatus: string;
  stage: string | null;
  tracks: MusicTrack[];
  audioUrl: string | null;
  error: string | null;
  estimatedCredits: number | null;
  consumedCredits: number | null;
};

const num = (v: unknown): number | null =>
  typeof v === "number" && Number.isFinite(v) ? v : null;

function parseTracks(g: Record<string, any>, succeeded: boolean): MusicTrack[] {
  const g2 = (g?.result as Record<string, any>) || g;
  const raw = Array.isArray(g2?.assets) ? g2.assets : Array.isArray(g?.assets) ? g.assets : [];
  return raw
    .map((a: Record<string, any>): MusicTrack => {
      const audioUrl = a.audio_url || null;
      const streamAudioUrl = a.stream_audio_url || null;
      return {
        id: a.id || a.asset_id || a.track_id || null,
        title: a.title || null,
        lyrics: a.prompt || null,
        tags: a.tags || null,
        duration: num(a.duration),
        audioUrl,
        streamAudioUrl,
        imageUrl: a.image_url || null,
        // audio_url is permanent only once succeeded; before that it is a
        // temporary preview per the SeeAPI docs.
        preview: !succeeded,
      };
    })
    .filter((t: MusicTrack) => t.audioUrl || t.streamAudioUrl);
}

export function parseMusicTask(payload: any): MusicTask {
  const g = payload?.generation || payload || {};
  const status = normalizeStatus(g.status);
  const succeeded = status === "succeeded";
  const tracks = parseTracks(g, succeeded);
  const withAudio = tracks.find((t) => t.audioUrl) || tracks[0] || null;
  let error: string | null = null;
  if (["failed", "canceled", "expired", "refunded"].includes(status)) {
    const e = g.error || payload?.error;
    error =
      (typeof e === "string" ? e : [e?.code, e?.message].filter(Boolean).join(": ")) ||
      `Task ${status}.`;
  }
  return {
    id: g.id || null,
    status,
    rawStatus: g.status || "unknown",
    stage: g.stage || null,
    tracks,
    audioUrl: succeeded ? withAudio?.audioUrl || null : null,
    error,
    estimatedCredits: num(g.estimated_credits),
    consumedCredits: num(g.consumed_credits),
  };
}
