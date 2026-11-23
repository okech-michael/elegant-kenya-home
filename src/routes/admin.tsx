import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  Minus,
  Package,
  Plus,
  Search,
  ShoppingBag,
  TrendingUp,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categories, KES, products } from "@/data/catalog";
import { cn } from "@/lib/utils";

type DashboardView = "overview" | "orders" | "inventory";
type OrderStatus = "Payment due" | "Processing" | "Ready to dispatch" | "Delivered";
type DemoOrder = {
  reference: string;
  customer: string;
  item: string;
  date: string;
  total: number;
  status: OrderStatus;
};

const INITIAL_ORDERS: DemoOrder[] = [
  { reference: "SF-2481", customer: "Atieno Wanjiku", item: "Tulivu L-Shape Sectional", date: "Today · 10:42", total: 139000, status: "Processing" },
  { reference: "SF-2480", customer: "Peter Mwangi", item: "Kiti Upholstered Dining Chair × 2", date: "Today · 09:18", total: 25000, status: "Ready to dispatch" },
  { reference: "SF-2479", customer: "Njeri Kamau", item: "Amani Executive Chair", date: "Yesterday", total: 39900, status: "Delivered" },
  { reference: "SF-2478", customer: "Brian Otieno", item: "Soma Open Bookshelf", date: "Yesterday", total: 36500, status: "Processing" },
  { reference: "SF-2477", customer: "Wairimu Njoroge", item: "Mti Decorative Plant", date: "21 Nov", total: 6900, status: "Payment due" },
];

const WEEKLY_SALES = [
  { day: "Mon", amount: "84k", height: "h-14" },
  { day: "Tue", amount: "112k", height: "h-20" },
  { day: "Wed", amount: "76k", height: "h-12" },
  { day: "Thu", amount: "143k", height: "h-24" },
  { day: "Fri", amount: "128k", height: "h-20" },
  { day: "Sat", amount: "190k", height: "h-32" },
  { day: "Sun", amount: "96k", height: "h-16" },
];

