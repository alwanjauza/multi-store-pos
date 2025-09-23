"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CartSheet() {
  const { items, storeId, tableId, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderSubmit = async () => {
    setIsSubmitting(true);
    const orderData = {
      storeId,
      tableId,
      items: items.map((item) => ({
        menuItemId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice: getTotalPrice(),
    };
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    if (response.ok) {
      alert("Pesanan berhasil dibuat!");
      clearCart();
    } else {
      alert("Gagal membuat pesanan.");
    }
    setIsSubmitting(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='fixed bottom-6 right-6 h-14 rounded-full shadow-lg z-50'>
          Keranjang ({items.reduce((acc, item) => acc + item.quantity, 0)})
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col gap-4'>
        <SheetHeader>
          <SheetTitle>Keranjang Anda</SheetTitle>
          <SheetDescription>Periksa pesanan sebelum dikirim.</SheetDescription>
        </SheetHeader>
        <ScrollArea className='flex-grow'>
          <div className='py-2 space-y-4'>
            {items.map((item) => (
              <div
                key={item._id}
                className='flex items-center justify-between gap-4'
              >
                <div className='min-w-0'>
                  <p className='font-medium text-pretty'>{item.name}</p>
                  <p className='text-sm text-muted-foreground'>
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    aria-label='Kurangi'
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        Math.max(1, Number(item.quantity) - 1)
                      )
                    }
                  >
                    −
                  </Button>
                  <input
                    type='number'
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id, Number(e.target.value))
                    }
                    className='w-12 text-center border rounded h-9 bg-background'
                    min={1}
                  />
                  <Button
                    variant='outline'
                    size='icon'
                    aria-label='Tambah'
                    onClick={() =>
                      updateQuantity(item._id, Number(item.quantity) + 1)
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className='text-sm text-muted-foreground text-center'>
                Keranjang kosong.
              </p>
            )}
          </div>
        </ScrollArea>
        <SheetFooter className='mt-auto pt-2 border-t'>
          <div className='w-full'>
            <div className='flex items-center justify-between font-semibold text-lg'>
              <span>Total</span>
              <span>Rp {getTotalPrice().toLocaleString("id-ID")}</span>
            </div>
            <Button
              className='w-full mt-3'
              onClick={handleOrderSubmit}
              disabled={items.length === 0 || isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Pesan Sekarang"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
