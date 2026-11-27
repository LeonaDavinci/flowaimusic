import Link from "next/link";
import { SITE_URL } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { CtaBanner } from "@/components/CtaBanner";

export type UseCaseFaq = { q: string; a: string };

export type UseCaseData = {
  slug: string;
  eyebrow: string;
  h1: string;
  intro: string;
  readTime: string;
  headline: string;
  metaDescription: string;
  whyHeading: string;
  why: string[];
  durationHeading: string;
  duration: string[];
  durationRows: { label: string; value: string }[];
  styleHeading: string;
  style: string[];
  prompts: string[];
  clashHeading: string;
  clash: string[];
  clashPoints: string[];
  workflowHeading: string;
  workflow: { title: string; text: string }[];
  downloadHeading: string;
  download: string[];
  downloadPoints: string[];
  faqs: UseCaseFaq[];
  ctaTitle: string;
  ctaSubtitle: string;
};

export function UseCasePage({ data }: { data: UseCaseData }) {
  const pageUrl = `${SITE_URL}${data.slug}`;
  const sections = [
    { id: "why", label: `1. ${data.whyHeading}` },
    { id: "length", label: `2. ${data.durationHeading}` },
    { id: "style", label: `3. ${data.styleHeading}` },
    { id: "mix", label: `4. ${data.clashHeading}` },
    { id: "workflow", label: `5. ${data.workflowHeading}` },
    { id: "export", label: `6. ${data.downloadHeading}` },
    { id: "faq", label: "7. Common questions" },
  ];

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
      { "@type": "ListItem", position: 2, name: "Music for creators", item: `${SITE_URL}/features` },
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
            <Link href="/">Home</Link> <span>/</span> <span>Music for creators</span> <span>/</span>{" "}
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
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>{s.label}</a>
          ))}
          <a href="/studio" style={{ color: "var(--violet)", marginTop: 10 }}>→ Open the studio</a>
        </nav>

        <article className="prose">
          <h2 id="why">{data.whyHeading}</h2>
          {data.why.map((p, i) => <p key={i}>{p}</p>)}

          <h2 id="length">{data.durationHeading}</h2>
          {data.duration.map((p, i) => <p key={i}>{p}</p>)}
          <table className="song-spec">
            <tbody>
              {data.durationRows.map((r) => (
                <tr key={r.label}><th>{r.label}</th><td>{r.value}</td></tr>
              ))}
            </tbody>
          </table>

          <h2 id="style">{data.styleHeading}</h2>
          {data.style.map((p, i) => <p key={i}>{p}</p>)}
          {data.prompts.map((p, i) => (
            <p className="callout" key={i}>Prompt example: {p}</p>
          ))}

          <h2 id="mix">{data.clashHeading}</h2>
          {data.clash.map((p, i) => <p key={i}>{p}</p>)}
          <ul>
            {data.clashPoints.map((p, i) => <li key={i}>{p}</li>)}
          </ul>

          <h2 id="workflow">{data.workflowHeading}</h2>
          <ol>
            {data.workflow.map((s, i) => (
              <li key={i}><strong>{s.title}.</strong> {s.text}</li>
            ))}
          </ol>

          <h2 id="export">{data.downloadHeading}</h2>
          {data.download.map((p, i) => <p key={i}>{p}</p>)}
          <ul>
            {data.downloadPoints.map((p, i) => <li key={i}>{p}</li>)}
          </ul>

          <h2 id="faq">Common questions</h2>
          {data.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}

          <div className="section-actions">
            <Link href="/studio" className="btn btn-primary btn-lg" data-track="cta_click" data-placement={data.slug}>
              Make music for your project
            </Link>
            <Link href="/pricing" className="btn btn-ghost btn-lg">Compare plans</Link>
          </div>
        </article>
      </div>

      <CtaBanner title={data.ctaTitle} subtitle={data.ctaSubtitle} />
    </main>
  );
}
