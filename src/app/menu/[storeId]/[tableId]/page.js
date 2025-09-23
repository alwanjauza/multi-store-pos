import CartSheet from "@/components/menu/CartSheet";
import MenuItemCard from "@/components/menu/MenuItemCard";
import CartInitializer from "@/components/menu/CartInitializer";

async function getMenuItems(storeId) {
  const res = await fetch(`http://localhost:3000/api/stores/${storeId}/menu`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Gagal mengambil data menu");
  const data = await res.json();
  return data.data;
}

export default async function MenuPage({ params }) {
  const { storeId, tableId } = params;
  const menuItems = await getMenuItems(storeId);
  const groupedMenu = menuItems.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <>
      <CartInitializer storeId={storeId} tableId={tableId} />

      <div className='container mx-auto px-4 py-6'>
        <header className='text-center my-4'>
          <h1 className='text-3xl font-bold text-balance'>Selamat Datang!</h1>
          <p className='text-base text-muted-foreground'>
            Meja Nomor: {tableId}
          </p>
        </header>
        <main className='space-y-10'>
          {Object.entries(groupedMenu).map(([category, items]) => (
            <section key={category} className='space-y-6'>
              <h2 className='text-2xl font-semibold border-b pb-2'>
                {category}
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {items.map((item) => (
                  <MenuItemCard key={item._id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
      <CartSheet />
    </>
  );
}
