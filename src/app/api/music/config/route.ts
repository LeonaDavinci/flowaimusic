import { NextResponse } from "next/server";
import { MUSIC_MODELS, hasSeeApiKey } from "@/lib/seeapiMusic";
import { sessionFromRequest } from "@/lib/auth/session";
import { getUsage, ledgerMode } from "@/lib/usage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { headers: { "Cache-Control": "no-store" } };

/* Capability probe for the studio: which AI music models are enabled and
   whether the visitor can use them (SeeAPI generation requires sign-in).
   Signed-in users also get their live ledger balances. */
export async function GET(request: Request) {
  const session = sessionFromRequest(request);
  let usage: {
    plan: string;
    creditsRemaining: number | null;
    downloadsRemaining: number | null;
    freeUsed: boolean;
  } | null = null;
  if (session && ledgerMode() !== "missing") {
    try {
      const account = await getUsage(session.email);
      if (account) {
        usage = {
          plan: account.plan,
          creditsRemaining: account.plan ? account.credits : null,
          downloadsRemaining: account.downloads,
          freeUsed: account.freeUsed,
        };
      }
    } catch (err) {
      console.error("[music/config] ledger read failed:", err);
    }
  }
  return NextResponse.json(
    {
      seeapiReady: hasSeeApiKey(),
      signedIn: Boolean(session),
      models: MUSIC_MODELS,
      defaultModel: MUSIC_MODELS[0]?.id || null,
      usage,
    },
    NO_STORE,
  );
}
