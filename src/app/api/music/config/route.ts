import { NextResponse } from "next/server";
import { MUSIC_MODELS, hasSeeApiKey } from "@/lib/seeapiMusic";
import { sessionFromRequest } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { headers: { "Cache-Control": "no-store" } };

/* Capability probe for the studio: which AI music models are enabled and
   whether the visitor can use them (SeeAPI generation requires sign-in). */
export async function GET(request: Request) {
  const session = sessionFromRequest(request);
  return NextResponse.json(
    {
      seeapiReady: hasSeeApiKey(),
      signedIn: Boolean(session),
      models: MUSIC_MODELS,
      defaultModel: MUSIC_MODELS[0]?.id || null,
    },
    NO_STORE,
  );
}
