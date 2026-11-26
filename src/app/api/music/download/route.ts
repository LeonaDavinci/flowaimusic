import { NextResponse } from "next/server";
import { sessionFromRequest } from "@/lib/auth/session";
import { fetchMusicGeneration, parseMusicTask } from "@/lib/seeapiMusic";
import { consumeDownload, ledgerMode, refreshAllowance } from "@/lib/usage";
import { getPlanById } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { headers: { "Cache-Control": "no-store" } };

const PAID_PLANS = new Set(["creator", "pro", "studio"]);

function isPaid(plan: string | undefined): boolean {
  return PAID_PLANS.has(String(plan || "").toLowerCase());
}

function safeFileName(raw: string | null): string {
  const base = String(raw || "flow-ai-music-take")
    .replace(/[^\w.\- ]+/g, "")
    .trim()
    .slice(0, 80);
  return base.endsWith(".mp3") || base.endsWith(".wav") ? base : `${base || "flow-ai-music-take"}.mp3`;
}

/* Proxy a generated track through the server and count it against the
   account's monthly download allowance. The requested URL must be one of the
   asset URLs SeeAPI returned for that task id (verified by re-querying the
   generation), so the route cannot be abused as an open proxy. */
export async function GET(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { error: "Sign in with Google to download.", code: "NOT_SIGNED_IN" },
      { status: 401, ...NO_STORE },
    );
  }
  if (ledgerMode() === "missing") {
    return NextResponse.json(
      { error: "Usage accounting is temporarily unavailable. Please try again soon.", code: "LEDGER_OFFLINE" },
      { status: 503, ...NO_STORE },
    );
  }

  const url = new URL(request.url);
  const taskId = String(url.searchParams.get("task") || "").trim();
  const src = String(url.searchParams.get("src") || "").trim();
  const fileName = safeFileName(url.searchParams.get("name"));
  if (!taskId || !/^https:\/\//i.test(src)) {
    return NextResponse.json({ error: "Invalid download request.", code: "BAD_REQUEST" }, { status: 400, ...NO_STORE });
  }

  let assetUrl: string | null = null;
  try {
    const { res, json } = await fetchMusicGeneration(taskId);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Could not verify this track with the music provider.", code: "UPSTREAM" },
        { status: 502, ...NO_STORE },
      );
    }
    const task = parseMusicTask(json);
    const match = task.tracks.find((t) => t.audioUrl === src || t.streamAudioUrl === src);
    assetUrl = match?.audioUrl || match?.streamAudioUrl || null;
    if (!assetUrl) {
      return NextResponse.json(
        { error: "This audio does not belong to the referenced generation.", code: "BAD_SOURCE" },
        { status: 403, ...NO_STORE },
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: `Could not reach SeeAPI: ${e instanceof Error ? e.message : "unknown error"}`, code: "NETWORK" },
      { status: 502, ...NO_STORE },
    );
  }

  const paid = isPaid(session.plan);
  const plan = paid ? getPlanById(session.plan) : null;
  if (paid && plan) {
    await refreshAllowance(session.email, plan.id, plan.creditsValue, plan.downloadsValue);
  }
  const consumed = await consumeDownload(session.email, { paid });
  if (!consumed.ok) {
    return NextResponse.json(
      {
        error: "You are out of downloads for this month. Subscribe to a plan or wait for your next billing cycle.",
        code: "DOWNLOADS_EXHAUSTED",
        subscribe: true,
      },
      { status: 402, ...NO_STORE },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(assetUrl, { cache: "no-store" });
  } catch (e) {
    return NextResponse.json(
      { error: `Could not fetch the audio file: ${e instanceof Error ? e.message : "unknown error"}`, code: "NETWORK" },
      { status: 502, ...NO_STORE },
    );
  }
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: "The audio file is no longer available at the provider.", code: "UPSTREAM" },
      { status: 502, ...NO_STORE },
    );
  }

  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": upstream.headers.get("content-type") || "audio/mpeg",
    "Content-Disposition": `attachment; filename="${fileName}"`,
  });
  const length = upstream.headers.get("content-length");
  if (length) headers.set("Content-Length", length);
  return new Response(upstream.body, { status: 200, headers });
}
