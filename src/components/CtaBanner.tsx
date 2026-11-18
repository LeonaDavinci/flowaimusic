import Link from "next/link";

type CtaBannerProps = {
  title?: string;
  subtitle?: string;
};

export function CtaBanner({
  title = "Ready to make something?",
  subtitle = "Your next song is one sentence away. No gear, no setup, no credit card.",
}: CtaBannerProps) {
  return (
    <section className="cta-banner" aria-labelledby="cta-title">
      <div className="container cta-inner">
        <h2 id="cta-title">{title}</h2>
        <p>{subtitle}</p>
        <div className="cta-buttons">
          <Link href="/studio" className="btn btn-light btn-lg" data-track="cta_click" data-placement="footer_banner">
            Start creating free
          </Link>
          <Link href="/explore" className="btn btn-outline-light btn-lg" data-track="cta_click" data-placement="footer_banner">
            Hear what others made
          </Link>
        </div>
        <p className="cta-note">Free to start · No credit card required</p>
      </div>
    </section>
  );
}
