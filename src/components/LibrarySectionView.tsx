import Link from "next/link";
import { CtaBanner } from "./CtaBanner";
import { Icon } from "./Icons";

type Props = {
  title: string;
  description: string;
  name: string;
  examples: string[];
  tone: string;
};

export function LibrarySectionView({ title, description, name, examples, tone }: Props) {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <Link href="/library">Library</Link> <span>/</span> <span>{name}</span>
          </div>
          <span className="eyebrow">My library</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 56 }}>
        <div className="empty-state">
          <h2>Your {name.toLowerCase()} will live here.</h2>
          <p>This demo does not store personal data. Here is what the real library looks like once you start creating.</p>
          <Link href="/studio" className="btn btn-primary btn-lg" data-track="cta_click" data-placement="library_section">
            Start creating <Icon name="arrow" size={17} />
          </Link>
        </div>

        <div className={`card-grid tone-${tone}`}>
          {examples.map((example, i) => (
            <article className="simple-card" key={example}>
              <span className="cap-icon">{String(i + 1).padStart(2, "0")}</span>
              <h2>{example}</h2>
              <p>A sample item showing how {name.toLowerCase()} appear once your session is saved.</p>
              <Link href="/explore" className="btn btn-ghost btn-sm">Preview →</Link>
            </article>
          ))}
        </div>
      </div>

      <CtaBanner />
    </main>
  );
}
