import { createClient } from "@libsql/client";
const db = createClient({
  url: "libsql://database-citron-candle-vercel-icfg-upxbzrwk0cvboaug5hfv4my1.aws-us-east-1.turso.io",
  authToken: process.env.TURSO_AUTH_TOKEN,
});
await db.execute(`CREATE TABLE IF NOT EXISTS usage_accounts (
  email TEXT PRIMARY KEY, plan TEXT NOT NULL DEFAULT '', credits INTEGER NOT NULL DEFAULT 0,
  downloads INTEGER NOT NULL DEFAULT 1, period TEXT NOT NULL DEFAULT '',
  free_used INTEGER NOT NULL DEFAULT 0, updated_at INTEGER NOT NULL DEFAULT 0)`);
await db.execute(`CREATE TABLE IF NOT EXISTS usage_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, kind TEXT NOT NULL,
  amount INTEGER NOT NULL, meta TEXT NOT NULL DEFAULT '', created_at INTEGER NOT NULL)`);
await db.execute(`CREATE INDEX IF NOT EXISTS usage_events_email_idx ON usage_events (email, created_at)`);
const r = await db.execute({ sql: `INSERT INTO usage_accounts (email, plan, credits, downloads, period, updated_at)
  VALUES ('verify@flowaimusic.test','creator',1600,60,'2026-11',?) ON CONFLICT(email) DO UPDATE SET credits=1600, downloads=60`, args: [Date.now()] });
await db.execute({ sql: "UPDATE usage_accounts SET credits = credits - 16 WHERE email = ? AND credits >= 16", args: ["verify@flowaimusic.test"] });
const read = await db.execute({ sql: "SELECT plan, credits, downloads FROM usage_accounts WHERE email = ?", args: ["verify@flowaimusic.test"] });
console.log("readback:", JSON.stringify(read.rows[0]));
await db.execute({ sql: "DELETE FROM usage_accounts WHERE email = ?", args: ["verify@flowaimusic.test"] });
await db.execute({ sql: "DELETE FROM usage_events WHERE email = ?", args: ["verify@flowaimusic.test"] });
console.log("verify OK, cleaned");
