"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function HeaderLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
  ];

  return (
    <>
      <nav
        className='sticky top-0 z-50 backdrop-blur-md bg-opacity-90 border-b'
        style={{ backgroundColor: "#D9DBBC", borderColor: "#B8D8BA" }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <div className='flex items-center space-x-2'>
              <div
                className='w-8 h-8 rounded-lg flex items-center justify-center text-white text-lg font-bold'
                style={{ backgroundColor: "#EF959D" }}
              >
                P
              </div>
              <span
                className='text-xl sm:text-2xl font-bold'
                style={{ color: "#EF959D" }}
              >
                POSify
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center space-x-6 lg:space-x-8'>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className='text-sm font-medium transition-colors hover:opacity-80 px-2 py-1 rounded-md hover:bg-opacity-10'
                  style={{ color: "#69585F" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#B8D8BA";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  {item.label}
                </a>
              ))}
              <Button
                className='text-white font-medium transition-all hover:scale-105 hover:shadow-lg'
                style={{ backgroundColor: "#EF959D" }}
                size='sm'
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className='md:hidden'>
              <Button
                variant='ghost'
                size='sm'
                className='p-2'
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
              style={{ borderColor: "#B8D8BA" }}
            >
              <div className='px-2 pt-4 pb-6 space-y-1'>
                {navItems.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className='block px-3 py-3 text-base font-medium transition-all hover:scale-[1.02] rounded-lg'
                    style={{ color: "#69585F" }}
                    onClick={closeMobileMenu}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#B8D8BA";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    {item.label}
                  </a>
                ))}
                <div className='pt-4'>
                  <Button
                    className='w-full text-white font-medium h-12 text-base transition-all hover:scale-[1.02] hover:shadow-lg'
                    style={{ backgroundColor: "#EF959D" }}
                    onClick={closeMobileMenu}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden'
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
