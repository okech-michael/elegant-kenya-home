import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Sparkles, Award } from "lucide-react";
import { useRef } from "react";
import { categories, products, KES } from "@/data/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";

import heroImg from "@/assets/hero-living.jpg";
import catOffice from "@/assets/cat-office.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catBedroom from "@/assets/cat-bedroom.jpg";
import catLiving from "@/assets/cat-living.jpg";
import catConference from "@/assets/cat-conference.jpg";
import craftImg from "@/assets/craftsmanship.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nyumba — Premium Furniture, Crafted in Nairobi" },
      {
        name: "description",
        content:
          "Browse our collection of executive desks, sofas, dining sets and bedroom furniture. Delivered anywhere in Kenya.",
      },
      { property: "og:title", content: "Nyumba — Premium Furniture, Crafted in Nairobi" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FurnitureStore",
          name: "Nyumba Furniture",
          address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
          telephone: "+254788332542",
          priceRange: "KES",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <CollectionsSplit />
      <ShopByRoom />
      <WhyUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[92vh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-10">
        <img src={heroImg} alt="Modern living room" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-charcoal/40" />
      </motion.div>

      <motion.div style={{ opacity }} className="container-x relative h-full flex flex-col justify-end pb-20 md:pb-28 text-bone">
        <Reveal>
          <p className="eyebrow text-bone/70">Crafted in Nairobi · Delivered across Kenya</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-4 font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] max-w-4xl">
            Furniture made for the way <em className="text-gold not-italic">you live.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-xl text-base md:text-lg text-bone/80">
            Heirloom-quality pieces in solid wood and considered materials—designed for modern Kenyan homes and offices.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-charcoal hover:shadow-gold transition-all"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 rounded-full border border-bone/30 px-7 py-3.5 text-sm font-medium text-bone hover:bg-bone hover:text-charcoal transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </Reveal>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-bone/60 text-[10px] tracking-widest uppercase">
        Scroll
        <span className="mt-2 h-10 w-px bg-bone/40 animate-pulse" />
      </div>
    </section>
  );
}

