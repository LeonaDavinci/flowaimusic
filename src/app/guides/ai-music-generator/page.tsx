import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner } from "@/components/CtaBanner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "How to Make a Song with AI (A Practical Guide) | Flow AI Music",
  description:
    "A practical guide to making a full song with AI: how to write a prompt, steer genre and tempo, revise only the section you dislike, split stems and publish your track.",
  path: "/guides/ai-music-generator",
  type: "article",
  keywords: [
    "how to make AI music",
    "AI music prompt guide",
    "text to song",
    "AI song generator for beginners",
  ],
});

export default function GuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Make a Song with AI (A Practical Guide)",
    description:
      "A practical guide to writing prompts, steering arrangements, revising sections and publishing AI generated songs.",
    author: { "@type": "Organization", name: "Flow AI Music" },
    publisher: { "@type": "Organization", name: "Flow AI Music" },
    mainEntityOfPage: `${SITE_URL}/guides/ai-music-generator`,
    datePublished: "2026-11-18",
    dateModified: "2026-11-18",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides/ai-music-generator` },
      { "@type": "ListItem", position: 3, name: "How to make a song with AI", item: `${SITE_URL}/guides/ai-music-generator` },
    ],
  };

  return (
    <main>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Guides</span> <span>/</span> <span>AI music generator</span>
          </div>
          <span className="eyebrow">Guide · 7 min read</span>
          <h1>How to make a song with AI, without losing control of it.</h1>
          <p>
            A practical walkthrough of the prompt → song → revision loop, from
            your first sentence to a track you are happy to publish.
          </p>
        </div>
      </section>

      <div className="container guide-layout">
        <nav className="guide-toc" aria-label="On this page">
          <h2>On this page</h2>
          <a href="#what">1. What an AI song generator does</a>
          <a href="#prompt">2. Write a prompt that actually works</a>
          <a href="#revise">3. Revise one section, not the whole song</a>
          <a href="#finish">4. Finish, export and publish</a>
          <a href="#faq">5. Common questions</a>
          <a href="/studio" style={{ color: "var(--violet)", marginTop: 10 }}>→ Open the studio</a>
        </nav>

        <article className="prose">
          <h2 id="what">1. What an AI song generator actually does</h2>
          <p>
            An AI music generator turns a written description into an audio
            recording. The useful ones do more than produce a short loop: they
            write an arrangement with an intro, verses, a chorus and an outro,
            add a vocal performance, and keep tempo and key consistent across
            the whole track. That difference matters, because a three-minute
            song is a structure problem as much as a sound problem.
          </p>
          <p>
            Flow AI Music is built around a conversation rather than a single
            submit button. You describe the song, hear it back, then keep
            talking until the details are right — the same way you would work
            with a producer in a room. If you are choosing a tool, our{" "}
            <Link href="/ai-music-creator">AI music creator overview</Link>{" "}
            explains where Flow Music AI fits in a music workflow.
          </p>

          <h2 id="prompt">2. Write a prompt that actually works</h2>
          <p>
            Good prompts are specific about <strong>feel</strong>, and relaxed
            about everything else. Four ingredients cover almost every case:
          </p>
          <ul>
            <li><strong>Genre or reference point</strong> — “indie pop”, “90s boom-bap”, “documentary underscore”.</li>
            <li><strong>Mood and scene</strong> — “driving home at sunset”, “a tense product reveal”.</li>
            <li><strong>Arrangement hints</strong> — “jangly guitars, hand claps, a wide singalong hook”.</li>
            <li><strong>Constraints</strong> — “92 BPM”, “60 seconds”, “instrumental, leave space for a lead vocal”.</li>
          </ul>
          <p>
            A strong starting prompt looks like this:
          </p>
          <p className="callout">
            “A bright indie pop song about a spontaneous road trip, 104 BPM,
            jangly guitars, warm female vocal, claps on the chorus, big
            singalong ending.”
          </p>
          <p>
            You do not need production vocabulary. “Sounds like the last five
            minutes of a good party” is a perfectly usable instruction. If you
            are scoring video, always include the duration — it is the single
            most useful constraint you can give.
          </p>
          <p>
            Want examples? The <Link href="/explore">explore feed</Link> shows
            the exact prompt behind every published track.
          </p>

          <h2 id="revise">3. Revise one section, not the whole song</h2>
          <p>
            The most common mistake is regenerating the entire song because one
            bar feels wrong. Section-level editing is faster and keeps the parts
            you already love:
          </p>
          <ol>
            <li>Name the section: “the second verse”, “the last eight bars”, “the chorus hook”.</li>
            <li>Describe only the delta: “wider drums”, “quieter piano”, “hold the last word longer”.</li>
            <li>Keep both takes and A/B them. Versions are cheap; taste is the scarce resource.</li>
          </ol>
          <p>
            When you need to move into another tool, split the track into
            vocals, drums, bass and instruments, then apply effects in plain
            language. See the full <Link href="/features">feature list</Link> for
            what each stage supports.
          </p>

          <h2 id="finish">4. Finish, export and publish</h2>
          <p>
            A finished track has three jobs: sound right, look right, and reach
            someone. You can give the song a visual world by describing
            characters and a palette, then export a music video built around
            the same audio. Publishing puts it on a public page, and playlists
            let you group a set of tracks into something coherent.
          </p>
          <p>
            For commercial work, check the licence included with your plan on
            the <Link href="/pricing">pricing page</Link>. The free tier is
            designed for experimenting; paid tiers add commercial use rights and
            higher export formats.
          </p>

          <h2 id="faq">5. Common questions</h2>
          <h3>Do I need to know music theory?</h3>
          <p>
            No. Plain language is the interface. Knowing a few words like
            “chorus”, “BPM” or “stems” gives you finer control, but none of them
            are required to make a first song.
          </p>
          <h3>Can I use my own vocals?</h3>
          <p>
            A common workflow is to generate an instrumental with space for a
            lead vocal, export the stems, and record your own part on top in any
            editor.
          </p>
          <h3>How long does a song take?</h3>
          <p>
            A first full-length take is generated in one session. Most of the
            real time goes into listening and deciding which two lines to
            change — which is the fun part.
          </p>

          <div className="section-actions">
            <Link href="/studio" className="btn btn-primary btn-lg" data-track="cta_click" data-placement="guide">
              Write your first prompt
            </Link>
            <Link href="/pricing" className="btn btn-ghost btn-lg">Compare plans</Link>
          </div>
        </article>
      </div>

      <CtaBanner
        title="Reading is optional. Making is the point."
        subtitle="Open the studio, type one sentence, and hear what comes back."
      />
    </main>
  );
}
