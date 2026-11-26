import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Flow AI Music",
  description:
    "What data Flow AI Music collects, where it is stored, how long it is kept, your data rights, and which cookies and analytics we use.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Privacy policy</h1>
          <p>
            How we handle personal data on Flow AI Music. Last updated 25 November 2026.
          </p>
        </div>
      </section>
      <div className="container legal-body">
        <h2>1. Information we collect</h2>
        <p>Depending on how you use the site, we handle the following data:</p>
        <ul>
          <li>
            <strong>Account information.</strong> When you sign in with Google we receive
            your Google account identifier, email address, display name and profile
            picture. We do not receive or store your Google password.
          </li>
          <li>
            <strong>Google sign-in scope.</strong> The only permissions we request are{" "}
            <code>openid</code>, <code>email</code> and <code>profile</code> — the
            basics needed to create your account and show your name and avatar. We
            request online access only: no refresh token is stored and we never read
            your Gmail, Drive, photos, contacts, YouTube or any other Google service.
            You can revoke this access at any time from your{" "}
            <a href="https://myaccount.google.com/permissions" rel="noopener noreferrer">
              Google account permissions page
            </a>
            .
          </li>
          <li>
            <strong>Billing information.</strong> Waffo Pancake, our Merchant of Record,
            collects your payment details, billing address and transaction records. Full
            card numbers are never transmitted to or stored on our servers. We receive
            the plan, payment status, transaction identifier and the billing email
            needed to grant and support your subscription.
          </li>
          <li>
            <strong>Content and prompts.</strong> Text prompts, style settings and the
            audio or visual output you generate are processed to deliver the service and
            to enforce our content standards.
          </li>
          <li>
            <strong>Technical and usage data.</strong> IP address, browser type, device
            information, timestamps, pages viewed and interaction events, including
            events recorded through Google Tag Manager.
          </li>
          <li>
            <strong>Support communications.</strong> The content of emails you send us
            and our replies.
          </li>
        </ul>
        <p>
          AI music generation requires signing in. Every account receives one
          free generation capped at 30 seconds; after that, a paid plan is
          needed. When you generate, the text prompt you enter is sent to the
          model provider named on our{" "}
          <Link href="/models">model disclosure page</Link> solely to produce
          your audio. If the AI service is unavailable, the studio falls back
          to local synthesis in your browser with the Web Audio API; in that
          fallback mode nothing is uploaded and no microphone access is
          requested.
        </p>

        <h2>2. How we use information</h2>
        <p>We process the data described in section 1 for the following purposes:</p>
        <ul>
          <li>To create and maintain your account and identify you when you sign in.</li>
          <li>To deliver the music-generation service you request: sending your prompt
            and settings to the model provider, returning your generated audio, and
            displaying your generation history.</li>
          <li>To process subscriptions, payments and refunds, and to grant the plan
            benefits you purchase, through Waffo Pancake as our Merchant of Record.</li>
          <li>To detect, investigate and prevent abuse, fraud and violations of our{" "}
            <Link href="/terms">terms</Link> and{" "}
            <Link href="/aigc">AIGC use policy</Link>, including reviewing reported
            content.</li>
          <li>To measure aggregate site usage and improve the product, via Google Tag
            Manager analytics (optional; loaded only after you accept analytics
            cookies).</li>
          <li>To answer your support requests sent to{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</li>
          <li>To comply with legal, tax and accounting obligations.</li>
        </ul>
        <p>
          We do not sell personal data, and we do not share personal data for
          cross-context behavioural advertising.
        </p>
        <p>
          <strong>How we use data from Google sign-in.</strong> The Google account data
          we receive (identifier, email address, display name, profile picture) is used
          only to operate and secure this website: creating and maintaining your
          account, showing your profile, and preventing abuse. We do not use it for
          advertising, we do not use it to train machine-learning or AI models, we do
          not sell it, and we do not transfer it to any third party except the
          infrastructure providers described in section 8, or after you ask us to, or
          where the law requires it. Our use of information received from Google APIs
          will adhere to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>

        <h2>3. Legal bases</h2>
        <p>
          Where data protection law applies, we rely on contract performance to provide
          paid features, legitimate interests to secure and improve the service and
          prevent abuse, consent for optional analytics, and legal compliance for tax
          and accounting records.
        </p>

        <h2>4. Data storage and security</h2>
        <p>
          Your sign-in state is kept in a signed, HTTP-only cookie on your device. The
          cookie is signed with HMAC-SHA256, scoped to this site with SameSite=Lax and
          marked Secure on HTTPS deployments, so it cannot be read by page scripts. A
          short-lived cookie also protects the Google sign-in flow and an in-flight
          checkout. We do not currently operate a general-purpose user database: account
          state is derived from the signed cookie, and billing records are held by Waffo
          Pancake as Merchant of Record. When generation features that require persistence
          are enabled, generated content and prompts will be stored in an access-controlled
          data store for as long as your account is active.
        </p>
        <p>
          Data is transmitted over HTTPS. We limit access to personal data to what is
          needed to operate the service, use least-privilege credentials, and rely on the
          security controls of our infrastructure and payment providers. No system is
          completely secure; if we become aware of a breach affecting your personal data,
          we will notify you and the relevant authority where the law requires it.
        </p>

        <h2>5. How long we keep data</h2>
        <ul>
          <li>Session cookie: up to 30 days, or until you sign out.</li>
          <li>Google sign-in state cookie: 10 minutes. Checkout cookie: 30 minutes.</li>
          <li>Technical and server logs: normally 90 days.</li>
          <li>
            Generated content and prompts: while your account remains active, until you
            delete them or close your account.
          </li>
          <li>
            Billing and tax records: retained by Waffo Pancake for the period required by
            applicable accounting and tax law, typically up to 7 years.
          </li>
          <li>Support emails: up to 24 months after the conversation is closed.</li>
        </ul>

        <h2>6. Your data rights</h2>
        <p>
          You can ask us to confirm whether we hold personal data about you, give you a
          copy of it, correct inaccurate data, delete data we no longer need, restrict or
          object to certain processing, and provide data you gave us in a portable
          format. You can close your account at any time.
        </p>
        <p>
          To exercise any of these rights, email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the address on
          your account and tell us what you want. We may ask for information to verify
          your identity. We respond within <strong>30 days</strong>; if a request is
          complex we will tell you within that period and may extend once as the law
          allows. Deleting your account removes your session and generated content under
          our control; billing records that we must keep by law remain with Waffo Pancake.
          If you are unhappy with our response, you may complain to your local data
          protection authority.
        </p>
        <p>
          You may withdraw consent for optional analytics at any time through the cookie
          preferences described below, without affecting processing already carried out.
        </p>

        <h2>7. Cookies and tracking</h2>
        <p>
          <strong>Essential cookies.</strong> These are required for sign-in and checkout
          and are set without additional consent:
        </p>
        <ul>
          <li><code>flow_session</code> — signed sign-in session, 30 days.</li>
          <li><code>flow_google_state</code> and <code>flow_google_next</code> — one-time Google sign-in state, 10 minutes.</li>
          <li><code>flow_checkout</code> — ties a completed payment to your account, 30 minutes.</li>
        </ul>
        <p>
          Your banner choice is remembered in a <code>flow_cookie_consent</code> entry
          in your browser&rsquo;s local storage on this device — it is not a tracking
          cookie and is never sent to our servers.
        </p>
        <p>
          <strong>Optional analytics cookies.</strong> We load Google Tag Manager
          container <code>GTM-K2ZP897G</code> only after you accept analytics in the
          cookie notice shown on your first visit. Google Analytics may then set{" "}
          <code>_ga</code> (up to 2 years) and <code>_gid</code> (24 hours) to measure
          site usage. You can reject analytics in that notice, change your choice at any
          time via the cookie settings link in the footer, or block these cookies in
          your browser. Rejecting optional cookies does not affect sign-in, generation or
          checkout.
        </p>

        <h2>8. Who we share data with</h2>
        <ul>
          <li>
            <strong>Google</strong> — sign-in authentication and, if you consent,
            analytics through Google Tag Manager / Google Analytics.
          </li>
          <li>
            <strong>Waffo Pancake</strong> — Merchant of Record for payments, refunds,
            taxes and subscription records.
          </li>
          <li>
            <strong>Model providers</strong> — generation requests are sent through the{" "}
            <strong>SeeAPI</strong> gateway (api.seeapi.com) to the AI Music models
            listed on our <Link href="/models">model disclosure page</Link>. Your prompt
            and style selection are passed to the selected model to produce audio.
          </li>
          <li>
            <strong>Infrastructure providers</strong> — hosting, log storage and web
            font delivery (Google Fonts).
          </li>
        </ul>
        <p>
          Some of these providers process data outside your country. Where required, we
          rely on standard contractual clauses or equivalent safeguards for those
          transfers.
        </p>

        <h2>9. Children&rsquo;s privacy</h2>
        <p>
          The service is not directed to children under 13, and paid accounts require
          the minimum age stated in our <Link href="/terms">terms of service</Link>. We
          do not knowingly collect personal data from children below that age.
        </p>

        <h2>10. Changes to this policy</h2>
        <p>
          We update this policy when our practices or legal obligations change. The
          current version and its update date are always shown on this page, and we will
          give notice on the site before material changes take effect.
        </p>

        <h2>11. Contact</h2>
        <p>
          For privacy questions or data requests, write to{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </p>
      </div>
    </main>
  );
}
