"use client";

import Link from "next/link";
import { PLANS } from "@/lib/content";

/* Monthly billing only for now — yearly Waffo products are not published yet.
   Re-introduce the toggle once PANCAKE_PRODUCT_*_YEARLY exist. */
export function PricingCards() {
  return (
    <>
      <div className="pricing-grid">
        {PLANS.map((plan) => {
          const price = plan.monthly;
          return (
            <article
              key={plan.id}
              className={`plan-card${plan.featured ? " is-featured" : ""}`}
            >
              {plan.featured && <span className="plan-ribbon">Most popular</span>}
              <h2 className="plan-name">{plan.name}</h2>
              <p className="plan-blurb">{plan.blurb}</p>
              <div className="plan-price">
                <b>${price}</b>
                <span>/ month</span>
              </div>
              <div className="plan-credits">{plan.credits}</div>
              <div className="plan-downloads">{plan.downloads}</div>
              {plan.monthly > 0 && (
                <div className="plan-specs">
                  {plan.model} · {plan.maxDuration}
                </div>
              )}
              <ul className="plan-list">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link
                href={
                  plan.monthly === 0
                    ? "/studio"
                    : `/payment?plan=${plan.id}&billing=monthly`
                }
                className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"}`}
                data-track="plan_select"
                data-plan={plan.id}
                data-billing="monthly"
              >
                {plan.monthly === 0 ? "Start for free" : `Choose ${plan.name}`}
              </Link>
            </article>
          );
        })}
      </div>
    </>
  );
}
