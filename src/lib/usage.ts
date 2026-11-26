import { createClient, type Client } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";

/* Server-side usage ledger (credits / downloads / free take) stored in Turso.
   - TURSO_DATABASE_URL + TURSO_AUTH_TOKEN  -> Turso (production requirement)
   - local dev (no VERCEL env)              -> sandboxed file: SQLite
   - Vercel without Turso config            -> ledger missing: generation and
     download routes hard-fail with LEDGER_OFFLINE instead of silently
     letting usage go unaccounted. */

export type LedgerMode = "turso" | "local" | "missing";

export type UsageAccount = {
  email: string;
  plan: string;
  credits: number;
  downloads: number;
  period: string;
  freeUsed: boolean;
};

const LOCAL_DB_DIR = path.join(process.cwd(), ".data");
const LOCAL_DB_URL = `file:${path.join(LOCAL_DB_DIR, "usage-dev.db")}`;

export function ledgerMode(): LedgerMode {
  const url = String(process.env.TURSO_DATABASE_URL || "").trim();
  if (url) return "turso";
  if (process.env.VERCEL) return "missing";
  return "local";
}

let client: Client | null = null;
let clientTried = false;

export function getLedger(): Client | null {
  if (clientTried) return client;
  clientTried = true;
  const mode = ledgerMode();
  if (mode === "missing") return null;
  if (mode === "turso") {
    client = createClient({
      url: String(process.env.TURSO_DATABASE_URL),
      authToken: String(process.env.TURSO_AUTH_TOKEN || "").trim() || undefined,
    });
  } else {
    try {
      fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
      client = createClient({ url: LOCAL_DB_URL });
    } catch (err) {
      console.error("[usage] local ledger unavailable:", (err as Error).message);
      client = null;
    }
  }
  return client;
}

let schemaReady: Promise<void> | null = null;

function ensureSchema(db: Client): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await db.execute(`
        CREATE TABLE IF NOT EXISTS usage_accounts (
          email TEXT PRIMARY KEY,
          plan TEXT NOT NULL DEFAULT '',
          credits INTEGER NOT NULL DEFAULT 0,
          downloads INTEGER NOT NULL DEFAULT 1,
          period TEXT NOT NULL DEFAULT '',
          free_used INTEGER NOT NULL DEFAULT 0,
          updated_at INTEGER NOT NULL DEFAULT 0
        )`);
      await db.execute(`
        CREATE TABLE IF NOT EXISTS usage_events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          kind TEXT NOT NULL,
          amount INTEGER NOT NULL,
          meta TEXT NOT NULL DEFAULT '',
          created_at INTEGER NOT NULL
        )`);
      await db.execute(
        `CREATE INDEX IF NOT EXISTS usage_events_email_idx ON usage_events (email, created_at)`,
      );
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

async function db(): Promise<Client> {
  const c = getLedger();
  if (!c) throw new Error("Ledger is not configured.");
  await ensureSchema(c);
  return c;
}

export function monthKey(d = new Date()): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function toAccount(row: Record<string, unknown>): UsageAccount {
  return {
    email: String(row.email || ""),
    plan: String(row.plan || ""),
    credits: Number(row.credits || 0),
    downloads: Number(row.downloads || 0),
    period: String(row.period || ""),
    freeUsed: Number(row.free_used || 0) === 1,
  };
}

/* ------------------------------------------------------------ reads --- */
export async function getUsage(email: string): Promise<UsageAccount | null> {
  const c = await db();
  const res = await c.execute({
    sql: "SELECT email, plan, credits, downloads, period, free_used FROM usage_accounts WHERE email = ?",
    args: [email],
  });
  const row = res.rows[0];
  return row ? toAccount(row as unknown as Record<string, unknown>) : null;
}

/* ------------------------------------------------------------ grants --- */
/* Grant (or re-grant at renewal / new period) a plan allowance. Overwrites
   plan, credits and downloads with the plan values and stamps the period. */
