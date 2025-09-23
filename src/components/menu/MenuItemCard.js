"use client";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
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

  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-pretty'>{item.name}</CardTitle>
        <CardDescription className='text-pretty'>
          {item.description || " "}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-between'>
        <span className='inline-flex items-center rounded-md bg-secondary px-2 py-1 text-sm font-semibold'>
          Rp {item.price.toLocaleString("id-ID")}
        </span>
        {!item.isAvailable && (
          <span className='text-xs text-muted-foreground'>Tidak tersedia</span>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => addToCart(item)}
          disabled={!item.isAvailable}
          className='w-full'
        >
          {item.isAvailable ? "Tambah ke Keranjang" : "Habis"}
        </Button>
      </CardFooter>
    </Card>
  );
}
