import { NextResponse } from "next/server";
import { COOKIE_NAME, clearCookieString } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", clearCookieString(COOKIE_NAME));
  return res;
}
