import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Truck, Heart, Minus, Plus, MessageCircle } from "lucide-react";
import { findProduct, products, KES, productsByCategory } from "@/data/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.name} — Nyumba Furniture` },
        { name: "description", content: p.shortDescription },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.shortDescription },
        { property: "og:image", content: p.images[0] },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/products/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            sku: p.sku,
            image: p.images,
            description: p.description,
            offers: {
              "@type": "Offer",
              priceCurrency: "KES",
              price: p.salePrice ?? p.price,
              availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
            aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-5xl">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-block rounded-full bg-charcoal text-bone px-6 py-3 text-sm">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors[0]?.name);
  const cart = useCart();
  const onSale = product.salePrice && product.salePrice < product.price;
  const related = productsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);
  const fbt = products.filter((p) => p.id !== product.id).slice(0, 3);

  const addToCart = () => {
    cart.add(product.id, qty, color);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <>
      <section className="container-x pt-10 pb-20">
        <nav className="text-xs text-muted-foreground mb-8 flex items-center gap-2">
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <Link to="/shop" search={{ category: product.category }} className="hover:text-foreground capitalize">{product.category.replace(/-/g, " ")}</Link>
          <span>/</span>
          <span className="text-foreground truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <motion.div
              key={active}
              initial={{ opacity: 0.3, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted group"
            >
              <img src={product.images[active]} alt={product.name} className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
            </motion.div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`aspect-square overflow-hidden rounded-xl border-2 transition-colors ${active === i ? "border-gold" : "border-transparent"}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow capitalize">{product.category.replace(/-/g, " ")}</p>
            <h1 className="mt-2 font-display text-4xl md:text-5xl leading-[1.05]">{product.name}</h1>
            <p className="mt-3 text-xs text-muted-foreground">SKU: {product.sku}</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm">
                <span className="text-gold">{"★".repeat(Math.round(product.rating))}</span>
                <span className="text-muted-foreground">{product.rating.toFixed(1)} · {product.reviews} reviews</span>
              </div>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              {onSale ? (
                <>
                  <span className="font-display text-3xl">{KES(product.salePrice!)}</span>
                  <span className="text-muted-foreground line-through">{KES(product.price)}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gold text-charcoal">Sale</span>
                </>
              ) : (
                <span className="font-display text-3xl">{KES(product.price)}</span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {product.stock > 0 ? <><Check className="inline h-4 w-4 text-gold" /> In stock — ready to ship</> : "Out of stock"}
            </p>

            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-8">
              <p className="text-sm font-medium mb-3">Color: <span className="text-muted-foreground">{color}</span></p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    style={{ background: c.hex }}
                    className={`h-9 w-9 rounded-full border-2 transition-transform ${color === c.name ? "border-gold scale-110" : "border-border"}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center rounded-full border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-12 w-12 place-items-center hover:bg-accent rounded-full" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="grid h-12 w-12 place-items-center hover:bg-accent rounded-full" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button onClick={addToCart} className="flex-1 rounded-full bg-charcoal text-bone py-3.5 text-sm font-medium hover:bg-charcoal/90 transition-colors">
                Add to Cart
              </button>
              <button aria-label="Save" className="grid h-12 w-12 place-items-center rounded-full border border-border hover:bg-accent">
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex flex-col sm:flex-row gap-3">
              <Link to="/checkout" onClick={addToCart} className="flex-1 text-center rounded-full bg-gold text-charcoal py-3.5 text-sm font-medium hover:shadow-gold transition-all">
                Buy Now
              </Link>
              <a
                href={`https://wa.me/254788332542?text=${encodeURIComponent(`Hi, I'd like to ask about the ${product.name} (${product.sku})`)}`}
                target="_blank" rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-border py-3.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl border border-border p-5">
                <Truck className="h-5 w-5 text-gold" />
                <p className="mt-3 font-medium">Free Nairobi delivery</p>
                <p className="text-xs text-muted-foreground mt-1">On orders above KES 50,000</p>
              </div>
              <div className="rounded-2xl border border-border p-5">
                <ShieldCheck className="h-5 w-5 text-gold" />
                <p className="mt-3 font-medium">{product.warranty}</p>
                <p className="text-xs text-muted-foreground mt-1">Backed manufacturer warranty</p>
              </div>
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <h3 className="font-display text-xl mb-4">Specifications</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm">
                <Spec label="Dimensions">{product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height} {product.dimensions.unit}</Spec>
                <Spec label="Materials">{product.materials.join(", ")}</Spec>
                <Spec label="Warranty">{product.warranty}</Spec>
                <Spec label="SKU">{product.sku}</Spec>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/40">
        <div className="container-x py-20">
          <h2 className="font-display text-3xl md:text-4xl mb-10">Frequently bought together</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {fbt.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <h2 className="font-display text-3xl md:text-4xl mb-10">You may also like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </>
  );
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-border/60 py-2 gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}
