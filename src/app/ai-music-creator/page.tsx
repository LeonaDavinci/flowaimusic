import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner } from "@/components/CtaBanner";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "AI Music Creator — Make Original Music with Flow Music AI | Flow AI Music",
  description:
    "Flow Music AI is an AI music creator for artists, video makers and producers. Create music from a sentence, edit any section, split stems, make music videos and publish — free to start.",
  path: "/ai-music-creator",
  keywords: [
    "ai music creator",
    "flow music ai",
    "flowaimusic",
    "AI music creator for video",
    "create music with AI",
    "AI music generator",
  ],
});

const AUDIENCES = [
  {
    title: "Music creators & artists",
    text: "Turn a rough idea into a full arrangement, then keep only the parts that sound like you.",
    tone: "violet",
  },
  {
    title: "Video makers",
    text: "Create music that fits a cut, a mood and a duration instead of digging through stock libraries.",
    tone: "coral",
  },
  {
    title: "Producers",
    text: "Test directions fast, split stems and move the best pieces into your own session.",
    tone: "cyan",
  },
  {
    title: "Curious beginners",
    text: "No theory, no gear, no install. Describe the music you hear and press create.",
    tone: "sun",
  },
];

const FAQS = [
  {
    q: "What is an AI music creator?",
    a: "An AI music creator is a tool that turns a written description into a finished piece of music, including arrangement, vocals and structure. Flow Music AI goes further by letting you keep talking to revise individual sections instead of regenerating the whole track.",
  },
  {
    q: "Is flowaimusic the same as Flow Music AI?",
    a: "Yes. Flow AI Music, Flow Music AI and the flowaimusic.com domain all refer to the same studio. Different word orders are just how people search for the product.",
  },
  {
    q: "Can I use the music commercially?",
    a: "The free plan is for experimenting. Paid plans include a commercial use licence, plus WAV and stem downloads for production workflows.",
  },
  {
    q: "Do I need to know music production?",
    a: "No. Plain language is the interface. Words like chorus, BPM and stems give finer control, but none are required to make your first track.",
  },
];

export default function AiMusicCreatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "AI music creator", item: `${SITE_URL}/ai-music-creator` },
    ],
  };

  return (
    <main>
      <JsonLd data={[faqSchema, breadcrumbSchema]} />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <span>AI music creator</span>
          </div>
          <span className="eyebrow">Flow Music AI</span>
          <h1>An AI music creator that keeps up with your ideas.</h1>
          <p>
            Flow AI Music is an AI music creator built around a conversation,
            not a form. Describe the music you want, hear it back, and change
            exactly the part you dislike — all in one studio.
          </p>
          <div className="section-actions">
            <Link href="/studio" className="btn btn-primary btn-lg" data-track="cta_click" data-placement="ai_music_creator_hero">
              Create music free <Icon name="arrow" size={17} />
            </Link>
            <Link href="/explore" className="btn btn-ghost btn-lg">Hear the music</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container guide-layout">
          <nav className="guide-toc" aria-label="On this page">
            <h2>On this page</h2>
            <a href="#what">1. What is an AI music creator</a>
            <a href="#why">2. Why Flow Music AI</a>
            <a href="#who">3. Who it is for</a>
            <a href="#workflow">4. From prompt to music</a>
            <a href="#faq">5. Questions</a>
            <Link href="/features" style={{ color: "var(--violet)", marginTop: 10 }}>→ All features</Link>
          </nav>

          <article className="prose">
            <h2 id="what">What is an AI music creator?</h2>
            <p>
              An AI music creator generates complete music from a written
              description. The useful ones produce structure — an intro,
              verses, a chorus, an outro — plus a vocal performance and
              consistent tempo and key. That is very different from a tool that
              spits out a short loop and stops.
            </p>
            <p>
              Flow Music AI is conversational. You do not fill in a form once
              and accept whatever comes back; you keep talking to the studio the
              way you would talk to a producer, refining the music until it is
              right. That is what makes it an AI music creator rather than a
              one-click novelty.
            </p>

            <h2 id="why">Why makers choose Flow Music AI</h2>
            <ul>
              <li><strong>Full-length music</strong> with arrangement, dynamics and vocals, not a short sample.</li>
              <li><strong>Section-level editing</strong> — replace a chorus or extend an outro without losing the rest of the music.</li>
              <li><strong>Stem split and effects</strong> so the music can move into any editor when you are ready.</li>
              <li><strong>Music videos</strong> directed in plain words, built around the finished track.</li>
              <li><strong>Publishing and playlists</strong> so the music reaches an audience, not just a downloads folder.</li>
            </ul>
            <p className="callout">
              One sentence in, one finished piece of music out — and every
              detail stays open to change.
            </p>
            <p>
              See the complete <Link href="/features">feature list</Link> for
              each stage of the workflow.
            </p>

            <h2 id="who">Who is an AI music creator for?</h2>
            <div className="card-grid card-grid--2" style={{ paddingBottom: 0 }}>
              {AUDIENCES.map((item, i) => (
                <div className={`simple-card tone-${item.tone}`} key={item.title}>
                  <span className="cap-icon">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            <h2 id="workflow">From prompt to released music</h2>
            <ol>
              <li>Describe the music: genre, mood, tempo and the scene it should fit.</li>
              <li>Listen to the first take and name the one section you want changed.</li>
              <li>Split stems, add effects, or give the music a visual world.</li>
              <li>Publish the track, add it to a playlist and share the link.</li>
            </ol>
            <p>
              New to writing prompts? The{" "}
              <Link href="/guides/ai-music-generator">practical guide to making music with AI</Link>{" "}
              walks through a full first session, and the{" "}
              <Link href="/explore">explore feed</Link> shows the exact prompt
              behind every published track.
            </p>

            <h2 id="faq">Questions about Flow Music AI</h2>
            <div className="faq-list" style={{ paddingBottom: 0, maxWidth: "none" }}>
              {FAQS.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>

            <div className="section-actions">
              <Link href="/studio" className="btn btn-primary btn-lg" data-track="cta_click" data-placement="ai_music_creator_body">
                Start creating music
              </Link>
              <Link href="/pricing" className="btn btn-ghost btn-lg">Compare plans</Link>
            </div>
          </article>
        </div>
      </section>

      <CtaBanner
        title="Make your next piece of music."
        subtitle="Flow Music AI is free to start — no credit card, no setup, no theory required."
      />
    </main>
  );
}
