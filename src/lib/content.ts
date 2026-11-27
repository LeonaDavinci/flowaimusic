/**
 * Central demo content for Flow AI Music.
 * All copy, track names, creators and artwork are original demo data.
 */

export const SITE_URL = "https://www.flowaimusic.com";
export const SITE_NAME = "Flow AI Music";
export const SITE_TAGLINE = "Turn the song in your head into a real one.";
/* Replace with the real, monitored support mailbox before going live. */
export const SUPPORT_EMAIL = "support@flowaimusic.com";

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
      { href: "/studio?brief=Make%20a%20music%20video", label: "Music video (planned)" },
      { href: "/library/playlists", label: "Build a playlist" },
      { href: "/library/spaces", label: "Build a Space" },
    ],
  },
  {
    title: "Use cases",
    links: [
      { href: "/ai-music-for-youtube", label: "Music for YouTube" },
      { href: "/ai-music-for-tiktok", label: "Music for TikTok" },
      { href: "/ai-music-for-games", label: "Music for games" },
      { href: "/ai-music-for-podcasts", label: "Music for podcasts" },
      { href: "/best-ai-music-generators", label: "Best AI music generators" },
      { href: "/compare/flow-vs-suno", label: "Flow vs Suno" },
      { href: "/compare/flow-vs-udio", label: "Flow vs Udio" },
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
    title: "Legal & safety",
    links: [
      { href: "/terms", label: "Terms of service" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/aigc", label: "AIGC use policy" },
      { href: "/models", label: "Models & technology" },
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
  /** Demo counters for the sample feed; not live engagement data. */
  plays: string;
  likes: string;
  duration: string;
  bpm: number;
  gradient: [string, string];
  /** AI-generated cover art (WebP under /covers). */
  cover?: string;
  /** Plain-language description of the sound and mood. */
  description?: string;
  /** Shareable style keyword, e.g. "Analog lo-fi / downtempo". */
  style?: string;
  /** Mood tags shown as a copyable chip group. */
  mood?: string[];
  /** Key instruments and textures named in the prompt. */
  instruments?: string[];
  /** Line-by-line reading of what each part of the prompt does. */
  promptBreakdown?: { element: string; effect: string }[];
  /** Generation settings recorded for this take. */
  settings?: {
    mode: string;
    vocals: string;
    instrumental: boolean;
    variation: string;
  };
  /** Suggested placements / use cases for the track. */
  usage?: string[];
  /** Where a listener could publish or embed the track. */
  platforms?: string[];
  /** Absolute URL of a real generated master, once one exists. */
  audioUrl?: string | null;
  /** Model that produced the take, when it came from SeeAPI. */
  model?: string;
  /** Test session the take belongs to. */
  session?: string;
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
    duration: "2:49",
    bpm: 76,
    gradient: ["#ffd36e", "#ff7a59"],
    style: "Analog lo-fi / downtempo",
    mood: ["Warm", "Lazy", "Unhurried", "Nostalgic"],
    instruments: ["Rhodes electric piano", "Brushed drums", "Tape hiss"],
    promptBreakdown: [
      { element: "Warm tape hiss", effect: "Adds analog grain and a lived-in, recorded-on-tape texture." },
      { element: "lazy rhodes chords", effect: "Sets the slow, jazzy harmonic bed at the centre of the track." },
      { element: "brushed drums", effect: "Keeps the groove soft and shuffling instead of hard-hitting." },
      { element: "no vocals", effect: "Leaves the whole track open for voiceover, lyrics or ambience." },
      { element: "76 BPM", effect: "A slow tempo — relaxed enough for study or background listening." }
    ],
    cover: "/covers/sunday-static.webp",
    description: "Slow, warm and unhurried. Tape hiss and lazy Rhodes chords drift over brushed drums — the kind of background bed that makes a quiet afternoon feel cinematic.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "None — instrumental",
      instrumental: true,
      variation: "Default (first take)",
    },
    usage: ["Study and focus playlists", "Coffee-shop and café ambience", "Calm video intros", "Podcast under-beds"],
    platforms: ["YouTube", "Spotify", "Apple Music", "Instagram Reels"],
    audioUrl: "https://assets.seeapi.com/music/task_37dfb3f27bc14726b13366e3e0532381/track_cd4c0a354a39215995040e83/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
  },
  {
    id: "neon-cartography",
    title: "Neon Cartography",
    prompt: "Driving synthwave with arpeggiated bass, city-at-night energy, 118 BPM",
    creator: "orbitkid",
    genre: "Electronic",
    plays: "96.1k",
    likes: "4.8k",
    duration: "3:00",
    bpm: 118,
    gradient: ["#7b5cff", "#00c2ff"],
    style: "Synthwave / retrowave",
    mood: ["Driving", "Energetic", "Neon", "Night-time"],
    instruments: ["Arpeggiated bass", "Analog synth leads", "Drum machine"],
    promptBreakdown: [
      { element: "Driving synthwave", effect: "Anchors the track in the neon 80s electronic palette." },
      { element: "arpeggiated bass", effect: "The repeating bass figure gives the track its forward motion." },
      { element: "city-at-night energy", effect: "Guides the arrangement toward a wide, cinematic nighttime feel." },
      { element: "118 BPM", effect: "An upbeat dance tempo that keeps the energy high without rushing." }
    ],
    cover: "/covers/neon-cartography.webp",
    description: "Driving synthwave built on an arpeggiated bassline and a glowing night-city atmosphere. Wide, energetic and made for motion — like headlights on a wet street.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "None — instrumental",
      instrumental: true,
      variation: "Default (first take)",
    },
    usage: ["Gaming streams and trailers", "Tech product videos", "Night-drive edits", "Sports highlight reels"],
    platforms: ["YouTube", "Twitch", "TikTok", "Instagram Reels"],
    audioUrl: "https://assets.seeapi.com/music/task_a5423940ecf240feb11c83e470bde8a6/track_ac491930c9430fddb2d93a49/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
  },
  {
    id: "paper-planes",
    title: "Paper Planes at Dawn",
    prompt: "Breezy acoustic pop, female vocal, hand claps, hopeful chorus",
    creator: "juniperlane",
    genre: "Pop",
    plays: "212.7k",
    likes: "11.3k",
    duration: "3:14",
    bpm: 104,
    gradient: ["#ff9ec4", "#ffc44d"],
    style: "Acoustic indie pop",
    mood: ["Breezy", "Hopeful", "Warm", "Uplifting"],
    instruments: ["Acoustic guitar", "Hand claps", "Female vocal"],
    promptBreakdown: [
      { element: "Breezy acoustic pop", effect: "Sets a light, organic, radio-friendly tone." },
      { element: "female vocal", effect: "Puts a clear human voice at the front of the arrangement." },
      { element: "hand claps", effect: "Adds a tactile, communal pulse under the chorus." },
      { element: "hopeful chorus", effect: "Shapes the emotional peak — the part that lifts and resolves." }
    ],
    cover: "/covers/paper-planes.webp",
    description: "Breezy acoustic pop with a clear female vocal, hand claps and an open, hopeful chorus. Light enough for a montage, memorable enough to carry a hook.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "Female lead",
      instrumental: false,
      variation: "Default (first take)",
    },
    usage: ["Travel vlogs", "Wedding and lifestyle edits", "Brand films", "Feel-good social clips"],
    platforms: ["YouTube", "TikTok", "Instagram", "Spotify"],
    audioUrl: "https://assets.seeapi.com/music/task_1d7c7a5d90b844a9888379fa93654785/track_bba226382e0d67980e3e87e7/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
  },
  {
    id: "velvet-detour",
    title: "Velvet Detour",
    prompt: "Late-night R&B, breathy male vocal, fretless bass, slow pocket",
    creator: "softcircuit",
    genre: "R&B",
    plays: "74.9k",
    likes: "3.9k",
    duration: "4:28",
    bpm: 84,
    gradient: ["#8f6bff", "#ff6f91"],
    style: "Late-night R&B / slow jam",
    mood: ["Intimate", "Smoky", "Slow", "Sensual"],
    instruments: ["Fretless bass", "Male vocal", "Soft drum kit"],
    promptBreakdown: [
      { element: "Late-night R&B", effect: "Sets a low-lit, after-hours mood." },
      { element: "breathy male vocal", effect: "Asks for a close, soft lead vocal rather than a powerful belt." },
      { element: "fretless bass", effect: "The smooth, sliding bassline carries most of the groove." },
      { element: "slow pocket", effect: "A relaxed, behind-the-beat feel that makes the track unhurried." }
    ],
    cover: "/covers/velvet-detour.webp",
    description: "Late-night R&B with a breathy male vocal, fretless bass and a slow pocket. Intimate and low-lit — a track that sits close to the listener.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "Male lead",
      instrumental: false,
      variation: "Default (first take)",
    },
    usage: ["Late-night radio", "Fashion films", "Slow social edits", "Podcast outro beds"],
    platforms: ["Spotify", "Apple Music", "YouTube", "SoundCloud"],
    audioUrl: "https://assets.seeapi.com/music/task_862cbd7c909c4df9bbadfe5bcc05f349/track_45afbd05b6d9789e7d0b0d8c/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
  },
  {
    id: "glasshouse",
    title: "Glasshouse",
    prompt: "Minimal piano to swelling strings, documentary trailer arc, instrumental",
    creator: "halo.studio",
    genre: "Cinematic",
    plays: "58.2k",
    likes: "2.7k",
    duration: "2:50",
    bpm: 68,
    gradient: ["#4bc0c8", "#3b5bdb"],
    style: "Minimal cinematic / documentary",
    mood: ["Patient", "Expansive", "Hopeful", "Sparse"],
    instruments: ["Piano", "String section", "Ambient textures"],
    promptBreakdown: [
      { element: "Minimal piano", effect: "Starts the piece with a single, exposed instrument." },
      { element: "swelling strings", effect: "Builds the arrangement gradually toward an emotional peak." },
      { element: "documentary trailer arc", effect: "Shapes the structure as a slow build and release." },
      { element: "instrumental", effect: "Keeps the piece usable under narration or visuals." }
    ],
    cover: "/covers/glasshouse.webp",
    description: "A minimal piano figure opens into swelling strings — a patient, documentary-style build that resolves without ever feeling forced. Instrumental throughout.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "None — instrumental",
      instrumental: true,
      variation: "Default (first take)",
    },
    usage: ["Documentary trailers", "Nonprofit and cause videos", "Cinematic title cards", "Presentation background"],
    platforms: ["YouTube", "Vimeo", "Film festivals", "Spotify"],
    audioUrl: "https://assets.seeapi.com/music/task_c6631c2c85d14781aaa08540eda766db/track_49ea6e5079f76ab2c60446a3/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
  },
  {
    id: "backseat-chorus",
    title: "Backseat Chorus",
    prompt: "Group-vocal hook, jangly guitars, summer drive, singalong ending",
    creator: "thefold",
    genre: "Pop",
    plays: "143.5k",
    likes: "8.1k",
    duration: "4:05",
    bpm: 112,
    gradient: ["#ffb347", "#ff5f6d"],
    style: "Summer indie pop / singalong",
    mood: ["Bright", "Carefree", "Social", "Nostalgic"],
    instruments: ["Jangly guitars", "Group vocals", "Hand percussion"],
    promptBreakdown: [
      { element: "Group-vocal hook", effect: "A stacked, shared chorus rather than a single lead singer." },
      { element: "jangly guitars", effect: "Bright, ringing guitar tones that define the summer feel." },
      { element: "summer drive", effect: "Sets the scene — open windows, warm light, forward motion." },
      { element: "singalong ending", effect: "Builds to a final chorus designed to be shouted back." }
    ],
    cover: "/covers/backseat-chorus.webp",
    description: "A group-vocal hook over jangly guitars and a summer-drive groove, ending in a full singalong. Bright, social and built for shared moments.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "Group / ensemble",
      instrumental: false,
      variation: "Default (first take)",
    },
    usage: ["Summer campaign videos", "Travel compilations", "Sports and team edits", "Party playlists"],
    platforms: ["YouTube", "TikTok", "Spotify", "Instagram Reels"],
    audioUrl: "https://assets.seeapi.com/music/task_fbe8091a8f4644a0b50a1c671fa6f153/track_5eaed03a0e0fb4b1a1c68fba/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
  },
  {
    id: "marmalade-sky",
    title: "Marmalade Sky",
    prompt: "Dusty boom-bap textures with a soft electric piano loop, 82 BPM",
    creator: "lowtide",
    genre: "Lo-fi",
    plays: "41.6k",
    likes: "1.9k",
    duration: "2:33",
    bpm: 82,
    gradient: ["#ffd97d", "#a0e57c"],
    style: "Lo-fi boom-bap",
    mood: ["Dusty", "Mellow", "Hazy", "Warm"],
    instruments: ["Electric piano", "Boom-bap drums", "Vinyl texture"],
    promptBreakdown: [
      { element: "Dusty boom-bap textures", effect: "A hip-hop groove with a deliberately worn, sampled quality." },
      { element: "soft electric piano loop", effect: "The repeating chord loop is the warm centre of the track." },
      { element: "82 BPM", effect: "A mid-slow tempo — steady enough to work under long sessions." }
    ],
    cover: "/covers/marmalade-sky.webp",
    description: "Dusty boom-bap textures loop under a soft electric piano — hazy, mellow and unhurried, with the warm grain of an old afternoon recording.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "None — instrumental",
      instrumental: true,
      variation: "Default (first take)",
    },
    usage: ["Lo-fi study streams", "Background for live broadcasts", "Chill playlists", "Podcast beds"],
    platforms: ["YouTube", "Spotify", "SoundCloud", "Twitch"],
    audioUrl: "https://assets.seeapi.com/music/task_7cd9ad15ab0d4f3e83ee9728a7b3e8e6/track_7f3b1406be9cac765852bf01/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
  },
  {
    id: "signal-fires",
    title: "Signal Fires",
    prompt: "Glitchy breakbeat, chopped vocal textures, bright supersaw drop",
    creator: "kiteandco",
    genre: "Electronic",
    plays: "187.3k",
    likes: "9.6k",
    duration: "3:11",
    bpm: 132,
    gradient: ["#00d4ff", "#6a3cff"],
    style: "Glitch electronic / big-beat",
    mood: ["Restless", "Bright", "High-energy", "Digital"],
    instruments: ["Breakbeat", "Supersaw synth", "Chopped vocal samples"],
    promptBreakdown: [
      { element: "Glitchy breakbeat", effect: "A chopped, irregular drum pattern that keeps the rhythm tense." },
      { element: "chopped vocal textures", effect: "Uses the voice as a rhythmic texture, not a sung melody." },
      { element: "bright supersaw drop", effect: "The big moment — a wide, layered synth chord at the release." },
      { element: "132 BPM", effect: "Fast enough for dance floors and high-energy edits." }
    ],
    cover: "/covers/signal-fires.webp",
    description: "Glitchy breakbeat energy with chopped vocal textures and a bright supersaw drop. Restless and high-impact — designed for quick cuts and big reveals.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "Chopped / sampled textures",
      instrumental: false,
      variation: "Default (first take)",
    },
    usage: ["Esports and gaming edits", "Product launch trailers", "Dance and movement videos", "Ad stingers"],
    platforms: ["YouTube", "TikTok", "Twitch", "Instagram Reels"],
    audioUrl: "https://assets.seeapi.com/music/task_c5d12297e5074fe4ae70f3100072dbf9/track_6cf035592c2fb0f6c87bd3ab/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
  },
  {
    id: "slow-motion-apology",
    title: "Slow Motion Apology",
    prompt: "Intimate alt-R&B, close-mic female vocal, sub bass, sparse clicks",
    creator: "noor.sings",
    genre: "R&B",
    plays: "63.8k",
    likes: "3.2k",
    duration: "2:59",
    bpm: 72,
    gradient: ["#b06cff", "#ff8fa3"],
    style: "Alt-R&B / slow ballad",
    mood: ["Intimate", "Tender", "Melancholic", "Quiet"],
    instruments: ["Close-mic female vocal", "Sub bass", "Sparse clicks"],
    promptBreakdown: [
      { element: "Intimate alt-R&B", effect: "A stripped-back, emotionally close style of R&B." },
      { element: "close-mic female vocal", effect: "Asks for a soft, near-whispered lead delivery." },
      { element: "sub bass", effect: "Low frequencies give the quiet track weight without clutter." },
      { element: "sparse clicks", effect: "Tiny percussive details fill the space between the notes." }
    ],
    cover: "/covers/slow-motion-apology.webp",
    description: "An intimate alt-R&B piece: close-mic female vocal, deep sub bass and sparse clicks. The space between the sounds carries as much feeling as the notes.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "Female lead",
      instrumental: false,
      variation: "Default (first take)",
    },
    usage: ["Emotional film scenes", "Slow portrait edits", "Late-night playlists", "Podcast reflections"],
    platforms: ["Spotify", "Apple Music", "YouTube", "SoundCloud"],
    audioUrl: "https://assets.seeapi.com/music/task_3ff0b79252804d988148b6a9050d5878/track_285b0b153fb04ba5ba443459/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
  },
  {
    id: "cardboard-kingdom",
    title: "Cardboard Kingdom",
    prompt: "Playful boom-bap, toy piano sample, confident laid-back verses",
    creator: "paperkick",
    genre: "Hip-Hop",
    plays: "89.4k",
    likes: "4.4k",
    duration: "2:28",
    bpm: 90,
    gradient: ["#ff8a3d", "#ffd84d"],
    style: "Playful boom-bap hip-hop",
    mood: ["Playful", "Confident", "Quirky", "Warm"],
    instruments: ["Toy piano", "Boom-bap drums", "Rap vocal"],
    promptBreakdown: [
      { element: "Playful boom-bap", effect: "A classic hip-hop groove with a light, humorous tone." },
      { element: "toy piano sample", effect: "The off-kilter keyboard hook gives the track its character." },
      { element: "confident laid-back verses", effect: "A relaxed but self-assured vocal delivery." }
    ],
    cover: "/covers/cardboard-kingdom.webp",
    description: "Playful boom-bap with a toy-piano sample and laid-back, confident verses. Quirky without being noisy — a soundtrack for making something out of nothing.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "Rap / spoken",
      instrumental: false,
      variation: "Default (first take)",
    },
    usage: ["Explainer and how-to videos", "DIY and craft content", "Comedy sketches", "Streetwear edits"],
    platforms: ["YouTube", "TikTok", "Instagram", "SoundCloud"],
    audioUrl: "https://assets.seeapi.com/music/task_f0e40246ab074623b0414c0839655be5/track_55fd31e4736f3188ecb40340/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
  },
  {
    id: "atlas-unfolding",
    title: "Atlas Unfolding",
    prompt: "Orchestral build with taiko hits and a resolving piano motif",
    creator: "northline",
    genre: "Cinematic",
    plays: "112.9k",
    likes: "5.7k",
    duration: "3:04",
    bpm: 96,
    gradient: ["#5b8cff", "#22d3a6"],
    style: "Orchestral cinematic",
    mood: ["Epic", "Patient", "Grand", "Hopeful"],
    instruments: ["Orchestra", "Taiko drums", "Solo piano"],
    promptBreakdown: [
      { element: "Orchestral build", effect: "Layers the ensemble gradually for a sense of scale." },
      { element: "taiko hits", effect: "Percussive accents that punctuate the arrangement." },
      { element: "resolving piano motif", effect: "A recurring piano phrase that brings the piece home." }
    ],
    cover: "/covers/atlas-unfolding.webp",
    description: "A slow orchestral build punctuated by taiko hits, resolving into a clear piano motif. Epic but patient — made for reveals, journeys and scale.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "None — instrumental",
      instrumental: true,
      variation: "Default (first take)",
    },
    usage: ["Movie and game trailers", "Travel documentaries", "Keynote openings", "Award-show background"],
    platforms: ["YouTube", "Vimeo", "Film festivals", "Spotify"],
    audioUrl: "https://assets.seeapi.com/music/task_91c9b04268fe40a280322ef0eec4cb4a/track_1a3aed10bd7e5f92d4cd3182/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
  },
  {
    id: "two-left-feet",
    title: "Two Left Feet",
    prompt: "Bouncy dancehall-flavoured hip-hop, hand percussion, cheeky hook",
    creator: "sunnysideup",
    genre: "Hip-Hop",
    plays: "77.2k",
    likes: "3.6k",
    duration: "3:02",
    bpm: 102,
    gradient: ["#ffcf3f", "#ff6b45"],
    style: "Dancehall-tinged hip-hop",
    mood: ["Bouncy", "Cheeky", "Joyful", "Rhythmic"],
    instruments: ["Hand percussion", "Vocal hook", "Bass"],
    promptBreakdown: [
      { element: "Bouncy dancehall-flavoured hip-hop", effect: "A reggae-tinged rhythm with a hip-hop attitude." },
      { element: "hand percussion", effect: "Live-feeling drums that drive the bounce." },
      { element: "cheeky hook", effect: "A short, playful vocal phrase built to stick." }
    ],
    cover: "/covers/two-left-feet.webp",
    description: "Bouncy dancehall-flavoured hip-hop with hand percussion and a cheeky hook. Rhythmic, playful and impossible to sit still to.",
    settings: {
      mode: "Text to music (SeeAPI Music M2)",
      vocals: "Rap / vocal hook",
      instrumental: false,
      variation: "Default (first take)",
    },
    usage: ["Dance challenge videos", "Fitness and workout edits", "Comedy content", "Party and festival reels"],
    platforms: ["TikTok", "Instagram Reels", "YouTube", "Spotify"],
    audioUrl: "https://assets.seeapi.com/music/task_4eb42ab93f1a4fefa97932bdc36726e1/track_424d64746deb1e4ec1bfc77a/audio.mp3",
    model: "AI Music M2 (SeeAPI)",
    session: "Internal test session · 2026-11",
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
    title: "One free take",
    description: "Every new account gets one free AI-generated song — no card required.",
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
    title: "Downloads included",
    description: "MP3 on every plan, WAV and stems when you upgrade. Export the takes you keep.",
    tone: "pink",
  },
];

