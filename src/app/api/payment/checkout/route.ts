import { NextResponse } from "next/server";
import { getPlanById } from "@/lib/content";
import { sessionFromRequest, CHECKOUT_COOKIE_NAME, cookieString, createSignedToken } from "@/lib/auth/session";
import {
  getPancakeClient,
  hasPancakeKey,
  paymentsEnabled,
  planProductId,
} from "@/lib/pancakeServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { headers: { "Cache-Control": "no-store" } };
const CHECKOUT_TTL = 30 * 60;

export async function POST(request: Request) {
  const session = sessionFromRequest(request);
  if (!session) {
    return NextResponse.json(
      { error: "Sign in with Google first.", code: "NOT_SIGNED_IN" },
      { status: 401, ...NO_STORE },
    );
  }

  let body: { plan?: string; billing?: string } = {};
  try {
    body = await request.json();
  } catch {
    /* use defaults */
  }
  const plan = getPlanById(body?.plan);
  if (!plan || plan.monthly === 0) {
    return NextResponse.json({ error: "Choose a paid plan.", code: "BAD_PLAN" }, { status: 400, ...NO_STORE });
  }
  const billing = body?.billing === "yearly" ? "yearly" : "monthly";

  if (!paymentsEnabled()) {
    return NextResponse.json(
      { error: "Checkout is not open yet. Please try again soon.", code: "PAYMENTS_PAUSED" },
      { status: 503, ...NO_STORE },
    );
  }
  if (!hasPancakeKey()) {
    return NextResponse.json(
      { error: "Payments are not configured on this server.", code: "PAYMENTS_NOT_CONFIGURED" },
      { status: 503, ...NO_STORE },
    );
  }
  const productId = planProductId(plan.id, billing);
  if (!productId) {
    return NextResponse.json(
      { error: "This plan has no payment product yet.", code: "PRODUCT_NOT_MAPPED" },
      { status: 503, ...NO_STORE },
    );
  }

  const origin = new URL(request.url).origin;
  try {
    const result = await getPancakeClient().checkout.authenticated.create({
      productId,
      currency: "USD",
      buyerIdentity: session.sub,
      buyerEmail: session.email,
      successUrl: `${origin}/api/payment/success?plan=${plan.id}&billing=${billing}`,
      metadata: { plan: plan.id, billing, userId: session.sub },
      orderMerchantExternalId: `flowaimusic-${session.sub}-${plan.id}-${billing}`.slice(0, 128),
    });

    const res = NextResponse.json(
      { checkoutUrl: result.checkoutUrl, expiresAt: result.expiresAt || null },
      NO_STORE,
    );
    res.headers.append(
      "Set-Cookie",
      cookieString(
        CHECKOUT_COOKIE_NAME,
        createSignedToken({ plan: plan.id, email: session.email }, CHECKOUT_TTL),
        CHECKOUT_TTL,
      ),
    );
    return res;
  } catch (err) {
    console.error("[payment/checkout] Waffo error:", (err as Error).message);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again.", code: "CHECKOUT_FAILED" },
      { status: 502, ...NO_STORE },
    );
  }
}
