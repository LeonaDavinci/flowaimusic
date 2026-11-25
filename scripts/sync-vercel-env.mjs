/* Sync env vars from .env.local to a Vercel project via the Vercel REST API.

   Usage:
     node scripts/sync-vercel-env.mjs <project-id>            # preview + development
     node scripts/sync-vercel-env.mjs <project-id> production # production only

   Production mode syncs everything except VERCEL_TOKEN, the Waffo test
   credentials/product IDs and PANCAKE_USE_TEST, so the live site keeps
   serving real products gated behind PAYMENTS_ENABLED. Production mode
   does NOT create PAYMENTS_ENABLED — that stays a manual decision.

   Idempotent: existing keys are PATCHed, missing keys are created.
   Secrets never appear in the script itself — values come from .env.local. */

import fs from "node:fs";

const project = process.argv[2];
const mode = process.argv[3] === "production" ? "production" : "test";
if (!project) {
  console.error("Usage: node scripts/sync-vercel-env.mjs <project-id> [production]");
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

const TARGETS = mode === "production" ? ["production"] : ["preview", "development"];
const SKIP = new Set(
  mode === "production"
    ? [
        "VERCEL_TOKEN",
        "PANCAKE_USE_TEST",
        "WAFFO_TEST_MERCHANT_ID",
        "WAFFO_TEST_PRIVATE_KEY",
        "PANCAKE_PRODUCT_CREATOR_MONTHLY_TEST",
        "PANCAKE_PRODUCT_PRO_MONTHLY_TEST",
        "PANCAKE_PRODUCT_STUDIO_MONTHLY_TEST",
      ]
    : ["VERCEL_TOKEN"],
);
const H = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
const base = `https://api.vercel.com/v10/projects/${project}/env`;

const list = await (await fetch(base, { headers: H })).json();
const existing = new Map(
  (list.envs || [])
    .filter((e) => TARGETS.some((t) => e.target?.includes(t)))
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
    comment: `synced from local .env.local (${mode})`,
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
