import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/catalog";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Standard Furniture" },
      { name: "description", content: "Explore all furniture categories—office, living, dining, bedroom, storage, events and decor." },
      { property: "og:title", content: "Categories — Standard Furniture" },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: Categories,
});

function Categories() {
  const groups = Array.from(new Set(categories.map((c) => c.group)));
  return (
    <>
      <PageHero
        eyebrow="All categories"
        title="Built for every room."
        description="From boardrooms to bedrooms—every category, made with the same standard."
      />
      <section className="container-x pb-24 space-y-20">
        {groups.map((g) => (
          <div key={g}>
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl mb-8">{g}</h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.filter((c) => c.group === g).map((c, i) => (
                <Reveal key={c.slug} delay={(i % 4) * 0.06}>
                  <Link to="/shop" search={{ category: c.slug }} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                      <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                      <div className="absolute inset-0 p-5 flex flex-col justify-end text-bone">
                        <h3 className="font-display text-xl md:text-2xl">{c.name}</h3>
                        <p className="text-xs text-bone/70 mt-1 line-clamp-1">{c.blurb}</p>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
