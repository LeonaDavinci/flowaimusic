"use client";

import { useEffect, useState } from "react";

type Me = { email: string; name: string; plan: string; credits: number };

export function AccountButton() {
  const [user, setUser] = useState<Me | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setUser(data?.user || null))
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  if (!ready || !user) {
    return (
      <a className="btn btn-ghost btn-sm" href="/api/auth/google/start" data-track="google_signin">
        Log in
      </a>
    );
  }

  return (
    <div className="account-chip" title={`${user.email} · ${user.plan}`}>
      <span className="account-avatar">{user.name.slice(0, 1).toUpperCase()}</span>
      <span className="account-name">{user.name.split(" ")[0]}</span>
      <button type="button" onClick={signOut} className="account-signout">
        Sign out
      </button>
    </div>
  );
}
