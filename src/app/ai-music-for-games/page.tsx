import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { UseCasePage, type UseCaseData } from "@/components/UseCasePage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "AI Music for Games — Loops, Themes & Ambience | Flow AI Music",
  description:
    "Generate game music from a brief: seamless ambience, menu loops, combat themes and character motifs, with stems for further editing in your engine or DAW.",
  path: "/ai-music-for-games",
  type: "article",
  keywords: [
    "AI music for games",
    "game music generator",
    "royalty free game music",
    "AI ambient music for games",
  ],
});

const data: UseCaseData = {
  slug: "/ai-music-for-games",
  eyebrow: "Music for creators",
  h1: "AI music for games, from menu to boss fight.",
  intro:
    "Games need music that behaves: loops that do not jar, themes that identify a character, and ambience that can sit under effects for minutes. Describe the world and generate each layer separately.",
  readTime: "8 min",
  headline: "How to make AI music for games",
  metaDescription:
    "A practical guide to generating game music: loopable ambience, menu and combat themes, prompts for game worlds, and exporting stems for engine integration.",
  whyHeading: "Why game music is a different problem",
  why: [
    "A game never plays a track from start to finish in the way a listener plays a song. Players loop a level for twenty minutes, trigger a combat cue mid-phrase, and leave the menu screen at random moments. The music has to survive all of that.",
    "The practical answer is a set of short, purposeful layers rather than one long composition: an ambient bed for exploration, a menu loop, a tension layer for encounters, and a short sting for rewards. Each layer can be generated from its own brief.",
    "You also need rights you can ship with. Paid Flow AI Music plans include a commercial use licence; read the terms and the platform's own rules before including generated audio in a distributed game.",
  ],
  durationHeading: "Length and looping for game scenes",
  duration: [
    "Ask for a consistent dynamic level when you need a loop. A track with a large build will sound odd when it restarts, so describe an even texture for exploration and save the dramatic arc for a one-shot cutscene.",
    "Generate more material than you need, then select the section that loops cleanly in your engine. Most game engines let you set loop points; pick a passage where the last bar resolves into the first.",
  ],
  durationRows: [
    { label: "Exploration ambience", value: "Even texture, 60–120 seconds, seamless loop" },
    { label: "Menu / inventory", value: "30–60 seconds, low dynamics" },
    { label: "Combat / encounter", value: "30–90 seconds, stronger pulse" },
    { label: "Reward / UI sting", value: "2–6 seconds, one clear gesture" },
  ],
  styleHeading: "Building a sound for your world",
  style: [
    "Write the setting before the genre. 'Cold ruined city, wind through metal, distant low drone' tells a generator more than 'dark electronic', and it keeps different areas of the game distinct.",
    "Give recurring characters or factions a fixed set of style words — instrument, tempo range, mood — and reuse them for every cue tied to that group. That is how a small set of generated tracks becomes a recognisable score.",
  ],
  prompts: [
    "Seamless exploration ambience for a rain-soaked forest at night, soft pads, distant strings, no strong beat, even dynamics, instrumental, loops cleanly.",
    "A tense 45 second encounter loop for a sci-fi corridor, pulsing low synth, tight metallic percussion, steady intensity, instrumental, no long build.",
    "A warm 30 second menu theme for a cosy farming game, plucked strings and light woodwind, gentle and optimistic, instrumental, even loop.",
    "A 3 second reward sting, bright harp glide and a soft chime, celebratory but short, instrumental.",
  ],
  clashHeading: "Mixing music under gameplay",
  clash: [
    "Game audio competes with footsteps, effects and dialogue. Keep the frequency range of the bed simple and leave the middle clear when character speech is likely.",
    "Use stems where your workflow supports them: a bed without drums under dialogue scenes, a percussion layer you can bring in during combat. Higher plans include stem export for this reason.",
  ],
  clashPoints: [
    "Generate an instrumental by default; keep vocals for cutscenes and end credits.",
    "Ask for even dynamics on anything that loops for minutes.",
    "Leave the midrange open when dialogue or important effects need to cut through.",
    "Prepare a quieter alternate take for menus and pause screens.",
  ],
  workflowHeading: "From world description to engine",
  workflow: [
    { title: "List your scenes", text: "Write down the areas, states and UI moments that need music." },
    { title: "Write one brief per layer", text: "Describe the setting and the job of the track, not a reference artist." },
    { title: "Generate and audition", text: "Create two candidates per layer and listen in the game, not in isolation." },
    { title: "Set loop points", text: "Pick a passage that restarts cleanly and mark it in your engine." },
    { title: "Export and check rights", text: "Download MP3 or WAV/stems, then confirm commercial use before shipping." },
  ],
  downloadHeading: "Exporting for your engine",
  download: [
    "MP3 is included on all plans and is usually sufficient for prototypes. Released games often benefit from WAV, and separated stems let you mix layers dynamically in the engine.",
    "Store the prompt next to the audio file. When a level gets a revision, regenerating from the original description is faster and more consistent than starting over.",
  ],
  downloadPoints: [
    "One generation uses 24–35 credits depending on the model (M1 24, M2 29, M3 35).",
    "Monthly credits and downloads reset each billing period and do not roll over.",
    "A free account gets one song to test a cue before choosing a plan.",
    "Music video generation is a planned feature and is not available yet.",
  ],
  faqs: [
    {
      q: "Can I ship generated music in a game I sell?",
      a: "Paid plans include a commercial use licence. Read the terms for the exact scope and your platform's requirements before distribution.",
    },
    {
      q: "How do I make a track loop seamlessly?",
      a: "Ask for even dynamics and an instrumental bed, then choose a section in your engine where the ending flows into the beginning. Cut on the beat.",
    },
    {
      q: "Can I get stems to mix combat and ambient layers?",
      a: "Higher plans add WAV and separated stems. Check the pricing page for the tier that includes them.",
    },
    {
      q: "Is there a free way to try a game cue?",
      a: "Yes. A free account gets one song generation so you can test the prompt workflow before subscribing.",
    },
  ],
  ctaTitle: "Score your world, one scene at a time.",
  ctaSubtitle: "Describe the setting, hear a cue, and iterate until it fits the level.",
};

export default function Page() {
  return <UseCasePage data={data} />;
}
