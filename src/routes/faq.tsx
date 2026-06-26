import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

const FAQS = [
  { q: "Do you deliver outside Nairobi?", a: "Yes—we deliver across all 47 counties in Kenya. Delivery fees are calculated at checkout based on your county and the size of the order." },
  { q: "How long does delivery take?", a: "Most in-stock items ship within 2 business days. Nairobi deliveries arrive in 1–3 days; up-country deliveries in 3–7 days." },
  { q: "Can I customize a piece?", a: "Yes. Most of our products can be ordered in custom dimensions, fabrics, and wood finishes. Contact us for a quote." },
  { q: "What payment methods do you accept?", a: "M-Pesa STK Push, all major cards, bank transfer, and (where available) cash on delivery." },
  { q: "Do you assemble at delivery?", a: "Yes—our delivery team assembles every piece at no extra cost." },
  { q: "What is your warranty?", a: "Every piece comes with a 2-year manufacturer warranty covering joinery and structural defects." },
  { q: "Do you accept returns?", a: "We accept returns within 7 days of delivery for unused pieces in their original condition. Custom orders are non-returnable." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Nyumba Furniture" },
      { name: "description", content: "Frequently asked questions about delivery, payments, warranties and customization." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero eyebrow="Frequently asked" title="Questions, answered." />
      <section className="container-x pb-24 max-w-3xl">
        <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 hover:bg-accent/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg pr-6">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-48" : "max-h-0"}`}>
                  <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
