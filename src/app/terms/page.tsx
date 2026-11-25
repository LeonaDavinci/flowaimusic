import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service | Flow AI Music",
  description:
    "Terms governing Flow AI Music accounts, subscriptions, billing, refunds, content standards, disclaimers and liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal</span>
          <h1>Terms of service</h1>
          <p>
            These terms apply to the Flow AI Music website, your account and any paid
            subscription. Last updated 25 November 2026.
          </p>
        </div>
      </section>
      <div className="container legal-body">
        <h2>1. About this service</h2>
        <p>
          Flow AI Music (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;the service&rdquo;) is an AI
          music creation service operated through this website. You can explore the
          browser-based studio without an account, or sign in with Google and subscribe
          to a paid plan for generation credits and additional features. Some areas of
          the site demonstrate the product experience; where a feature is a demo, it is
          labelled as such. Track names, creator handles, play counts and testimonials
          shown in the explore feed are original demonstration content.
        </p>

        <h2>2. Accounts and eligibility</h2>
        <p>
          Paid features require signing in with Google (OAuth 2.0). We receive only
          your Google account identifier, email address, display name and profile
          picture — we never see your Google password, and the permissions we request
          are limited to <code>openid</code>, <code>email</code> and{" "}
          <code>profile</code> as described in the{" "}
          <Link href="/privacy">privacy policy</Link>. You must be at least 16 years
          old, or have reached the age of digital consent in your country, to create an
          account. You agree to provide accurate information and to keep your account
          secure. You are responsible for activity that occurs under your account. We
          may suspend or close an account that is used in breach of these terms.
        </p>

        <h2>3. Subscription plans and billing</h2>
        <p>
          Paid plans are billed monthly in advance. The published prices are Creator
          USD 9, Pro USD 18 and Studio USD 28 per month; where a yearly option is
          introduced, it will be charged once per year and announced on the pricing
          page before it goes on sale. Prices are shown in USD and are exclusive of any
          taxes or duties that apply in your jurisdiction.
        </p>
        <p>
          <strong>Automatic renewal.</strong> A subscription renews automatically at the
          then-current price for the same billing period until you cancel. Authorisation
          for recurring charges is given when you complete checkout and remains in force
          until cancellation. You may cancel at any time; cancellation takes effect at
          the end of the current billing period, and you keep access until that date.
        </p>
        <p>
          <strong>How to cancel.</strong> Use the billing controls in your account, or
          email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with the email
          address on your account. We confirm cancellation by email. We will give at
          least 30 days&rsquo; notice on the pricing page before a price increase affects
          an existing subscriber.
        </p>
        <p>
          <strong>Payment processor.</strong> Waffo Pancake acts as Merchant of Record.
          It processes your payment, collects applicable taxes and holds your billing
          records. We do not store full card numbers on our servers.
        </p>

        <h2>4. Refunds and unused credits</h2>
        <p>
          If you are a first-time subscriber and are not satisfied, you may request a
          full refund of your first payment within <strong>7 days</strong> of the charge.
          After that window, payments are non-refundable except where (a) we charged you
          in error, (b) a duplicate charge occurred, or (c) the paid service was
          unavailable for more than 72 consecutive hours and we could not restore it.
        </p>
        <p>
          Monthly credits are a usage allowance, not a stored-value balance. Unused
          credits do not roll over to the next period, are not exchangeable for cash, and
          are not refunded when you cancel or when a subscription ends. On cancellation
          your paid features remain available until the end of the period you already
          paid for; no further charge is made.
        </p>
        <p>
          Send refund requests to <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{" "}
          with your account email and payment date. We acknowledge within 2 business
          days. Approved refunds are returned to the original payment method through
          Waffo Pancake within 5–10 business days. We may ask for additional information
          to verify an exception claim.
        </p>

        <h2>5. Credits and usage limits</h2>
        <p>
          Each plan includes the credit allowance and concurrency limit shown on the{" "}
          <Link href="/pricing">pricing page</Link>. Credits are consumed when a
          generation starts. Generating content that breaches our content standards,
          attempting to game allowance limits, or using automated means to bypass rate
          limits may result in suspension without refund.
        </p>

        <h2>6. Your content and rights</h2>
        <p>
          You retain rights to the original music and other content you create with the
          service. Paid plans include a commercial-use licence for those outputs, subject
          to these terms and the content standards below. You remain responsible for the
          prompts, audio, images and other material you supply, and you confirm that you
          have the rights needed to supply them. We do not claim ownership of your
          content, but we may process it to provide the service, prevent abuse and comply
          with law.
        </p>

        <h2>7. Content standards and prohibited categories</h2>
        <p>
          The service may not be used to generate, upload or distribute content that is
          sexual or NSFW, violently graphic, hateful, sexually unsafe for children,
          a deceptive deepfake or impersonation, or an infringement of copyright or
          trademark. These six categories, with examples, are set out in our{" "}
          <Link href="/aigc">AIGC use policy</Link>, which forms part of these terms.
          Generating prohibited content is a material breach; we may reject or remove it,
          deduct no credits for refused requests, warn you, suspend your account or
          terminate it, and report cases required by law.
        </p>

        <h2>8. Reports and content moderation</h2>
        <p>
          To report content, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{" "}
          with the subject &ldquo;Content report&rdquo; and include the track or asset
          identifier, a link, the category concerned and a short description. We
          acknowledge reports within 24 hours, review them under the process described
          in the <Link href="/aigc">AIGC use policy</Link>, and normally reach a decision
          within 72 hours. You may appeal a moderation decision by replying to the notice
          within 14 days.
        </p>

        <h2>9. AI models and third-party services</h2>
        <p>
          Generation is carried out by third-party model providers. Music generation
          requests are sent through the SeeAPI gateway (api.seeapi.com) to the AI Music
          models listed on the <Link href="/models">model disclosure page</Link>;
          payments are processed by Waffo Pancake as Merchant of Record. Third-party
          providers may apply their own usage policies. We are not responsible for the
          independent actions of third-party services that you choose to connect to the
          site.
        </p>

        <h2>10. Disclaimer of warranties</h2>
        <p>
          The service is provided <strong>&ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;</strong>. To the fullest extent permitted by law, we and our
          suppliers disclaim all warranties, express or implied, including warranties
          of merchantability, fitness for a particular purpose, title, non-infringement,
          accuracy and quiet enjoyment. We do not warrant that the service will be
          uninterrupted, secure or error-free, that defects will be corrected, that
          generated output will meet your expectations, or that any content is free of
          harmful components. You use the service and its outputs at your own risk.
        </p>

        <h2>11. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, we and our suppliers are not liable
          for any indirect, incidental, special, consequential, exemplary or punitive
          damages, or for loss of profits, revenue, goodwill, anticipated savings, data
          or business, arising out of or relating to the service, even if we were
          advised of the possibility of such damages.
        </p>
        <p>
          Our total aggregate liability for any claim arising out of or relating to the
          service is limited to the greater of (a) the amount you paid us for the
          service in the 12 months before the event giving rise to the claim, and (b)
          USD 100. Nothing in these terms excludes or limits liability that cannot be
          excluded or limited by law, including liability for fraud, wilful misconduct,
          death or personal injury caused by negligence, or mandatory consumer rights.
        </p>

        <h2>12. Termination</h2>
        <p>
          You may stop using the service and cancel your subscription at any time. We
          may suspend or terminate access if you breach these terms, if payment fails,
          or if continued provision is unlawful or no longer commercially practicable.
          Sections relating to payment obligations, content rights, disclaimers,
          liability and disputes survive termination.
        </p>

        <h2>13. Changes to these terms</h2>
        <p>
          We may update these terms to reflect changes to the service or legal
          requirements. The current version with its update date is always available at
          this page. Material changes that affect paid subscribers will be posted at
          least 30 days before taking effect.
        </p>

        <h2>14. Contact</h2>
        <p>
          For questions about these terms, billing or a report, write to{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Our privacy practices
          are described in the <Link href="/privacy">privacy policy</Link>.
        </p>
      </div>
    </main>
  );
}
