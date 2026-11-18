import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { LIBRARY_SECTIONS } from "@/lib/content";
import { CtaBanner } from "@/components/CtaBanner";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "My Library — Songs, Playlists & Spaces | FlowAI Music",
  description:
    "Your FlowAI Music library: saved songs, playlists, music videos and playable Spaces in one place.",
  path: "/library",
});

export default function LibraryPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Library</span>
          </div>
          <span className="eyebrow">Your library</span>
          <h1>Everything you made, in one place.</h1>
          <p>Songs, playlists, directed videos and the little tools you built along the way.</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 56 }}>
        <div className="empty-state">
          <h2>Nothing saved yet — and that is easy to fix.</h2>
          <p>Open the studio and make a first take. Saved items will appear here in the production release.</p>
          <Link href="/studio" className="btn btn-primary btn-lg" data-track="cta_click" data-placement="library">
            Create a song <Icon name="arrow" size={17} />
          </Link>
        </div>
        <div className="card-grid">
          {LIBRARY_SECTIONS.map((section, i) => (
            <article className={`simple-card tone-${section.tone}`} key={section.href}>
              <span className="cap-icon">{String(i + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
              <Link href={section.href} className="btn btn-ghost btn-sm">Open →</Link>
            </article>
          ))}
        </div>
      </div>

      <CtaBanner />
    </main>
  );
}
