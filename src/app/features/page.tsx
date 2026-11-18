import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { FEATURE_MODULES, WORKFLOW } from "@/lib/content";
import { CtaBanner } from "@/components/CtaBanner";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "AI Music Studio Features — Edit, Split Stems & Make Videos | FlowAI Music",
  description:
    "Explore the FlowAI Music feature set: conversational song creation, section-level editing, stem split, audio effects, AI music videos, playable Spaces and personalised discovery.",
  path: "/features",
  keywords: ["AI music editor", "stem split AI", "AI music video generator", "replace song section AI"],
});

const BAR_HEIGHTS = [38, 62, 46, 88, 58, 76, 42, 96, 64, 50, 82, 34];

export default function FeaturesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <span>Features</span>
          </div>
          <span className="eyebrow">Everything in one studio</span>
          <h1>From a sentence to a release, without switching tabs.</h1>
          <p>
            Six connected capabilities, one continuous conversation. Every step
            builds on the track you already have.
          </p>
        </div>
      </section>

      <div className="container">
        {FEATURE_MODULES.map((module) => (
          <section
            className={`feature-module tone-${module.tone}`}
            id={module.id}
            key={module.id}
            aria-labelledby={`module-${module.id}`}
          >
            <div className="module-copy">
              <span className="eyebrow">{module.eyebrow}</span>
              <h2 id={`module-${module.id}`}>{module.title}</h2>
              <p>{module.text}</p>
              <ul className="feature-list">
                {module.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
            <div className="module-visual" aria-hidden="true">
              <span className="visual-line w-85" />
              <span className="visual-line w-70" />
              <span className="visual-line w-55" />
              <div className="visual-chip-row">
                <span className="visual-chip">{module.title.split(" ")[0]}</span>
                {module.bullets.slice(0, 2).map((b) => (
                  <span className="visual-chip" key={b}>{b}</span>
                ))}
              </div>
              <div className="visual-bars">
                {BAR_HEIGHTS.map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">The workflow</span>
            <h2 className="section-title">Four steps, no handoffs.</h2>
            <p className="section-sub">
              No exporting to another tool, no re-importing, no lost versions.
            </p>
          </div>
          <div className="workflow">
            {WORKFLOW.map((step) => (
              <div className="workflow-step" key={step.step}>
                <b>{step.step}</b>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <div className="section-actions" style={{ justifyContent: "center" }}>
            <Link href="/studio" className="btn btn-primary btn-lg" data-track="cta_click" data-placement="features">
              Try the studio <Icon name="arrow" size={17} />
            </Link>
            <Link href="/pricing" className="btn btn-ghost btn-lg">See pricing</Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
