import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled ? "glass-panel shadow-soft" : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative h-8 w-8 rounded-full bg-charcoal grid place-items-center">
            <span className="block h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="font-display text-xl tracking-tight">
            Nyumba<span className="text-gold">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/shop"
            className="hidden md:inline-grid h-10 w-10 place-items-center rounded-full hover:bg-accent transition-colors"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Link
            to="/cart"
            className="relative inline-grid h-10 w-10 place-items-center rounded-full hover:bg-accent transition-colors"
            aria-label={`Cart with ${count} items`}
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-gold text-[10px] font-medium text-charcoal">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden inline-grid h-10 w-10 place-items-center rounded-full hover:bg-accent"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-background shadow-lift animate-fade-up">
            <div className="flex h-16 items-center justify-between px-5 border-b">
              <span className="font-display text-lg">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full hover:bg-accent">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col px-5 py-4">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} className="py-3 text-lg border-b">
                  {n.label}
                </Link>
              ))}
              <Link to="/order-tracking" className="py-3 text-lg border-b">
                Track Order
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
