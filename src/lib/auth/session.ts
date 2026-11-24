import crypto from "node:crypto";

/* Signed, stateless session cookie — server only.
   Format: base64url(payload).hmacSHA256(payload) */

export const COOKIE_NAME = "flow_session";
export const CHECKOUT_COOKIE_NAME = "flow_checkout";
export const GOOGLE_STATE_COOKIE = "flow_google_state";
export const GOOGLE_NEXT_COOKIE = "flow_google_next";
export const SESSION_TTL_S = 30 * 24 * 3600;

export type SessionUser = {
  sub: string;
  email: string;
  name: string;
  picture: string;
  plan: string;
  credits: number;
  iat: number;
  exp: number;
};

function secret(): string {
  const fromEnv = String(process.env.AUTH_SECRET || "").trim();
  if (fromEnv.length >= 16) return fromEnv;
  // Local development only. Production must set AUTH_SECRET.
  return "flowaimusic-local-dev-secret-change-me";
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSignedToken<T extends object>(data: T, ttlSeconds: number): string {
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({ ...data, iat: now, exp: now + ttlSeconds }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readSignedToken<T>(token: string | null | undefined): T | null {
  const raw = String(token || "");
  const dot = raw.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = raw.slice(0, dot);
  const given = raw.slice(dot + 1);
  const expected = sign(payload);
  if (given.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!data?.exp || data.exp * 1000 < Date.now()) return null;
    return data as T;
  } catch {
    return null;
  }
}

export function createSessionToken(user: Omit<SessionUser, "iat" | "exp">): string {
  return createSignedToken(user, SESSION_TTL_S);
}

export function readSessionToken(token: string | null | undefined): SessionUser | null {
  const data = readSignedToken<SessionUser>(token);
  if (!data?.sub || !data?.email) return null;
  return data;
}

export function cookieString(name: string, value: string, maxAge: number): string {
  const parts = [
    `${name}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function clearCookieString(name: string): string {
  return cookieString(name, "", 0);
}

export function cookieFrom(request: Request, name: string): string {
  const header = request.headers.get("cookie") || "";
  for (const chunk of header.split(";")) {
    const [key, ...rest] = chunk.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return "";
}

export function sessionFromRequest(request: Request): SessionUser | null {
  return readSessionToken(cookieFrom(request, COOKIE_NAME));
}

/* Only same-site absolute paths are accepted as post-login destinations. */
export function safeNext(raw: string | null | undefined, fallback = "/pricing"): string {
  const value = String(raw || "").trim();
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}