const MENU: { id: DashboardView; label: string; icon: LucideIcon }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "inventory", label: "Inventory", icon: Boxes },
];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Standard Furniture" },
      { name: "description", content: "A frontend demo workspace for Standard Furniture orders and inventory." },
      { property: "og:title", content: "Admin Dashboard — Standard Furniture" },
      { property: "og:description", content: "Review sample order and inventory activity for Standard Furniture." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [view, setView] = useState<DashboardView>("overview");
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [stocks, setStocks] = useState<Record<string, number>>(() =>
    Object.fromEntries(products.map((product) => [product.id, product.stock])),
  );
  const [query, setQuery] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);

  const lowStockCount = products.filter((product) => (stocks[product.id] ?? 0) <= 8).length;
  const visibleProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesText =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        (categories.find((category) => category.slug === product.category)?.name.toLowerCase().includes(term) ?? false);
      const matchesStock = !lowStockOnly || (stocks[product.id] ?? 0) <= 8;
      return matchesText && matchesStock;
    });
  }, [lowStockOnly, query, stocks]);

  const advanceOrder = (reference: string) => {
    const statuses: OrderStatus[] = ["Payment due", "Processing", "Ready to dispatch", "Delivered"];
    setOrders((current) =>
      current.map((order) => {
        if (order.reference !== reference) return order;
        const nextIndex = (statuses.indexOf(order.status) + 1) % statuses.length;
        return { ...order, status: statuses[nextIndex] ?? "Processing" };
      }),
    );
  };

  const changeStock = (productId: string, amount: number) => {
    setStocks((current) => ({
      ...current,
      [productId]: Math.max(0, (current[productId] ?? 0) + amount),
    }));
  };

  return (
    <div className="container-x pb-24 pt-10 md:pt-14">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Standard Furniture · Nairobi</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">The workshop, at a glance.</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            A clear view of this week’s orders, sales and stock.
          </p>
        </div>
        <Badge variant="outline" className="w-fit border-gold/50 bg-gold/10 px-3 py-1.5 text-foreground">
          Demo data · edits reset on refresh
        </Badge>
      </div>

      <div className="grid gap-8 lg:grid-cols-[210px_minmax(0,1fr)]">
        <nav aria-label="Dashboard sections" className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
          {MENU.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setView(item.id)}
                aria-current={view === item.id ? "page" : undefined}
                className={cn(
                  "shrink-0 justify-start",
                  view === item.id && "bg-charcoal text-bone hover:bg-charcoal/90 hover:text-bone",
                )}
              >
                <Icon aria-hidden="true" />
                {item.label}
              </Button>
            );
          })}
          <div className="mt-auto hidden border-t border-border pt-5 lg:block">
            <Button variant="outline" size="sm" asChild className="w-full justify-start">
              <Link to="/shop">
                <ShoppingBag aria-hidden="true" />
                View storefront
              </Link>
            </Button>
          </div>
        </nav>

        <div className="min-w-0">
          {view === "overview" && (
            <Overview
              orders={orders}
              lowStockCount={lowStockCount}
              onChangeView={setView}
              onAdvanceOrder={advanceOrder}
            />
          )}
          {view === "orders" && <Orders orders={orders} onAdvanceOrder={advanceOrder} />}
          {view === "inventory" && (
            <Inventory
              products={visibleProducts}
              stocks={stocks}
              query={query}
              lowStockOnly={lowStockOnly}
              onQueryChange={setQuery}
              onLowStockChange={setLowStockOnly}
              onChangeStock={changeStock}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Overview({
  orders,
  lowStockCount,
  onChangeView,
  onAdvanceOrder,
}: {
  orders: DemoOrder[];
  lowStockCount: number;
  onChangeView: (view: DashboardView) => void;
  onAdvanceOrder: (reference: string) => void;
}) {
  const stats = [
    { label: "Gross sales", value: "KES 1.28M", note: "This month", icon: TrendingUp, change: "+12.8%" },
    { label: "Orders", value: "42", note: "This month", icon: ShoppingBag, change: "+8.2%" },
    { label: "To fulfil", value: "18", note: "Across all stages", icon: Truck, change: "Needs attention" },
    { label: "Low stock", value: String(lowStockCount), note: "Products at 8 units or less", icon: AlertTriangle, change: "Review stock" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="rounded-md border border-border bg-card p-4 md:p-5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <Icon className="h-4 w-4 shrink-0 text-wood" aria-hidden="true" />
              </div>
              <p className="mt-5 font-display text-3xl">{stat.value}</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-1 text-xs">
                <span className="text-muted-foreground">{stat.note}</span>
                <span className={stat.change.startsWith("+") ? "text-wood" : "text-muted-foreground"}>
                  {stat.change.startsWith("+") && <ArrowUpRight className="mr-0.5 inline h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_1.4fr]">
        <section className="rounded-md border border-border bg-card p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Sales pulse</p>
              <h2 className="mt-2 font-display text-2xl">KES 829,000</h2>
              <p className="mt-1 text-xs text-muted-foreground">Last seven days</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-wood">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              12.8%
            </span>
          </div>
          <div className="mt-8 flex h-40 items-end gap-2 border-b border-border pb-2 sm:gap-3">
            {WEEKLY_SALES.map((entry) => (
              <div key={entry.day} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                <div
                  className={cn("w-full max-w-9 rounded-t-sm bg-gold/80", entry.height)}
                  title={`${entry.day}: KES ${entry.amount}`}
                />
                <span className="text-[11px] text-muted-foreground">{entry.day}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="min-w-0 rounded-md border border-border bg-card p-5 md:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Latest activity</p>
              <h2 className="mt-2 font-display text-2xl">Recent orders</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onChangeView("orders")}>
              All orders <ArrowRight aria-hidden="true" />
            </Button>
          </div>
          <OrdersTable orders={orders.slice(0, 4)} onAdvanceOrder={onAdvanceOrder} compact />
        </section>
      </div>

      <section className="flex flex-col justify-between gap-4 border-y border-border py-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-wood" aria-hidden="true" />
          <div>
            <h2 className="font-medium">{lowStockCount} products need a stock check</h2>
            <p className="mt-1 text-sm text-muted-foreground">Items with 8 units or fewer are flagged for review.</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => onChangeView("inventory")}>
          Review inventory <ChevronRight aria-hidden="true" />
        </Button>
      </section>
    </div>
  );
}

function Orders({ orders, onAdvanceOrder }: { orders: DemoOrder[]; onAdvanceOrder: (reference: string) => void }) {
  return (
    <section className="rounded-md border border-border bg-card p-5 md:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Fulfilment desk</p>
          <h2 className="mt-2 font-display text-3xl">Orders</h2>
        </div>
        <Badge variant="secondary">{orders.length} sample orders</Badge>
      </div>
      <OrdersTable orders={orders} onAdvanceOrder={onAdvanceOrder} />
    </section>
  );
}

function OrdersTable({
  orders,
  onAdvanceOrder,
  compact = false,
}: {
  orders: DemoOrder[];
  onAdvanceOrder: (reference: string) => void;
  compact?: boolean;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          {!compact && <TableHead>Customer</TableHead>}
          <TableHead>Item</TableHead>
          <TableHead className="hidden sm:table-cell">Date</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.reference}>
            <TableCell className="whitespace-nowrap font-medium">{order.reference}</TableCell>
            {!compact && <TableCell className="whitespace-nowrap">{order.customer}</TableCell>}
            <TableCell className="max-w-36 truncate">{order.item}</TableCell>
            <TableCell className="hidden whitespace-nowrap text-muted-foreground sm:table-cell">{order.date}</TableCell>
            <TableCell className="whitespace-nowrap text-right">{KES(order.total)}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto min-h-8 whitespace-normal px-1.5 py-1"
                onClick={() => onAdvanceOrder(order.reference)}
                aria-label={`Advance status for ${order.reference}`}
                title="Advance sample order status"
              >
                <StatusBadge status={order.status} />
                <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const statusClass = {
    "Payment due": "border-destructive/20 bg-destructive/10 text-destructive",
    Processing: "border-gold/40 bg-gold/15 text-foreground",
    "Ready to dispatch": "border-wood/20 bg-wood/10 text-wood",
    Delivered: "border-border bg-secondary text-secondary-foreground",
  }[status];
  return <Badge variant="outline" className={cn("max-w-32 text-left leading-tight", statusClass)}>{status}</Badge>;
}

function Inventory({
  products: inventoryProducts,
  stocks,
  query,
  lowStockOnly,
  onQueryChange,
  onLowStockChange,
  onChangeStock,
}: {
  products: typeof products;
  stocks: Record<string, number>;
  query: string;
  lowStockOnly: boolean;
  onQueryChange: (query: string) => void;
  onLowStockChange: (enabled: boolean) => void;
  onChangeStock: (productId: string, amount: number) => void;
}) {
  return (
    <section className="rounded-md border border-border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h2 className="mt-2 font-display text-3xl">Inventory</h2>
        </div>
        <Badge variant="secondary">{inventoryProducts.length} products</Badge>
      </div>
      <div className="my-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search products, SKU or category"
            aria-label="Search inventory"
            className="pl-9"
          />
        </div>
        <Button
          variant={lowStockOnly ? "secondary" : "outline"}
          aria-pressed={lowStockOnly}
          onClick={() => onLowStockChange(!lowStockOnly)}
        >
          <AlertTriangle aria-hidden="true" />
          Low stock only
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="hidden sm:table-cell">SKU</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Units</TableHead>
            <TableHead>Availability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryProducts.map((product) => {
            const stock = stocks[product.id] ?? 0;
            const categoryName = categories.find((category) => category.slug === product.category)?.name ?? "Furniture";
            return (
              <TableRow key={product.id}>
                <TableCell className="min-w-40">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} alt="" loading="lazy" className="h-11 w-11 shrink-0 rounded-md object-cover" />
                    <Link to="/products/$slug" params={{ slug: product.slug }} className="line-clamp-2 font-medium hover:underline">
                      {product.name}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap text-muted-foreground sm:table-cell">{product.sku}</TableCell>
                <TableCell className="hidden md:table-cell">{categoryName}</TableCell>
                <TableCell className="whitespace-nowrap text-right">{KES(product.salePrice ?? product.price)}</TableCell>
                <TableCell className="whitespace-nowrap text-right">
                  <span className="inline-flex items-center justify-end gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onChangeStock(product.id, -1)}
                      disabled={stock === 0}
                      aria-label={`Decrease ${product.name} stock`}
                    >
                      <Minus aria-hidden="true" />
                    </Button>
                    <span className="min-w-6 text-center tabular-nums">{stock}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => onChangeStock(product.id, 1)}
                      aria-label={`Increase ${product.name} stock`}
                    >
                      <Plus aria-hidden="true" />
                    </Button>
                  </span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {stock <= 8 ? (
                    <Badge variant="outline" className="border-gold/40 bg-gold/15 text-foreground">Low stock</Badge>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-wood" aria-hidden="true" />
                      In stock
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
          {inventoryProducts.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No products match this search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
