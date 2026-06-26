import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Standard Furniture" },
      { name: "description", content: "Get in touch with Standard Furniture in Nairobi. Phone, WhatsApp, email and showroom." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="We'd love to hear from you." description="Questions about a piece, a bulk order or a custom build—our team is happy to help." />
      <section className="container-x pb-24 grid lg:grid-cols-2 gap-12">
        <Reveal>
          <div className="space-y-6">
            <Item icon={Phone} label="Phone" value="+254 788 332 542" href="tel:+254788332542" />
            <Item icon={MessageCircle} label="WhatsApp" value="+254 788 332 542" href="https://wa.me/254788332542" />
            <Item icon={Mail} label="Email" value="hello@Standard Furniture.co.ke" href="mailto:hello@Standard Furniture.co.ke" />
            <Item icon={MapPin} label="Showroom" value="Mombasa Road, Nairobi, Kenya" />
            <Item icon={Clock} label="Hours" value="Mon–Sat · 9:00 AM – 6:00 PM" />
            <div className="mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Standard Furniture Showroom"
                src="https://www.openstreetmap.org/export/embed.html?bbox=36.78%2C-1.32%2C36.86%2C-1.27&layer=mapnik"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Message sent — we'll be in touch soon."); (e.target as HTMLFormElement).reset(); }}
            className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-soft"
          >
            <h2 className="font-display text-2xl">Send us a message</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" required><input required className="input" /></Field>
              <Field label="Phone" required><input required type="tel" className="input" /></Field>
              <Field label="Email" full><input type="email" className="input" /></Field>
              <Field label="Subject" full><input className="input" /></Field>
              <Field label="Message" full><textarea rows={5} required className="input resize-none" /></Field>
            </div>
            <button className="mt-6 w-full rounded-full bg-charcoal text-bone py-3.5 text-sm">Send message</button>
            <style>{`.input { width:100%; border-radius: 0.75rem; border:1px solid var(--border); background: var(--background); padding: 0.75rem 1rem; font-size: 0.875rem; outline:none; } .input:focus { border-color: var(--gold); }`}</style>
          </form>
        </Reveal>
      </section>
    </>
  );
}

function Item({ icon: Icon, label, value, href }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-border p-5 hover-lift bg-card">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="eyebrow">{label}</p>
        <p className="mt-1 text-base">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
}
function Field({ label, children, required, full }: { label: string; children: React.ReactNode; required?: boolean; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-xs text-muted-foreground">{label}{required && <span className="text-gold"> *</span>}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
