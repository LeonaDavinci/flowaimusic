import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PAID_PLANS, getPlanById } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { PaymentClient } from "@/components/PaymentClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Checkout — Flow AI Music",
  description: "Sign in with Google and subscribe to Flow AI Music. Credits, models and music duration per plan.",
  path: "/payment",
  keywords: ["AI music subscription", "AI music credits", "AI music pricing"],
});

type Params = {
  searchParams: Promise<{ plan?: string; billing?: string; paid?: string; error?: string }>;
};

export default async function PaymentPage({ searchParams }: Params) {
  const params = await searchParams;
  const plan = getPlanById(params.plan);
  if (!plan || plan.monthly === 0) redirect("/pricing");

  const billing = params.billing === "yearly" ? "yearly" : "monthly";
  const price = billing === "yearly" ? Math.round(plan.monthly * 0.8) : plan.monthly;
  const specs = [
    ["Monthly credits", plan.credits],
    ["Estimated output", plan.songs],
    ["Music time", plan.musicTime],
    ["Generation model", plan.model],
    ["Max song duration", plan.maxDuration],
    ["Concurrency", plan.concurrency],
  ];

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link> <span>/</span> <Link href="/pricing">Pricing</Link>{" "}
            <span>/</span> <span>Checkout</span>
          </div>
          <span className="eyebrow">{plan.name} plan</span>
          <h1>Subscribe to {plan.name}</h1>
          <p>
            ${price} per month{billing === "yearly" ? ", billed yearly" : ""}. Sign in with Google,
            then complete payment through our secure checkout.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container payment-layout">
          <div className="payment-summary">
            <span className="payment-kicker">Your plan includes</span>
            <div className="plan-price">
              <b>${price}</b>
              <span>/ month</span>
            </div>
            <dl className="payment-specs">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <ul className="plan-list">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="payment-switch">
              <span>Other plans</span>
              {PAID_PLANS.filter((item) => item.id !== plan.id).map((item) => (
                <Link key={item.id} href={`/payment?plan=${item.id}&billing=${billing}`}>
                  {item.name} ${item.monthly}/mo
                </Link>
              ))}
            </div>
          </div>

          <PaymentClient
            plan={plan}
            billing={billing}
            price={price}
            paid={params.paid === "1"}
            error={params.error}
          />
        </div>
      </section>
    </main>
  );
}
