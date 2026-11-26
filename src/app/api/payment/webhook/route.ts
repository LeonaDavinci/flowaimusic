import { NextResponse } from "next/server";
import { getPancakeClient } from "@/lib/pancakeServer";
import { getPlanById } from "@/lib/content";
import { grantPlan, ledgerMode } from "@/lib/usage";

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
   Grant/renewal events are written straight into the usage ledger
   (usage_accounts), so entitlements survive cookie loss. The browser-facing
   /api/payment/success route mirrors the grant into the session cookie. */
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
  const data = (event.data || {}) as Record<string, any>;
  const email = String(data.buyerEmail || "").trim().toLowerCase();
  console.log(
    `[payment/webhook] ${event.id} ${type} ${GRANT.has(type) ? "grant" : REVOKE.has(type) ? "revoke" : "ack"} ${email}`,
  );

  if (GRANT.has(type) && email) {
    const candidate =
      data.plan || data.planId || data.plan_id || data.metadata?.plan || data.metadata?.planId || "";
    const plan = getPlanById(String(candidate));
    if (plan) {
      if (ledgerMode() === "missing") {
        console.error("[payment/webhook] usage ledger is not configured (TURSO_* missing).");
      } else {
        try {
          await grantPlan(email, plan.id, plan.creditsValue, plan.downloadsValue);
        } catch (err) {
          console.error("[payment/webhook] grantPlan failed:", err);
        }
      }
    } else {
      console.log(`[payment/webhook] no matching local plan for "${candidate}" — ledger untouched.`);
    }
  }

  return NextResponse.json({ ok: true }, NO_STORE);
}
