import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { StudioClient } from "@/components/StudioClient";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "AI Music Studio — Create Music from Text | Flow AI Music",
  description:
    "Open the Flow AI Music studio and turn a text description into a full-length music track. Refine any section, switch styles and preview separated stems in the demo workspace.",
  path: "/studio",
  keywords: ["AI song maker", "text to song", "AI music studio", "make a song online"],
});

const DEFAULT_BRIEF = "A warm indie pop song about driving home at sunset, with a big singalong chorus";

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<{ brief?: string; persona?: string }>;
}) {
  const params = await searchParams;
  const brief = (params.brief ?? "").trim().slice(0, 400) || DEFAULT_BRIEF;
  const persona = (params.persona ?? "creator").trim().slice(0, 40) || "creator";

  return (
    <main>
      <section className="page-hero" style={{ paddingBottom: 36 }}>
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Studio</span>
          </div>
          <span className="notice">Demo mode · No account or upload required</span>
          <h1>Your studio session.</h1>
          <p>
            Your brief is already on the board. Keep the conversation going to
            change a section, switch the style, or start a completely new song.
          </p>
        </div>
      </section>

      <div className="container">
        <StudioClient brief={brief} persona={persona} />
      </div>

      <section className="section section--tint" style={{ padding: "56px 0" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: 24, letterSpacing: "-0.03em" }}>
              Want to see what other people asked for?
            </h2>
            <p style={{ margin: 0, color: "var(--ink-2)" }}>
              The explore feed shows the exact prompt behind every song.
            </p>
          </div>
          <Link href="/explore" className="btn btn-primary btn-lg" data-track="cta_click" data-placement="studio_footer">
            Browse songs <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
