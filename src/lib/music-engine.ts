/**
 * Browser-side music synthesis for the studio demo.
 *
 * No model, no upload, no network: a short original arrangement is rendered
 * with the Web Audio API by layering several oscillator waveforms per voice
 * (sine + triangle + sawtooth), applying an ADSR envelope, a bass line and a
 * simple drum kit. The brief, style and take number seed a deterministic PRNG
 * so the same inputs always produce the same song.
 *
 * The result is an AudioBuffer (for playback) plus a 16-bit PCM WAV blob
 * (for download). Everything runs inside OfflineAudioContext, so nothing is
 * audible until the user presses play.
 */

export type SongSpec = {
  brief: string;
  style: string;
  take: number;
};

export type RenderedSong = {
  blob: Blob;
  duration: number;
  bpm: number;
  keyName: string;
  title: string;
  bars: number;
};

type VoiceShape = {
  /** partials layered on top of the fundamental: [frequency ratio, gain, wave] */
  partials: [number, number, OscillatorType][];
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  filter: number;
};

const STYLE_CONFIG: Record<
  string,
  { bpm: number; shape: VoiceShape; minor: boolean }
> = {
  "Indie pop": {
    bpm: 104,
    minor: false,
    shape: {
      partials: [[1, 0.5, "sine"], [2, 0.16, "triangle"], [0.5, 0.14, "sine"]],
      attack: 0.01, decay: 0.18, sustain: 0.58, release: 0.3, filter: 2600,
    },
  },
  "Lo-fi": {
    bpm: 82,
    minor: true,
    shape: {
      partials: [[1, 0.52, "sine"], [2, 0.1, "triangle"], [1.005, 0.1, "sine"]],
      attack: 0.03, decay: 0.3, sustain: 0.5, release: 0.5, filter: 1500,
    },
  },
  "Cinematic": {
    bpm: 68,
    minor: true,
    shape: {
      partials: [[1, 0.42, "sine"], [2, 0.2, "triangle"], [3, 0.1, "sawtooth"]],
      attack: 0.35, decay: 0.4, sustain: 0.72, release: 0.9, filter: 3200,
    },
  },
  "Electronic": {
    bpm: 124,
    minor: false,
    shape: {
      partials: [[1, 0.38, "sawtooth"], [2, 0.22, "square"], [0.5, 0.2, "sine"]],
      attack: 0.005, decay: 0.12, sustain: 0.5, release: 0.14, filter: 4200,
    },
  },
  "R&B": {
    bpm: 92,
    minor: true,
    shape: {
      partials: [[1, 0.48, "sine"], [2, 0.14, "triangle"], [3, 0.08, "sine"]],
      attack: 0.02, decay: 0.22, sustain: 0.6, release: 0.35, filter: 2400,
    },
  },
  "Hip-Hop": {
    bpm: 88,
    minor: true,
    shape: {
      partials: [[1, 0.45, "triangle"], [2, 0.16, "sine"], [0.5, 0.22, "sine"]],
      attack: 0.01, decay: 0.25, sustain: 0.45, release: 0.3, filter: 1800,
    },
  },
};

const ROOTS = [60, 62, 64, 65, 67, 69, 57, 59]; // C D E F G A A3 B3
const KEY_NAMES = ["C", "D", "E", "F", "G", "A", "A", "B"];
const MAJOR = [0, 2, 4, 5, 7, 9, 11];
const MINOR = [0, 2, 3, 5, 7, 8, 10];
const PROGRESSIONS = [
  [0, 4, 5, 3], // I V vi IV
  [0, 3, 4, 4], // I IV V V
  [5, 3, 0, 4], // vi IV I V
  [0, 5, 3, 4], // I vi IV V
];

function hashString(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 — small deterministic PRNG */
function makeRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function scaleNote(root: number, scale: number[], degree: number): number {
  const octave = Math.floor(degree / scale.length);
  const index = ((degree % scale.length) + scale.length) % scale.length;
  return root + octave * 12 + scale[index];
}

function titleFromBrief(brief: string): string {
  const words = brief.trim().split(/\s+/).filter(Boolean).slice(0, 3).join(" ");
  if (!words) return "Untitled take";
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Layer several oscillator waveforms into one enveloped voice. */
function playVoice(
  ctx: OfflineAudioContext,
  destination: AudioNode,
  frequency: number,
  start: number,
  duration: number,
  shape: VoiceShape,
  level: number,
  random: () => number,
): void {
  const amp = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = shape.filter * (0.85 + random() * 0.3);
  filter.Q.value = 0.6;
  amp.connect(filter);
  filter.connect(destination);

  const peak = Math.max(0.0001, level);
  const sustain = Math.max(0.0001, peak * shape.sustain);
  const end = start + duration;
  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(peak, start + shape.attack);
  amp.gain.exponentialRampToValueAtTime(sustain, start + shape.attack + shape.decay);
  amp.gain.setValueAtTime(sustain, Math.max(start + shape.attack + shape.decay, end));
  amp.gain.exponentialRampToValueAtTime(0.0001, end + shape.release);

  for (const [ratio, gain, wave] of shape.partials) {
    const osc = ctx.createOscillator();
    const partialGain = ctx.createGain();
    osc.type = wave;
    osc.frequency.value = frequency * ratio;
    partialGain.gain.value = gain;
    osc.connect(partialGain);
    partialGain.connect(amp);
    osc.start(start);
    osc.stop(end + shape.release + 0.02);
  }
}

function makeNoiseBuffer(ctx: OfflineAudioContext, random: () => number): AudioBuffer {
  const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = random() * 2 - 1;
  return buffer;
}

function playKick(ctx: OfflineAudioContext, dest: AudioNode, at: number, level = 0.55): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, at);
  osc.frequency.exponentialRampToValueAtTime(48, at + 0.16);
  gain.gain.setValueAtTime(level, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.24);
  osc.connect(gain);
  gain.connect(dest);
  osc.start(at);
  osc.stop(at + 0.26);
}

