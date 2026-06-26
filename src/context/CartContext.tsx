import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/catalog";

export type CartItem = { productId: string; quantity: number; color?: string };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (productId: string, quantity?: number, color?: string) => void;
  setQty: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  resolve: (item: CartItem) => Product | undefined;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "nyumba_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const resolve = (item: CartItem) => products.find((p) => p.id === item.productId);
    const subtotal = items.reduce((sum, it) => {
      const p = resolve(it);
      if (!p) return sum;
      return sum + (p.salePrice ?? p.price) * it.quantity;
    }, 0);
    return {
      items,
      count: items.reduce((n, it) => n + it.quantity, 0),
      subtotal,
      resolve,
      add: (productId, quantity = 1, color) =>
        setItems((prev) => {
          const idx = prev.findIndex((p) => p.productId === productId);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
            return next;
          }
          return [...prev, { productId, quantity, color }];
        }),
      setQty: (productId, quantity) =>
        setItems((prev) =>
          prev
            .map((it) => (it.productId === productId ? { ...it, quantity: Math.max(0, quantity) } : it))
            .filter((it) => it.quantity > 0),
        ),
      remove: (productId) => setItems((prev) => prev.filter((it) => it.productId !== productId)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
