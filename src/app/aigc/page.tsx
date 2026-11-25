import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "AIGC Use Policy | Flow AI Music",
  description:
    "Prohibited content categories for AI music and video generation, reporting channels, moderation process and appeals.",
  path: "/aigc",
  keywords: ["AI content policy", "AIGC prohibited content", "AI music safety", "content moderation"],
});

const CATEGORIES = [
  {
    title: "Sexual content and NSFW",
    text: "No explicit sexual content, nudity, erotic vocals or lyrics, or material intended to arouse. Suggestive but non-explicit artistic expression may be allowed at our discretion.",
  },
  {
    title: "AI NCII — non-consensual intimate imagery",
    text: "No AI-generated nude, sexual or intimate imagery of any real person, and no sexualised content generated to harass, extort, shame or impersonate an identifiable individual. This prohibition applies regardless of whether the person consented and is enforced without exception. Reports of NCII are actioned immediately and may be referred to law enforcement.",
  },
  {
    title: "Violence and gore",
    text: "No graphic depictions of violence, gore, severe injury, torture, or content that instructs or encourages violent acts.",
  },
  {
    title: "Hate speech",
    text: "No content that attacks, demeans or incites hatred or discrimination against people based on race, ethnicity, nationality, religion, gender, gender identity, sexual orientation, disability or similar characteristics.",
  },
  {
    title: "Child safety (CSAM)",
    text: "No sexualised, abusive or exploitative content involving minors, and no content that grooms, endangers or targets children. Any such report is treated as urgent and may be referred to the relevant authorities.",
  },
  {
    title: "Deepfakes and impersonation",
    text: "No realistic imitation of a real person’s voice, likeness or identity without their consent, and no deceptive claims that generated content was created or endorsed by a real artist or brand.",
  },
  {
    title: "Copyright and trademark infringement",
    text: "No reproduction of copyrighted lyrics, melodies or recordings without rights, and no unauthorised use of trademarks, logos or protected characters in generated audio, video or cover art.",
  },
];

export default function AigcPolicyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Legal · Content safety</span>
          <h1>AIGC use policy</h1>
          <p>
            Standards for music, audio and video generated with Flow AI Music. This
            policy forms part of our <Link href="/terms">terms of service</Link>. Last
            updated 25 November 2026.
          </p>
        </div>
      </section>
      <div className="container legal-body">
        <h2>1. Scope</h2>
        <p>
          This policy applies to every prompt you submit and every output you generate,
          download or share through the service, including music, lyrics, sound effects,
          music videos, cover imagery and any derived material. It applies whether you
          use the free demo or a paid plan.
        </p>

        <h2>2. Content standards and prohibited categories</h2>
        <p>
          You must not use the service to create, upload, publish or distribute content
          in any of the following categories. Requests that fall into these
          categories are refused, and outputs may be removed after they are created.
        </p>
        <ol className="legal-list-numbered">
          {CATEGORIES.map((item) => (
            <li key={item.title}>
              <strong>{item.title}.</strong> {item.text}
            </li>
          ))}
        </ol>
        <p>
          We may also act on content that is not listed here but is unlawful, violates
          another person&rsquo;s rights, or circumvents these categories. We review
          borderline artistic or educational material in context.
        </p>

        <h2>3. Your responsibilities</h2>
        <p>
          You are responsible for the prompts you enter, the material you upload and what
          you do with the output. Do not represent AI-generated material as a real
          person&rsquo;s work without disclosure where disclosure is required, do not
          use output to harass others, and do not use the service to produce evidence or
          identity documents. If you believe a piece of content is lawful but was
          refused, you can appeal as described below.
        </p>

        <h2>4. Enforcement and consequences</h2>
        <p>Where content breaches this policy, we may:</p>
        <ul>
          <li>refuse or block the generation request without charging credits;</li>
          <li>remove or hide the affected output and remove it from feeds and libraries;</li>
          <li>issue a warning and require you to change the content;</li>
          <li>suspend generation temporarily or close your account for repeated or serious breaches;</li>
          <li>withhold refunds where the breach caused the suspension, as set out in the terms;</li>
          <li>preserve evidence and report cases to law enforcement where the law requires or permits it.</li>
        </ul>

        <h2>5. Reporting prohibited content</h2>
        <p>
          If you encounter content that may breach this policy, email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Content%20report`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          with the subject <strong>&ldquo;Content report&rdquo;</strong>. Include the
          track, video or asset identifier, a direct link if available, the category from
          section 2, a short description and your contact email. You may report anonymously,
          but a contact address helps us follow up. Please do not re-share the material
          when reporting it.
        </p>

        <h2>6. Platform moderation process</h2>
        <ol className="legal-list-numbered">
          <li>
            <strong>Intake.</strong> We log each report, assign a reference number and
            acknowledge it within 24 hours.
          </li>
          <li>
            <strong>Triage.</strong> Reports are classified by category and severity.
            Child safety reports and imminent-harm cases are escalated immediately.
          </li>
          <li>
            <strong>Review.</strong> A trained reviewer examines the reported output,
            the prompt and the account history. Automated filters may block obvious
            violations before review, but a person makes the final decision on reports.
          </li>
          <li>
            <strong>Action.</strong> We normally decide within 72 hours. We apply one or
            more of the measures in section 4 and record the outcome.
          </li>
          <li>
            <strong>Notice and appeal.</strong> We notify the affected user where
            practical. They may appeal within 14 days by replying to the decision notice;
            a different reviewer considers the appeal.
          </li>
          <li>
            <strong>Prevention.</strong> We use confirmed cases to improve prompts filters
            and detection rules, without retaining more personal data than necessary.
          </li>
        </ol>

        <h2>7. Contact</h2>
        <p>
          Policy questions and reports:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Privacy matters are
          handled in the <Link href="/privacy">privacy policy</Link>.
        </p>
      </div>
    </main>
  );
}
