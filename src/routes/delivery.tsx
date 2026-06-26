import { createFileRoute } from "@tanstack/react-router";
import { Truck, MapPin, Clock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery Information — Standard Furniture" },
      { name: "description", content: "Delivery zones, fees and timelines for Standard Furniture across Kenya." },
      { property: "og:url", content: "/delivery" },
    ],
    links: [{ rel: "canonical", href: "/delivery" }],
  }),
  component: Delivery,
});

function Delivery() {
  return (
    <>
      <PageHero eyebrow="Delivery" title="Delivered anywhere in Kenya." description="Free Nairobi delivery on orders above KES 50,000. Nationwide rates calculated at checkout." />
      <section className="container-x pb-24 grid md:grid-cols-2 gap-6">
        {[
          { icon: MapPin, t: "Nationwide reach", d: "We deliver to all 47 counties, from Lamu to Lodwar." },
          { icon: Clock, t: "Fast turnaround", d: "Nairobi deliveries in 1–3 business days; up-country in 3–7 days." },
          { icon: Truck, t: "White-glove service", d: "Our team carries, places and assembles every piece in-room." },
          { icon: ShieldCheck, t: "Damage-free guarantee", d: "If a piece arrives damaged, we replace it at no cost." },
        ].map((it, i) => (
          <Reveal key={it.t} delay={i * 0.06}>
            <div className="rounded-2xl border border-border bg-card p-8 hover-lift">
              <it.icon className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-2xl">{it.t}</h3>
              <p className="mt-2 text-muted-foreground">{it.d}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="container-x pb-24">
        <Reveal>
          <h2 className="font-display text-3xl mb-6">Delivery zones</h2>
        </Reveal>
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left">
              <tr><th className="px-5 py-4">Zone</th><th className="px-5 py-4">Counties</th><th className="px-5 py-4 text-right">From</th></tr>
            </thead>
            <tbody>
              {[
                { z: "Nairobi Metro", c: "Nairobi, Kiambu, Machakos", p: "Free above KES 50,000" },
                { z: "Central & Rift", c: "Nakuru, Nyeri, Murang'a, Meru", p: "KES 4,500" },
                { z: "Coast", c: "Mombasa, Kilifi, Kwale", p: "KES 7,500" },
                { z: "Western", c: "Kisumu, Kakamega, Eldoret", p: "KES 6,500" },
                { z: "Northern", c: "Garissa, Marsabit, Wajir", p: "Quoted on request" },
              ].map((r) => (
                <tr key={r.z} className="border-t border-border">
                  <td className="px-5 py-4 font-medium">{r.z}</td>
                  <td className="px-5 py-4 text-muted-foreground">{r.c}</td>
                  <td className="px-5 py-4 text-right">{r.p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
