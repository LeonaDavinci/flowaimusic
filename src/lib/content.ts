/**
 * Central demo content for Flow AI Music.
 * All copy, track names, creators and artwork are original demo data.
 */

export const SITE_URL = "https://www.flowaimusic.com";
export const SITE_NAME = "Flow AI Music";
export const SITE_TAGLINE = "Turn the song in your head into a real one.";

export type Genre =
  | "All"
  | "Pop"
  | "Electronic"
  | "R&B"
  | "Lo-fi"
  | "Cinematic"
  | "Hip-Hop";

export const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/guides/ai-music-generator", label: "Guides" },
];

export const FOOTER_GROUPS = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/explore", label: "Explore songs" },
      { href: "/ai-music-creator", label: "AI music creator" },
      { href: "/guides/ai-music-generator", label: "Getting started" },
    ],
  },
  {
    title: "Create",
    links: [
      { href: "/studio", label: "Create music" },
      { href: "/studio?brief=Make%20a%20music%20video", label: "Create a music video" },
      { href: "/library/playlists", label: "Build a playlist" },
      { href: "/library/spaces", label: "Build a Space" },
    ],
  },
  {
    title: "Library",
    links: [
      { href: "/library", label: "My library" },
      { href: "/library/videos", label: "Videos" },
      { href: "/library/spaces", label: "Spaces" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms of service" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/sitemap.xml", label: "Sitemap" },
    ],
  },
];

export const PERSONAS = [
  { id: "creator", label: "Music creator" },
  { id: "fun", label: "Just for fun" },
  { id: "artist", label: "Artist" },
  { id: "producer", label: "Producer" },
] as const;

export type QuickStart = {
  id: string;
  title: string;
  hint: string;
  brief: string;
  tone: string;
};

export const QUICK_STARTS: QuickStart[] = [
  {
    id: "song",
    title: "Make music for fun",
    hint: "Any genre, any mood",
    brief: "A bright, feel-good indie pop song about a spontaneous road trip",
    tone: "violet",
  },
  {
    id: "video",
    title: "Score my video",
    hint: "Match the cut & duration",
    brief: "A 60 second cinematic underscore for a travel montage, building to a warm finish",
    tone: "coral",
  },
  {
    id: "vocal",
    title: "Backing track for my vocal",
    hint: "Leave space for vocals",
    brief: "A sparse neo-soul instrumental at 92 BPM with rhodes keys and soft drums",
    tone: "cyan",
  },
  {
    id: "remix",
    title: "Rework a track",
    hint: "Replace a section",
    brief: "Remix the chorus only: bigger drums, wider synths, keep the original tempo",
    tone: "sun",
  },
  {
    id: "fx",
    title: "Design a sound",
    hint: "FX, foley & instruments",
    brief: "A shimmering glassy pluck instrument and a short riser transition",
    tone: "lime",
  },
];

export type Track = {
  id: string;
  title: string;
  prompt: string;
  creator: string;
  genre: Exclude<Genre, "All">;
  plays: string;
  likes: string;
  duration: string;
  bpm: number;
  gradient: [string, string];
};

