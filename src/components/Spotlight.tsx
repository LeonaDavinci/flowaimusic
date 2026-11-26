import Link from "next/link";
import { TRACKS } from "@/lib/content";
import { Icon } from "./Icons";

/* udio-style spotlight strip: large cover cards, duration badge, one click to
   the full case page (prompt, model, settings, audio). */
export function Spotlight({ limit = 6 }: { limit?: number }) {
  const tracks = TRACKS.slice(0, limit);
  return (
    <section className="spotlight" aria-labelledby="spotlight-title">
      <div className="container">
        <div className="spotlight-head">
          <span className="spotlight-eyebrow">Sample workspace</span>
          <h2 id="spotlight-title">Spotlight</h2>
          <p>
            Tracks from our test sessions, opened up: the exact prompt, model and
            settings behind each one. Open a card to read the recipe and reuse it
            in your own session.
          </p>
        </div>
        <div className="spotlight-strip">
          {tracks.map((track) => (
            <Link
              key={track.id}
              href={`/songs/${track.id}`}
              className="spotlight-card"
              data-track="spotlight_open"
              data-track-id={track.id}
            >
              <span
                className="spotlight-art"
                style={{
                  background: `linear-gradient(150deg, ${track.gradient[0]}, ${track.gradient[1]})`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/album-cover.png" alt="" loading="lazy" decoding="async" />
                <span className="spotlight-duration">{track.duration}</span>
                <span className="spotlight-play" aria-hidden="true">
                  <Icon name="play" size={14} />
                </span>
              </span>
              <strong>{track.title}</strong>
              <small>
                {track.genre} · {track.bpm} BPM
              </small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
