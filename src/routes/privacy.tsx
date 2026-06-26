import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Standard Furniture" },
      { name: "description", content: "How Standard Furniture collects, uses, and protects your information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="This page is maintained by Standard Furniture and describes how we handle your information." />
      <article className="container-x pb-24 max-w-3xl prose-style">
        <Block t="Information we collect">When you place an order we collect your name, phone number, optional email, and delivery address. When you contact us we keep a copy of your message.</Block>
        <Block t="How we use it">We use your information solely to fulfil your order, communicate with you about it, and provide customer support.</Block>
        <Block t="Sharing">We share delivery details with our courier partners only as needed to deliver your order. We do not sell your information.</Block>
        <Block t="Payments">M-Pesa, card and bank-transfer payments are processed by third-party providers. We do not store full card numbers.</Block>
        <Block t="Retention">We keep order records for the period required by Kenyan tax and consumer-protection law.</Block>
        <Block t="Your rights">You may request a copy of your data or its deletion by emailing hello@Standard Furniture.co.ke.</Block>
      </article>
    </>
  );
}
function Block({ t, children }: { t: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl">{t}</h2>
      <p className="mt-3 text-muted-foreground leading-relaxed">{children}</p>
    </section>
  );
}
