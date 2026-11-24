import { NextResponse } from "next/server";
import { sessionFromRequest } from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const user = sessionFromRequest(request);
  return NextResponse.json(
    { user: user ? { ...user, iat: undefined, exp: undefined } : null },
    { headers: { "Cache-Control": "no-store" } },
  );
}
