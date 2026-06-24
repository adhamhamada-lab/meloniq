"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  slug: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("meloniq-cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("meloniq-cart", JSON.stringify(items));
  }, [items]);

  function addItem(newItem: Omit<CartItem, "quantity">) {
    setItems((prev) => {
      const exists = prev.find((i) => i.slug === newItem.slug);
      if (exists) {
        return prev.map((i) =>
          i.slug === newItem.slug ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  }

  function removeItem(slug: string) {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }

  function updateQty(slug: string, qty: number) {
    if (qty < 1) return removeItem(slug);
    setItems((prev) =>
      prev.map((i) => (i.slug === slug ? { ...i, quantity: qty } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => {
    const price = parseInt(i.price.replace(/[^0-9]/g, ""));
    return sum + price * i.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}