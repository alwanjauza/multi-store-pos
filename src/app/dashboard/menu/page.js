import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MenuForm from "@/components/dashboard/MenuForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function getMenuItems(storeId) {
  const res = await fetch(`http://localhost:3000/api/stores/${storeId}/menu`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal fetch data menu");
  const data = await res.json();
  return data.data;
}

export default async function MenuPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const storeId = session.user.storeId;

  if (!storeId) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='p-8'>Akun Anda tidak terhubung ke toko manapun.</div>
      </div>
    );
  }

  const menuItems = await getMenuItems(storeId);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Manajemen Menu</h1>
        <MenuForm storeId={storeId} />
      </div>
      <div className='border rounded-lg overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Harga</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>Rp{item.price.toLocaleString("id-ID")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className='text-center'>
                  Belum ada menu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
