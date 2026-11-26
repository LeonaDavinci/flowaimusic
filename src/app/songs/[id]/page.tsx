import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, TRACKS, type Track } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { TrackCard } from "@/components/TrackCard";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

function findTrack(id: string): Track | undefined {
  return TRACKS.find((track) => track.id === id);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const track = findTrack(id);
  if (!track) {
    return pageMetadata({
      title: "Track not found | Flow AI Music",
      description: "This sample track is not available.",
      path: "/explore",
    });
  }
  return pageMetadata({
    title: `${track.title} — ${track.genre} AI track, prompt & settings | Flow AI Music`,
    description: `Case page for ${track.title}: the prompt behind it, ${track.genre} at ${track.bpm} BPM, ${track.duration} long. See the model and settings, then reuse the prompt in the studio.`,
    path: `/songs/${track.id}`,
    keywords: [`${track.genre} AI music`, "AI music prompt example", "AI song settings", "AI music generator case"],
  });
}

export default async function SongPage({ params }: Params) {
  const { id } = await params;
  const track = findTrack(id);
  if (!track) notFound();

  const related = TRACKS.filter((item) => item.id !== track.id)
    .sort((a, b) => (a.genre === track.genre ? -1 : 0) - (b.genre === track.genre ? -1 : 0))
    .slice(0, 3);
  const studioHref = `/studio?brief=${encodeURIComponent(track.prompt)}`;
  const spec: [string, string][] = [
    ["Model", track.model || "AI Music M1 / M2 (SeeAPI)"],
    ["Genre", track.genre],
    ["Tempo", `${track.bpm} BPM`],
    ["Length", track.duration],
    ["Session", track.session || "Internal test session"],
    ["Prompt length", `${track.prompt.length} characters`],
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    name: track.title,
    genre: track.genre,
    description: track.prompt,
    url: `${SITE_URL}/songs/${track.id}`,
    byArtist: { "@type": "MusicGroup", name: `@${track.creator}` },
    ...(track.audioUrl ? { audio: track.audioUrl } : {}),
  };

  return (
    <main>
      <JsonLd data={schema} />
      <section className="song-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <Link href="/explore">Sample tracks</Link>{" "}
            <span>/</span> <span>{track.title}</span>
          </div>
          <div className="song-hero-grid">
            <div
              className="song-cover"
              style={{
                background: `linear-gradient(150deg, ${track.gradient[0]}, ${track.gradient[1]})`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/album-cover.png" alt={`${track.title} cover art`} loading="eager" />
            </div>
            <div className="song-copy">
              <span className="eyebrow">Sample track · test session</span>
              <h1>{track.title}</h1>
              <div className="song-tags">
                <span className="tag">{track.genre}</span>
                <span className="tag">{track.bpm} BPM</span>
                <span className="tag">{track.duration}</span>
                <span className="tag">prompt by @{track.creator}</span>
              </div>

              {track.audioUrl ? (
                <audio className="song-audio" controls preload="metadata" src={track.audioUrl} />
              ) : (
                <div className="song-audio-note">
                  <strong>Audio not published for this sample.</strong>
                  <p>
                    We do not publish audio we cannot stand behind. Run this exact
                    prompt in the studio and you get your own take back — the first
                    one is free with a Google sign-in.
                  </p>
                </div>
              )}

              <div className="song-actions">
                <Link href={studioHref} className="btn btn-primary" data-track="cta_click" data-placement="song_generate">
                  Generate this prompt
                </Link>
                <Link href="/explore" className="btn btn-ghost">
                  Browse sample tracks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="prompt-title">
        <div className="container song-detail-grid">
          <div>
            <h2 className="section-title" id="prompt-title">
              The prompt
            </h2>
            <blockquote className="song-prompt">{track.prompt}</blockquote>
            <p className="song-prompt-note">
              One sentence, the same kind of brief the studio takes. Anything you
              can describe — genre, mood, tempo, instruments, vocal type, the scene
              it scores — carries into the arrangement.
            </p>
          </div>
          <div>
            <h2 className="section-title">How it was made</h2>
            <table className="song-spec">
              <tbody>
                {spec.map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="song-prompt-note">
              Track names, handles and counters on this site are demonstration
              content; the prompt and settings are real and reusable.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="related-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Same session</span>
            <h2 className="section-title" id="related-title">
              More from the sample feed.
            </h2>
          </div>
          <div className="track-grid">
            {related.map((item) => (
              <TrackCard key={item.id} track={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Turn your own sentence into a song."
        subtitle="Sign in with Google, describe what you hear, and generate a full track in a couple of minutes."
      />

      <p className="song-back">
        <Link href="/explore">
          <Icon name="play" size={12} /> Back to all sample tracks
        </Link>
      </p>
    </main>
  );
}
