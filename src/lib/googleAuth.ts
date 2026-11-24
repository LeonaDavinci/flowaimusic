/* Google OAuth 2.0 (Authorization Code) — server only.
   Credentials reused from the BuzzyAI workbench project. */

const DEFAULT_CLIENT_ID =
  "341028545013-1q26l6sms0th18vbc5a0e62hc30labsb.apps.googleusercontent.com";
const DEFAULT_REDIRECT_URI = "https://www.flowaimusic.com/api/auth/google/callback";

export function googleConfig() {
  return {
    clientId: String(process.env.GOOGLE_CLIENT_ID || DEFAULT_CLIENT_ID).trim(),
    clientSecret: String(process.env.GOOGLE_CLIENT_SECRET || "").trim(),
    redirectUri: String(process.env.GOOGLE_REDIRECT_URI || DEFAULT_REDIRECT_URI).trim(),
    tokenUrl: String(process.env.GOOGLE_TOKEN_URL || "https://oauth2.googleapis.com/token").trim(),
    userInfoUrl: String(
      process.env.GOOGLE_USERINFO_URL || "https://www.googleapis.com/oauth2/v3/userinfo",
    ).trim(),
  };
}

export function googleConfigured(): boolean {
  const cfg = googleConfig();
  return Boolean(cfg.clientId && cfg.clientSecret && cfg.redirectUri);
}

export function buildGoogleAuthUrl(state: string): string {
  const cfg = googleConfig();
  const params = new URLSearchParams({
    client_id: cfg.clientId,
    redirect_uri: cfg.redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
    access_type: "online",
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeGoogleCode(code: string): Promise<{ access_token: string }> {
  const cfg = googleConfig();
  if (!cfg.clientSecret) throw new Error("Google sign-in is not configured on this server.");
  const res = await fetch(cfg.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: String(code || ""),
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      redirect_uri: cfg.redirectUri,
      grant_type: "authorization_code",
    }).toString(),
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.access_token) {
    throw new Error(
      data?.error_description || data?.error || `Google token exchange failed (HTTP ${res.status}).`,
    );
  }
  return data;
}

export type GoogleProfile = {
  sub: string;
  email: string;
  emailVerified: boolean;
  name: string;
  givenName: string;
  familyName: string;
  picture: string;
  locale: string;
};

export async function fetchGoogleProfile(accessToken: string): Promise<GoogleProfile> {
  const cfg = googleConfig();
  const res = await fetch(cfg.userInfoUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.sub) {
    throw new Error(
      data?.error_description || `Could not read your Google profile (HTTP ${res.status}).`,
    );
  }
  return {
    sub: String(data.sub),
    email: String(data.email || "").toLowerCase().trim(),
    emailVerified: data.email_verified === true,
    name: String(data.name || ""),
    givenName: String(data.given_name || ""),
    familyName: String(data.family_name || ""),
    picture: String(data.picture || ""),
    locale: String(data.locale || ""),
  };
}