export const TRACKS: Track[] = [
  {
    id: "sunday-static",
    title: "Sunday Static",
    prompt: "Warm tape hiss, lazy rhodes chords, brushed drums, no vocals, 76 BPM",
    creator: "mira.wav",
    genre: "Lo-fi",
    plays: "128.4k",
    likes: "6.2k",
    duration: "2:48",
    bpm: 76,
    gradient: ["#ffd36e", "#ff7a59"],
  },
  {
    id: "neon-cartography",
    title: "Neon Cartography",
    prompt: "Driving synthwave with arpeggiated bass, city-at-night energy, 118 BPM",
    creator: "orbitkid",
    genre: "Electronic",
    plays: "96.1k",
    likes: "4.8k",
    duration: "3:12",
    bpm: 118,
    gradient: ["#7b5cff", "#00c2ff"],
  },
  {
    id: "paper-planes",
    title: "Paper Planes at Dawn",
    prompt: "Breezy acoustic pop, female vocal, hand claps, hopeful chorus",
    creator: "juniperlane",
    genre: "Pop",
    plays: "212.7k",
    likes: "11.3k",
    duration: "3:04",
    bpm: 104,
    gradient: ["#ff9ec4", "#ffc44d"],
  },
  {
    id: "velvet-detour",
    title: "Velvet Detour",
    prompt: "Late-night R&B, breathy male vocal, fretless bass, slow pocket",
    creator: "softcircuit",
    genre: "R&B",
    plays: "74.9k",
    likes: "3.9k",
    duration: "3:36",
    bpm: 84,
    gradient: ["#8f6bff", "#ff6f91"],
  },
  {
    id: "glasshouse",
    title: "Glasshouse",
    prompt: "Minimal piano to swelling strings, documentary trailer arc, instrumental",
    creator: "halo.studio",
    genre: "Cinematic",
    plays: "58.2k",
    likes: "2.7k",
    duration: "2:20",
    bpm: 68,
    gradient: ["#4bc0c8", "#3b5bdb"],
  },
  {
    id: "backseat-chorus",
    title: "Backseat Chorus",
    prompt: "Group-vocal hook, jangly guitars, summer drive, singalong ending",
    creator: "thefold",
    genre: "Pop",
    plays: "143.5k",
    likes: "8.1k",
    duration: "2:56",
    bpm: 112,
    gradient: ["#ffb347", "#ff5f6d"],
  },
  {
    id: "marmalade-sky",
    title: "Marmalade Sky",
    prompt: "Dusty boom-bap textures with a soft electric piano loop, 82 BPM",
    creator: "lowtide",
    genre: "Lo-fi",
    plays: "41.6k",
    likes: "1.9k",
    duration: "2:31",
    bpm: 82,
    gradient: ["#ffd97d", "#a0e57c"],
  },
  {
    id: "signal-fires",
    title: "Signal Fires",
    prompt: "Glitchy breakbeat, chopped vocal textures, bright supersaw drop",
    creator: "kiteandco",
    genre: "Electronic",
    plays: "187.3k",
    likes: "9.6k",
    duration: "3:41",
    bpm: 132,
    gradient: ["#00d4ff", "#6a3cff"],
  },
  {
    id: "slow-motion-apology",
    title: "Slow Motion Apology",
    prompt: "Intimate alt-R&B, close-mic female vocal, sub bass, sparse clicks",
    creator: "noor.sings",
    genre: "R&B",
    plays: "63.8k",
    likes: "3.2k",
    duration: "3:18",
    bpm: 72,
    gradient: ["#b06cff", "#ff8fa3"],
  },
  {
    id: "cardboard-kingdom",
    title: "Cardboard Kingdom",
    prompt: "Playful boom-bap, toy piano sample, confident laid-back verses",
    creator: "paperkick",
    genre: "Hip-Hop",
    plays: "89.4k",
    likes: "4.4k",
    duration: "2:44",
    bpm: 90,
    gradient: ["#ff8a3d", "#ffd84d"],
  },
  {
    id: "atlas-unfolding",
    title: "Atlas Unfolding",
    prompt: "Orchestral build with taiko hits and a resolving piano motif",
    creator: "northline",
    genre: "Cinematic",
    plays: "112.9k",
    likes: "5.7k",
    duration: "3:52",
    bpm: 96,
    gradient: ["#5b8cff", "#22d3a6"],
  },
  {
    id: "two-left-feet",
    title: "Two Left Feet",
    prompt: "Bouncy dancehall-flavoured hip-hop, hand percussion, cheeky hook",
    creator: "sunnysideup",
    genre: "Hip-Hop",
    plays: "77.2k",
    likes: "3.6k",
    duration: "2:59",
    bpm: 102,
    gradient: ["#ffcf3f", "#ff6b45"],
  },
];

export const GENRES: Genre[] = [
  "All",
  "Pop",
  "Electronic",
  "R&B",
  "Lo-fi",
  "Cinematic",
  "Hip-Hop",
];

export type Playlist = {
  id: string;
  title: string;
  count: number;
  caption: string;
  gradient: [string, string];
};

export const PLAYLISTS: Playlist[] = [
  {
    id: "fog-harbor",
    title: "Fog Harbor",
    count: 12,
    caption: "Slow mornings, soft drums",
    gradient: ["#7b5cff", "#00c2ff"],
  },
  {
    id: "golden-afternoon",
    title: "Golden Afternoon",
    count: 8,
    caption: "Songs that feel like sunlight",
    gradient: ["#ffc44d", "#ff7a59"],
  },
  {
    id: "crystal-sky",
    title: "Crystal Sky",
    count: 15,
    caption: "Wide, weightless electronic",
    gradient: ["#22d3a6", "#4b7bff"],
  },
];

