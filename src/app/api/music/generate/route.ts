import { NextResponse } from "next/server";
import { sessionFromRequest } from "@/lib/auth/session";
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

/* Submit a text-to-music generation to SeeAPI.
   Gated behind Google sign-in: every generation consumes real credits. */
export async function POST(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { error: "Sign in with Google to generate AI music.", code: "NOT_SIGNED_IN" },
      { status: 401, ...NO_STORE },
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
    return NextResponse.json(
      {
        id: task.id,
        status: task.status,
        stage: task.stage,
        model: model.id,
        modelLabel: model.label,
        statusUrl: `/api/music/status?id=${encodeURIComponent(task.id)}`,
      },
      { status: 202, ...NO_STORE },
    );
  } catch (e) {
    return NextResponse.json(
      { error: `Could not reach SeeAPI: ${e instanceof Error ? e.message : "unknown error"}`, code: "NETWORK" },
      { status: 502, ...NO_STORE },
    );
  }
}
