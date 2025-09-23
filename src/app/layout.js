import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { SiteHeader } from "@/components/Header";
import { SiteFooter } from "@/components/Footer";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Multi Store POS",
  description: "Sistem POS untuk Multi Toko",
};

export default function RootLayout({ children }) {
  return (
    <html lang='id'>
      <body className={`font-sans ${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <div className='min-h-dvh flex flex-col'>
              <SiteHeader />
              <main className='flex-1'>{children}</main>
              <SiteFooter />
            </div>
          </Suspense>
        </Providers>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
