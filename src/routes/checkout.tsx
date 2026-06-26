import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Smartphone, CreditCard, Building2, Truck as TruckIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { KES } from "@/data/catalog";
import { PageHero } from "@/components/site/PageHero";
import { toast } from "sonner";

const COUNTIES = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Machakos", "Nyeri", "Kakamega", "Meru"];

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Standard Furniture" },
      { name: "description", content: "Complete your order with secure payment." },
      { property: "og:url", content: "/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: Checkout,
});

function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState<"mpesa" | "card" | "bank" | "cod">("mpesa");
  const delivery = cart.subtotal === 0 ? 0 : cart.subtotal > 50000 ? 0 : 2500;
  const total = cart.subtotal + delivery;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNumber = `NY-${Date.now().toString().slice(-6)}`;
    toast.success("Order placed", { description: `Reference: ${orderNumber}` });
    cart.clear();
    navigate({ to: "/order-tracking", search: { ref: orderNumber } });
  };

  if (cart.items.length === 0) {
    return (
      <>
        <PageHero eyebrow="Checkout" title="Nothing to check out." description="Your cart is empty." />
        <div className="container-x pb-24">
          <Link to="/shop" className="rounded-full bg-charcoal text-bone px-6 py-3 text-sm">Continue shopping</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="Checkout" title="Almost there." description="Guest checkout — no account needed." />
      <form onSubmit={submit} className="container-x pb-24 grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="space-y-10">
          <Section title="Contact & delivery">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" required><input required className="input" /></Field>
              <Field label="Phone Number" required><input required type="tel" placeholder="+254 7XX XXX XXX" className="input" /></Field>
              <Field label="Email (optional)"><input type="email" className="input" /></Field>
              <Field label="County" required>
                <select required className="input">
                  <option value="">Select county</option>
                  {COUNTIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Town / City" required><input required className="input" /></Field>
              <Field label="Estate / Neighborhood"><input className="input" /></Field>
              <Field label="Street"><input className="input" /></Field>
              <Field label="Nearest Landmark"><input className="input" /></Field>
              <Field label="Building Name"><input className="input" /></Field>
              <Field label="House / Unit Number"><input className="input" /></Field>
              <Field label="Delivery Notes" full>
                <textarea rows={3} className="input resize-none" placeholder="Anything our delivery team should know?" />
              </Field>
            </div>
          </Section>

          <Section title="Payment method">
            <div className="grid sm:grid-cols-2 gap-3">
              <PayOption icon={Smartphone} label="M-Pesa STK Push" value="mpesa" active={method === "mpesa"} onSelect={setMethod} />
              <PayOption icon={CreditCard} label="Card Payment" value="card" active={method === "card"} onSelect={setMethod} />
              <PayOption icon={Building2} label="Bank Transfer" value="bank" active={method === "bank"} onSelect={setMethod} />
              <PayOption icon={TruckIcon} label="Cash on Delivery" value="cod" active={method === "cod"} onSelect={setMethod} />
            </div>
            {method === "mpesa" && (
              <p className="mt-4 text-sm text-muted-foreground">You'll receive an M-Pesa prompt on your phone after placing the order.</p>
            )}
            {method === "card" && (
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <input placeholder="Card number" className="input" />
                <input placeholder="Name on card" className="input" />
                <input placeholder="MM / YY" className="input" />
                <input placeholder="CVV" className="input" />
              </div>
            )}
            {method === "bank" && (
              <div className="mt-4 text-sm text-muted-foreground rounded-xl border border-dashed border-border p-4">
                Bank details will be sent to your email and phone after placing the order.
              </div>
            )}
            {method === "cod" && (
              <p className="mt-4 text-sm text-muted-foreground">Pay our delivery team in cash on arrival. (Subject to availability.)</p>
            )}
          </Section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start rounded-2xl border border-border bg-card p-6 md:p-8 shadow-soft">
          <h2 className="font-display text-2xl">Order summary</h2>
          <ul className="mt-5 space-y-3 max-h-72 overflow-auto pr-2">
            {cart.items.map((it) => {
              const p = cart.resolve(it);
              if (!p) return null;
              const unit = p.salePrice ?? p.price;
              return (
                <li key={it.productId} className="flex gap-3 text-sm">
                  <img src={p.images[0]} alt="" className="h-14 w-14 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">Qty {it.quantity}</p>
                  </div>
                  <div className="text-right">{KES(unit * it.quantity)}</div>
                </li>
              );
            })}
          </ul>
          <dl className="mt-5 space-y-2 text-sm border-t border-border pt-4">
            <Row label="Subtotal">{KES(cart.subtotal)}</Row>
            <Row label="Delivery">{delivery === 0 ? "Free" : KES(delivery)}</Row>
            <div className="flex justify-between border-t border-border pt-3 mt-3">
              <dt className="font-medium">Total</dt>
              <dd className="font-display text-2xl">{KES(total)}</dd>
            </div>
          </dl>
          <button type="submit" className="mt-6 w-full rounded-full bg-gold text-charcoal py-3.5 text-sm font-medium hover:shadow-gold transition-all">
            Place Order
          </button>
          <p className="mt-3 text-xs text-muted-foreground text-center">
            <Check className="inline h-3 w-3 text-gold" /> Secure & encrypted
          </p>
        </aside>

        <style>{`.input { width:100%; border-radius: 0.75rem; border:1px solid var(--border); background: var(--background); padding: 0.75rem 1rem; font-size: 0.875rem; outline:none; transition: border-color .2s; } .input:focus { border-color: var(--gold); }`}</style>
      </form>
    </>
  );
}

function Field({ label, children, required, full }: { label: string; children: React.ReactNode; required?: boolean; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-xs text-muted-foreground">{label}{required && <span className="text-gold"> *</span>}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl mb-5">{title}</h2>
      {children}
    </section>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex justify-between"><dt className="text-muted-foreground">{label}</dt><dd>{children}</dd></div>;
}
function PayOption({ icon: Icon, label, value, active, onSelect }: { icon: React.ComponentType<{ className?: string }>; label: string; value: "mpesa" | "card" | "bank" | "cod"; active: boolean; onSelect: (v: "mpesa" | "card" | "bank" | "cod") => void }) {
  return (
    <button type="button" onClick={() => onSelect(value)} className={`flex items-center gap-3 rounded-xl border p-4 text-sm transition-all ${active ? "border-gold bg-gold/5" : "border-border hover:bg-accent"}`}>
      <Icon className="h-5 w-5" />
      <span className="text-left">{label}</span>
      {active && <Check className="ml-auto h-4 w-4 text-gold" />}
    </button>
  );
}
