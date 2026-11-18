"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Demo analytics bridge: turns [data-track] clicks into dataLayer events. */
export function TrackBridge() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const payload = {
        event: el.dataset.track,
        placement: el.dataset.placement ?? null,
        label: (el.textContent ?? "").trim().slice(0, 80),
        href: el.getAttribute("href"),
        ts: new Date().toISOString(),
      };
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push(payload);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
