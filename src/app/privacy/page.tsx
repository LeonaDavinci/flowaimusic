import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | FlowAI Music",
  description: "How the FlowAI Music demo website handles data, browser audio and analytics placeholders.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Privacy policy</h1>
          <p>What this demo site does — and does not — do with your data. Last updated 18 November 2026.</p>
        </div>
      </section>
      <div className="container legal-body">
        <h2>1. No account, no upload</h2>
        <p>
          The demo studio requires no sign-in. Text you type into the composer
          is processed in your browser and is not transmitted to a server by
          this site. No audio files are recorded or uploaded.
        </p>
        <h2>2. Browser audio</h2>
        <p>
          The mini keyboard uses the Web Audio API to synthesise notes locally
          after you click a key. It does not request microphone permission and
          stores no recording.
        </p>
        <h2>3. Analytics placeholders</h2>
        <p>
          Interaction elements carry <code>data-track</code> attributes and may
          write events to an in-browser <code>dataLayer</code> array. In this
          demo, no third-party analytics or advertising script is loaded and no
          event leaves your device.
        </p>
        <h2>4. Cookies</h2>
        <p>
          This demo does not set authentication, advertising or tracking
          cookies. A production release would describe any essential and
          optional cookies here and request consent where required.
        </p>
        <h2>5. External resources</h2>
        <p>
          Web fonts may be requested from Google Fonts. Apart from that, page
          styles, images and scripts are served from this site.
        </p>
        <h2>6. Changes</h2>
        <p>
          This policy will be updated before any real account, payment or
          generation service is introduced.
        </p>
      </div>
    </main>
  );
}
