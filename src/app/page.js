"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "Starter",
      tagline: "Cocok untuk memulai",
      monthly: 99000,
      yearly: 79000, // per bulan (dibayar tahunan)
      highlight: false,
      features: [
        "1 toko & 2 perangkat",
        "Basic inventory",
        "Laporan harian",
        "Support email",
      ],
      cta: "Mulai Gratis",
    },
    {
      name: "Pro",
      tagline: "Paket paling populer",
      monthly: 199000,
      yearly: 159000,
      highlight: true, // Recommended
      features: [
        "Hingga 5 toko & 10 perangkat",
        "Advanced inventory + alert stok",
        "Dashboard analytics & export",
        "Multi payment + e-receipt",
        "Support chat 24/7",
      ],
      cta: "Pilih Pro",
    },
    {
      name: "Enterprise",
      tagline: "Skala besar & kustom",
      monthly: 0,
      yearly: 0,
      highlight: false,
      features: [
        "Toko & perangkat tidak terbatas",
        "Integrasi ERP/Accounting",
        "SSO & kontrol akses granular",
        "SLA premium & CSM dedicated",
      ],
      cta: "Hubungi Sales",
      isContact: true,
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Manajemen Inventory",
      description:
        "Kelola stok barang dengan mudah dan real-time monitoring untuk bisnis yang efisien",
      icon: "📦",
      badge: "Real-time",
    },
    {
      title: "Laporan Penjualan",
      description:
        "Dashboard analytics lengkap dengan insights mendalam untuk keputusan bisnis yang tepat",
      icon: "📊",
      badge: "Analytics",
    },
    {
      title: "Multi Payment",
      description:
        "Terima berbagai metode pembayaran digital dan konvensional dengan keamanan terjamin",
      icon: "💳",
      badge: "Secure",
    },
    {
      title: "Cloud Sync",
      description:
        "Data tersinkron otomatis ke cloud dengan backup real-time untuk keamanan data maksimal",
      icon: "☁️",
      badge: "Auto Sync",
    },
  ];

  const stats = [
    { value: "10K+", label: "Bisnis Aktif" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
    { value: "50+", label: "Kota" },
  ];

  const formatIDR = (n) => new Intl.NumberFormat("id-ID").format(n);

  return (
    <div className='min-h-screen' style={{ backgroundColor: "#D9DBBC" }}>
      {/* Custom CSS untuk color palette */}
      <style jsx global>{`
        :root {
          --primary: #ef959d;
          --foreground: #69585f;
          --background: #d9dbbc;
          --secondary: #b8d8ba;
          --accent: #fcddbc;
        }
      `}</style>

      {/* Hero Section */}
      <section id='home' className='py-20 lg:py-32'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className='space-y-6'>
                <Badge
                  variant='outline'
                  className='text-sm px-3 py-1'
                  style={{ color: "#EF959D", borderColor: "#EF959D" }}
                >
                  🚀 Trusted by 10,000+ businesses
                </Badge>
                <h1
                  className='text-5xl lg:text-7xl font-bold leading-tight'
                  style={{ color: "#69585F" }}
                >
                  Revolusi
                  <span className='block' style={{ color: "#EF959D" }}>
                    Point of Sale
                  </span>
                  Masa Depan
                </h1>
                <p
                  className='text-xl leading-relaxed opacity-80 max-w-lg'
                  style={{ color: "#69585F" }}
                >
                  Sistem POS yang powerful, user-friendly, dan terjangkau untuk
                  mengembangkan bisnis Anda ke level selanjutnya dengan
                  teknologi terdepan.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Button
                  size='lg'
                  className='text-white text-lg font-semibold px-8 py-6'
                  style={{ backgroundColor: "#EF959D" }}
                >
                  Mulai Gratis Sekarang
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  className='text-lg font-semibold px-8 py-6'
                  style={{ color: "#69585F", borderColor: "#69585F" }}
                >
                  Lihat Demo Live
                </Button>
              </div>

              <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8'>
                {stats.map((stat, index) => (
                  <div key={index} className='text-center'>
                    <div
                      className='text-2xl lg:text-3xl font-bold'
                      style={{ color: "#EF959D" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className='text-sm opacity-70'
                      style={{ color: "#69585F" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Card
                className='relative overflow-hidden shadow-2xl border-0'
                style={{ backgroundColor: "#FCDDBC" }}
              >
                <CardContent className='p-8'>
                  <div
                    className='aspect-video rounded-xl flex items-center justify-center text-6xl lg:text-8xl mb-6'
                    style={{ backgroundColor: "#B8D8BA" }}
                  >
                    🖥️
                  </div>
                  <div className='space-y-4'>
                    <div className='flex items-center space-x-3'>
                      <div
                        className='w-3 h-3 rounded-full animate-pulse'
                        style={{ backgroundColor: "#EF959D" }}
                      ></div>
                      <div
                        className='h-4 bg-gradient-to-r from-current to-transparent rounded-full flex-1 opacity-30'
                        style={{ backgroundColor: "#B8D8BA" }}
                      ></div>
                    </div>
                    <div className='flex items-center space-x-3'>
                      <div
                        className='w-3 h-3 rounded-full animate-pulse delay-200'
                        style={{ backgroundColor: "#69585F" }}
                      ></div>
                      <div
                        className='h-4 bg-gradient-to-r from-current to-transparent rounded-full flex-1 opacity-50'
                        style={{ backgroundColor: "#B8D8BA" }}
                      ></div>
                    </div>
                    <div className='flex items-center space-x-3'>
                      <div
                        className='w-3 h-3 rounded-full animate-pulse delay-500'
                        style={{ backgroundColor: "#EF959D" }}
                      ></div>
                      <div
                        className='h-4 bg-gradient-to-r from-current to-transparent rounded-full flex-1 opacity-70'
                        style={{ backgroundColor: "#B8D8BA" }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div
                className='absolute -inset-4 bg-gradient-to-r opacity-20 blur-3xl rounded-3xl -z-10'
                style={{ backgroundColor: "#EF959D" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id='features'
        className='py-20 lg:py-32'
        style={{ backgroundColor: "#FCDDBC" }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16 lg:mb-20'>
            <Badge
              variant='outline'
              className='mb-4'
              style={{ color: "#EF959D", borderColor: "#EF959D" }}
            >
              ✨ Features
            </Badge>
            <h2
              className='text-4xl lg:text-6xl font-bold mb-6'
              style={{ color: "#69585F" }}
            >
              Fitur Unggulan
            </h2>
            <p
              className='text-xl opacity-80 max-w-3xl mx-auto'
              style={{ color: "#69585F" }}
            >
              Dilengkapi dengan berbagai fitur canggih yang dirancang khusus
              untuk mendukung dan mengoptimalkan operasional bisnis Anda
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl border-0 ${
                  activeFeature === index ? "shadow-2xl scale-105" : "shadow-lg"
                }`}
                style={{
                  backgroundColor:
                    activeFeature === index ? "#B8D8BA" : "#D9DBBC",
                }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardHeader className='text-center pb-4'>
                  <div className='text-5xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                    {feature.icon}
                  </div>
                  <Badge
                    variant='secondary'
                    className='mb-2 text-xs font-medium w-fit mx-auto'
                    style={{ backgroundColor: "#EF959D", color: "white" }}
                  >
                    {feature.badge}
                  </Badge>
                  <CardTitle
                    className='text-xl font-bold'
                    style={{ color: "#69585F" }}
                  >
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription
                    className='text-center leading-relaxed'
                    style={{ color: "#69585F", opacity: 0.8 }}
                  >
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16' style={{ backgroundColor: "#B8D8BA" }}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div
                className='text-4xl lg:text-5xl font-bold mb-2'
                style={{ color: "#69585F" }}
              >
                500M+
              </div>
              <div className='text-sm opacity-70' style={{ color: "#69585F" }}>
                Transaksi Diproses
              </div>
            </div>
            <div className='text-center'>
              <div
                className='text-4xl lg:text-5xl font-bold mb-2'
                style={{ color: "#69585F" }}
              >
                150+
              </div>
              <div className='text-sm opacity-70' style={{ color: "#69585F" }}>
                Integrasi Partner
              </div>
            </div>
            <div className='text-center'>
              <div
                className='text-4xl lg:text-5xl font-bold mb-2'
                style={{ color: "#69585F" }}
              >
                98%
              </div>
              <div className='text-sm opacity-70' style={{ color: "#69585F" }}>
                Customer Satisfaction
              </div>
            </div>
            <div className='text-center'>
              <div
                className='text-4xl lg:text-5xl font-bold mb-2'
                style={{ color: "#69585F" }}
              >
                &lt;1s
              </div>
              <div className='text-sm opacity-70' style={{ color: "#69585F" }}>
                Kecepatan Transaksi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id='pricing'
        className='py-20 lg:py-32'
        style={{ backgroundColor: "#FCDDBC" }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='text-center mb-10 lg:mb-14'>
            <Badge
              variant='outline'
              className='mb-4'
              style={{ color: "#EF959D", borderColor: "#EF959D" }}
            >
              💳 Pricing
            </Badge>

            <h2
              className='text-4xl lg:text-6xl font-bold mb-4'
              style={{ color: "#69585F" }}
            >
              Harga Transparan, Nilai Maksimal
            </h2>
            <p
              className='text-lg lg:text-xl opacity-80 max-w-3xl mx-auto'
              style={{ color: "#69585F" }}
            >
              Pilih paket yang sesuai kebutuhan. Bayar bulanan atau hemat hingga
              20% dengan pembayaran tahunan.
            </p>

            {/* Toggle Monthly / Yearly */}
            <div
              className='mt-8 inline-flex items-center rounded-full p-1 shadow-lg'
              style={{ backgroundColor: "#D9DBBC" }}
            >
              <button
                onClick={() => setIsYearly(false)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  !isYearly ? "shadow" : "opacity-70"
                }`}
                style={{
                  color: !isYearly ? "white" : "#69585F",
                  backgroundColor: !isYearly ? "#EF959D" : "transparent",
                }}
                aria-pressed={!isYearly}
              >
                Bulanan
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ml-1 ${
                  isYearly ? "shadow" : "opacity-70"
                }`}
                style={{
                  color: isYearly ? "white" : "#69585F",
                  backgroundColor: isYearly ? "#EF959D" : "transparent",
                }}
                aria-pressed={isYearly}
              >
                Tahunan
              </button>

              {isYearly && (
                <span
                  className='ml-3 text-xs font-semibold px-2 py-1 rounded-full'
                  style={{ backgroundColor: "#B8D8BA", color: "#69585F" }}
                >
                  Hemat 20%
                </span>
              )}
            </div>
          </div>

          {/* Cards */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
            {plans.map((p, i) => {
              const price = p.isContact
                ? null
                : isYearly
                ? p.yearly
                : p.monthly;

              return (
                <Card
                  key={p.name}
                  className={`relative border-0 transition-all duration-300 hover:shadow-2xl ${
                    p.highlight ? "shadow-2xl scale-[1.02]" : "shadow-lg"
                  }`}
                  style={{
                    backgroundColor: p.highlight ? "#B8D8BA" : "#D9DBBC",
                  }}
                >
                  {/* Recommended badge */}
                  {p.highlight && (
                    <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                      <Badge
                        className='px-3 py-1 text-xs font-semibold'
                        style={{ backgroundColor: "#EF959D", color: "white" }}
                      >
                        Recommended
                      </Badge>
                    </div>
                  )}

                  <CardHeader className='text-center pb-2'>
                    <CardTitle
                      className='text-2xl font-bold'
                      style={{ color: "#69585F" }}
                    >
                      {p.name}
                    </CardTitle>
                    <CardDescription
                      className='mt-1'
                      style={{ color: "#69585F", opacity: 0.8 }}
                    >
                      {p.tagline}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Price */}
                    <div className='text-center my-4'>
                      {p.isContact ? (
                        <div
                          className='text-4xl font-extrabold'
                          style={{ color: "#69585F" }}
                        >
                          Custom
                        </div>
                      ) : (
                        <>
                          <div
                            className='text-5xl font-extrabold'
                            style={{ color: "#EF959D" }}
                          >
                            Rp {formatIDR(price)}
                          </div>
                          <div
                            className='text-sm opacity-70 mt-1'
                            style={{ color: "#69585F" }}
                          >
                            per {isYearly ? "bulan (tagihan tahunan)" : "bulan"}
                          </div>
                        </>
                      )}
                    </div>

                    <Separator
                      className='my-6'
                      style={{ backgroundColor: "#B8D8BA" }}
                    />

                    {/* Features */}
                    <ul className='space-y-3'>
                      {p.features.map((f, idx) => (
                        <li key={idx} className='flex items-start gap-3'>
                          <span className='mt-0.5'>✅</span>
                          <span
                            className='text-sm leading-relaxed'
                            style={{ color: "#69585F" }}
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className='pt-0'>
                    <Button
                      className='w-full text-white font-semibold h-12 rounded-xl hover:scale-[1.02] transition-all'
                      style={{ backgroundColor: "#EF959D" }}
                    >
                      {p.cta}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Footnote */}
          <div
            className='text-center mt-12 text-sm opacity-70'
            style={{ color: "#69585F" }}
          >
            Semua harga sudah termasuk PPN (jika berlaku). Anda dapat
            upgrade/downgrade kapan saja.
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className='py-20 lg:py-32'
        style={{ backgroundColor: "#D9DBBC" }}
      >
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <Card
            className='border-0 shadow-2xl overflow-hidden'
            style={{ backgroundColor: "#FCDDBC" }}
          >
            <CardContent className='p-12 lg:p-16'>
              <Badge
                variant='outline'
                className='mb-6'
                style={{ color: "#EF959D", borderColor: "#EF959D" }}
              >
                🎯 Ready to Transform?
              </Badge>
              <h2
                className='text-4xl lg:text-6xl font-bold mb-6'
                style={{ color: "#69585F" }}
              >
                Siap Mengembangkan Bisnis Anda?
              </h2>
              <p
                className='text-xl mb-10 opacity-80 max-w-2xl mx-auto'
                style={{ color: "#69585F" }}
              >
                Bergabunglah dengan ribuan pebisnis cerdas yang telah
                mempercayai POSify untuk mengelola dan mengembangkan usaha
                mereka
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8'>
                <Button
                  size='lg'
                  className='text-white text-lg font-semibold px-10 py-6'
                  style={{ backgroundColor: "#EF959D" }}
                >
                  Coba Gratis 30 Hari
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  className='text-lg font-semibold px-10 py-6'
                  style={{ color: "#69585F", borderColor: "#69585F" }}
                >
                  Hubungi Sales Expert
                </Button>
              </div>
              <div
                className='flex items-center justify-center space-x-6 text-sm opacity-60'
                style={{ color: "#69585F" }}
              >
                <span>✅ Tidak perlu kartu kredit</span>
                <Separator orientation='vertical' className='h-4' />
                <span>⚡ Setup dalam 5 menit</span>
                <Separator orientation='vertical' className='h-4' />
                <span>🔒 Data aman & terenkripsi</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
