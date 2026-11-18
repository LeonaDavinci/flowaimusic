import Link from "next/link";
import { FOOTER_GROUPS, SITE_NAME } from "@/lib/content";
import { BrandMark } from "./Icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" data-track="nav_click">
              <BrandMark />
              <span>Flow AI Music</span>
            </Link>
            <p>
              A conversational AI music studio. Describe the song in your head,
              shape every detail, then publish it to the world.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div className="footer-col" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map((link) => (
                <Link href={link.href} key={`${group.title}-${link.href}`} data-track="nav_click">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
          <span>Made for people who hear music before it exists.</span>
        </div>
      </div>
    </footer>
  );
}
