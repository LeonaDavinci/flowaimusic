"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

/* Cookie consent banner. GTM/Google Analytics load only after the visitor
   accepts optional analytics; essential cookies (sign-in, checkout) are set
   regardless, as described in the privacy policy. The choice is stored in
   localStorage so it survives reloads without a tracking cookie. */

const STORAGE_KEY = "flow_cookie_consent";
export const CONSENT_EVENT = "flow-cookie-settings";
const GTM_ID = "GTM-K2ZP897G";

function loadGtm() {
  if (document.getElementById("gtm-script")) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      } else if (saved === "accepted") {
        loadGtm();
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = useCallback((choice: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* private browsing — banner simply reappears next visit */
    }
    setVisible(false);
    if (choice === "accepted") loadGtm();
  }, []);

  useEffect(() => {
    const onSettings = () => setVisible(true);
    window.addEventListener(CONSENT_EVENT, onSettings);
    return () => window.removeEventListener(CONSENT_EVENT, onSettings);
  }, []);

  if (!visible) return null;

  return (
    <div className="cookie-notice" role="dialog" aria-label="Cookie preferences">
      <p>
        We use essential cookies for sign-in and checkout, and optional
        analytics cookies to understand how the site is used. Read the{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
      <div className="cookie-actions">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => choose("rejected")}
        >
          Reject optional
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => choose("accepted")}
        >
          Accept analytics
        </button>
      </div>
    </div>
  );
}

/* Footer control that re-opens the banner. */
export function CookieSettingsLink() {
  return (
    <button
      type="button"
      className="linklike"
      onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
    >
      Cookie settings
    </button>
  );
}