export type Capability = {
  id: string;
  title: string;
  description: string;
  tone: string;
};

export const CAPABILITIES: Capability[] = [
  {
    id: "remix",
    title: "Replace any section",
    description: "Redo the chorus, extend the outro, or swap a verse without starting over.",
    tone: "violet",
  },
  {
    id: "fx",
    title: "Audio effects",
    description: "Reverb, tape saturation, filtering and more, described in plain language.",
    tone: "coral",
  },
  {
    id: "stems",
    title: "Stem split",
    description: "Pull vocals, drums, bass and instruments apart for the next edit.",
    tone: "cyan",
  },
  {
    id: "credits",
    title: "Daily credits",
    description: "A fresh free allowance every day, so experimenting never feels expensive.",
    tone: "sun",
  },
  {
    id: "lyrics",
    title: "Lyrics that land",
    description: "Structure-aware writing with real verses, hooks and bridges.",
    tone: "lime",
  },
  {
    id: "downloads",
    title: "Unlimited downloads",
    description: "Export every take you love, in the formats your workflow needs.",
    tone: "pink",
  },
];

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  credits: string;
  concurrency: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthly: 0,
    credits: "Daily free credits",
    concurrency: "1 generation at a time",
    blurb: "For the curious. Make real songs before deciding anything.",
    features: [
      "Daily refreshed credits",
      "Full-length song generation",
      "Chat-based editing",
      "Standard downloads",
    ],
  },
  {
    id: "creator",
    name: "Creator",
    monthly: 9,
    credits: "2,500 credits / mo (~400 songs)",
    concurrency: "4 generations at a time",
    blurb: "For music creators and everyday makers.",
    features: [
      "2,500 monthly credits",
      "4 concurrent generations",
      "Stem split & audio effects",
      "Music video export",
      "Commercial use licence",
    ],
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 24,
    credits: "9,000 credits / mo (~1,500 songs)",
    concurrency: "8 generations at a time",
    blurb: "For artists shipping music on a schedule.",
    features: [
      "9,000 monthly credits",
      "8 concurrent generations",
      "Priority generation queue",
      "WAV & stems export",
      "Custom Spaces",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    monthly: 59,
    credits: "25,000 credits / mo (~4,000 songs)",
    concurrency: "16 generations at a time",
    blurb: "For teams and producers running sessions.",
    features: [
      "25,000 monthly credits",
      "16 concurrent generations",
      "Team workspace & shared library",
      "Early access to new models",
      "Priority support",
    ],
  },
];

export const COMPARE_ROWS = [
  { label: "Monthly credits", values: ["Daily top-ups", "2,500", "9,000", "25,000"] },
  { label: "Concurrent generations", values: ["1", "4", "8", "16"] },
  { label: "Full-length songs", values: ["Yes", "Yes", "Yes", "Yes"] },
  { label: "Stem split & effects", values: ["Preview", "Yes", "Yes", "Yes"] },
  { label: "Music video export", values: ["—", "Yes", "Yes", "Yes"] },
  { label: "Commercial use", values: ["—", "Yes", "Yes", "Yes"] },
  { label: "Team workspace", values: ["—", "—", "—", "Yes"] },
];

export const FAQS = [
  {
    q: "Is Flow AI Music free to start?",
    a: "Yes. The Free plan gives you a daily refreshed credit allowance and no credit card is required. You can make and download full songs before upgrading.",
  },
  {
    q: "Do I own the songs I make?",
    a: "You keep the rights to the original music you create. Paid plans include a commercial use licence; check the terms page for the exact scope of the Demo and production services.",
  },
  {
    q: "Can I edit just one part of a song?",
    a: "Yes. Describe the section you want to change and the studio replaces or extends only that part, keeping the rest of the arrangement intact.",
  },
  {
    q: "What formats can I export?",
    a: "Every plan can download MP3. Creator and above add WAV and separated stems, plus music video export.",
  },
  {
    q: "What are Spaces?",
    a: "Spaces are small, playable audio tools you describe in words — a keyboard, a drum machine, a game, or a custom effect chain — and then share with a link.",
  },
  {
    q: "Does the site work without an account?",
    a: "The demo on this site works without signing in: you can try the prompt composer, play the mini keyboard and browse the explore feed. Saving to a library requires an account in the production release.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I describe the cut of my video and get a track that actually lands on the beat. It replaced an entire afternoon of library searching.",
    name: "Dana R.",
    role: "Music creator",
    tone: "violet",
  },
  {
    quote:
      "Being able to say 'redo only the bridge' is the difference between a toy and a tool. I use it for every writing session now.",
    name: "Miles T.",
    role: "Singer-songwriter",
    tone: "coral",
  },
  {
    quote:
      "The tiny keyboard demo sold me. Ten seconds in I was making noise instead of reading a feature list.",
    name: "Priya S.",
    role: "Producer",
    tone: "cyan",
  },
];

