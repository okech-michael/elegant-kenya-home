import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { KES, type Product } from "@/data/catalog";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const onSale = product.salePrice && product.salePrice < product.price;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && <Badge>New</Badge>}
            {onSale && <Badge tone="gold">Sale</Badge>}
            {product.isBestseller && <Badge tone="dark">Bestseller</Badge>}
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg leading-tight truncate">{product.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 capitalize">
              {product.category.replace(/-/g, " ")}
            </p>
          </div>
          <div className="text-right shrink-0">
            {onSale ? (
              <>
                <div className="text-sm font-medium text-foreground">{KES(product.salePrice!)}</div>
                <div className="text-xs text-muted-foreground line-through">{KES(product.price)}</div>
              </>
            ) : (
              <div className="text-sm font-medium">{KES(product.price)}</div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function Badge({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "gold" | "dark" }) {
  const tones = {
    light: "bg-background/90 text-foreground",
    gold: "bg-gold text-charcoal",
    dark: "bg-charcoal text-bone",
  } as const;
  return (
    <span className={`px-2.5 py-1 text-[10px] tracking-widest uppercase rounded-full ${tones[tone]}`}>
      {children}
    </span>
  );
}