function playNoiseHit(
  ctx: OfflineAudioContext,
  dest: AudioNode,
  noise: AudioBuffer,
  at: number,
  duration: number,
  filterType: BiquadFilterType,
  frequency: number,
  level: number,
): void {
  const src = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  src.buffer = noise;
  filter.type = filterType;
  filter.frequency.value = frequency;
  gain.gain.setValueAtTime(level, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  src.connect(filter);
  filter.connect(gain);
  gain.connect(dest);
  src.start(at);
  src.stop(at + duration + 0.02);
}

/** Encode an AudioBuffer as a 16-bit PCM WAV blob. */
function encodeWav(buffer: AudioBuffer): Blob {
  const channels = buffer.numberOfChannels;
  const frames = buffer.length;
  const bytesPerSample = 2;
  const blockAlign = channels * bytesPerSample;
  const dataSize = frames * blockAlign;
  const arrayBuffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(arrayBuffer);

  const write = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i += 1) view.setUint8(offset + i, text.charCodeAt(i));
  };
  write(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, dataSize, true);

  const channelData: Float32Array[] = [];
  for (let c = 0; c < channels; c += 1) channelData.push(buffer.getChannelData(c));
  let offset = 44;
  for (let i = 0; i < frames; i += 1) {
    for (let c = 0; c < channels; c += 1) {
      const sample = Math.max(-1, Math.min(1, channelData[c][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }
  return new Blob([arrayBuffer], { type: "audio/wav" });
}

export async function renderSong({ brief, style, take }: SongSpec): Promise<RenderedSong> {
  const config = STYLE_CONFIG[style] ?? STYLE_CONFIG["Indie pop"];
  const seed = hashString(`${brief}|${style}|${take}`);
  const random = makeRandom(seed);

  const rootIndex = Math.floor(random() * ROOTS.length);
  const root = ROOTS[rootIndex];
  const scale = config.minor ? MINOR : MAJOR;
  const keyName = KEY_NAMES[rootIndex] + (config.minor ? " minor" : " major");
  const progression = PROGRESSIONS[Math.floor(random() * PROGRESSIONS.length)];
  const bars = 8;
  const beat = 60 / config.bpm;
  const barDuration = beat * 4;
  const duration = bars * barDuration + 1.2; // tail for the final release

  const OfflineCtx =
    window.OfflineAudioContext ??
    (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext })
      .webkitOfflineAudioContext;
  if (!OfflineCtx) throw new Error("Web Audio is not available in this browser");
  const ctx = new OfflineCtx(2, Math.ceil(duration * 44100), 44100);

  // Master chain: gentle bus compression keeps layered waves from clipping.
  const master = ctx.createGain();
  master.gain.value = 0.85;
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -14;
  compressor.knee.value = 18;
  compressor.ratio.value = 3;
  compressor.attack.value = 0.004;
  compressor.release.value = 0.2;
  master.connect(compressor);
  compressor.connect(ctx.destination);

  const noise = makeNoiseBuffer(ctx, random);

  for (let bar = 0; bar < bars; bar += 1) {
    const barStart = bar * barDuration;
    const degree = progression[bar % progression.length];
    const chordNotes = [degree, degree + 2, degree + 4].map((d) => scaleNote(root, scale, d));

    // Chord pad: three notes, each made of layered waveforms.
    chordNotes.forEach((midi, i) => {
      playVoice(ctx, master, midiToFreq(midi), barStart, barDuration * 0.92,
        config.shape, 0.16 - i * 0.02, random);
    });

    // Bass: root an octave below, on beats 1 and 3.
    const bassMidi = scaleNote(root, scale, degree) - 12;
    [0, 2].forEach((b) => {
      playVoice(ctx, master, midiToFreq(bassMidi), barStart + b * beat, beat * 0.85,
        config.shape, 0.3, random);
    });

    // Melody: five-note scale walk over eighth notes, sparse and deterministic.
    for (let step = 0; step < 8; step += 1) {
      if (random() < 0.42) continue;
      const walk = Math.floor(random() * 9) - 2;
      const midi = scaleNote(root + 12, scale, degree + walk);
      playVoice(ctx, master, midiToFreq(midi), barStart + step * beat * 0.5,
        beat * (0.4 + random() * 0.5), config.shape, 0.12, random);
    }

    // Drums: kick on 1 & 3, snare on 2 & 4, closed hats on eighths.
    playKick(ctx, master, barStart, 0.5);
    playKick(ctx, master, barStart + 2 * beat, 0.42);
    playNoiseHit(ctx, master, noise, barStart + beat, 0.16, "bandpass", 1900, 0.22);
    playNoiseHit(ctx, master, noise, barStart + 3 * beat, 0.16, "bandpass", 1900, 0.22);
    for (let eighth = 0; eighth < 8; eighth += 1) {
      playNoiseHit(ctx, master, noise, barStart + eighth * beat * 0.5,
        0.05, "highpass", 7200, eighth % 2 === 0 ? 0.09 : 0.055);
    }
  }

  const buffer = await ctx.startRendering();
  return {
    blob: encodeWav(buffer),
    duration,
    bpm: config.bpm,
    keyName,
    title: titleFromBrief(brief),
    bars,
  };
}

/** Object URLs created for playback must be released when a take is replaced. */
export function revokeAudio(url: string | null): void {
  if (url) URL.revokeObjectURL(url);
}
