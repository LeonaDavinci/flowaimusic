/* Waffo Pancake checkout plumbing (server-only).
   Never import this from a client component.

   Environment selection: the Waffo gateway routes every signed request by
   the private key used — prod key → production, test key → test environment.
   Set PANCAKE_USE_TEST=1 (preview/development only) to run checkout against
   the Waffo test environment with WAFFO_TEST_* credentials and *_TEST
   product IDs. Production ignores the test variables entirely. */

import { WaffoPancake } from "@waffo/pancake-ts";

export const DEFAULT_MERCHANT_ID = "MER_6tBsBKfjzjoGjisJ19JG57";
export const DEFAULT_STORE_ID = "STO_4Mzy8nLEce1hvrlYT5jVEP";

/* Test mode must be explicitly enabled. */
export function usesTestEnvironment(): boolean {
  return String(process.env.PANCAKE_USE_TEST || "").trim() === "1";
}

export function getMerchantId(): string {
  return String(
    (usesTestEnvironment() && process.env.WAFFO_TEST_MERCHANT_ID) ||
      process.env.WAFFO_MERCHANT_ID ||
      DEFAULT_MERCHANT_ID,
  ).trim();
}

export function getStoreId(): string {
  return String(process.env.PANCAKE_STORE_ID || DEFAULT_STORE_ID).trim();
}

/* Checkout is open in the Waffo test environment for preview/testing, and in
   production only behind PAYMENTS_ENABLED=1 (merchant approval). */
export function paymentsEnabled(): boolean {
  if (usesTestEnvironment()) {
    return Boolean(getMerchantId() && normalizeWaffoPrivateKey(waffoPrivateKey()));
  }
  return String(process.env.PAYMENTS_ENABLED || "").trim() === "1";
}

function waffoPrivateKey(): string {
  return String(
    (usesTestEnvironment() && process.env.WAFFO_TEST_PRIVATE_KEY) ||
      process.env.WAFFO_PRIVATE_KEY ||
      "",
  );
}

/* Accepts a PEM with literal newlines or escaped \n sequences, or a raw
   base64 DER body (the Waffo test key ships without PEM markers). */
export function normalizeWaffoPrivateKey(raw: string | null | undefined): string {
  let key = String(raw || "").trim();
  if (!key) return "";
  const marker = key.search(/WAFFO_PRIVATE_KEY\s*=/i);
  if (marker >= 0) key = key.slice(marker).replace(/^WAFFO_PRIVATE_KEY\s*=\s*/i, "");
  key = key.trim().replace(/^["']|["']$/g, "").trim();
  key = key.replace(/\\n/g, "\n");
  key = key
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .join("\n");
  if (key && !key.includes("-----BEGIN")) {
    const body = key.replace(/\s+/g, "").replace(/(.{64})/g, "$1\n").trim();
    key = `-----BEGIN PRIVATE KEY-----\n${body}\n-----END PRIVATE KEY-----`;
  }
  return key;
}

export function hasPancakeKey(): boolean {
  return Boolean(getMerchantId() && normalizeWaffoPrivateKey(waffoPrivateKey()));
}

let client: WaffoPancake | null = null;

export function getPancakeClient(): WaffoPancake {
  if (!hasPancakeKey()) {
    throw new Error(
      usesTestEnvironment()
        ? "WAFFO test credentials (WAFFO_TEST_MERCHANT_ID / WAFFO_TEST_PRIVATE_KEY) are not configured."
        : "WAFFO_MERCHANT_ID / WAFFO_PRIVATE_KEY are not configured.",
    );
  }
  if (!client) {
    client = new WaffoPancake({
      merchantId: getMerchantId(),
      privateKey: normalizeWaffoPrivateKey(waffoPrivateKey()),
    });
  }
  return client;
}

/* Product IDs are created once with scripts/create-waffo-products.mjs and
   written to env. Test-mode IDs carry a _TEST suffix
   (PANCAKE_PRODUCT_CREATOR_MONTHLY_TEST, ...). No product is hard-coded here. */
export function planProductId(plan: string, billing: string): string | null {
  const planKey = ["creator", "pro", "studio"].includes(plan) ? plan : "";
  const billKey = billing === "yearly" ? "yearly" : "monthly";
  if (!planKey) return null;
  const suffix = usesTestEnvironment() ? "_TEST" : "";
  const direct =
    process.env[`PANCAKE_PRODUCT_${planKey.toUpperCase()}_${billKey.toUpperCase()}${suffix}`];
  if (direct?.trim()) return direct.trim();
  try {
    const map = JSON.parse(process.env.PANCAKE_PRODUCTS || "{}");
    return map?.[planKey]?.[billKey] || null;
  } catch {
    return null;
  }
}
