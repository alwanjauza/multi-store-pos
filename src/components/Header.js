"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, BarChart3, ChefHat, MenuIcon, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nav = [
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/menu", label: "Menu", icon: MenuIcon },
    { href: "/dashboard/kitchen", label: "Kitchen", icon: ChefHat },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --pos-primary: #ef959d;
          --pos-foreground: #69585f;
          --pos-background: #d9dbbc;
          --pos-secondary: #b8d8ba;
          --pos-accent: #fcddbc;
        }
      `}</style>

      <header
        className='sticky top-0 z-40 border-b backdrop-blur-md supports-[backdrop-filter]:bg-opacity-90'
        style={{
          backgroundColor: "#D9DBBC",
          borderColor: "#B8D8BA",
        }}
      >
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center gap-3 hover:opacity-80 transition-opacity'
            onClick={closeMobileMenu}
          >
            <div
              className='flex items-center justify-center w-8 h-8 rounded-lg'
              style={{ backgroundColor: "#EF959D" }}
            >
              <Store className='h-4 w-4 text-white' aria-hidden='true' />
            </div>
            <span
              className='font-bold text-lg hidden sm:inline-block'
              style={{ color: "#69585F" }}
            >
              POSify Admin
            </span>
            <span
              className='font-bold text-lg sm:hidden'
              style={{ color: "#69585F" }}
            >
              POSify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-2'>
            {nav.map((item) => {
              const ActiveIcon = item.icon;
              const active = pathname?.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant='ghost'
                    className={cn(
                      "gap-2 px-4 py-2 font-medium transition-all duration-200 hover:scale-105",
                      active ? "text-white shadow-md" : "hover:shadow-sm"
                    )}
                    style={{
                      backgroundColor: active ? "#EF959D" : "transparent",
                      color: active ? "white" : "#69585F",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.target.style.backgroundColor = "#FCDDBC";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.target.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <ActiveIcon className='h-4 w-4' />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className='flex items-center gap-2'>
            {/* Mobile Menu Button */}
            <Button
              variant='ghost'
              size='sm'
              className='md:hidden p-2'
              onClick={toggleMobileMenu}
              style={{ color: "#69585F" }}
            >
              {mobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className='md:hidden border-t animate-in slide-in-from-top-2 duration-200'
            style={{
              backgroundColor: "#FCDDBC",
              borderColor: "#B8D8BA",
            }}
          >
            <div className='container mx-auto px-4 py-4 space-y-2'>
              {nav.map((item, index) => {
                const ActiveIcon = item.icon;
                const active = pathname?.startsWith(item.href);
                return (
                  <div key={item.href}>
                    <Link href={item.href} onClick={closeMobileMenu}>
                      <Button
                        variant='ghost'
                        className={cn(
                          "w-full justify-start gap-3 h-12 text-base font-medium transition-all duration-200",
                          active && "shadow-sm"
                        )}
                        style={{
                          backgroundColor: active ? "#EF959D" : "transparent",
                          color: active ? "white" : "#69585F",
                        }}
                      >
                        <ActiveIcon className='h-5 w-5' />
                        <span>{item.label}</span>
                        {active && (
                          <div className='ml-auto'>
                            <div
                              className='w-2 h-2 rounded-full'
                              style={{ backgroundColor: "white" }}
                            />
                          </div>
                        )}
                      </Button>
                    </Link>
                    {index < nav.length - 1 && (
                      <Separator
                        className='my-2'
                        style={{ backgroundColor: "#B8D8BA" }}
                      />
                    )}
                  </div>
                );
              })}

              {/* Mobile Menu Footer */}
              <div
                className='pt-4 mt-4 border-t'
                style={{ borderColor: "#B8D8BA" }}
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div
                      className='w-6 h-6 rounded-full flex items-center justify-center'
                      style={{ backgroundColor: "#EF959D" }}
                    >
                      <div className='w-2 h-2 bg-white rounded-full animate-pulse' />
                    </div>
                    <span
                      className='text-sm font-medium'
                      style={{ color: "#69585F" }}
                    >
                      System Online
                    </span>
                  </div>
                  <span
                    className='text-xs opacity-70'
                    style={{ color: "#69585F" }}
                  >
                    v2.1.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-20 z-30 md:hidden'
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
