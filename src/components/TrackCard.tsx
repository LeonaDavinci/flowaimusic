import type { Track } from "@/lib/content";
import { PlayButton } from "./PlayButton";
import { Icon } from "./Icons";

export function TrackCard({ track }: { track: Track }) {
  return (
    <article className="track-card">
      <div
        className="track-cover-lg"
        style={{
          background: `linear-gradient(135deg, ${track.gradient[0]}, ${track.gradient[1]})`,
        }}
      >
        <PlayButton trackId={track.id} title={track.title} />
        <span className="track-duration">{track.duration}</span>
      </div>
      <div className="track-body">
        <div className="track-title">
          <h3>{track.title}</h3>
          <span className="pill">AI</span>
        </div>
        <p className="track-prompt">{track.prompt}</p>
        <div className="track-tags">
          <span className="tag">{track.genre}</span>
          <span className="tag">{track.bpm} BPM</span>
        </div>
        <div className="track-stats">
          <span>
            by <b>@{track.creator}</b>
          </span>
          <span>
            <Icon name="play" size={12} style={{ display: "inline-block", verticalAlign: "-2px" }} /> {track.plays}
            {"  "}
            <Icon name="heart" size={12} style={{ display: "inline-block", verticalAlign: "-2px" }} /> {track.likes}
          </span>
        </div>
      </div>
    </article>
  );
}
