import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_URL, TRACKS, type Track } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { TrackCard } from "@/components/TrackCard";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icons";
import { SongTags } from "@/components/SongTags";

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
  const shareTags = [
    { label: "Genre", value: track.genre },
    { label: "Style", value: track.style || track.genre },
    { label: "Tempo", value: `${track.bpm} BPM` },
    { label: "Length", value: track.duration },
    ...(track.mood || []).slice(0, 3).map((m) => ({ label: "Mood", value: m })),
  ];
  const shareSummary = [
    `${track.title} — ${track.genre} / ${track.style || track.genre}`,
    `BPM: ${track.bpm} · Length: ${track.duration} · Vocals: ${track.settings?.vocals || "see prompt"}`,
    `Mood: ${(track.mood || []).join(", ")}`,
    `Instruments: ${(track.instruments || []).join(", ")}`,
    `Prompt: ${track.prompt}`,
    `Model: ${track.model || "AI Music M2 (SeeAPI)"}`,
    `Source: ${SITE_URL}/songs/${track.id}`,
  ].join("\n");
  const spec: [string, string][] = [
    ["Model", track.model || "AI Music M1 / M2 (SeeAPI)"],
    ["Genre", track.genre],
    ["Tempo", `${track.bpm} BPM`],
    ["Length", track.duration],
    ["Generation mode", track.settings?.mode || "Text to music"],
    ["Vocals", track.settings?.vocals || "See prompt"],
    ["Instrumental", track.settings?.instrumental ? "Yes" : "No — with vocals"],
    ["Variation", track.settings?.variation || "Default (first take)"],
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
              <img src={track.cover || "/album-cover.png"} alt={`${track.title} cover art`} loading="eager" />
            </div>
            <div className="song-copy">
              <span className="eyebrow">Sample track · test session</span>
              <h1>{track.title}</h1>
              <SongTags tags={shareTags} summary={shareSummary} />
              <p className="song-credit">prompt by @{track.creator}</p>

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

      <section className="section" aria-labelledby="about-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">About this track</span>
            <h2 className="section-title" id="about-title">
              What it sounds like.
            </h2>
          </div>
          <p className="song-description">
            {track.description ||
              `${track.genre} at ${track.bpm} BPM, ${track.duration} long — a sample take generated from the prompt below.`}
          </p>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="prompt-title">
        <div className="container song-detail-grid">
          <div>
            <h2 className="section-title" id="prompt-title">
              The exact prompt
            </h2>
            <blockquote className="song-prompt">{track.prompt}</blockquote>
            <p className="song-prompt-note">
              One sentence, the same kind of brief the studio takes. Anything you
              can describe — genre, mood, tempo, instruments, vocal type, the scene
              it scores — carries into the arrangement. Copy it into the studio to
              generate your own take.
            </p>
            {track.promptBreakdown && track.promptBreakdown.length > 0 && (
              <div className="song-breakdown">
                <h3 className="song-subtitle">What each part does</h3>
                <table className="song-spec">
                  <tbody>
                    {track.promptBreakdown.map((part) => (
                      <tr key={part.element}>
                        <th scope="row">{part.element}</th>
                        <td>{part.effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Link
              href={studioHref}
              className="btn btn-primary song-prompt-cta"
              data-track="cta_click"
              data-placement="song_prompt"
            >
              Reuse this prompt <Icon name="play" size={15} />
            </Link>
          </div>
          <div>
            <h2 className="section-title">Generation settings</h2>
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
              content; the prompt, audio and settings are real and reusable.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="usage-title">
        <div className="container song-detail-grid">
          <div>
            <span className="eyebrow">Where it fits</span>
            <h2 className="section-title" id="usage-title">
              Suggested uses.
            </h2>
            <ul className="song-usage-list">
              {(track.usage || []).map((use) => (
                <li key={use}>
                  <Icon name="play" size={13} /> {use}
                </li>
              ))}
            </ul>
            <p className="song-prompt-note">
              These are suggested placements, not a claim that the track is
              licensed for a specific campaign. Check the licence terms before
              commercial use.
            </p>
          </div>
          <div>
            <span className="eyebrow">Publishing</span>
            <h2 className="section-title">Platforms.</h2>
            <p className="song-prompt-note">
              The generated master is a standard audio file you can download and
              upload to the channels you already use.
            </p>
            <div className="song-tags song-platforms">
              {(track.platforms || []).map((platform) => (
                <span className="tag" key={platform}>
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="glance-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Share this recipe</span>
            <h2 className="section-title" id="glance-title">
              At a glance.
            </h2>
          </div>
          <div className="song-glance">
            <div className="song-glance-grid">
              <div>
                <span className="song-glance-label">Genre</span>
                <strong>{track.genre}</strong>
              </div>
              <div>
                <span className="song-glance-label">Style</span>
                <strong>{track.style || track.genre}</strong>
              </div>
              <div>
                <span className="song-glance-label">Tempo</span>
                <strong>{track.bpm} BPM</strong>
              </div>
              <div>
                <span className="song-glance-label">Length</span>
                <strong>{track.duration}</strong>
              </div>
              <div>
                <span className="song-glance-label">Vocals</span>
                <strong>{track.settings?.vocals || "See prompt"}</strong>
              </div>
              <div>
                <span className="song-glance-label">Model</span>
                <strong>{track.model || "AI Music M2 (SeeAPI)"}</strong>
              </div>
            </div>
            <div className="song-glance-tags">
              <span className="song-glance-label">Mood</span>
              <div className="song-tags">
                {(track.mood || []).map((m) => (
                  <span className="tag" key={m}>{m}</span>
                ))}
              </div>
            </div>
            <div className="song-glance-tags">
              <span className="song-glance-label">Instruments &amp; textures</span>
              <div className="song-tags">
                {(track.instruments || []).map((inst) => (
                  <span className="tag" key={inst}>{inst}</span>
                ))}
              </div>
            </div>
            <div className="song-glance-prompt">
              <span className="song-glance-label">Prompt</span>
              <p>{track.prompt}</p>
            </div>
            <SongTags tags={shareTags} summary={shareSummary} />
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
