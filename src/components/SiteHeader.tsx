"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./Icons";
import { AccountButton } from "./AccountButton";
import { NAV_LINKS } from "@/lib/content";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="Flow AI Music home" data-track="nav_click">
            <BrandMark />
            <span>Flow AI <span className="text-violet">Music</span></span>
          </Link>

          <nav className="nav-links" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname.startsWith(link.href) ? "is-active" : undefined}
                data-track="nav_click"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <AccountButton />
            <Link href="/studio" className="btn btn-primary btn-sm" data-track="cta_click" data-placement="header">
              Start creating
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <nav className={`mobile-nav${open ? " is-open" : ""}`} aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} data-track="nav_click">
              {link.label}
            </Link>
          ))}
          <a href="/api/auth/google/start" data-track="google_signin">
            Log in with Google
          </a>
          <Link href="/studio" className="btn btn-primary" data-track="cta_click" data-placement="mobile">
            Start creating
          </Link>
        </nav>
      </div>
    </header>
  );
}