function FeaturedCategories() {
  const featured = categories.slice(0, 6);
  return (
    <section className="container-x py-24 md:py-32">
      <div className="flex items-end justify-between mb-12">
        <div>
          <Reveal><p className="eyebrow">Shop by category</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display text-4xl md:text-5xl max-w-2xl">Find your next piece.</h2>
          </Reveal>
        </div>
        <Link to="/categories" className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {featured.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.06}>
            <Link to="/shop" search={{ category: c.slug }} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-transparent" />
                <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-end text-bone">
                  <p className="eyebrow text-bone/70">{c.group}</p>
                  <h3 className="font-display text-2xl md:text-3xl mt-1">{c.name}</h3>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BestSellers() {
  const best = products.filter((p) => p.isBestseller).slice(0, 4);
  return (
    <section className="bg-muted/40">
      <div className="container-x py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <div>
            <Reveal><p className="eyebrow">Best sellers</p></Reveal>
            <Reveal delay={0.1}><h2 className="mt-3 font-display text-4xl md:text-5xl">Customer favorites.</h2></Reveal>
          </div>
          <Link to="/shop" search={{ sort: "best" }} className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {best.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function CollectionsSplit() {
  const items = [
    { img: catOffice, eyebrow: "Featured collection", title: "The Modern Office", blurb: "Built for focus and longevity—desks, chairs and conference tables." , cta: "office-desks" },
    { img: catLiving, eyebrow: "Featured collection", title: "Quiet Living", blurb: "Soft forms, considered materials and tailored upholstery." , cta: "sofas" },
  ];
  return (
    <section className="container-x py-24 md:py-32 grid md:grid-cols-2 gap-6 md:gap-10">
      {items.map((it, i) => (
        <Reveal key={it.title} delay={i * 0.1}>
          <Link to="/shop" search={{ category: it.cta }} className="group block">
            <div className="relative aspect-[5/6] overflow-hidden rounded-3xl">
              <img src={it.img} alt={it.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-bone">
                <p className="eyebrow text-gold">{it.eyebrow}</p>
                <h3 className="mt-3 font-display text-4xl md:text-5xl max-w-md">{it.title}</h3>
                <p className="mt-3 max-w-md text-bone/80">{it.blurb}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm">
                  Explore collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
    </section>
  );
}

function ShopByRoom() {
  const rooms = [
    { img: catLiving, name: "Living Room", slug: "sofas" },
    { img: catDining, name: "Dining Room", slug: "dining-tables" },
    { img: catBedroom, name: "Bedroom", slug: "beds-wardrobes" },
    { img: catConference, name: "Office", slug: "executive-desks" },
  ];
  return (
    <section className="container-x py-24 md:py-32">
      <Reveal><p className="eyebrow">Shop by room</p></Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-3 font-display text-4xl md:text-5xl max-w-2xl">Designed room by room.</h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {rooms.map((r, i) => (
          <Reveal key={r.slug} delay={i * 0.08}>
            <Link to="/shop" search={{ category: r.slug }} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <img src={r.img} alt={r.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/40 transition-colors" />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-2xl md:text-3xl text-bone tracking-tight">{r.name}</span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Award, title: "Heirloom craftsmanship", body: "Joinery and finishes built to last decades, not seasons." },
    { icon: Truck, title: "Delivered across Kenya", body: "Free Nairobi delivery on orders above " + KES(50000) + "." },
    { icon: ShieldCheck, title: "2-year warranty", body: "Every piece is backed by our manufacturer warranty." },
    { icon: Sparkles, title: "Custom finishes", body: "Choose your fabric, wood tone, and dimensions." },
  ];
  return (
    <section className="bg-charcoal text-bone">
      <div className="container-x py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative aspect-[5/6] overflow-hidden rounded-3xl">
            <img src={craftImg} alt="Craftsmanship" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </Reveal>
        <div>
          <Reveal><p className="eyebrow text-gold">Why Nyumba</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">A standard of quality, kept.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-bone/70 max-w-lg">
              Every Nyumba piece begins with kiln-dried hardwood, traditional joinery and a slow, hand-finished process.
            </p>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={0.1 + i * 0.08}>
                <div>
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-xl">{it.title}</h3>
                  <p className="mt-2 text-sm text-bone/70 leading-relaxed">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { quote: "The conference table is the most beautiful piece of furniture in our office. Impeccable finish.", name: "Wanjiku M.", role: "Operations Lead, Westlands" },
    { quote: "Delivery to Kisumu was on time and the team assembled everything. Couldn't be happier.", name: "Brian O.", role: "Homeowner, Kisumu" },
    { quote: "We furnished our entire reception with Nyumba. The quality matches anything imported.", name: "Aisha K.", role: "Architect, Nairobi" },
  ];
  return (
    <section className="container-x py-24 md:py-32">
      <Reveal><p className="eyebrow">Trusted by</p></Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-3 font-display text-4xl md:text-5xl max-w-2xl">Homes and businesses across Kenya.</h2>
      </Reveal>
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.08}>
            <figure className="h-full rounded-2xl bg-card border border-border/60 p-8 shadow-soft hover-lift">
              <blockquote className="font-display text-xl leading-snug">"{r.quote}"</blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-medium">{r.name}</div>
                <div className="text-muted-foreground">{r.role}</div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="container-x pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-bone p-10 md:p-16 border border-border/60">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-wood/10 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="eyebrow">Stay in the room</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">New collections, first.</h2>
              <p className="mt-4 text-muted-foreground max-w-md">
                Subscribe for early access to new pieces, private sales and styling notes.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="you@email.com"
                className="flex-1 rounded-full border border-border bg-background px-6 py-4 text-sm outline-none focus:border-gold transition-colors"
              />
              <button className="rounded-full bg-charcoal px-7 py-4 text-sm font-medium text-bone hover:bg-charcoal/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
