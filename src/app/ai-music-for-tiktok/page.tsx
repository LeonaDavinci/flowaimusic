import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { UseCasePage, type UseCaseData } from "@/components/UseCasePage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "AI Music for TikTok — Hooks, Trends & Short-Form Sound | Flow AI Music",
  description:
    "Make short-form sound for TikTok: a strong first-second hook, loopable beds and voiceover-friendly instrumentals from a plain-language brief.",
  path: "/ai-music-for-tiktok",
  type: "article",
  keywords: [
    "AI music for TikTok",
    "TikTok background music generator",
    "AI music for short form video",
    "TikTok sound creator",
  ],
});

const data: UseCaseData = {
  slug: "/ai-music-for-tiktok",
  eyebrow: "Music for creators",
  h1: "AI music for TikTok, built for the first two seconds.",
  intro:
    "Short-form rewards a clear hook and a loop that does not get old. Describe the energy you want and get a track you can cut, loop and reuse across a series.",
  readTime: "6 min",
  headline: "How to make AI music for TikTok",
  metaDescription:
    "A practical guide to generating TikTok music: hooks that land in two seconds, loops that work, sound for voiceovers, and export settings for short-form video.",
  whyHeading: "Why short-form needs different music",
  why: [
    "A TikTok clip is judged almost immediately. The first sound a viewer hears decides whether they keep watching, so the opening of your track has to arrive fast — no thirty-second intro before the good part.",
    "Short clips also get repeated. A loop with an awkward ending or a sudden drop in energy becomes distracting on the third replay. The useful target is a groove with an even dynamic level and an ending you can fade or cut cleanly.",
    "Many short-form videos carry spoken commentary. That makes an instrumental with room under the voice more useful than a busy vocal song, even when the vibe is energetic.",
  ],
  durationHeading: "How long should the music be?",
  duration: [
    "Think in two layers: a short hook for the opening and a bed for the rest of the clip. Generate one track with a strong intro and reuse its first bars as the hook; let the continuation carry the body.",
    "The model produces a full arrangement at its default length. Short-form editors usually take a slice — aim for a section with a stable groove rather than a long build that never resolves inside the clip.",
  ],
  durationRows: [
    { label: "Hook / first cut", value: "1–3 seconds, strongest element first" },
    { label: "Standard clip", value: "7–15 seconds of a steady groove" },
    { label: "Storytime / tutorial", value: "20–60 second quiet instrumental bed" },
    { label: "Loop", value: "Pick a section whose last bar matches its first" },
  ],
  styleHeading: "Picking a sound that stops the scroll",
  style: [
    "Name the energy and the texture, not a famous track. 'Phonky bass, tight drums, playful, instrumental' gives a generator something specific to work with and stays clear of copyright issues.",
    "For a series, reuse the same style description with one variable changed. Consistent sonic branding is more recognisable in a feed than a completely new track every time.",
  ],
  prompts: [
    "A 2 second hook for a short-form video: punchy bass pluck and a handclap, playful and bright, instrumental, starts immediately.",
    "A 15 second funky lo-fi loop, dusty drums and warm keys, steady groove with no big build, instrumental, easy to repeat.",
    "A calm 45 second study-tip bed, soft piano and vinyl texture, very low density, instrumental, space for a voiceover.",
  ],
  clashHeading: "Making room for voice and trend audio",
  clash: [
    "If you talk over the clip, ask for an instrumental explicitly, then keep the rhythm section simple. Complex melodies compete with speech even at low volume.",
    "If you plan to layer a trending sound on top, use your generated track as a subtle bed rather than a second lead. Two hooks fighting for attention will lose the viewer.",
  ],
  clashPoints: [
    "Put the strongest sound in the first second; skip the slow intro.",
    "Use instrumental beds under spoken commentary.",
    "Choose even dynamics for anything you intend to loop.",
    "Cut on a beat in the editor so the loop point is not audible.",
  ],
  workflowHeading: "From brief to posted clip",
  workflow: [
    { title: "Decide the hook", text: "Write the one sound you want the viewer to hear in the first second." },
    { title: "Generate two takes", text: "Ask for a punchy version and a quieter bed, then listen on a phone speaker." },
    { title: "Pick the loop", text: "Choose a section with a steady groove and a clean cut point." },
    { title: "Download", text: "Export the take you kept and mix it under the voice at a low level." },
    { title: "Check reuse rights", text: "A paid plan includes commercial use; confirm the scope before posting branded content." },
  ],
  downloadHeading: "Export settings for short-form",
  download: [
    "MP3 is available on every plan and is fine for social upload. If you are continuing in an editor or need cleaner looping, higher plans add WAV and separated stems.",
    "Keep the prompt with the exported file. When a clip performs well, the same brief is the fastest way to make a companion video that sounds like part of the same series.",
  ],
  downloadPoints: [
    "One generation uses roughly 16–18 credits depending on the model.",
    "Monthly credits and downloads reset each billing period; unused allowance does not carry over.",
    "A free account gets one song to try the workflow.",
    "Music video generation is a planned feature and is not available yet.",
  ],
  faqs: [
    {
      q: "Can I use generated music in TikTok videos?",
      a: "Paid Flow AI Music plans include a commercial use licence. Check the terms for the exact scope, especially if the clip promotes a product.",
    },
    {
      q: "How do I make a hook that lands immediately?",
      a: "Say 'starts immediately' in the brief and describe a single strong element — a bass pluck, a clap, a synth stab. Avoid asking for a slow build.",
    },
    {
      q: "What is the best length for a TikTok bed?",
      a: "Most clips use 7–15 seconds of a steady groove. Longer commentary clips use a quiet instrumental under the whole voiceover.",
    },
    {
      q: "Can I loop the generated track?",
      a: "Yes. Choose a section whose ending flows into its beginning and cut on the beat in your editor.",
    },
  ],
  ctaTitle: "Make the sound of your next clip.",
  ctaSubtitle: "One free song to try the workflow — describe the hook and hear it back.",
};

export default function Page() {
  return <UseCasePage data={data} />;
}
