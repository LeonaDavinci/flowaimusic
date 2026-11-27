import Link from "next/link";
import { SITE_URL } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner } from "@/components/CtaBanner";

export type Source = { label: string; url: string; checked: string };
export type CompareRow = { label: string; values: string[] };
export type CompareSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type CompareData = {
  slug: string;
  eyebrow: string;
  h1: string;
  intro: string;
  readTime: string;
  headline: string;
  metaDescription: string;
  shortAnswer: string;
  columns: string[];
  rows: CompareRow[];
  note: string;
  sections: CompareSection[];
  verdict: { heading: string; paragraphs: string[] };
  faqs: { q: string; a: string }[];
  sources: Source[];
  ctaTitle: string;
  ctaSubtitle: string;
};

export function ComparePage({ data }: { data: CompareData }) {
  const pageUrl = `${SITE_URL}${data.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.metaDescription,
    author: { "@type": "Organization", name: "Flow AI Music" },
    publisher: { "@type": "Organization", name: "Flow AI Music" },
    mainEntityOfPage: pageUrl,
    datePublished: "2026-11-27",
    dateModified: "2026-11-27",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE_URL}/best-ai-music-generators` },
      { "@type": "ListItem", position: 3, name: data.h1, item: pageUrl },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <JsonLd data={[articleSchema, breadcrumbSchema, faqSchema]} />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Comparisons</span> <span>/</span>{" "}
            <span>{data.h1}</span>
          </div>
          <span className="eyebrow">{data.eyebrow} · {data.readTime} read</span>
          <h1>{data.h1}</h1>
          <p>{data.intro}</p>
        </div>
      </section>

      <div className="container guide-layout">
        <nav className="guide-toc" aria-label="On this page">
          <h2>On this page</h2>
          <a href="#table">1. Side-by-side</a>
          {data.sections.map((s, i) => (
            <a key={s.heading} href={`#s${i}`}>{i + 2}. {s.heading}</a>
          ))}
          <a href={`#verdict`}>{data.sections.length + 2}. Which to choose</a>
          <a href="#faq">Common questions</a>
          <a href="#sources">Sources</a>
        </nav>

        <article className="prose">
          <p className="callout"><strong>Short answer.</strong> {data.shortAnswer}</p>

          <h2 id="table">Side-by-side</h2>
          <div className="compare-scroll">
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  {data.columns.map((c) => <th scope="col" key={c}>{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    {r.values.map((v, i) => <td key={i}>{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="song-prompt-note">{data.note}</p>

          {data.sections.map((s, i) => (
            <section key={s.heading}>
              <h2 id={`s${i}`}>{s.heading}</h2>
              {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
              {s.bullets && (
                <ul>{s.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
              )}
            </section>
          ))}

          <h2 id="verdict">{data.verdict.heading}</h2>
          {data.verdict.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

          <h2 id="faq">Common questions</h2>
          {data.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}

          <h2 id="sources">Sources and how this was checked</h2>
          <p>
            Competitor figures below were read from each provider&apos;s public pricing page on the
            dates shown and can change without notice. Flow AI Music figures come from our own{" "}
            <Link href="/pricing">pricing page</Link>. We do not run side-by-side audio tests here —
            use the free trial of each tool and listen for yourself before deciding.
          </p>
          <ul>
            {data.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a> — checked {s.checked}.
              </li>
            ))}
          </ul>

          <div className="section-actions">
            <Link href="/studio" className="btn btn-primary btn-lg" data-track="cta_click" data-placement={data.slug}>
              Try Flow AI Music free
            </Link>
            <Link href="/pricing" className="btn btn-ghost btn-lg">See our plans</Link>
          </div>
        </article>
      </div>

      <CtaBanner title={data.ctaTitle} subtitle={data.ctaSubtitle} />
    </main>
  );
}
