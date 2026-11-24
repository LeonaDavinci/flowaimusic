/* One-off helper: create the three monthly subscription products in the
   Waffo Pancake store, then copy the printed IDs into .env.local / Vercel.

   THIS SCRIPT CALLS THE REAL WAFFO API. Run it only when you intend to
   create products. Requires WAFFO_MERCHANT_ID, WAFFO_PRIVATE_KEY and
   PANCAKE_STORE_ID in the environment. */

import { WaffoPancake, BillingPeriod } from "@waffo/pancake-ts";

const merchantId = String(process.env.WAFFO_MERCHANT_ID || "").trim();
const storeId = String(process.env.PANCAKE_STORE_ID || "").trim();
let privateKey = String(process.env.WAFFO_PRIVATE_KEY || "").trim();
privateKey = privateKey.replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");

if (!merchantId || !storeId || !privateKey) {
  console.error("Missing WAFFO_MERCHANT_ID / WAFFO_PRIVATE_KEY / PANCAKE_STORE_ID.");
  process.exit(1);
}

const client = new WaffoPancake({ merchantId, privateKey });
const plans = [
  { id: "creator", name: "Flow AI Music — Creator ($9/mo)", amount: "9.00" },
  { id: "pro", name: "Flow AI Music — Pro ($18/mo)", amount: "18.00" },
  { id: "studio", name: "Flow AI Music — Studio ($28/mo)", amount: "28.00" },
];

for (const plan of plans) {
  const { product } = await client.subscriptionProducts.create({
    storeId,
    name: plan.name,
    billingPeriod: BillingPeriod.Monthly,
    prices: { USD: { amount: plan.amount, taxCategory: "saas" } },
    metadata: { plan: plan.id, site: "flowaimusic" },
  });
  console.log(`PANCAKE_PRODUCT_${plan.id.toUpperCase()}_MONTHLY=${product.id}`);
}
