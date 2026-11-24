import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "AI Models & Technology | Flow AI Music",
  description:
    "Flow AI Music uses Suno for music generation and Google Flow for music video generation. Provider details and how the active model is shown.",
  path: "/models",
  keywords: ["Suno", "Google Flow", "AI music model", "AI music video model", "model disclosure"],
});

const MODELS = [
  {
    task: "Music generation",
    model: "Suno",
    provider: "Suno",
    status: "In use",
    detail: "Full-length songs from a text brief, including vocals, structure and style. All music generation plans use Suno.",
  },
  {
    task: "Music video generation",
    model: "Google Flow",
    provider: "Google",
    status: "In use",
    detail: "Directed music videos built around a finished track, using Google Flow for frame-aware visual generation.",
  },
];

export default function ModelsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Transparency</span>
          <h1>Models & technology</h1>
          <p>
            The models behind each part of Flow AI Music, and how we tell you which one
            produced a result. Last updated 25 November 2026.
          </p>
        </div>
      </section>
      <div className="container legal-body">
        <h2>1. Models in use</h2>
        <p>
          Flow AI Music uses two third-party models: <strong>Suno</strong> for music
          generation and <strong>Google Flow</strong> for music video generation. These
          are the actual providers behind the generation features offered on paid plans.
        </p>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Model</th>
                <th>Provider</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map((item) => (
                <tr key={item.task}>
                  <td>{item.task}</td>
                  <td>{item.model}</td>
                  <td>{item.provider}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul>
          {MODELS.map((item) => (
            <li key={item.task}>
              <strong>{item.model} — {item.task}:</strong> {item.detail}
            </li>
          ))}
        </ul>

        <h2>2. About the plan labels</h2>
        <p>
          Labels such as &ldquo;Flow Audio 2 · Standard&rdquo; on plan cards describe the
          product tier and its credit allowance, not a model name. The provider model used
          for your generation is Suno for audio and Google Flow for video. We are replacing
          misleading tier labels with the real provider names across the site.
        </p>

        <h2>3. How the active model is shown</h2>
        <p>
          The studio identifies the active model before a generation starts: Suno for a
          song and Google Flow for a video. A result records which model produced it.
          Model availability can change with provider capacity, regional restrictions and
          content-safety requirements; if the selected model is unavailable, the studio
          will show that before you are charged. We may add or replace providers as long
          as the capabilities of your paid plan are preserved.
        </p>

        <h2>4. Provider policies</h2>
        <p>
          Suno and Google Flow apply their own usage and safety rules. Requests and
          outputs are subject to both those rules and our{" "}
          <Link href="/aigc">AIGC use policy</Link>. Prompts are passed to the selected
          provider to produce a result; see the{" "}
          <Link href="/privacy">privacy policy</Link> for how that data is handled.
        </p>
      </div>
    </main>
  );
}
