import { NextResponse } from "next/server";
import { getPancakeClient } from "@/lib/pancakeServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = { headers: { "Cache-Control": "no-store" } };

const GRANT = new Set([
  "subscription.activated",
  "subscription.payment_succeeded",
  "subscription.renewed",
  "subscription.recovered",
  "subscription.plan_changed",
  "subscription.uncanceled",
]);
const REVOKE = new Set(["subscription.canceled", "subscription.past_due"]);

/* Raw body + X-Waffo-Signature, verified with the SDK's RSA check.
   Entitlements are mirrored into a signed cookie by /api/payment/success;
   a persistent user store is required before this webhook can grant plans
   server-side (no database is wired into this site yet). */
export async function POST(request: Request) {
  const raw = await request.text();
  const signature = request.headers.get("x-waffo-signature");
  let event;
  try {
    event = getPancakeClient().webhooks.verify(raw, signature);
  } catch (err) {
    console.error("[payment/webhook] signature invalid:", (err as Error).message);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400, ...NO_STORE });
  }

  const type = String(event.eventType || "");
  const data = event.data || {};
  console.log(
    `[payment/webhook] ${event.id} ${type} ${GRANT.has(type) ? "grant" : REVOKE.has(type) ? "revoke" : "ack"} ${data.buyerEmail || ""}`,
  );
  return NextResponse.json({ ok: true }, NO_STORE);
}
