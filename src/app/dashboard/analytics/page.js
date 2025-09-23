"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace("/login");
      return;
    }

    if (status === "authenticated" && session.user.storeId) {
      const storeId = session.user.storeId;

      async function fetchAnalytics() {
        try {
          const response = await fetch(`/api/analytics?storeId=${storeId}`);
          const result = await response.json();
          if (result.success) {
            setAnalyticsData(result.data);
          }
        } catch (error) {
          console.error("Gagal mengambil data analytics:", error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchAnalytics();
    } else {
      setIsLoading(false);
    }
  }, [status, session, router]);

  if (isLoading || status === "loading") {
    return <div className='container mx-auto px-4 py-8'>Memuat data...</div>;
  }

  if (!session?.user?.storeId) {
    return (
      <div className='container mx-auto px-4 py-8'>
        Akun Anda tidak terhubung ke toko manapun.
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className='container mx-auto px-4 py-8'>
        Tidak ada data untuk ditampilkan.
      </div>
    );
  }

  const formattedDailyRevenue = analyticsData.dailyRevenue.map((item) => ({
    ...item,
    tanggal: new Date(item._id).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    }),
  }));

  return (
    <div className='container mx-auto px-4 py-8 space-y-6'>
      <h1 className='text-3xl font-bold text-balance'>Dashboard Analytics</h1>
      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              Rp {analyticsData.totalRevenue.toLocaleString("id-ID")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Pesanan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{analyticsData.totalOrders}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pendapatan 7 Hari Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={formattedDailyRevenue}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='tanggal' />
              <YAxis
                tickFormatter={(value) =>
                  `Rp${(value / 1000).toLocaleString("id-ID")}k`
                }
              />
              <Tooltip
                formatter={(value) => `Rp${value.toLocaleString("id-ID")}`}
              />
              <Bar
                dataKey='dailyRevenue'
                fill='hsl(var(--primary))'
                name='Pendapatan'
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
