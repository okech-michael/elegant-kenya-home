import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Package, ClipboardCheck, Truck, MapPin, HomeIcon } from "lucide-react";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/order-tracking")({
  validateSearch: z.object({ ref: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Track Order — Nyumba Furniture" },
      { name: "description", content: "Track your Nyumba furniture delivery." },
      { property: "og:url", content: "/order-tracking" },
    ],
    links: [{ rel: "canonical", href: "/order-tracking" }],
  }),
  component: Tracking,
});

const STEPS = [
  { icon: ClipboardCheck, label: "Order Received" },
  { icon: Check, label: "Payment Confirmed" },
  { icon: Package, label: "Preparing Order" },
  { icon: Package, label: "Packed" },
  { icon: Truck, label: "On Transit" },
  { icon: HomeIcon, label: "Delivered" },
];

function Tracking() {
  const { ref } = Route.useSearch();
  const [order, setOrder] = useState<string>(ref ?? "");
  const [phone, setPhone] = useState("");
  const [tracked, setTracked] = useState(!!ref);
  const current = tracked ? 2 : -1; // mock: "Preparing Order"

  return (
    <>
      <PageHero eyebrow="Order tracking" title="Where's your order?" description="Enter your phone number and order reference to see your delivery progress." />
      <section className="container-x pb-24">
        <form
          onSubmit={(e) => { e.preventDefault(); setTracked(true); }}
          className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 max-w-3xl"
        >
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Phone number" className="rounded-full border border-border bg-background px-5 py-3.5 text-sm outline-none focus:border-gold" />
          <input value={order} onChange={(e) => setOrder(e.target.value)} required placeholder="Order number (e.g. NY-123456)" className="rounded-full border border-border bg-background px-5 py-3.5 text-sm outline-none focus:border-gold" />
          <button className="rounded-full bg-charcoal text-bone px-7 py-3.5 text-sm">Track</button>
        </form>

        {tracked && (
          <div className="mt-14 rounded-3xl border border-border bg-card p-6 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Order</p>
                <p className="font-display text-2xl mt-1">{order || "NY-000000"}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 text-gold px-3 py-1 text-xs">
                <MapPin className="h-3.5 w-3.5" /> En route to Nairobi
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-6 gap-4">
              {STEPS.map((s, i) => {
                const done = i <= current;
                const active = i === current;
                return (
                  <div key={s.label} className="relative flex flex-col items-center text-center">
                    <div className={`grid h-12 w-12 place-items-center rounded-full border-2 transition-all ${done ? "border-gold bg-gold text-charcoal" : "border-border text-muted-foreground"} ${active ? "scale-110" : ""}`}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    <p className={`mt-3 text-xs ${done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                    {i < STEPS.length - 1 && (
                      <div className={`hidden md:block absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px ${i < current ? "bg-gold" : "bg-border"}`} />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-10 text-sm text-muted-foreground">
              Need help? <a href="https://wa.me/254788332542" className="text-foreground underline">Message us on WhatsApp</a>.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