export async function grantPlan(
  email: string,
  planId: string,
  creditsValue: number,
  downloadsValue: number,
): Promise<UsageAccount> {
  const c = await db();
  const now = Date.now();
  const period = monthKey();
  await c.execute({
    sql: `INSERT INTO usage_accounts (email, plan, credits, downloads, period, free_used, updated_at)
          VALUES (?, ?, ?, ?, ?, 0, ?)
          ON CONFLICT (email) DO UPDATE SET
            plan = excluded.plan,
            credits = excluded.credits,
            downloads = excluded.downloads,
            period = excluded.period,
            updated_at = excluded.updated_at`,
    args: [email, planId, creditsValue, downloadsValue, period, now],
  });
  await c.execute({
    sql: "INSERT INTO usage_events (email, kind, amount, meta, created_at) VALUES (?, 'grant', ?, ?, ?)",
    args: [email, creditsValue, `${planId} ${period}`, now],
  });
  return (await getUsage(email))!;
}

/* Roll the allowance forward when a paid account enters a new month, or when
   the session plan differs from the stored one (plan change). */
export async function refreshAllowance(
  email: string,
  planId: string,
  creditsValue: number,
  downloadsValue: number,
): Promise<UsageAccount> {
  const current = (await getUsage(email)) || (await grantPlan(email, planId, creditsValue, downloadsValue));
  if (current.period !== monthKey() || (planId && current.plan !== planId)) {
    return grantPlan(email, planId, creditsValue, downloadsValue);
  }
  return current;
}

/* --------------------------------------------------------- consumption --- */
export type ConsumeResult =
  | { ok: true; account: UsageAccount }
  | { ok: false; reason: "free_used" | "no_credits" | "no_downloads" };

/* Decrement credits after SeeAPI accepted the task. Atomic guard keeps the
   balance from going negative under concurrent requests. */
export async function consumeGeneration(
  email: string,
  { paid, cost, modelId }: { paid: boolean; cost: number; modelId: string },
): Promise<ConsumeResult> {
  const c = await db();
  const now = Date.now();
  await c.execute({
    sql: `INSERT INTO usage_accounts (email, plan, credits, downloads, period, free_used, updated_at)
          VALUES (?, '', 0, 1, '', 0, ?)
          ON CONFLICT (email) DO NOTHING`,
    args: [email, now],
  });
  if (paid) {
    const res = await c.execute({
      sql: "UPDATE usage_accounts SET credits = credits - ?, updated_at = ? WHERE email = ? AND credits >= ?",
      args: [cost, now, email, cost],
    });
    if (res.rowsAffected === 0) {
      return { ok: false, reason: "no_credits" };
    }
  } else {
    const res = await c.execute({
      sql: "UPDATE usage_accounts SET free_used = 1, updated_at = ? WHERE email = ? AND free_used = 0",
      args: [now, email],
    });
    if (res.rowsAffected === 0) {
      return { ok: false, reason: "free_used" };
    }
  }
  await c.execute({
    sql: "INSERT INTO usage_events (email, kind, amount, meta, created_at) VALUES (?, 'generate', ?, ?, ?)",
    args: [email, paid ? -cost : 0, modelId, now],
  });
  return { ok: true, account: (await getUsage(email))! };
}

export async function consumeDownload(email: string, { paid }: { paid: boolean }): Promise<ConsumeResult> {
  const c = await db();
  const now = Date.now();
  if (!paid) {
    /* Free accounts keep 1 download for their single free take. */
    const res = await c.execute({
      sql: "UPDATE usage_accounts SET downloads = downloads - 1, updated_at = ? WHERE email = ? AND downloads >= 1 AND free_used = 1",
      args: [now, email],
    });
    if (res.rowsAffected === 0) return { ok: false, reason: "no_downloads" };
  } else {
    const res = await c.execute({
      sql: "UPDATE usage_accounts SET downloads = downloads - 1, updated_at = ? WHERE email = ? AND downloads >= 1",
      args: [now, email],
    });
    if (res.rowsAffected === 0) return { ok: false, reason: "no_downloads" };
  }
  await c.execute({
    sql: "INSERT INTO usage_events (email, kind, amount, meta, created_at) VALUES (?, 'download', -1, '', ?)",
    args: [email, now],
  });
  return { ok: true, account: (await getUsage(email))! };
}
