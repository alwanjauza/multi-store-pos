"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, BarChart3, ChefHat, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const nav = [
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/menu", label: "Menu", icon: MenuIcon },
    { href: "/dashboard/kitchen", label: "Kitchen", icon: ChefHat },
  ];

  return (
    <header className='sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 h-14 flex items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <Store className='h-5 w-5 text-primary' aria-hidden='true' />
          <span className='font-semibold'>Multi-Store POS</span>
        </Link>
        <nav className='hidden sm:flex items-center gap-1'>
          {nav.map((item) => {
            const ActiveIcon = item.icon;
            const active = pathname?.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={active ? "default" : "ghost"}
                  className={cn("gap-2", active && "shadow-sm")}
                >
                  <ActiveIcon className='h-4 w-4' />
                  <span className='sr-only sm:not-sr-only'>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className='flex items-center gap-2'>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
