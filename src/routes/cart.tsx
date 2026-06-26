import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { KES } from "@/data/catalog";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Nyumba Furniture" },
      { name: "description", content: "Review the items in your cart and proceed to checkout." },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: Cart,
});

function Cart() {
  const cart = useCart();
  const [coupon, setCoupon] = useState("");
  const delivery = cart.subtotal === 0 ? 0 : cart.subtotal > 50000 ? 0 : 2500;
  const total = cart.subtotal + delivery;

  if (cart.items.length === 0) {
    return (
      <>
        <PageHero eyebrow="Your cart" title="Your cart is empty." description="Browse the collection and add a piece to begin." />
        <div className="container-x pb-24">
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-full bg-charcoal text-bone px-7 py-3.5 text-sm">
            Continue shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Your cart" title="Review your selection." />
      <section className="container-x pb-24 grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-4">
          {cart.items.map((it) => {
            const p = cart.resolve(it);
            if (!p) return null;
            const unit = p.salePrice ?? p.price;
            return (
              <div key={it.productId} className="flex gap-5 rounded-2xl border border-border bg-card p-4">
                <Link to="/products/$slug" params={{ slug: p.slug }} className="shrink-0">
                  <img src={p.images[0]} alt={p.name} loading="lazy" className="h-28 w-28 md:h-32 md:w-32 rounded-xl object-cover" />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <Link to="/products/$slug" params={{ slug: p.slug }} className="font-display text-lg md:text-xl truncate block">{p.name}</Link>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{p.category.replace(/-/g, " ")}{it.color ? ` · ${it.color}` : ""}</p>
                    </div>
                    <button onClick={() => cart.remove(it.productId)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-accent shrink-0" aria-label="Remove">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto pt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-full border border-border">
                      <button onClick={() => cart.setQty(it.productId, it.quantity - 1)} className="grid h-9 w-9 place-items-center hover:bg-accent rounded-full" aria-label="Decrease">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm">{it.quantity}</span>
                      <button onClick={() => cart.setQty(it.productId, it.quantity + 1)} className="grid h-9 w-9 place-items-center hover:bg-accent rounded-full" aria-label="Increase">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-sm font-medium">{KES(unit * it.quantity)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft">
          <h2 className="font-display text-2xl">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <Row label="Subtotal">{KES(cart.subtotal)}</Row>
            <Row label="Estimated delivery">{delivery === 0 ? "Free" : KES(delivery)}</Row>
            <div className="flex gap-2 pt-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-gold"
              />
              <button className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent">Apply</button>
            </div>
            <div className="border-t border-border pt-4 flex items-baseline justify-between">
              <dt className="font-medium">Total</dt>
              <dd className="font-display text-2xl">{KES(total)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-charcoal text-bone py-3.5 text-sm font-medium hover:bg-charcoal/90"
          >
            Proceed to Checkout <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-muted-foreground text-center">Secure checkout · M-Pesa, Card or Bank Transfer</p>
        </aside>
      </section>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
