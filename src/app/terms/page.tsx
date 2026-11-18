import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service | FlowAI Music",
  description: "The terms that apply when using the FlowAI Music website and demo studio.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Terms of service</h1>
          <p>Plain-language terms for this website and its demo studio. Last updated 18 November 2026.</p>
        </div>
      </section>
      <div className="container legal-body">
        <h2>1. About this site</h2>
        <p>
          FlowAI Music is an independent product website. The studio, explore
          feed, playlists and pricing information on this site are presented as
          a product demonstration. Track names, creator handles, play counts and
          testimonials are original demo content and do not represent real
          users or real usage statistics.
        </p>
        <h2>2. Demo mode</h2>
        <p>
          The interactive studio simulates a generation session locally in your
          browser. It does not upload audio, create an account, process a
          payment, or call a music generation service. Download controls are
          disabled in demo mode.
        </p>
        <h2>3. Your content</h2>
        <p>
          In the production service, you keep the rights to the original music
          you create. Paid plans include a commercial use licence, the scope of
          which will be stated at purchase. You are responsible for ensuring
          that any material you supply does not infringe the rights of others.
        </p>
        <h2>4. Acceptable use</h2>
        <p>
          Do not use the service to impersonate another artist, distribute
          unlawful content, or attempt to disrupt the platform. We may suspend
          access where these terms are breached.
        </p>
        <h2>5. Availability and changes</h2>
        <p>
          Features and pricing shown on this site are illustrative and may
          change. The service is provided without a warranty of uninterrupted
          availability.
        </p>
        <h2>6. Contact</h2>
        <p>
          Questions about these terms can be sent to the site operator through
          the contact channel listed on the published website.
        </p>
      </div>
    </main>
  );
}