export type Plan = {
  id: string;
  name: string;
  monthly: number;
  /** Pre-discount monthly price, shown struck through while a promo runs. */
  compareAt?: number;
  promoLabel?: string;
  credits: string;
  creditsValue: number;
  songs: string;
  downloads: string;
  downloadsValue: number;
  musicTime: string;
  model: string;
  maxDuration: string;
  concurrency: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

/**
 * Plan entitlements. A generation costs 24-35 credits by model (M1 24, M2 29,
 * M3 35) and a full song runs about 2 minutes, so 2,400 credits ~= 100 songs ~= 200 minutes
 * of music. Download allowances are 50% above comparable Suno tiers
 * (monthly download allowance doubled: 60 / 120 / 180).
 * `model` is the generation tier attached to the entitlement.
 */
export const PLANS: Plan[] = [
  {
    id: "creator",
    name: "Creator",
    monthly: 6,
    compareAt: 9,
    promoLabel: "LIMITED TIME · 30% OFF",
    credits: "2,400 credits / mo (~100 songs)",
    creditsValue: 2400,
    songs: "~100 full songs / month",
    downloads: "60 song downloads / mo",
    downloadsValue: 60,
    musicTime: "~200 minutes of music / month",
    model: "AI Music M1 / M2",
    maxDuration: "Full song · model default length",
    concurrency: "4 generations at a time",
    blurb: "For music creators and everyday makers.",
    features: [
      "2,400 monthly credits (~100 songs)",
      "60 song downloads per month",
      "≈ 200 minutes of generated music",
      "AI Music M1/M2/M3 music generation (via SeeAPI)",
      "4 concurrent generations",
      "Stem split & audio effects",
      "Music video export (planned)",
      "Commercial use licence",
    ],
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 18,
    credits: "6,000 credits / mo (~250 songs)",
    creditsValue: 6000,
    songs: "~250 full songs / month",
    downloads: "120 song downloads / mo",
    downloadsValue: 120,
    musicTime: "~500 minutes of music / month",
    model: "AI Music M2 / M3",
    maxDuration: "Full song · model default length",
    concurrency: "8 generations at a time",
    blurb: "For artists shipping music on a schedule.",
    features: [
      "6,000 monthly credits (~250 songs)",
      "120 song downloads per month",
      "≈ 500 minutes of generated music",
      "AI Music M1/M2/M3 music generation (via SeeAPI)",
      "8 concurrent generations",
      "Priority generation queue",
      "WAV & stems export",
      "Custom Spaces",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    monthly: 28,
    credits: "14,400 credits / mo (~600 songs)",
    creditsValue: 14400,
    songs: "~600 full songs / month",
    downloads: "180 song downloads / mo",
    downloadsValue: 180,
    musicTime: "~1,200 minutes of music / month",
    model: "AI Music M3",
    maxDuration: "Full song · model default length",
    concurrency: "16 generations at a time",
    blurb: "For teams and producers running sessions.",
    features: [
      "14,400 monthly credits (~600 songs)",
      "180 song downloads per month",
      "≈ 1,200 minutes of generated music",
      "AI Music M1/M2/M3 music generation (via SeeAPI)",
      "16 concurrent generations",
      "Team workspace & shared library",
      "Priority support",
    ],
  },
];

export const PAID_PLANS = PLANS.filter((plan) => plan.monthly > 0);

export function getPlanById(id?: string | null): Plan | undefined {
  return PLANS.find((plan) => plan.id === id);
}

export const COMPARE_ROWS = [
  { label: "Monthly credits", values: ["2,400", "6,000", "14,400"] },
  { label: "Song downloads / month", values: ["60", "120", "180"] },
  { label: "Estimated songs / month", values: ["~100", "~250", "~600"] },
  { label: "Estimated music time", values: ["~200 min", "~500 min", "~1,200 min"] },
  { label: "Generation model", values: ["AI Music M1 / M2", "AI Music M2 / M3", "AI Music M3"] },
  { label: "Music video model", values: ["Planned · Google Flow", "Planned · Google Flow", "Planned · Google Flow"] },
  { label: "Max song duration", values: ["Model default", "Model default", "Model default"] },
  { label: "Concurrent generations", values: ["4", "8", "16"] },
  { label: "Full-length songs", values: ["Yes", "Yes", "Yes"] },
  { label: "Stem split & effects", values: ["Yes", "Yes", "Yes"] },
  { label: "Music video export", values: ["Planned", "Planned", "Planned"] },
  { label: "Commercial use", values: ["Yes", "Yes", "Yes"] },
  { label: "Team workspace", values: ["—", "—", "Yes"] },
];

export const FAQS = [
  {
    q: "Is Flow AI Music free to start?",
    a: "Yes. Sign in with Google and your first AI-generated song is free — no credit card required. After that free take, choose a plan to keep creating.",
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
    a: "Every plan can download MP3. Creator and above add WAV and separated stems. Music video export is planned and not available yet.",
  },
  {
    q: "How do song downloads work?",
    a: "Each paid plan includes a monthly download allowance — 60 songs on Creator, 120 on Pro and 180 on Studio — which resets with your billing period. Downloads are counted separately from generation credits, and unused downloads do not roll over.",
  },
  {
    q: "What are Spaces?",
    a: "Spaces are small, playable audio tools you describe in words — a keyboard, a drum machine, a game, or a custom effect chain — and then share with a link.",
  },
  {
    q: "Does the site work without an account?",
    a: "The demo on this site works without signing in: you can try the prompt composer, play the mini keyboard and browse the explore feed. Paid generation and saving to a library require a Google sign-in.",
  },
  {
    q: "Which AI models do you use?",
    a: "Music is generated with the AI Music M1/M2/M3 models via SeeAPI; the provider and model are shown before each generation. See the Models & technology page for details.",
  },
  {
    q: "Can I cancel and get a refund?",
    a: "Yes. Cancel at any time from your account or by emailing support; access continues to the end of the paid period. First-time subscribers can request a full refund within 7 days. Unused credits are a usage allowance and are not refunded. See the refund section of the terms.",
  },
  {
    q: "How do I get my data removed?",
    a: "Email support from your account address to view, correct, export or delete your data, or to close your account. We respond within 30 days. Details are in the privacy policy.",
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
    title: "Direct the video yourself (planned)",
    text: "Planned feature. Once music video generation launches on Google Flow, you will describe the characters, the palette and the pacing and get a video built around your track — no crew, no timeline. Not available today.",
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
