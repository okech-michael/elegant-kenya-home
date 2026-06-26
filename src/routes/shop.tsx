import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, List, SlidersHorizontal, Search } from "lucide-react";
import { z } from "zod";
import { categories, products } from "@/data/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHero } from "@/components/site/PageHero";

const searchSchema = z.object({
  category: z.string().optional(),
  sort: z.enum(["new", "best", "price-asc", "price-desc"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — Nyumba Furniture" },
      { name: "description", content: "Browse premium furniture: sofas, desks, dining sets and more. Delivered across Kenya." },
      { property: "og:title", content: "Shop — Nyumba Furniture" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceMax, setPriceMax] = useState(200000);
  const [query, setQuery] = useState(search.q ?? "");

  const filtered = useMemo(() => {
    let list = products.slice();
    if (search.category) list = list.filter((p) => p.category === search.category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    list = list.filter((p) => (p.salePrice ?? p.price) <= priceMax);
    switch (search.sort) {
      case "new": list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
      case "best": list.sort((a, b) => Number(!!b.isBestseller) - Number(!!a.isBestseller)); break;
      case "price-asc": list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case "price-desc": list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
    }
    return list;
  }, [search, query, priceMax]);

  const activeCat = categories.find((c) => c.slug === search.category);

  return (
    <>
      <PageHero
        eyebrow="The collection"
        title={activeCat ? activeCat.name : "Shop everything."}
        description={activeCat ? activeCat.blurb : "Browse our full catalogue—filter by category, price and availability."}
      />

      <section className="container-x pb-24 grid lg:grid-cols-[260px_1fr] gap-10">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="eyebrow">Filters</span>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-border bg-background pl-9 pr-4 py-2.5 text-sm outline-none focus:border-gold transition-colors"
            />
          </div>

          <div className="mb-8">
            <h3 className="font-display text-lg mb-3">Category</h3>
            <ul className="space-y-1.5 max-h-80 overflow-auto pr-2">
              <li>
                <button
                  onClick={() => navigate({ search: (s) => ({ ...s, category: undefined }) })}
                  className={`text-sm w-full text-left py-1 ${!search.category ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  All
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <button
                    onClick={() => navigate({ search: (s) => ({ ...s, category: c.slug }) })}
                    className={`text-sm w-full text-left py-1 ${search.category === c.slug ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-display text-lg mb-3">Max price</h3>
            <input
              type="range"
              min={5000}
              max={200000}
              step={5000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[var(--gold)]"
            />
            <div className="mt-2 text-xs text-muted-foreground">Up to KES {priceMax.toLocaleString()}</div>
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <p className="text-sm text-muted-foreground">{filtered.length} products</p>
            <div className="flex items-center gap-2">
              <select
                value={search.sort ?? ""}
                onChange={(e) => navigate({ search: (s) => ({ ...s, sort: (e.target.value || undefined) as never }) })}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm"
              >
                <option value="">Sort: Featured</option>
                <option value="new">Newest</option>
                <option value="best">Best Selling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <div className="hidden md:flex rounded-full border border-border overflow-hidden">
                <button onClick={() => setView("grid")} aria-label="Grid view" className={`p-2 ${view === "grid" ? "bg-accent" : ""}`}>
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button onClick={() => setView("list")} aria-label="List view" className={`p-2 ${view === "list" ? "bg-accent" : ""}`}>
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-16 text-center">
              <p className="font-display text-2xl">No matches</p>
              <p className="mt-2 text-sm text-muted-foreground">Try clearing filters or browsing all categories.</p>
              <Link to="/shop" className="mt-6 inline-block rounded-full bg-charcoal px-5 py-2.5 text-sm text-bone">
                Reset
              </Link>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          ) : (
            <div className="space-y-5">
              {filtered.map((p) => (
                <Link key={p.id} to="/products/$slug" params={{ slug: p.slug }} className="flex gap-5 rounded-2xl border border-border p-4 hover-lift bg-card">
                  <img src={p.images[0]} alt={p.name} loading="lazy" className="h-32 w-32 md:h-40 md:w-40 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl truncate">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.shortDescription}</p>
                    <div className="mt-3 text-sm font-medium">
                      {p.salePrice ? <>KES {p.salePrice.toLocaleString()} <span className="ml-2 text-xs text-muted-foreground line-through">KES {p.price.toLocaleString()}</span></> : <>KES {p.price.toLocaleString()}</>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
