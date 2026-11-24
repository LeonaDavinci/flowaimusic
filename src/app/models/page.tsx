import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "AI Models & Technology | Flow AI Music",
  description:
    "Flow AI Music generates songs with SeeAPI AI Music models (M1/M2/M3) and Google Flow for music video. Provider details and how the active model is shown.",
  path: "/models",
  keywords: ["SeeAPI AI Music", "AI music model", "Google Flow", "AI music video model", "model disclosure"],
});

const MUSIC_MODELS = [
  {
    model: "AI Music M1",
    endpoint: "music-generation",
    price: "16 credits per generation",
    detail:
      "Fastest text-to-music route — vocal songs or instrumental tracks from a text brief, with cover art and full-length audio (MP3).",
  },
  {
    model: "AI Music M2",
    endpoint: "music-generation",
    price: "17 credits per generation",
    detail:
      "Balanced quality and speed for everyday songwriting, with the same inputs and outputs as the other AI Music models.",
  },
  {
    model: "AI Music M3",
    endpoint: "music-generation",
    price: "18 credits per generation",
    detail:
      "Highest fidelity music generation — richer arrangement and vocals for finished tracks.",
  },
];

const MODELS = [
  {
    task: "Music generation",
    model: "AI Music M1 / M2 / M3",
    provider: "SeeAPI (seeapi.com)",
    status: "In use",
  },
  {
    task: "Music video generation",
    model: "Google Flow",
    provider: "Google",
    status: "Planned",
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
          Music generation runs on the <strong>AI Music M1, M2 and M3</strong> models
          accessed through <strong>SeeAPI</strong> (api.seeapi.com), a unified AI
          generation gateway. Music video generation is planned on{" "}
          <strong>Google Flow</strong> and is not offered until it goes live.
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
          {MUSIC_MODELS.map((item) => (
            <li key={item.model}>
              <strong>{item.model} — {item.price}:</strong> {item.detail}
            </li>
          ))}
        </ul>

        <h2>2. Choosing and seeing the model</h2>
        <p>
          In the studio you pick the AI Music model (M1, M2 or M3) before each
          generation; the selected model is shown on the track panel and every
          generated result records which model produced it. A generation returns one
          or more tracks as permanent MP3 files with cover art.
        </p>

        <h2>3. About the plan labels</h2>
        <p>
          Plan cards name the actual generation model (AI Music M1/M2/M3) alongside
          the credit allowance. If we add or replace providers, the capabilities of
          your paid plan are preserved and this page is updated first.
        </p>

        <h2>4. Provider policies</h2>
        <p>
          SeeAPI and the upstream AI Music models apply their own usage and safety
          rules. Requests and outputs are subject to both those rules and our{" "}
          <Link href="/aigc">AIGC use policy</Link>. Prompts are passed to the selected
          provider to produce a result; see the{" "}
          <Link href="/privacy">privacy policy</Link> for how that data is handled.
        </p>
      </div>
    </main>
  );
}
