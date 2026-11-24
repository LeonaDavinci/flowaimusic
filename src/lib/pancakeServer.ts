/* Waffo Pancake checkout plumbing (server-only).
   Merchant account and store ID reused from the BuzzyAI workbench project.
   Never import this from a client component. */

import { WaffoPancake } from "@waffo/pancake-ts";

export const DEFAULT_MERCHANT_ID = "MER_6tBsBKfjzjoGjisJ19JG57";
export const DEFAULT_STORE_ID = "STO_2MNDn7LD0lfhmntIzfZPKT";

export function getMerchantId(): string {
  return String(process.env.WAFFO_MERCHANT_ID || DEFAULT_MERCHANT_ID).trim();
}

export function getStoreId(): string {
  return String(process.env.PANCAKE_STORE_ID || DEFAULT_STORE_ID).trim();
}

/* Waffo's merchant account was not approved as of 2026-11-22, so real
   checkout stays behind a switch. Set PAYMENTS_ENABLED=1 to go live. */
export function paymentsEnabled(): boolean {
  return String(process.env.PAYMENTS_ENABLED || "").trim() === "1";
}

/* Accepts a PEM with literal newlines or escaped \n sequences. */
export function normalizeWaffoPrivateKey(raw: string | null | undefined): string {
  let key = String(raw || "").trim();
  if (!key) return "";
  const marker = key.search(/WAFFO_PRIVATE_KEY\s*=/i);
  if (marker >= 0) key = key.slice(marker).replace(/^WAFFO_PRIVATE_KEY\s*=\s*/i, "");
  key = key.trim().replace(/^["']|["']$/g, "").trim();
  key = key.replace(/\\n/g, "\n");
  return key
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .join("\n");
}

export function hasPancakeKey(): boolean {
  return Boolean(getMerchantId() && normalizeWaffoPrivateKey(process.env.WAFFO_PRIVATE_KEY));
}

let client: WaffoPancake | null = null;

export function getPancakeClient(): WaffoPancake {
  if (!hasPancakeKey()) {
    throw new Error("WAFFO_MERCHANT_ID / WAFFO_PRIVATE_KEY are not configured.");
  }
  if (!client) {
    client = new WaffoPancake({
      merchantId: getMerchantId(),
      privateKey: normalizeWaffoPrivateKey(process.env.WAFFO_PRIVATE_KEY),
    });
  }
  return client;
}

/* Product IDs are created once with scripts/create-waffo-products.mjs and
   written to env. No product is hard-coded here. */
export function planProductId(plan: string, billing: string): string | null {
  const planKey = ["creator", "pro", "studio"].includes(plan) ? plan : "";
  const billKey = billing === "yearly" ? "yearly" : "monthly";
  if (!planKey) return null;
  const direct = process.env[`PANCAKE_PRODUCT_${planKey.toUpperCase()}_${billKey.toUpperCase()}`];
  if (direct?.trim()) return direct.trim();
  try {
    const map = JSON.parse(process.env.PANCAKE_PRODUCTS || "{}");
    return map?.[planKey]?.[billKey] || null;
  } catch {
    return null;
  }
}
