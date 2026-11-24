"use client";

import { useEffect, useState } from "react";
import type { Plan } from "@/lib/content";

type Me = {
  sub: string;
  email: string;
  name: string;
  picture: string;
  plan: string;
  credits: number;
};

type Props = {
  plan: Plan;
  billing: string;
  price: number;
  paid: boolean;
  error?: string;
};

export function PaymentClient({ plan, billing, price, paid, error }: Props) {
  const [user, setUser] = useState<Me | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setUser(data?.user || null))
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  const next = `/payment?plan=${plan.id}&billing=${billing}`;
  const signInHref = `/api/auth/google/start?next=${encodeURIComponent(next)}`;

  async function startCheckout() {
    setBusy(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan.id, billing }),
      });
      const data = await res.json();
      if (!res.ok || !data?.checkoutUrl) {
        setCheckoutError(data?.error || "Could not start checkout. Please try again.");
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch {
      setCheckoutError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (!ready) return <div className="payment-auth-card">Checking your session…</div>;

  if (!user) {
    return (
      <div className="payment-auth-card">
        <span className="payment-step">Step 1 of 2 · Sign in</span>
        <h2>Sign in with Google to continue</h2>
        <p>
          We use your Google account to attach this subscription to your library and credits.
          No new password to remember.
        </p>
        <a className="btn btn-primary" href={signInHref} data-track="google_signin">
          Continue with Google
        </a>
        <p className="payment-note">
          Google sign-in is required before checkout so we can match your payment to the right account.
        </p>
      </div>
    );
  }

  return (
    <div className="payment-auth-card">
      <span className="payment-step">Signed in as</span>
      <div className="payment-user">{user.name} · {user.email}</div>
      {user.plan !== "free" && (
        <p className="payment-current">
          Current plan: {user.plan} · {user.credits.toLocaleString()} credits
        </p>
      )}
      {paid && (
        <p className="payment-paid">Payment confirmed — your {plan.name} plan is active.</p>
      )}
      {error && <p className="payment-error">Could not complete sign-in or checkout: {error}</p>}
      <button className="btn btn-primary" onClick={startCheckout} disabled={busy}>
        {busy ? "Opening secure checkout…" : `Continue to secure checkout — $${price}/mo`}
      </button>
      <p className="payment-note">
        Payments are processed by Waffo Pancake (Merchant of Record). Your card details never
        reach our servers. Cancel any time.
      </p>
      {checkoutError && <p className="payment-error">{checkoutError}</p>}
    </div>
  );
}
