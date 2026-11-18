"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { PERSONAS } from "@/lib/content";
import { Icon } from "./Icons";

const PERSONA_BRIEFS: Record<string, string> = {
  creator: "A 60 second upbeat track for a travel vlog, bright and clean at the end",
  fun: "A ridiculous disco song about a cat who keeps stealing socks",
  artist: "A sparse neo-soul instrumental at 92 BPM with room for a lead vocal",
  producer: "A deep house groove with swung hats and a rolling sub bass line",
};

export function HeroComposer() {
  const router = useRouter();
  const [persona, setPersona] = useState<string>("creator");
  const [brief, setBrief] = useState("");

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const text = brief.trim() || PERSONA_BRIEFS[persona];
    router.push(
      `/studio?brief=${encodeURIComponent(text)}&persona=${encodeURIComponent(persona)}`,
    );
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") submit();
  };

  return (
    <>
      <div className="persona-row" role="group" aria-label="I am a...">
        {PERSONAS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`persona-chip${persona === item.id ? " is-active" : ""}`}
            aria-pressed={persona === item.id}
            onClick={() => setPersona(item.id)}
            data-track="persona_select"
          >
            {item.label}
          </button>
        ))}
      </div>

      <form className="composer" onSubmit={submit}>
        <label className="sr-only" htmlFor="hero-brief">
          Describe the song you want to make
        </label>
        <textarea
          id="hero-brief"
          className="composer-input"
          value={brief}
          onChange={(event) => setBrief(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={PERSONA_BRIEFS[persona]}
          rows={2}
        />
        <div className="composer-actions">
          <span className="composer-hint">Genre, mood, tempo, lyrics — anything goes.</span>
          <button
            type="submit"
            className="btn btn-primary"
            data-track="brief_submit"
            data-placement="hero"
          >
            Create my song <Icon name="arrow" size={17} />
          </button>
        </div>
      </form>
    </>
  );
}
