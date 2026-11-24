import { NextResponse } from "next/server";
import { getPlanById } from "@/lib/content";
import {
  CHECKOUT_COOKIE_NAME,
  COOKIE_NAME,
  SESSION_TTL_S,
  clearCookieString,
  cookieFrom,
  cookieString,
  createSessionToken,
  readSignedToken,
  sessionFromRequest,
} from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Pending = { plan: string; email: string };

export async function GET(request: Request) {
  const url = new URL(request.url);
  const requested = url.searchParams.get("plan") || "creator";
  const session = sessionFromRequest(request);
  if (!session) {
    return NextResponse.redirect(new URL(`/payment?plan=${requested}&error=not_signed_in`, url.origin));
  }

  const pending = readSignedToken<Pending>(cookieFrom(request, CHECKOUT_COOKIE_NAME));
  const plan = pending ? getPlanById(pending.plan) : null;
  if (!pending || !plan || pending.email !== session.email) {
    return NextResponse.redirect(new URL(`/payment?plan=${requested}&error=invalid_checkout`, url.origin));
  }

  const res = NextResponse.redirect(new URL(`/payment?plan=${plan.id}&paid=1`, url.origin));
  res.headers.append(
    "Set-Cookie",
    cookieString(
      COOKIE_NAME,
      createSessionToken({ ...session, plan: plan.id, credits: plan.creditsValue }),
      SESSION_TTL_S,
    ),
  );
  res.headers.append("Set-Cookie", clearCookieString(CHECKOUT_COOKIE_NAME));
  return res;
}
