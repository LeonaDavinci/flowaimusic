import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { GENRES, TRACKS, type Genre } from "@/lib/content";
import { TrackCard } from "@/components/TrackCard";
import { CtaBanner } from "@/components/CtaBanner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Explore AI Generated Songs & Playlists | FlowAI Music",
  description:
    "Listen to songs made with FlowAI Music. Browse original AI generated tracks by genre, read the prompts behind them, and find your next favourite creator.",
  path: "/explore",
  keywords: ["AI generated songs", "AI music community", "AI playlist", "prompts for AI music"],
});

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ genre?: string }>;
}) {
  const { genre: raw } = await searchParams;
  const genre: Genre = GENRES.includes(raw as Genre) ? (raw as Genre) : "All";
  const tracks = genre === "All" ? TRACKS : TRACKS.filter((t) => t.genre === genre);
  const creators = new Set(TRACKS.map((t) => t.creator)).size;

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Explore</span>
          </div>
          <span className="eyebrow">Community feed</span>
          <h1>Songs that started as a sentence.</h1>
          <p>
            Every track here began with a prompt. Read what the maker asked for,
            hear the result, and borrow the idea for your own session.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="explore-bar">
          <div className="filter-row" role="group" aria-label="Filter by genre">
            {GENRES.map((item) => {
              const href = item === "All" ? "/explore" : `/explore?genre=${encodeURIComponent(item)}`;
              return (
                <Link
                  key={item}
                  href={href}
                  className={`filter-chip${genre === item ? " is-active" : ""}`}
                  aria-current={genre === item ? "page" : undefined}
                  data-track="filter_select"
                >
                  {item}
                </Link>
              );
            })}
          </div>
          <span className="result-count">
            {tracks.length} tracks · {creators} creators · Updated daily
          </span>
        </div>

        <div className="track-grid">
          {tracks.map((track) => (
            <TrackCard track={track} key={track.id} />
          ))}
        </div>
      </div>

      <CtaBanner
        title="Your track belongs here."
        subtitle="Describe it once, and hear it back in less time than it takes to make coffee."
      />
    </main>
  );
}
