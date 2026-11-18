import Link from "next/link";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <main className="not-found container">
      <b>404</b>
      <h1>This track has not been written yet.</h1>
      <p>The page you were looking for does not exist — but a new song is only one sentence away.</p>
      <div className="section-actions" style={{ justifyContent: "center" }}>
        <Link href="/" className="btn btn-primary btn-lg">Back home</Link>
        <Link href="/studio" className="btn btn-ghost btn-lg">Open the studio</Link>
      </div>
    </main>
  );
}
