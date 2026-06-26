import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Nyumba Furniture" },
      { name: "description", content: "Terms governing purchases from Nyumba Furniture." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <article className="container-x pb-24 max-w-3xl">
        <Block t="Orders">All orders are subject to availability and acceptance. Prices are in Kenyan Shillings and include VAT where applicable.</Block>
        <Block t="Payment">Payment is taken in full at checkout. Orders are processed once payment has been confirmed.</Block>
        <Block t="Delivery">Delivery timeframes are estimates. We are not liable for delays caused by circumstances outside our control.</Block>
        <Block t="Returns">Returns are accepted within 7 days of delivery for unused items in original condition. Custom orders are non-returnable.</Block>
        <Block t="Warranty">Every Nyumba product carries a 2-year manufacturer warranty against structural defects.</Block>
        <Block t="Liability">Our liability is limited to the value of the goods purchased.</Block>
        <Block t="Governing law">These terms are governed by the laws of the Republic of Kenya.</Block>
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
