"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export default function MenuForm({ storeId }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    const newMenuItem = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number.parseFloat(formData.get("price")),
      category: formData.get("category"),
      isAvailable: formData.get("isAvailable") === "on",
    };

    await fetch(`/api/stores/${storeId}/menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenuItem),
    });

    setIsSubmitting(false);
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Tambah Menu Baru</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Menu Baru</DialogTitle>
          <DialogDescription>Isi detail menu di bawah ini.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-3 py-2'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nama</Label>
              <Input id='name' name='name' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Deskripsi</Label>
              <Input id='description' name='description' />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='price'>Harga</Label>
              <Input id='price' name='price' type='number' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='category'>Kategori</Label>
              <Input id='category' name='category' required />
            </div>
            <div className='flex items-center gap-2 pt-1'>
              <Switch
                id='isAvailable'
                name='isAvailable'
                defaultChecked={true}
              />
              <Label htmlFor='isAvailable'>Tersedia</Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='secondary'>
                Batal
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
