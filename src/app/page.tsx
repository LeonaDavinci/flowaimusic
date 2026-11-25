import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, softwareApplicationSchema, organizationSchema } from "@/lib/seo";
import {
  QUICK_STARTS,
  TRACKS,
  PLAYLISTS,
  CAPABILITIES,
  TESTIMONIALS,
  WORKFLOW,
} from "@/lib/content";
import { HeroComposer } from "@/components/HeroComposer";
import { StudioPreview } from "@/components/StudioPreview";
import { MiniKeyboard } from "@/components/MiniKeyboard";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { Icon, type IconName } from "@/components/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Flow AI Music — AI Music Creator & Music Studio",
  description:
    "Flow AI Music is an AI music creator for making original music from text. Generate full songs, edit any section, split stems and make music videos — free to start.",
  path: "/",
  keywords: [
    "AI music generator",
    "AI music creator",
    "flow music ai",
    "make music with AI",
    "text to music",
    "AI music studio",
    "free AI music generator",
  ],
});

const QUICK_ICONS: Record<string, IconName> = {
  song: "song",
  video: "video",
  vocal: "vocal",
  remix: "remix",
  fx: "fx",
};

export default function HomePage() {
  const featuredTracks = TRACKS.slice(0, 3);

  return (
    <main>
      <JsonLd data={[softwareApplicationSchema(), organizationSchema()]} />

      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">The official AI music studio</span>
            <h1 className="hero-title" id="hero-title">
              <span className="hero-title-brand">Flow AI Music</span>
              Turn the song in your head into a <em>real one.</em>
            </h1>
            <p className="hero-sub">
              Describe any music you can imagine and get a full-length track
              with vocals, structure and feeling. Built for every AI music
              creator — unlimited downloads, no gear required.
            </p>
            <HeroComposer />
            <div className="hero-stats">
              <span><b>12M+</b> songs made</span>
              <span><b>4</b> stems per track</span>
              <span><b>Free</b> daily credits</span>
            </div>
          </div>
          <div className="hero-visual">
            <StudioPreview />
          </div>
        </div>
      </section>

      {/* What is this app — purpose statement visible without login (Google OAuth review) */}
      <section className="section app-purpose" aria-labelledby="purpose-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">About this app</span>
            <h2 className="section-title" id="purpose-title">
              What is Flow AI Music?
            </h2>
          </div>
          <div className="purpose-grid">
            <div className="purpose-card">
              <h3>The purpose of this app</h3>
              <p>
                Flow AI Music is an AI-powered music studio that runs entirely
                in your browser. You describe a song in plain language — genre,
                mood, tempo, instruments — and the app generates a
                full-length original track with vocals, structure and feeling.
                You can then edit sections, split stems, and export your
                music. No recording gear or music theory is required.
              </p>
            </div>
            <div className="purpose-card">
              <h3>Use it without an account</h3>
              <p>
                No sign-up is needed to explore this site. Right now you can
                compose prompts, play the mini keyboard, listen to demos and
                try the local synthesis studio without logging in. Everything
                on this page is open to every visitor.
              </p>
            </div>
            <div className="purpose-card">
              <h3>Why we offer Google sign-in</h3>
              <p>
                Google sign-in is entirely optional. It is used for one thing:
                to identify your account so AI song generation, saved tracks
                and paid subscriptions belong to you. We request only your
                name, email address and profile picture — never your Google
                password, and your Google data is never used for advertising
                or AI training. See our{" "}
                <Link href="/privacy">privacy policy</Link>,{" "}
                <Link href="/terms">terms</Link> and{" "}
                <Link href="/aigc">AIGC use policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick starts */}
      <section className="section" aria-labelledby="quick-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Start from anywhere</span>
            <h2 className="section-title" id="quick-title">
              Five ways in. One sentence each.
            </h2>
            <p className="section-sub">
              Pick a starting point and the studio pre-shapes your session. You
              can always change direction mid-song.
            </p>
          </div>
          <div className="quick-grid">
            {QUICK_STARTS.map((item) => (
              <Link
                key={item.id}
                href={`/studio?brief=${encodeURIComponent(item.brief)}`}
                className={`quick-card tone-${item.tone}`}
                data-track="cta_click"
                data-placement="quick_start"
              >
                <span className="quick-icon">
                  <Icon name={QUICK_ICONS[item.id]} />
                </span>
                <span className="quick-title">{item.title}</span>
                <span className="quick-hint">{item.hint}</span>
                <span className="quick-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Conversational studio */}
      <section className="section section--tint" aria-labelledby="instrument-title">
        <div className="container split">
          <div className="split-copy">
            <span className="eyebrow">Your new instrument</span>
            <h2 className="section-title" id="instrument-title">
              Talk to it like a producer in the room.
            </h2>
            <p>
              No menus, no blank timeline. Say what you hear — genre, mood,
              tempo, the exact line the chorus should land on — and keep
              refining until every detail fits.
            </p>
            <ul className="feature-list">
              <li>Full-length songs with real structure and dynamics</li>
              <li>Expressive lead and backing vocals, not a vocal chop loop</li>
              <li>Tempo, key and duration you can actually steer</li>
            </ul>
            <div className="section-actions">
              <Link href="/studio" className="btn btn-primary" data-track="cta_click" data-placement="instrument">
                Open the studio <Icon name="arrow" size={17} />
              </Link>
            </div>
          </div>
          <div className="panel">
            <div className="track-strip">
              {featuredTracks.map((track) => (
                <div className="track-mini" key={track.id}>
                  <div
                    className="track-cover"
                    style={{
                      background: `linear-gradient(135deg, ${track.gradient[0]}, ${track.gradient[1]})`,
                    }}
                    aria-hidden="true"
                  >
                    <Icon name="note" size={26} />
                  </div>
                  <div className="track-meta">
                    <strong>{track.title}</strong>
                    <span>{track.genre}</span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ margin: "18px 4px 0", fontSize: 13.5, color: "var(--ink-3)" }}>
              Every take is saved, so you can A/B two choruses or go back to the
              version you liked yesterday.
            </p>
          </div>
        </div>
      </section>

      {/* Music video */}
      <section className="section" aria-labelledby="video-title">
        <div className="container split split--reverse">
          <div className="split-copy">
            <span className="eyebrow">Direct your own music video</span>
            <h2 className="section-title" id="video-title">
              Give your sound a whole visual world.
            </h2>
            <p>
              Choose the characters, the palette and the pacing. The studio
              builds a music video around your finished track — no camera crew,
              no editing timeline, no extra software.
            </p>
            <ul className="feature-list">
              <li>Character and aesthetic control in plain words</li>
              <li>Visual cuts that follow the beat</li>
              <li>Ready-to-share exports for every channel</li>
            </ul>
            <div className="section-actions">
              <Link href="/features#video" className="btn btn-ghost" data-track="cta_click" data-placement="video">
                See how it works
              </Link>
            </div>
          </div>
          <div className="video-card">
            <div className="video-overlay">
              <span className="play-orb"><Icon name="play" size={26} /></span>
              <strong>Neon Cartography</strong>
              <small>Directed in the studio · 3:12</small>
            </div>
            <span className="video-tag">AI music video · 1080p</span>
          </div>
        </div>
      </section>

      {/* Spaces / keyboard */}
      <section className="section section--tint" aria-labelledby="spaces-title">
        <div className="container split">
          <div className="split-copy">
            <span className="eyebrow">Build a Space</span>
            <h2 className="section-title" id="spaces-title">
              Make an instrument out of an idea.
            </h2>
            <p>
              Spaces are tiny playable tools you describe in words: a keyboard,
              a drum machine, a music game, a custom effect rack. Open it in the
              browser, tweak it, and share the link. Try this one — the keys
              really make sound.
            </p>
            <ul className="feature-list">
              <li>Describe it, then play it — no install</li>
              <li>Runs entirely in your browser</li>
              <li>Every Space gets a shareable URL</li>
            </ul>
            <div className="section-actions">
              <Link href="/library/spaces" className="btn btn-ghost" data-track="cta_click" data-placement="spaces">
                Browse Spaces
              </Link>
            </div>
          </div>
          <MiniKeyboard />
        </div>
      </section>

      {/* Share / playlists */}
      <section className="section" aria-labelledby="share-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Share what you make</span>
            <h2 className="section-title" id="share-title">
              A song is better when someone hears it.
            </h2>
            <p className="section-sub">
              Publish tracks, collect them into playlists, follow the makers you
              like, and find something new every day.
            </p>
          </div>
          <div className="playlist-grid">
            {PLAYLISTS.map((playlist) => (
              <Link
                href="/explore"
                className="playlist-card"
                key={playlist.id}
                data-track="cta_click"
                data-placement="playlist"
              >
                <div
                  className="playlist-cover"
                  style={{
                    background: `linear-gradient(135deg, ${playlist.gradient[0]}, ${playlist.gradient[1]})`,
                  }}
                />
                <div className="playlist-info">
                  <div>
                    <strong>{playlist.title}</strong>
                    <small>{playlist.caption}</small>
                  </div>
                  <span className="playlist-count">{playlist.count} songs</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section section--tint" aria-labelledby="cap-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">It learns your style</span>
            <h2 className="section-title" id="cap-title">
              The more you make, the more it sounds like you.
            </h2>
            <p className="section-sub">
              Personalised from day one, with the editing tools to back it up.
            </p>
          </div>
          <div className="cap-grid">
            {CAPABILITIES.map((cap, index) => (
              <div className={`cap-card tone-${cap.tone}`} key={cap.id}>
                <span className="cap-icon">{String(index + 1).padStart(2, "0")}</span>
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28, textAlign: "center", fontSize: 15, color: "var(--ink-2)" }}>
            Flow Music AI is built for people who make music every day. See why
            makers call it the{" "}
            <Link href="/ai-music-creator" style={{ color: "var(--violet)", fontWeight: 750, textDecoration: "underline", textUnderlineOffset: 3 }}>
              AI music creator
            </Link>{" "}
            they keep coming back to.
          </p>
        </div>
      </section>

      {/* Workflow + testimonials */}
      <section className="section" aria-labelledby="workflow-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">One continuous flow</span>
            <h2 className="section-title" id="workflow-title">
              Idea → song → video → audience.
            </h2>
          </div>
          <div className="workflow">
            {WORKFLOW.map((step) => (
              <div className="workflow-step" key={step.step}>
                <b>{step.step}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="quotes-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">From the studio</span>
            <h2 className="section-title" id="quotes-title">
              Makers, not prompt engineers.
            </h2>
          </div>
          <div className="quote-grid">
            {TESTIMONIALS.map((item) => (
              <figure className={`quote-card tone-${item.tone}`} key={item.name}>
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>{item.quote}</blockquote>
                <figcaption>
                  <b>{item.name}</b>
                  {item.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