export const WORKFLOW = [
  {
    step: "01",
    title: "Describe it",
    text: "Type the genre, mood, tempo or the exact scene you are scoring.",
  },
  {
    step: "02",
    title: "Shape it",
    text: "Keep talking. Replace a section, change the vocal, split the stems.",
  },
  {
    step: "03",
    title: "See it",
    text: "Turn the finished track into a directed visual, frame by frame.",
  },
  {
    step: "04",
    title: "Share it",
    text: "Publish, add it to a playlist, and let your feed learn your taste.",
  },
];

export const FEATURE_MODULES = [
  {
    id: "conversation",
    eyebrow: "01 / Create",
    title: "A studio that speaks your language",
    text: "No menus, no piano roll, no blank timeline. Tell the studio what you hear in your head and get a complete song with structure, dynamics and vocals. Keep the conversation going until every detail is right.",
    bullets: [
      "Full-length arrangements, not short loops",
      "Structure-aware lyrics and vocal delivery",
      "Tempo, key and duration you can actually steer",
    ],
    tone: "violet",
  },
  {
    id: "edit",
    eyebrow: "02 / Refine",
    title: "Change one bar, not the whole song",
    text: "Most ideas only need a small fix. Point at a section and describe the change: a wider chorus, a quieter bridge, a longer outro. The rest of your track stays exactly where you left it.",
    bullets: ["Replace & extend any section", "Remix without re-generating", "A/B every take you keep"],
    tone: "coral",
  },
  {
    id: "stems",
    eyebrow: "03 / Separate",
    title: "Take the track apart",
    text: "Split vocals, drums, bass and instruments into individual stems, then apply effects with plain-language instructions. Move the pieces into any editor when you are ready.",
    bullets: ["Vocal / drum / bass / instrument stems", "Reverb, saturation, filtering", "WAV and stem downloads"],
    tone: "cyan",
  },
  {
    id: "video",
    eyebrow: "04 / Visualise",
    title: "Direct the video yourself",
    text: "Give your song a visual world. Choose the characters, the palette and the pacing, and the studio renders a music video built around your track — no crew, no timeline.",
    bullets: ["Character and aesthetic control", "Beat-aware visual pacing", "Ready-to-share exports"],
    tone: "sun",
  },
  {
    id: "spaces",
    eyebrow: "05 / Build",
    title: "Make an instrument out of an idea",
    text: "Spaces turn a description into a playable little tool: a keyboard, a drum machine, a game, an effects rack. Open it in the browser, tweak it, and share the link.",
    bullets: ["Describe it, then play it", "No install, runs in the browser", "Shareable public URL"],
    tone: "lime",
  },
  {
    id: "community",
    eyebrow: "06 / Share",
    title: "A feed that learns your taste",
    text: "Publish songs, collect them into playlists and follow the makers you like. The more you create, the closer the studio gets to the sound you keep coming back to.",
    bullets: ["Public song pages & playlists", "Creator profiles", "Personalised recommendations"],
    tone: "pink",
  },
];

export const LIBRARY_SECTIONS = [
  {
    href: "/library/playlists",
    title: "Playlists",
    text: "Collections you have put together, ready to share.",
    tone: "violet",
  },
  {
    href: "/library/videos",
    title: "Music videos",
    text: "Visuals you directed for your own tracks.",
    tone: "coral",
  },
  {
    href: "/library/spaces",
    title: "Spaces",
    text: "Little playable tools you built from a prompt.",
    tone: "cyan",
  },
];
