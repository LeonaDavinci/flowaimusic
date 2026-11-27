import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { UseCasePage, type UseCaseData } from "@/components/UseCasePage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "AI Music for Podcasts — Intros, Outros & Beds | Flow AI Music",
  description:
    "Make podcast intro music, outro stingers and low background beds from a brief. Keep the midrange clear for speech and generate a consistent theme for every episode.",
  path: "/ai-music-for-podcasts",
  type: "article",
  keywords: [
    "AI music for podcasts",
    "podcast intro music generator",
    "podcast background music",
    "royalty free podcast music",
  ],
});

const data: UseCaseData = {
  slug: "/ai-music-for-podcasts",
  eyebrow: "Music for creators",
  h1: "AI music for podcasts, quiet where it counts.",
  intro:
    "A good podcast theme is recognisable in ten seconds and then gets out of the way. Generate an intro, an outro and a speech-friendly bed from the same style description.",
  readTime: "6 min",
  headline: "How to make AI music for podcasts",
  metaDescription:
    "A practical guide to podcast music: intro and outro length, background beds that stay under speech, prompts for a consistent theme, and export tips.",
  whyHeading: "Why podcast music is mostly restraint",
  why: [
    "Podcasts are a speech medium. Music appears at the edges — a short intro, a transition, an outro — and occasionally as a very quiet bed under a monologue. The best description of a good podcast track is that you barely notice it while listening.",
    "That changes what you generate for. You want a clear melodic identity in the intro, a shorter version for transitions, and an instrumental bed with no busy midrange for anything under speech.",
    "Because the same theme is used episode after episode, a consistent brief matters more than a single impressive take. Save the wording that worked and reuse it with small variations.",
  ],
  durationHeading: "How long should podcast music be?",
  duration: [
    "Podcast intros are short by design: long enough to set a mood and say the show name, short enough that listeners can start the episode. Generate slightly more than you need so you have a clean place to fade out.",
    "Generate separately for each use. An intro with a strong opening, a bed with no hooks, and an outro that resolves are three briefs, not one track stretched to fit.",
  ],
  durationRows: [
    { label: "Cold open / intro", value: "10–20 seconds with a clear hook" },
    { label: "Section transition", value: "2–5 second sting" },
    { label: "Background bed", value: "Low-level instrumental, minimal midrange" },
    { label: "Outro / credits", value: "15–30 seconds with a resolving ending" },
  ],
  styleHeading: "Building a theme that survives 50 episodes",
  style: [
    "Pick two or three instruments and one mood word, then keep them fixed. A sparse theme with a distinctive instrument is easier to recognise at low volume than a dense arrangement.",
    "Match the genre to the show, not to your personal taste: a news show wants precision and momentum, a conversational interview wants warmth and space.",
  ],
  prompts: [
    "A 12 second podcast intro, warm electric piano and a soft bass line with one short synth hook, confident and calm, instrumental, leaves space for a voice to start.",
    "A 3 second transition sting, two notes on plucked strings and a light click, neutral and quick, instrumental.",
    "A quiet 60 second background bed for an interview, low pad and soft pulse, no melody in the midrange, instrumental, even level.",
    "A 20 second outro theme, the same electric piano and bass as the intro, resolving gently, instrumental.",
  ],
  clashHeading: "Keeping the bed under the voice",
  clash: [
    "The main problem with podcast music is frequency collision: melodic material in the same range as a voice makes both harder to hear. Ask for a low pad and a soft pulse, and avoid anything with a lead melody under speech.",
    "Set the final level in your editor, not in the generator. The generated track is a source; the mix is your decision.",
  ],
  clashPoints: [
    "Ask for 'no melody in the midrange' on any bed that sits under speech.",
    "Use instrumental cues by default; vocals are for the intro only if the show wants them.",
    "Keep an even level with no build on background beds.",
    "Fade the music in and out around spoken sections rather than cutting abruptly.",
  ],
  workflowHeading: "From show identity to episode file",
  workflow: [
    { title: "Describe the show", text: "Write three words for the mood and two instruments that define the theme." },
    { title: "Generate intro and outro", text: "Use the same style wording with different lengths and endings." },
    { title: "Add the transition and bed", text: "Generate a short sting and a quiet instrumental for under speech." },
    { title: "Save the prompts", text: "Keep the exact wording so future episodes sound like the same show." },
    { title: "Export and mix", text: "Download MP3 or WAV, then set levels in your editor." },
  ],
  downloadHeading: "Exporting for your episodes",
  download: [
    "MP3 is available on every plan and is the normal format for a podcast episode. Higher plans add WAV and stems if you want a cleaner master or want to mix music layers separately.",
    "Keep a copy of the approved intro, outro and bed in your own library so every episode uses the same audio rather than a fresh take that drifts in style.",
  ],
  downloadPoints: [
    "One generation uses 24–35 credits depending on the model (M1 24, M2 29, M3 35).",
    "Monthly credits and downloads reset each billing period and do not roll over.",
    "A free account gets one song to test your show's theme before subscribing.",
    "Music video generation is a planned feature and is not available yet.",
  ],
  faqs: [
    {
      q: "Can I use generated music in a monetised podcast?",
      a: "Paid plans include a commercial use licence. Check the terms for the exact scope before using the music in ads or branded content.",
    },
    {
      q: "How short should a podcast intro be?",
      a: "Ten to twenty seconds is typical. Generate a slightly longer take and fade it under the first spoken line.",
    },
    {
      q: "What prompt keeps music out of the way of speech?",
      a: "Ask for an instrumental bed with no melody in the midrange, a low pad and a soft pulse, and an even level with no build.",
    },
    {
      q: "Can I keep the same theme for every episode?",
      a: "Yes. Save the exact prompt you approved and reuse it; the same wording produces a consistent style across episodes.",
    },
  ],
  ctaTitle: "Give your show a sound.",
  ctaSubtitle: "Describe the mood once — intro, sting and outro from the same brief.",
};

export default function Page() {
  return <UseCasePage data={data} />;
}
