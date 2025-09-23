# Multi-Store POS - Sistem Pemesanan Restoran Real-time

Sebuah aplikasi web _full-stack_ modern yang dirancang untuk menyederhanakan operasional restoran. Proyek ini memungkinkan pelanggan untuk memesan secara mandiri melalui pemindaian QR Code di meja, dan menyediakan dashboard _real-time_ untuk dapur dan kasir, serta panel analisis bisnis untuk pemilik.

---

## ## Fitur Utama ✨

- **Pemesanan Mandiri oleh Pelanggan**: Pelanggan dapat memindai QR Code unik di setiap meja untuk langsung melihat menu dan melakukan pemesanan.
- **Dashboard Dapur Real-time**: Pesanan baru akan muncul secara instan di layar dapur tanpa perlu _refresh_, menggunakan teknologi WebSocket.
- **Manajemen Status Pesanan**: Staf dapur dapat mengubah status pesanan (misal: dari "pending" ke "ready") dengan konfirmasi, dan perubahan ini disiarkan secara _real-time_.
- **Dashboard Analytics**: Pemilik toko dapat melihat metrik bisnis kunci seperti total pendapatan, jumlah pesanan, dan tren pendapatan harian dalam bentuk grafik.
- **Sistem Autentikasi & Otorisasi**: Sistem login yang aman untuk staf menggunakan NextAuth.js. Pengguna hanya dapat mengakses data dari toko yang menjadi haknya.
- **Manajemen Menu**: Panel admin yang fungsional untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada data menu.
- **UI Modern & Responsif**: Dibangun dengan Tailwind CSS dan shadcn/ui untuk tampilan yang bersih, profesional, dan dapat diakses di berbagai perangkat.
- **Optimistic UI Updates**: Memberikan pengalaman pengguna yang sangat responsif dengan memperbarui tampilan secara instan.

---

## ## Arsitektur Proyek 🏗️

Aplikasi ini menggunakan arsitektur modern yang memisahkan layanan utama untuk skalabilitas dan keandalan.

```
+----------------+      +-------------------------+      +-----------------+
|   Pelanggan &  |----->|                         |----->|                 |
|     Admin      |<-----|   Next.js App (Vercel)  |<-----|  MongoDB Atlas  |
+----------------+      |  (Frontend & API REST)  |      |    (Database)   |
                        |                         |      +-----------------+
                        +------------+------------+
                                     |
                                     | (HTTP emit)
                                     v
+----------------+      +-------------------------+
| Dashboard Dapur|<-----|                         |
|    (Real-time) |----->|  Node.js + Socket.IO    |
+----------------+      |  (Railway / Heroku)     |
                        +-------------------------+
```

---

## ## Tech Stack 🛠️

| Kategori        | Teknologi                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend**    | [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Recharts](https://recharts.org/) |
| **Backend**     | [Node.js](https://nodejs.org/), [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), [Express](https://expressjs.com/) (untuk WebSocket)    |
| **Database**    | [MongoDB](https://www.mongodb.com/) (dengan [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)), [Mongoose](https://mongoosejs.com/)                                                     |
| **Real-time**   | [Socket.IO](https://socket.io/)                                                                                                                                                            |
| **Autentikasi** | [NextAuth.js](https://next-auth.js.org/)                                                                                                                                                   |
| **Deployment**  | [Vercel](https://vercel.com/) (untuk Next.js), [Railway](https://railway.app/) (untuk WebSocket Server)                                                                                    |

---

## ## Menjalankan Proyek Secara Lokal

Untuk menjalankan proyek ini di mesin lokal Anda, ikuti langkah-langkah berikut.

### **Prasyarat**

- [Node.js](https://nodejs.org/) (v18 atau lebih baru)
- `npm` atau `yarn`
- Akun [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) untuk mendapatkan _connection string_ database.

### **1. Instalasi**

1.  **Clone repositori:**

    ```bash
    git clone https://github.com/alwanjauza/multi-store-pos.git
    cd multi-store-pos
    ```

2.  **Install dependensi untuk aplikasi utama:**

    ```bash
    npm install
    ```

3.  **Install dependensi untuk server WebSocket:**
    ```bash
    cd socket-server
    npm install
    cd ..
    ```

### **2. Setup Environment Variables**

1.  Buat file `.env.local` di _root_ proyek dengan menyalin dari `.env.example`.
2.  Isi variabel yang dibutuhkan:
    ```env
    # .env.local
    MONGODB_URI="Connection string MongoDB Atlas Anda di sini"
    NEXTAUTH_SECRET="Buat sebuah kunci rahasia yang panjang dan acak"
    ```

### **3. Menjalankan Aplikasi**

Anda perlu menjalankan **dua terminal** secara bersamaan.

- **Terminal 1 (Untuk Server WebSocket):**

  ```bash
  cd socket-server
  node index.js
  ```

  Server ini akan berjalan di `http://localhost:3001`.

- **Terminal 2 (Untuk Aplikasi Next.js):**
  ```bash
  npm run dev
  ```
  Aplikasi utama akan berjalan di `http://localhost:3000`.

### **4. Setup Awal di Database**

Karena aplikasi ini belum memiliki halaman registrasi publik, Anda perlu membuat data awal secara manual di MongoDB Atlas:

1.  Buat minimal satu **toko** di koleksi `stores`.
2.  Buat minimal satu **pengguna** di koleksi `users`.
    - _Password_ harus di-_hash_ menggunakan bcrypt.
    - Pastikan `storeId` pada dokumen pengguna merujuk ke `_id` toko yang sudah Anda buat.
3.  Login menggunakan email dan password pengguna yang baru dibuat untuk mengakses dashboard.
