import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-charcoal text-bone">
      <div className="container-x py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gold/20">
                <span className="h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="font-display text-2xl">Standard Furniture.</span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-bone/70 leading-relaxed">
              Premium, handcrafted furniture from Nairobi—delivered anywhere in Kenya. Designed for the way modern Kenyans live and work.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-bone/20 hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Shop" links={[
            { to: "/shop", label: "All Products" },
            { to: "/categories", label: "Categories" },
            { to: "/shop?sort=new", label: "New Arrivals" },
            { to: "/shop?sort=best", label: "Best Sellers" },
          ]} />
          <FooterCol title="Help" links={[
            { to: "/delivery", label: "Delivery" },
            { to: "/order-tracking", label: "Track Order" },
            { to: "/faq", label: "FAQ" },
            { to: "/contact", label: "Contact" },
          ]} />
          <FooterCol title="Company" links={[
            { to: "/about", label: "About Us" },
            { to: "/privacy", label: "Privacy" },
            { to: "/terms", label: "Terms" },
            { to: "/contact", label: "Showroom" },
          ]} />
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-bone/10 pt-8 text-xs text-bone/60">
          <p>&copy; {new Date().getFullYear()} Standard Furniture, Nairobi. All rights reserved.</p>
          <p>
            Showroom: Mombasa Road, Nairobi &nbsp;·&nbsp; +254 788 332 542
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="eyebrow text-bone/70">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-bone/80 hover:text-gold transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
