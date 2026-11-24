import { NextResponse } from "next/server";
import { sessionFromRequest } from "@/lib/auth/session";
import {
  fetchMusicGeneration,
  hasSeeApiKey,
  normalizeUpstreamError,
  parseMusicTask,
} from "@/lib/seeapiMusic";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { headers: { "Cache-Control": "no-store" } };

/* Poll a SeeAPI music task. Results are permanent asset URLs (mp3 + cover)
   once status=succeeded; before that any audio URL is a temporary preview. */
export async function GET(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { error: "Sign in with Google to poll AI music tasks.", code: "NOT_SIGNED_IN" },
      { status: 401, ...NO_STORE },
    );
  }

  const id = new URL(request.url).searchParams.get("id")?.trim();
  if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) {
    return NextResponse.json(
      { error: "A valid task id is required.", code: "BAD_ID" },
      { status: 400, ...NO_STORE },
    );
  }
  if (!hasSeeApiKey()) {
    return NextResponse.json(
      { error: "No SeeAPI key configured.", code: "NO_API_KEY" },
      { status: 503, ...NO_STORE },
    );
  }

  try {
    const { res, json, text } = await fetchMusicGeneration(id);
    if (!res.ok) {
      const upstream = normalizeUpstreamError(res.status, json, text);
      return NextResponse.json(
        { error: upstream.message, code: upstream.code },
        { status: upstream.status === 404 ? 404 : 502, ...NO_STORE },
      );
    }
    const task = parseMusicTask(json);
    return NextResponse.json(task, NO_STORE);
  } catch (e) {
    return NextResponse.json(
      { error: `Could not reach SeeAPI: ${e instanceof Error ? e.message : "unknown error"}`, code: "NETWORK" },
      { status: 502, ...NO_STORE },
    );
  }
}
