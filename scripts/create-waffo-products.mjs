/* One-off helper: create the three monthly subscription products in the
   Waffo Pancake store, then copy the printed IDs into .env.local / Vercel.

   THIS SCRIPT CALLS THE REAL WAFFO API. Run it only when you intend to
   create products. Requires WAFFO_MERCHANT_ID, WAFFO_PRIVATE_KEY and
   PANCAKE_STORE_ID in the environment.

   Environment selection: the gateway routes every signed request by the
   private key used — prod key → production, test key → test environment.

   Usage:
     node scripts/create-waffo-products.mjs            → production key
     node scripts/create-waffo-products.mjs test       → WAFFO_TEST_PRIVATE_KEY */

import { WaffoPancake, BillingPeriod } from "@waffo/pancake-ts";

const mode = process.argv[2] === "test" ? "test" : "production";

const merchantId = String(
  (mode === "test" && process.env.WAFFO_TEST_MERCHANT_ID) ||
    process.env.WAFFO_MERCHANT_ID ||
    "",
).trim();

let privateKey = String(
  (mode === "test" && process.env.WAFFO_TEST_PRIVATE_KEY) ||
    process.env.WAFFO_PRIVATE_KEY ||
    "",
).trim();
privateKey = privateKey.replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");

/* Raw base64 DER (no PEM markers) — wrap it so the SDK can sign. */
if (privateKey && !privateKey.includes("-----BEGIN")) {
  const body = privateKey.replace(/\s+/g, "").replace(/(.{64})/g, "$1\n").trim();
  privateKey = `-----BEGIN PRIVATE KEY-----\n${body}\n-----END PRIVATE KEY-----`;
}

const storeId = String(process.env.PANCAKE_STORE_ID || "").trim();

if (!merchantId || !storeId || !privateKey) {
  console.error(
    `Missing credentials for ${mode} mode: WAFFO_MERCHANT_ID / WAFFO_PRIVATE_KEY / PANCAKE_STORE_ID.`,
  );
  process.exit(1);
}

console.log(`Mode: ${mode} · merchant ${merchantId} · store ${storeId}`);

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
    metadata: { plan: plan.id, site: "flowaimusic", environment: mode },
  });
  console.log(`PANCAKE_PRODUCT_${plan.id.toUpperCase()}_MONTHLY=${product.id}`);
}
