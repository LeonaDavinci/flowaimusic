/**
 * One-off: generate the remaining six Spotlight case tracks with SeeAPI so the case
 * pages have real, listenable audio. Writes scripts/cases-output-2.json with
 * { slug, taskId, model, audioUrl, duration, title } per track.
 *
 * Run: node scripts/generate-cases.mjs
 * (User explicitly authorised these calls on 2026-11-27.)
 */
import fs from "node:fs";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, "$1");
const envPath = path.join(root, "..", ".env.local");
const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    }),
);

const KEY = env.SEEAPI_API_KEY || env.SEEAPI_TOKEN;
const BASE = (env.SEEAPI_API_BASE_URL || "https://api.seeapi.com").replace(/\/+$/, "");
if (!KEY) throw new Error("SEEAPI_API_KEY missing in .env.local");

const CASES = [
  {
    slug: "backseat-chorus",
    style: "Pop",
    prompt: "Group-vocal hook, jangly guitars, summer drive, singalong ending",
    instrumental: false,
  },
  {
    slug: "signal-fires",
    style: "Electronic",
    prompt: "Glitchy breakbeat, chopped vocal textures, bright supersaw drop",
    instrumental: false,
  },
  {
    slug: "slow-motion-apology",
    style: "R&B",
    prompt: "Intimate alt-R&B, close-mic female vocal, sub bass, sparse clicks",
    instrumental: false,
  },
  {
    slug: "cardboard-kingdom",
    style: "Hip-Hop",
    prompt: "Playful boom-bap, toy piano sample, confident laid-back verses",
    instrumental: false,
  },
  {
    slug: "atlas-unfolding",
    style: "Cinematic",
    prompt: "Orchestral build with taiko hits and a resolving piano motif",
    instrumental: true,
  },
  {
    slug: "two-left-feet",
    style: "Hip-Hop",
    prompt: "Bouncy dancehall-flavoured hip-hop, hand percussion, cheeky hook",
    instrumental: false,
  },
];

const MODEL = "ai-music-m2";
const POLL_MS = 12000;
const TIMEOUT_MS = 9 * 60 * 1000;

async function submit(item) {
  const res = await fetch(`${BASE}/v1/generations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `flow-case-${item.slug}-${Date.now()}`,
    },
    body: JSON.stringify({
      model: MODEL,
      endpoint: "music-generation",
      provider: "seeapi",
      input: {
        custom_mode: false,
        instrumental: item.instrumental,
        prompt: item.prompt,
        style: item.style,
      },
    }),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* keep text */
  }
  if (!res.ok) {
    throw new Error(`submit ${item.slug}: HTTP ${res.status} ${text.slice(0, 200)}`);
  }
  const id = json?.generation?.id || json?.id;
  if (!id) throw new Error(`submit ${item.slug}: no task id ${text.slice(0, 200)}`);
  return id;
}

async function poll(taskId) {
  const started = Date.now();
  while (Date.now() - started < TIMEOUT_MS) {
    await new Promise((r) => setTimeout(r, POLL_MS));
    const res = await fetch(`${BASE}/v1/generations/${encodeURIComponent(taskId)}`, {
      headers: { Authorization: `Bearer ${KEY}` },
    });
    if (!res.ok) continue;
    const json = await res.json();
    const g = json?.generation || json || {};
    const status = String(g.status || "").toLowerCase();
    if (["succeeded", "success", "completed", "done"].includes(status)) {
      const assets = (g.result?.assets || g.assets || []).filter((a) => a?.audio_url);
      const asset = assets[0];
      if (!asset) throw new Error(`task ${taskId}: succeeded without audio_url`);
      return { audioUrl: asset.audio_url, duration: Number(asset.duration || 0) || null, title: asset.title || null };
    }
    if (["failed", "error", "canceled", "cancelled", "expired", "refunded"].includes(status)) {
      throw new Error(`task ${taskId}: ${status} ${JSON.stringify(g.error || {}).slice(0, 200)}`);
    }
  }
  throw new Error(`task ${taskId}: timed out`);
}

const results = [];
for (const item of CASES) {
  try {
    const taskId = await submit(item);
    console.log(`[case] ${item.slug} submitted ${taskId}`);
    const out = await poll(taskId);
    results.push({ ...item, taskId, model: MODEL, ...out });
    console.log(`[case] ${item.slug} ok ${out.audioUrl} (${out.duration ?? "?"}s)`);
  } catch (err) {
    console.error(`[case] ${item.slug} FAILED: ${err.message}`);
    results.push({ ...item, error: err.message });
  }
  fs.writeFileSync(path.join(root, "cases-output-2.json"), JSON.stringify(results, null, 2));
}
console.log("done", results.filter((r) => r.audioUrl).length, "of", CASES.length);
