"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CartInitializer({ storeId, tableId }) {
  const initCart = useCartStore((state) => state.initCart);

  useEffect(() => {
    initCart(storeId, tableId);
  }, [storeId, tableId, initCart]);

  return null;
}
