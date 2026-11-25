/* One-off helper: sync env vars from .env.local to a Vercel project's
   preview + development environments via the Vercel REST API.

   Usage: node scripts/sync-vercel-env.mjs <project-id>
   Requires VERCEL_TOKEN in the environment (reads .env.local if present).
   Idempotent: existing keys are PATCHed, missing keys are created.
   Secrets never appear in the script itself — values are read from
   .env.local at runtime. */

import fs from "node:fs";

const project = process.argv[2];
if (!project) {
  console.error("Usage: node scripts/sync-vercel-env.mjs <project-id>");
  process.exit(1);
}

const env = {};
for (const line of fs.readFileSync(".env.local", "utf8").split("\n")) {
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

const SKIP = new Set(["VERCEL_TOKEN"]);
const TARGETS = ["preview", "development"];
const H = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
const base = `https://api.vercel.com/v10/projects/${project}/env`;

const list = await (await fetch(base, { headers: H })).json();
const existing = new Map(
  (list.envs || [])
    .filter((e) => e.target?.includes("preview") || e.target?.includes("development"))
    .map((e) => [e.key, e.id]),
);

for (const [key, value] of Object.entries(env)) {
  if (SKIP.has(key)) {
    console.log(`${key}: skipped`);
    continue;
  }
  const body = JSON.stringify({
    value,
    type: "encrypted",
    target: TARGETS,
    comment: "synced from local .env.local",
  });
  const id = existing.get(key);
  const res = await fetch(id ? `${base}/${id}?upsert=true` : base, {
    method: id ? "PATCH" : "POST",
    headers: H,
    body: id ? body : JSON.stringify({ key, ...JSON.parse(body) }),
  });
  const json = await res.json().catch(() => null);
  console.log(
    `${key}: ${res.ok ? (id ? "patched" : "created") : `error ${res.status} ${JSON.stringify(json?.error || json || {}).slice(0, 160)}`}`,
  );
}
