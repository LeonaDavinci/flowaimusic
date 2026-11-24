import { NextResponse } from "next/server";
import { exchangeGoogleCode, fetchGoogleProfile } from "@/lib/googleAuth";
import {
  COOKIE_NAME,
  GOOGLE_NEXT_COOKIE,
  GOOGLE_STATE_COOKIE,
  SESSION_TTL_S,
  clearCookieString,
  cookieFrom,
  cookieString,
  createSessionToken,
  readSessionToken,
  safeNext,
} from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (origin: string, code: string) =>
  NextResponse.redirect(new URL(`/pricing?error=${code}`, origin));

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = String(url.searchParams.get("code") || "");
  const state = String(url.searchParams.get("state") || "");
  const expected = cookieFrom(request, GOOGLE_STATE_COOKIE);

  if (url.searchParams.get("error") || !code) return fail(url.origin, "google_denied");
  if (!state || !expected || state !== expected) return fail(url.origin, "auth_state_invalid");

  let profile;
  try {
    const tokens = await exchangeGoogleCode(code);
    profile = await fetchGoogleProfile(tokens.access_token);
  } catch (err) {
    console.error("[auth/google] exchange failed:", (err as Error).message);
    return fail(url.origin, "google_exchange_failed");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) return fail(url.origin, "auth_email_invalid");
  if (!profile.emailVerified) return fail(url.origin, "auth_email_unverified");

  const previous = readSessionToken(cookieFrom(request, COOKIE_NAME));
  const sameUser = previous?.email === profile.email;
  const user = {
    sub: profile.sub,
    email: profile.email,
    name: profile.name || profile.email.split("@")[0],
    picture: profile.picture,
    plan: sameUser ? previous.plan : "free",
    credits: sameUser ? previous.credits : 0,
  };

  let next = "/pricing";
  try {
    next = safeNext(decodeURIComponent(cookieFrom(request, GOOGLE_NEXT_COOKIE)), "/pricing");
  } catch {
    /* keep default */
  }

  const res = NextResponse.redirect(new URL(next, url.origin));
  res.headers.append("Set-Cookie", cookieString(COOKIE_NAME, createSessionToken(user), SESSION_TTL_S));
  res.headers.append("Set-Cookie", clearCookieString(GOOGLE_STATE_COOKIE));
  res.headers.append("Set-Cookie", clearCookieString(GOOGLE_NEXT_COOKIE));
  return res;
}
