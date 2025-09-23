import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { io } from "socket.io-client";

export async function GET(request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get("storeId");
    const status = searchParams.get("status");

    const filter = {};
    if (storeId) filter.storeId = storeId;
    if (status) filter.status = status;

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newOrder = await Order.create(body);

    try {
      const socket = io("http://localhost:3001");

      socket.on("connect", () => {
        console.log(
          "✅ Koneksi dari API ke WebSocket Server berhasil, mengirim data..."
        );

        socket.emit("new_order", newOrder);

        socket.disconnect();
      });

      socket.on("connect_error", (error) => {
        console.error(
          "❌ Gagal terhubung ke WebSocket Server dari API:",
          error.message
        );
      });
    } catch (socketError) {
      console.error(
        "❌ Terjadi error pada setup WebSocket di API:",
        socketError
      );
    }

    return NextResponse.json(
      { success: true, message: "Pesanan berhasil dibuat!", data: newOrder },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
