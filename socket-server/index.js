const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const PORT = 3001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`🔌 User terhubung: ${socket.id}`);

  socket.on("join_store_room", (storeId) => {
    socket.join(storeId);
    console.log(`User ${socket.id} bergabung ke room toko: ${storeId}`);
  });

  socket.on("new_order", (orderData) => {
    io.to(orderData.storeId).emit("order_update", orderData);
    console.log(`Pesanan baru diteruskan ke room toko: ${orderData.storeId}`);
  });

  socket.on("order_status_update", (updatedOrder) => {
    io.to(updatedOrder.storeId).emit("order_update", updatedOrder);
    console.log(
      `Update status pesanan ${updatedOrder._id} diteruskan ke room toko: ${updatedOrder.storeId}`
    );
  });

  socket.on("disconnect", () => {
    console.log(`🔌 User terputus: ${socket.id}`);
  });
});

server.listen(PORT, () =>
  console.log(`🚀 Server WebSocket berjalan di port ${PORT}`)
);
