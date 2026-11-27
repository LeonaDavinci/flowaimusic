import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { UseCasePage, type UseCaseData } from "@/components/UseCasePage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "AI Music for YouTube Videos — Background Music From a Brief | Flow AI Music",
  description:
    "Make YouTube background music that fits your video length and tone: intro stingers, vlog beds and outro music from a plain-language brief. Listen before you publish.",
  path: "/ai-music-for-youtube",
  type: "article",
  keywords: [
    "AI music for YouTube videos",
    "YouTube background music generator",
    "royalty free music for YouTube",
    "AI intro music maker",
  ],
});

const data: UseCaseData = {
  slug: "/ai-music-for-youtube",
  eyebrow: "Music for creators",
  h1: "AI music for YouTube videos, made to fit the cut.",
  intro:
    "Describe the mood of your video once and get a track with a real intro, build and ending — then trim it to the length your edit actually needs.",
  readTime: "7 min",
  headline: "How to make AI music for YouTube videos",
  metaDescription:
    "A practical guide to generating YouTube background music: the right length for intros, vlogs and outros, prompts that fit your edit, and how to keep music under narration.",
  whyHeading: "Why YouTube needs music that fits the cut",
  why: [
    "A YouTube video is a sequence of scenes with different jobs: a short intro that sets a promise, a long middle that carries information, and an outro that asks for the next click. One loop played under all three usually feels wrong.",
    "The practical target is a track with structure — an opening, a development and a landing — that you can shorten or extend without the arrangement falling apart. That is what a prompt-driven generator is for: you describe the scene, hear a take, and ask for a different shape instead of hunting a stock library for something close enough.",
    "Licensing matters as much as sound. Music you generate on a paid Flow AI Music plan comes with a commercial use licence, so the track can sit in a monetised video. Check the exact terms on the pricing page before publishing.",
  ],
  durationHeading: "How long should the music be?",
  duration: [
    "Work backwards from the edit, not from the generator. Note the length of each segment — cold open, main body, outro — and generate one track per segment rather than forcing a single song to cover all of them.",
    "The generator produces a full arrangement at the model's default length. You choose where the video uses it; a short intro takes the first bars, an outro takes the last. If a segment needs less music, say so in the brief and use the opening section only.",
  ],
  durationRows: [
    { label: "Logo sting / cold open", value: "5–15 seconds of music" },
    { label: "Talking-head or vlog bed", value: "Instrumental under the whole segment" },
    { label: "Montage / travel sequence", value: "60–120 seconds, one build" },
    { label: "End screen / call to action", value: "10–25 seconds, resolving ending" },
  ],
  styleHeading: "Choosing a style that fits your channel",
  style: [
    "A good brief names three things: genre, mood, and what the music must not do. 'Warm acoustic underscore, curious rather than sad, instrumental, leave space for voice' will beat a long list of artist names.",
    "Match intensity to the editing pace. Fast cuts need a track with a steady pulse; slow documentary scenes need long notes and fewer drums. If your channel has a recognisable sound, reuse the same style wording across videos so the music becomes part of the brand.",
  ],
  prompts: [
    "A 15 second upbeat logo intro, bright plucks and a short chord lift, no vocals, clean ending on a major chord.",
    "Warm lo-fi underscore for a daily vlog, soft keys and light brushes, instrumental, steady groove, nothing in the midrange that fights speech.",
    "A 90 second cinematic travel montage bed, slow build from solo piano to wide strings and drums, instrumental, triumphant last 10 seconds.",
  ],
  clashHeading: "Keeping music out of the way of speech",
  clash: [
    "The most common YouTube mistake is music competing with the voice track. Generate an instrumental by asking for it in plain language, then keep the arrangement simple where narration is dense.",
    "After export, lower the music bed in your editor whenever someone speaks. This is a mixing step, not a generation step — no generator can read where your voice sits in the timeline.",
  ],
  clashPoints: [
    "Ask for 'instrumental, no vocals' whenever a voiceover is present.",
    "Choose sparse arrangements (keys, pads, brushes) for narration-heavy scenes.",
    "Reserve the busy, loud section for a montage or an empty screen.",
    "Keep a second, quieter take in case the first mix still crowds the dialogue.",
  ],
  workflowHeading: "From prompt to published video",
  workflow: [
    { title: "Write the brief", text: "Note the video length, the emotion you want and whether there is speech." },
    { title: "Generate two takes", text: "Create one safe bed and one with a stronger hook, then listen with the rough cut." },
    { title: "Revise the section", text: "If only the chorus or the ending is wrong, describe that change instead of regenerating everything." },
    { title: "Download and mix", text: "Export the take you kept, drop it under the video and duck it under narration." },
    { title: "Check the licence", text: "Confirm your plan includes commercial use before you publish a monetised video." },
  ],
  downloadHeading: "Downloading and reusing your tracks",
  download: [
    "Every paid plan includes a monthly song download allowance, and MP3 is supported on all plans — the allowance is listed on the pricing page. Higher tiers add WAV and separated stems if you want to continue in a DAW.",
    "Save the prompt alongside the file. When a series needs a consistent sound, the fastest route is to reuse the wording with one small change rather than starting from scratch.",
  ],
  downloadPoints: [
    "One generation uses roughly 16–18 credits depending on the model.",
    "Monthly credits and downloads reset at the start of each billing period and do not roll over.",
    "A free account gets one song to test the workflow before choosing a plan.",
    "Music video generation is a planned feature and is not available yet.",
  ],
  faqs: [
    {
      q: "Can I use the music in a monetised YouTube video?",
      a: "Paid Flow AI Music plans include a commercial use licence. The free take is for trying the tool; check the pricing page and terms for the exact scope before publishing.",
    },
    {
      q: "How do I get music that is exactly my video's length?",
      a: "Generate a full arrangement and use the section that fits your edit. For a precise short sting, describe the length in the brief and take the opening bars.",
    },
    {
      q: "Will the music clash with my voiceover?",
      a: "Ask for an instrumental with space for voice, pick a sparse arrangement, and lower the music level under narration in your editor.",
    },
    {
      q: "Can I get separate stems for my mix?",
      a: "Higher plans add WAV and stem export. See the pricing page for which tier includes them.",
    },
  ],
  ctaTitle: "Your next video needs a soundtrack.",
  ctaSubtitle: "Describe the scene, hear a take, and cut it to fit — one free song to start.",
};

export default function Page() {
  return <UseCasePage data={data} />;
}
