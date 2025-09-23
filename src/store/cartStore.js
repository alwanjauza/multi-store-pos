import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      storeId: null,
      tableId: null,

      initCart: (newStoreId, newTableId) => {
        const { storeId } = get();
        if (storeId && storeId !== newStoreId) {
          console.log("User berpindah toko, keranjang di-reset.");
          set({ items: [], storeId: newStoreId, tableId: newTableId });
        } else {
          set({ storeId: newStoreId, tableId: newTableId });
        }
      },

      addToCart: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i._id === item._id);
        if (existingItem) {
          set({
            items: items.map((i) =>
              i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      updateQuantity: (itemId, quantity) => {
        const newQuantity = parseInt(quantity, 10);
        if (newQuantity < 1) {
          set({ items: get().items.filter((item) => item._id !== itemId) });
        } else {
          set({
            items: get().items.map((item) =>
              item._id === itemId ? { ...item, quantity: newQuantity } : item
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "pos-cart-storage",
    }
  )
);
