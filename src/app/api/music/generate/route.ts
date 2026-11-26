import { NextResponse } from "next/server";
import {
  cookieFrom,
  cookieString,
  createSignedToken,
  readSignedToken,
  sessionFromRequest,
} from "@/lib/auth/session";
import {
  buildMusicRequest,
  getMusicModel,
  hasSeeApiKey,
  normalizeUpstreamError,
  parseMusicTask,
  submitMusicGeneration,
} from "@/lib/seeapiMusic";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { headers: { "Cache-Control": "no-store" } };
const FREE_USED_COOKIE = "flow_free_used";
const FREE_USED_TTL_S = 365 * 24 * 3600;

/* ----------------------------------------------------------- entitlements */
const PAID_PLANS = new Set(["creator", "pro", "studio"]);

function isPaid(plan: string | undefined): boolean {
  return PAID_PLANS.has(String(plan || "").toLowerCase());
}

type FreeUseMark = { email: string };

function freeUsedFor(request: Request, email: string): boolean {
  const mark = readSignedToken<FreeUseMark>(cookieFrom(request, FREE_USED_COOKIE));
  return Boolean(mark && mark.email === email);
}

/* ---------------------------------------------------------------- rate limit
   In-memory per-account limiter (per server instance) as a second guard
   behind the one-free-generation rule: 8 generations per rolling hour,
   24 per day, for paid subscribers too. */
const RATE_HITS = new Map<string, number[]>();
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX_HOURLY = 8;
const RATE_MAX_DAILY = 24;
const DAY_MS = 24 * RATE_WINDOW_MS;

function rateLimit(key: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const hits = (RATE_HITS.get(key) || []).filter((t) => now - t < DAY_MS);
  const hourly = hits.filter((t) => now - t < RATE_WINDOW_MS);
  if (hourly.length >= RATE_MAX_HOURLY || hits.length >= RATE_MAX_DAILY) {
    const oldest = hits[0] || hourly[0];
    RATE_HITS.set(key, hits);
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((oldest + DAY_MS - now) / 1000)) };
  }
  hits.push(now);
  RATE_HITS.set(key, hits);
  if (RATE_HITS.size > 5000) {
    for (const [k, v] of RATE_HITS) {
      if (v.every((t) => now - t >= DAY_MS)) RATE_HITS.delete(k);
    }
  }
  return { ok: true, retryAfterSec: 0 };
}

/* Submit a text-to-music generation to SeeAPI.
   Access rules:
   - Google sign-in is required for every generation.
   - Paid plans (session.plan) generate freely within rate limits.
   - Everyone else gets exactly one free take (up to 30 s); the next click
     is answered with a subscribe prompt. The free-take marker is an
     HMAC-signed, HTTP-only cookie bound to the account email. */
export async function POST(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { error: "Sign in with Google to generate AI music.", code: "NOT_SIGNED_IN" },
      { status: 401, ...NO_STORE },
    );
  }

  const paid = isPaid(session.plan);
  if (!paid && freeUsedFor(request, session.email)) {
    return NextResponse.json(
      {
        error: "Your free generation has been used. Subscribe to a plan to keep creating.",
        code: "FREE_USED",
        subscribe: true,
      },
      { status: 402, ...NO_STORE },
    );
  }

  const limit = rateLimit(`u:${session.email}`);
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: `Generation limit reached — try again in about ${Math.ceil(limit.retryAfterSec / 60)} minutes.`,
        code: "RATE_LIMITED",
      },
      { status: 429, ...NO_STORE },
    );
  }

  let body: {
    prompt?: string;
    style?: string;
    model?: string;
    instrumental?: boolean;
  } = {};
  try {
    body = await request.json();
  } catch {
    /* handled below */
  }
  const prompt = String(body?.prompt || "").trim();
  if (!prompt) {
    return NextResponse.json(
      { error: "Describe the song you want first.", code: "EMPTY_PROMPT" },
      { status: 400, ...NO_STORE },
    );
  }
  if (prompt.length > 3000) {
    return NextResponse.json(
      { error: "Prompt is limited to 3,000 characters.", code: "PROMPT_TOO_LONG" },
      { status: 400, ...NO_STORE },
    );
  }

  if (!hasSeeApiKey()) {
    return NextResponse.json(
      { error: "AI music generation is not open yet. Please try again soon.", code: "NO_API_KEY" },
      { status: 503, ...NO_STORE },
    );
  }

  const model = getMusicModel(body?.model);
  if (!model) {
    return NextResponse.json(
      { error: "Unknown music model.", code: "BAD_MODEL" },
      { status: 400, ...NO_STORE },
    );
  }

  const payload = buildMusicRequest({
    model,
    prompt,
    style: String(body?.style || ""),
    instrumental: body?.instrumental === true,
  });

  try {
    const { res, json, text } = await submitMusicGeneration(payload);
    if (!res.ok) {
      const upstream = normalizeUpstreamError(res.status, json, text);
      return NextResponse.json(
        { error: upstream.message, code: upstream.code },
        { status: 502, ...NO_STORE },
      );
    }
    const task = parseMusicTask(json);
    if (!task.id) {
      return NextResponse.json(
        { error: "SeeAPI accepted the request but returned no generation id.", code: "NO_TASK_ID" },
        { status: 502, ...NO_STORE },
      );
    }
    const headers: HeadersInit = { ...NO_STORE.headers };
    const responseInit = { status: 202, headers };
    const response = NextResponse.json(
      {
        id: task.id,
        status: task.status,
        stage: task.stage,
        model: model.id,
        modelLabel: model.label,
        statusUrl: `/api/music/status?id=${encodeURIComponent(task.id)}`,
      },
      responseInit,
    );
    /* Mark the free take as consumed for non-paid accounts once SeeAPI has
       accepted the task (a failed task does not burn the free take). */
    if (!paid) {
      response.headers.append(
        "Set-Cookie",
        cookieString(
          FREE_USED_COOKIE,
          createSignedToken({ email: session.email } satisfies FreeUseMark, FREE_USED_TTL_S),
          FREE_USED_TTL_S,
        ),
      );
    }
    return response;
  } catch (e) {
    return NextResponse.json(
      { error: `Could not reach SeeAPI: ${e instanceof Error ? e.message : "unknown error"}`, code: "NETWORK" },
      { status: 502, ...NO_STORE },
    );
  }
}
