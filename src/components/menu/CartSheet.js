"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert(
          "🎉 Pesanan berhasil dibuat! Mohon tunggu konfirmasi dari dapur."
        );
        clearCart();
      } else {
        alert("❌ Gagal membuat pesanan. Silakan coba lagi.");
      }
    } catch (error) {
      alert("❌ Terjadi kesalahan. Periksa koneksi internet Anda.");
    }

    setIsSubmitting(false);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className='floating-cart fixed bottom-6 right-6 h-16 px-6 rounded-full shadow-2xl z-50 text-white font-bold hover:scale-105 transition-all duration-300'
          style={{ backgroundColor: "#EF959D" }}
        >
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <span className='text-2xl'>🛒</span>
              {totalItems > 0 && (
                <Badge
                  className='absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs font-bold'
                  style={{ backgroundColor: "#69585F", color: "white" }}
                >
                  {totalItems}
                </Badge>
              )}
            </div>
            <div className='hidden sm:block'>
              <div className='text-sm'>Keranjang</div>
              <div className='text-xs opacity-80'>
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent
        className='flex flex-col gap-0 p-0'
        style={{ backgroundColor: "#D9DBBC" }}
      >
        {/* Header */}
        <SheetHeader
          className='p-6 border-b'
          style={{ borderColor: "#B8D8BA", backgroundColor: "#FCDDBC" }}
        >
          <div className='flex items-center gap-3'>
            <div
              className='w-10 h-10 rounded-full flex items-center justify-center text-xl'
              style={{ backgroundColor: "#EF959D" }}
            >
              🛒
            </div>
            <div>
              <SheetTitle style={{ color: "#69585F" }}>
                Keranjang Pesanan
              </SheetTitle>
              <SheetDescription style={{ color: "#69585F", opacity: 0.7 }}>
                Periksa pesanan Anda sebelum mengirim ke dapur
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Cart Items */}
        <ScrollArea className='flex-grow p-6'>
          <div className='space-y-6'>
            {items.map((item, index) => (
              <div
                key={item._id}
                className='p-4 rounded-2xl shadow-sm'
                style={{ backgroundColor: "#FCDDBC" }}
              >
                <div className='flex items-start gap-4'>
                  <div
                    className='w-16 h-16 rounded-xl flex items-center justify-center text-2xl flex-shrink-0'
                    style={{ backgroundColor: "#B8D8BA" }}
                  >
                    🍽️
                  </div>

                  <div className='min-w-0 flex-1'>
                    <h4
                      className='font-semibold text-sm leading-tight mb-1'
                      style={{ color: "#69585F" }}
                    >
                      {item.name}
                    </h4>
                    <p
                      className='text-sm font-medium mb-3'
                      style={{ color: "#EF959D" }}
                    >
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>

                    {/* Quantity Controls */}
                    <div className='flex items-center gap-3'>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-8 h-8 p-0 rounded-full'
                        style={{ borderColor: "#EF959D", color: "#EF959D" }}
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            Math.max(1, Number(item.quantity) - 1)
                          )
                        }
                      >
                        −
                      </Button>

                      <div
                        className='w-12 h-8 rounded-lg flex items-center justify-center font-bold text-sm'
                        style={{ backgroundColor: "#B8D8BA", color: "#69585F" }}
                      >
                        {item.quantity}
                      </div>

                      <Button
                        variant='outline'
                        size='sm'
                        className='w-8 h-8 p-0 rounded-full'
                        style={{ borderColor: "#EF959D", color: "#EF959D" }}
                        onClick={() =>
                          updateQuantity(item._id, Number(item.quantity) + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className='text-right'>
                    <p className='font-bold' style={{ color: "#69585F" }}>
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className='text-center py-12'>
                <div
                  className='w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4'
                  style={{ backgroundColor: "#FCDDBC" }}
                >
                  🛒
                </div>
                <p
                  className='text-lg font-medium mb-2'
                  style={{ color: "#69585F" }}
                >
                  Keranjang Masih Kosong
                </p>
                <p className='text-sm opacity-70' style={{ color: "#69585F" }}>
                  Pilih menu favorit Anda untuk mulai memesan
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        {items.length > 0 && (
          <SheetFooter
            className='p-6 border-t mt-auto'
            style={{ borderColor: "#B8D8BA", backgroundColor: "#FCDDBC" }}
          >
            <div className='w-full space-y-4'>
              {/* Order Summary */}
              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span style={{ color: "#69585F", opacity: 0.7 }}>
                    Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
                  </span>
                  <span style={{ color: "#69585F" }}>
                    Rp {getTotalPrice().toLocaleString("id-ID")}
                  </span>
                </div>
                <Separator style={{ backgroundColor: "#B8D8BA" }} />
                <div className='flex items-center justify-between font-bold text-lg'>
                  <span style={{ color: "#69585F" }}>Total</span>
                  <span style={{ color: "#EF959D" }}>
                    Rp {getTotalPrice().toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Order Button */}
              <Button
                className='w-full h-14 text-white font-bold text-lg rounded-2xl hover:scale-[1.02] transition-all duration-300'
                style={{ backgroundColor: "#EF959D" }}
                onClick={handleOrderSubmit}
                disabled={items.length === 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <div className='flex items-center gap-3'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Mengirim Pesanan...
                  </div>
                ) : (
                  <div className='flex items-center gap-3'>
                    <span>🚀</span>
                    Pesan Sekarang
                  </div>
                )}
              </Button>

              <p
                className='text-xs text-center opacity-60'
                style={{ color: "#69585F" }}
              >
                Pesanan akan dikirim langsung ke dapur untuk diproses
              </p>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
