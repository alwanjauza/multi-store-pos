import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { io } from "socket.io-client";

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const { orderId } = params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Status wajib diisi" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: "Pesanan tidak ditemukan" },
        { status: 404 }
      );
    }

    try {
      const socket = io("http://localhost:3001");
      socket.on("connect", () => {
        socket.emit("order_status_update", updatedOrder);
        socket.disconnect();
      });
    } catch (error) {
      console.error(
        "Gagal mengirim notifikasi update status via WebSocket:",
        error
      );
    }

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
