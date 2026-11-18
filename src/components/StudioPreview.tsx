import { Icon } from "./Icons";
import { Waveform } from "./Waveform";

export function StudioPreview() {
  return (
    <div className="studio-card" aria-label="Preview of the FlowAI Music studio">
      <div className="studio-card-top">
        <span>FlowAI Studio · Session 04</span>
        <span className="studio-badge">
          <i /> Live demo
        </span>
      </div>

      <div className="chat-line is-user">
        <div className="chat-bubble">
          A warm indie pop song about driving home at sunset. Keep the chorus
          big.
        </div>
      </div>

      <div className="chat-line">
        <span className="chat-avatar">F</span>
        <div className="chat-bubble">
          Got it — 104 BPM, jangly guitars, a wide singalong hook. Writing the
          arrangement now…
        </div>
      </div>

      <div className="now-playing">
        <div className="now-playing-head">
          <span className="cover-xs" aria-hidden="true" />
          <div>
            <strong>Paper Planes at Dawn</strong>
            <small>Indie pop · 3:04 · 104 BPM</small>
          </div>
          <span className="play-orb" aria-hidden="true">
            <Icon name="play" size={18} />
          </span>
        </div>
        <Waveform />
      </div>

      <div className="studio-card-foot">
        <span>Vocals · Drums · Bass · Instruments</span>
        <span>Take 2 of 4</span>
      </div>
    </div>
  );
}
