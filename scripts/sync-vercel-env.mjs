/* One-off helper: sync env vars from .env.local to a Vercel project's
   preview + development environments via the Vercel REST API.

   Usage: node scripts/sync-vercel-env.mjs <project-id> [env1=value ...]
   Requires VERCEL_TOKEN in the environment (reads .env.local if present).
   Skips vars already configured unless listed in --force. Secrets never
   appear in the script itself — values are read from .env.local at runtime. */

import io from "node:fs";

const project = process.argv[2];
if (!project) {
  console.error("Usage: node scripts/sync-vercel-env.mjs <project-id>");
  process.exit(1);
}

/* Load .env.local from the repo root (same directory as this script's ../). */
const env = {};
for (const line of io.readFileSync(".env.local", "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
  const eq = trimmed.indexOf("=");
  const key = trimmed.slice(0, eq).trim();
  const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
  if (value) env[key] = value;
}

const token = env.VERCEL_TOKEN;
if (!token) {
  console.error("VERCEL_TOKEN missing.");
  process.exit(1);
}

/* Already configured separately; skip to avoid duplicates. */
const SKIP = new Set(["VERCEL_TOKEN", "SEEAPI_API_KEY"]);

const results = [];
for (const [key, value] of Object.entries(env)) {
  if (SKIP.has(key)) {
    results.push(`${key}: skipped (already configured)`);
    continue;
  }
  const res = await fetch(
    `https://api.vercel.com/v10/projects/${project}/env`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        value,
        type: "encrypted",
        target: ["preview", "development"],
        comment: "test env sync from local .env.local 2026-11-25",
      }),
    },
  );
  const json = await res.json().catch(() => null);
  results.push(
    `${key}: ${json?.created ? "created" : `error ${res.status} ${JSON.stringify(json?.error || {}).slice(0, 160)}`}`,
  );
}
for (const line of results) console.log(line);
