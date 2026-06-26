import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import craftImg from "@/assets/craftsmanship.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nyumba Furniture" },
      { name: "description", content: "Nyumba is a Nairobi-based furniture maker producing heirloom-quality pieces for modern Kenyan homes and offices." },
      { property: "og:title", content: "About — Nyumba Furniture" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A workshop in Nairobi. A standard kept everywhere."
        description="Nyumba was founded in 2018 by a small team of Kenyan designers and master carpenters with a single goal—to make heirloom furniture without compromise."
      />
      <section className="container-x pb-24 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="aspect-[4/5] overflow-hidden rounded-3xl">
            <img src={craftImg} alt="Craftsmanship" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <div className="space-y-10">
          <Block title="Mission">To make beautiful, durable furniture accessible to modern Kenyan homes and offices.</Block>
          <Block title="Vision">To be East Africa's most trusted furniture house—known for craftsmanship, service and design.</Block>
          <Block title="Values">Craftsmanship, integrity, and the belief that good design lasts decades.</Block>
          <Block title="Quality promise">Every piece is built from kiln-dried hardwood, traditionally joined and hand-finished by our team in Nairobi.</Block>
          <Block title="Nationwide delivery">From Nairobi to Lamu and Lodwar. We deliver and assemble across all 47 counties.</Block>
        </div>
      </section>

      <section className="bg-charcoal text-bone">
        <div className="container-x py-20 grid sm:grid-cols-3 gap-10 text-center">
          {[
            { n: "7+", l: "Years of craftsmanship" },
            { n: "4,200+", l: "Pieces delivered" },
            { n: "47", l: "Counties served" },
          ].map((s) => (
            <Reveal key={s.l}>
              <div>
                <div className="font-display text-5xl md:text-6xl text-gold">{s.n}</div>
                <div className="mt-3 eyebrow text-bone/70">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div>
        <p className="eyebrow text-gold">{title}</p>
        <p className="mt-3 text-lg leading-relaxed">{children}</p>
      </div>
    </Reveal>
  );
}
