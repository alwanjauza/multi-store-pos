import CartSheet from "@/components/menu/CartSheet";
import MenuItemCard from "@/components/menu/MenuItemCard";
import CartInitializer from "@/components/menu/CartInitializer";
import MenuStyles from "@/components/menu/MenuStyles"; // ⬅️ import baru
import { Badge } from "@/components/ui/badge";

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

  const categoryIcons = {
    "Makanan Utama": "🍽️",
    Minuman: "🥤",
    Appetizer: "🥗",
    Dessert: "🧁",
    Snack: "🍿",
    Default: "🍴",
  };

  return (
    <>
      {/* Inject CSS dari client component agar styled-jsx legal */}
      <MenuStyles />

      <CartInitializer storeId={storeId} tableId={tableId} />

      <div className='menu-container'>
        <div className='container mx-auto px-4 py-8'>
          {/* Header */}
          <header className='text-center mb-12'>
            <div className='mb-6'>
              <div
                className='w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg'
                style={{ backgroundColor: "#EF959D" }}
              >
                🍽️
              </div>
              <Badge
                variant='outline'
                className='mb-4 px-4 py-2 text-sm font-medium'
                style={{
                  color: "#EF959D",
                  borderColor: "#EF959D",
                  backgroundColor: "rgba(239, 149, 157, 0.1)",
                }}
              >
                ✨ Digital Menu
              </Badge>
            </div>

            <h1
              className='text-4xl lg:text-5xl font-bold mb-4'
              style={{ color: "#69585F" }}
            >
              Selamat Datang!
            </h1>
            <p
              className='text-lg mb-2'
              style={{ color: "#69585F", opacity: 0.8 }}
            >
              Nikmati pengalaman dining yang tak terlupakan
            </p>

            {/* Table Info Card */}
            <div
              className='inline-flex items-center gap-3 px-6 py-3 rounded-full shadow-lg mt-4'
              style={{ backgroundColor: "#FCDDBC" }}
            >
              <div
                className='w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm'
                style={{ backgroundColor: "#EF959D" }}
              >
                {tableId}
              </div>
              <span className='font-semibold' style={{ color: "#69585F" }}>
                Meja Nomor {tableId}
              </span>
            </div>
          </header>

          {/* Menu Sections */}
          <main className='space-y-12'>
            {Object.entries(groupedMenu).map(([category, items], index) => (
              <section
                key={category}
                className='category-section rounded-3xl p-8 shadow-lg'
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                {/* Category Header */}
                <div className='flex items-center gap-4 mb-8'>
                  <div
                    className='w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md'
                    style={{ backgroundColor: "#B8D8BA" }}
                  >
                    {categoryIcons[category] || categoryIcons.Default}
                  </div>
                  <div>
                    <h2
                      className='text-3xl font-bold'
                      style={{ color: "#69585F" }}
                    >
                      {category}
                    </h2>
                    <p
                      className='text-sm opacity-70'
                      style={{ color: "#69585F" }}
                    >
                      {items.length} item{items.length > 1 ? "s" : ""} tersedia
                    </p>
                  </div>
                </div>

                {/* Menu Items Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {items.map((item, itemIndex) => (
                    <div
                      key={item._id}
                      style={{
                        animationDelay: `${index * 100 + itemIndex * 50}ms`,
                        animation: "fadeInUp 0.6s ease-out forwards",
                        opacity: 0,
                      }}
                    >
                      <MenuItemCard item={item} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </main>

          {/* Footer Stats */}
          <footer className='text-center mt-16 py-12'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto'>
              <div className='text-center'>
                <div
                  className='text-2xl font-bold'
                  style={{ color: "#EF959D" }}
                >
                  {menuItems.length}+
                </div>
                <div
                  className='text-sm opacity-70'
                  style={{ color: "#69585F" }}
                >
                  Menu Items
                </div>
              </div>
              <div className='text-center'>
                <div
                  className='text-2xl font-bold'
                  style={{ color: "#EF959D" }}
                >
                  100%
                </div>
                <div
                  className='text-sm opacity-70'
                  style={{ color: "#69585F" }}
                >
                  Fresh Ingredients
                </div>
              </div>
              <div className='text-center'>
                <div
                  className='text-2xl font-bold'
                  style={{ color: "#EF959D" }}
                >
                  ⭐ 4.9
                </div>
                <div
                  className='text-sm opacity-70'
                  style={{ color: "#69585F" }}
                >
                  Customer Rating
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <CartSheet />
    </>
  );
}
