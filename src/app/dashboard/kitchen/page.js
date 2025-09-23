"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import {
  Card,
  CardContent,
  CardFooter, // Impor CardFooter
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function KitchenPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dialogState, setDialogState] = useState({
    isOpen: false,
    orderId: null,
    newStatus: "",
  });

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error("Gagal update status:", error);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }
    if (status === "authenticated" && session.user.storeId) {
      const storeId = session.user.storeId;
      async function fetchInitialOrders() {
        try {
          const response = await fetch(
            `/api/orders?storeId=${storeId}&status=pending`
          );
          const result = await response.json();
          if (result.success) {
            setOrders(result.data);
          }
        } catch (error) {
          console.error("Gagal mengambil data pesanan awal:", error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchInitialOrders();
      const socket = io("http://localhost:3001");
      socket.on("connect", () => socket.emit("join_store_room", storeId));
      socket.on("order_update", (updatedOrder) => {
        setOrders((prevOrders) => {
          const existingOrderIndex = prevOrders.findIndex(
            (o) => o._id === updatedOrder._id
          );
          if (existingOrderIndex !== -1) {
            const newOrders = [...prevOrders];
            newOrders[existingOrderIndex] = updatedOrder;
            return newOrders;
          }
          return [updatedOrder, ...prevOrders];
        });
      });
      return () => {
        socket.disconnect();
      };
    } else {
      setIsLoading(false);
    }
  }, [status, session, router]);

  const openConfirmationDialog = (orderId, newStatus) => {
    setDialogState({ isOpen: true, orderId, newStatus });
  };

  const confirmAction = () => {
    const { orderId, newStatus } = dialogState;
    if (!orderId || !newStatus) return;

    handleUpdateStatus(orderId, newStatus);

    setOrders((prevOrders) =>
      prevOrders.filter((order) => order._id !== orderId)
    );

    setDialogState({ isOpen: false, orderId: null, newStatus: "" });
  };

  if (isLoading || status === "loading")
    return <div className='container mx-auto px-4 py-8'>Memuat data...</div>;
  if (!session?.user?.storeId)
    return (
      <div className='container mx-auto px-4 py-8'>
        Akun Anda tidak terhubung ke toko manapun.
      </div>
    );

  const pendingOrders = orders.filter((order) => order.status === "pending");

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-balance'>
        Layar Dapur - Pesanan Masuk
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {pendingOrders.length > 0 ? (
          pendingOrders.map((order) => (
            <Card key={order._id} className='shadow-sm flex flex-col'>
              <CardHeader>
                <CardTitle>Meja {order.tableId}</CardTitle>
                <CardDescription>
                  Diterima:{" "}
                  {new Date(order.createdAt).toLocaleTimeString("id-ID")}
                </CardDescription>
              </CardHeader>
              <CardContent className='flex-grow'>
                <ul className='list-disc pl-5 space-y-1'>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      <strong>{item.quantity}x</strong> {item.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className='flex justify-end gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => openConfirmationDialog(order._id, "cancelled")}
                >
                  Batalkan
                </Button>
                <Button
                  size='sm'
                  onClick={() => openConfirmationDialog(order._id, "ready")}
                >
                  Tandai Siap
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className='text-muted-foreground col-span-full text-center py-10'>
            Belum ada pesanan yang masuk.
          </p>
        )}
      </div>

      <AlertDialog
        open={dialogState.isOpen}
        onOpenChange={(open) =>
          !open &&
          setDialogState({ isOpen: false, orderId: null, newStatus: "" })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan mengubah status pesanan menjadi{" "}
              <span className='font-bold'>{dialogState.newStatus}</span>.
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>
              Ya, Lanjutkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
