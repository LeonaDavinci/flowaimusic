"use client";

import { useState } from "react";
import Link from "next/link";
import { PLANS } from "@/lib/content";

export function PricingCards() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div className="billing-toggle" role="group" aria-label="Billing period">
          <button
            type="button"
            className={!yearly ? "is-active" : ""}
            aria-pressed={!yearly}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            className={yearly ? "is-active" : ""}
            aria-pressed={yearly}
            onClick={() => setYearly(true)}
          >
            Yearly <span className="billing-save">−20%</span>
          </button>
        </div>
      </div>

      <div className="pricing-grid">
        {PLANS.map((plan) => {
          const price = yearly ? Math.round(plan.monthly * 0.8) : plan.monthly;
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
                    : `/payment?plan=${plan.id}&billing=${yearly ? "yearly" : "monthly"}`
                }
                className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"}`}
                data-track="plan_select"
                data-plan={plan.id}
                data-billing={yearly ? "yearly" : "monthly"}
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
