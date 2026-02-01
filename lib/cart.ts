'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  productId: string;
  title: string;
  price: number;
  currency: string;
  qty: number;
  mediaUrl?: string | null;
  stockQty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.productId === item.productId
                  ? { ...entry, qty: Math.min(entry.qty + item.qty, entry.stockQty) }
                  : entry
              )
            };
          }
          return { items: [...state.items, item] };
        }),
      updateQty: (productId, qty) =>
        set((state) => ({
          items: state.items.map((entry) =>
            entry.productId === productId
              ? { ...entry, qty: Math.max(1, Math.min(qty, entry.stockQty)) }
              : entry
          )
        })),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((entry) => entry.productId !== productId) })),
      clear: () => set({ items: [] })
    }),
    { name: 'adis-cart' }
  )
);
