import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { buildGoogleAuthUrl, googleConfigured } from "@/lib/googleAuth";
import {
  GOOGLE_NEXT_COOKIE,
  GOOGLE_STATE_COOKIE,
  cookieString,
  safeNext,
} from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATE_TTL = 10 * 60;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = safeNext(url.searchParams.get("next"));

  if (!googleConfigured()) {
    return NextResponse.redirect(new URL("/pricing?error=auth_not_configured", url.origin));
  }

  const state = crypto.randomBytes(24).toString("hex");
  const res = NextResponse.redirect(buildGoogleAuthUrl(state));
  res.headers.append("Set-Cookie", cookieString(GOOGLE_STATE_COOKIE, state, STATE_TTL));
  res.headers.append(
    "Set-Cookie",
    cookieString(GOOGLE_NEXT_COOKIE, encodeURIComponent(next), STATE_TTL),
  );
  return res;
}
