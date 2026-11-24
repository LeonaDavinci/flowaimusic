import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { COMPARE_ROWS, FAQS, PLANS } from "@/lib/content";
import { PricingCards } from "@/components/PricingCards";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "AI Music Pricing — Free & Paid Plans | Flow AI Music",
  description:
    "Compare Flow AI Music plans: free daily credits, Creator, Pro and Studio. See monthly credits, concurrent generations, stem export, commercial use and team features.",
  path: "/pricing",
  keywords: ["AI music pricing", "free AI song generator", "AI music subscription", "AI music credits"],
});

export default function PricingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main>
      <JsonLd data={faqSchema} />
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Pricing</span>
          </div>
          <span className="eyebrow">Simple pricing</span>
          <h1>Make music for free. Pay when you make a lot of it.</h1>
          <p>
            Every plan creates full-length songs. Higher tiers add credits,
            concurrency, exports and team tools. Cancel any time.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <PricingCards />
          <p style={{ textAlign: "center", margin: "-56px 0 0", fontSize: 13.5, color: "var(--ink-3)" }}>
            Yearly billing is charged once a year at 20% off the monthly rate. All prices in USD.
          </p>
          <p style={{ textAlign: "center", margin: "16px 0 0", fontSize: 13.5, color: "var(--ink-3)" }}>
            Music is generated with the{" "}
            <Link href="/models">AI Music M1/M2/M3 models via SeeAPI</Link>; music video
            generation on Google Flow is planned. Subscriptions auto-renew until cancelled;
            see the <Link href="/terms">refund terms</Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Side by side</span>
            <h2 className="section-title">Exactly what you get.</h2>
          </div>
          <div className="compare-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  {PLANS.map((plan) => (
                    <th scope="col" key={plan.id}>{plan.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, i) => (
                      <td key={`${row.label}-${i}`}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Good to know</span>
            <h2 className="section-title" id="faq-title">Questions, answered.</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Start on the free plan."
        subtitle="Daily credits, full songs, no credit card. Upgrade only when your ideas outgrow it."
      />
    </main>
  );
}
