import { NextResponse } from "next/server";
import { getPlanById } from "@/lib/content";
import { grantPlan, ledgerMode } from "@/lib/usage";
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

  /* Mirror the entitlement into the usage ledger (credits + downloads for
     the current billing month). A ledger failure still lets the user through
     (session cookie grants plan access) but is surfaced to the payment page. */
  let ledgerWarn = "";
  if (ledgerMode() === "missing") {
    console.error("[payment/success] usage ledger is not configured (TURSO_* missing).");
    ledgerWarn = "&warn=ledger";
  } else {
    try {
      await grantPlan(session.email, plan.id, plan.creditsValue, plan.downloadsValue);
    } catch (err) {
      console.error("[payment/success] grantPlan failed:", err);
      ledgerWarn = "&warn=ledger";
    }
  }

  const res = NextResponse.redirect(
    new URL(`/payment?plan=${plan.id}&paid=1${ledgerWarn}`, url.origin),
  );
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
