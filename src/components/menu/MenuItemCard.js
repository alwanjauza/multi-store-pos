"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MenuItemCard({ item }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(item);

    // Simulate loading and success feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  return (
    <Card
      className='group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0 overflow-hidden'
      style={{ backgroundColor: "#FCDDBC" }}
    >
      {/* Card Image Placeholder */}
      <div
        className='h-40 w-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300'
        style={{ backgroundColor: "#B8D8BA" }}
      >
        🍽️
      </div>

      <CardHeader className='space-y-3 pb-4'>
        <div className='flex items-start justify-between gap-2'>
          <CardTitle
            className='text-lg font-bold leading-tight group-hover:text-opacity-80 transition-colors'
            style={{ color: "#69585F" }}
          >
            {item.name}
          </CardTitle>
          {!item.isAvailable && (
            <Badge
              variant='secondary'
              className='text-xs px-2 py-1'
              style={{ backgroundColor: "#EF959D", color: "white" }}
            >
              Habis
            </Badge>
          )}
        </div>

        <CardDescription
          className='text-sm leading-relaxed'
          style={{ color: "#69585F", opacity: 0.7 }}
        >
          {item.description ||
            "Menu istimewa dengan cita rasa yang tak terlupakan"}
        </CardDescription>
      </CardHeader>

      <CardContent className='pb-4'>
        <div className='flex items-center justify-between'>
          <div
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-sm'
            style={{ backgroundColor: "#EF959D" }}
          >
            <span className='text-white font-bold text-lg'>
              Rp {item.price.toLocaleString("id-ID")}
            </span>
          </div>

          {item.isAvailable && (
            <Badge
              variant='outline'
              className='text-xs px-2 py-1'
              style={{ color: "#B8D8BA", borderColor: "#B8D8BA" }}
            >
              ✓ Tersedia
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className='pt-0'>
        <Button
          onClick={handleAddToCart}
          disabled={!item.isAvailable || isAdding}
          className={`w-full font-semibold transition-all duration-300 ${
            item.isAvailable
              ? "hover:scale-105 hover:shadow-lg text-white"
              : "opacity-50 cursor-not-allowed"
          }`}
          style={{
            backgroundColor: item.isAvailable ? "#EF959D" : "#B8D8BA",
          }}
        >
          {isAdding ? (
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              Menambahkan...
            </div>
          ) : item.isAvailable ? (
            <div className='flex items-center gap-2'>
              <span>🛒</span>
              Tambah ke Keranjang
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <span>❌</span>
              Tidak Tersedia
            </div>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
