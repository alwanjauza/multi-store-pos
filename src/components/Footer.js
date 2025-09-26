import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function SiteFooter() {
  return (
    <footer className='py-16' style={{ backgroundColor: "#69585F" }}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12'>
          <div className='md:col-span-2 space-y-6'>
            <div className='flex items-center space-x-2'>
              <div
                className='w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl font-bold'
                style={{ backgroundColor: "#EF959D" }}
              >
                P
              </div>
              <span className='text-3xl font-bold' style={{ color: "#EF959D" }}>
                POSify
              </span>
            </div>
            <p
              className='text-lg opacity-80 max-w-md'
              style={{ color: "#D9DBBC" }}
            >
              Solusi POS terdepan untuk bisnis modern di Indonesia. Dipercaya
              oleh ribuan merchant untuk mengelola bisnis dengan lebih efisien.
            </p>
            <div className='flex space-x-4'>
              {["Facebook", "Twitter", "LinkedIn", "Instagram"].map(
                (social, index) => (
                  <Button
                    key={social}
                    size='sm'
                    className='w-10 h-10 rounded-full p-0 text-white font-medium'
                    style={{ backgroundColor: "#EF959D" }}
                  >
                    {social[0]}
                  </Button>
                )
              )}
            </div>
          </div>
          <div>
            <h4
              className='font-semibold mb-6 text-lg'
              style={{ color: "#FCDDBC" }}
            >
              Produk
            </h4>
            <ul className='space-y-3 opacity-80' style={{ color: "#D9DBBC" }}>
              <li>
                <a href='#' className='hover:opacity-100 transition-opacity'>
                  POS System
                </a>
              </li>
              <li>
                <a href='#' className='hover:opacity-100 transition-opacity'>
                  Inventory Management
                </a>
              </li>
              <li>
                <a href='#' className='hover:opacity-100 transition-opacity'>
                  Analytics Dashboard
                </a>
              </li>
              <li>
                <a href='#' className='hover:opacity-100 transition-opacity'>
                  Mobile App
                </a>
              </li>
              <li>
                <a href='#' className='hover:opacity-100 transition-opacity'>
                  API Integration
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4
              className='font-semibold mb-6 text-lg'
              style={{ color: "#FCDDBC" }}
            >
              Support
            </h4>
            <ul className='space-y-3 opacity-80' style={{ color: "#D9DBBC" }}>
              <li>
                <a href='#' className='hover:opacity-100 transition-opacity'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='hover:opacity-100 transition-opacity'>
                  Contact Support
                </a>
              </li>
              <li>
                <a href='#' className='hover:opacity-100 transition-opacity'>
                  Training Program
                </a>
              </li>
              <li>
                <a href='#' className='hover:opacity-100 transition-opacity'>
                  Community Forum
                </a>
              </li>
              <li>
                <a href='#' className='hover:opacity-100 transition-opacity'>
                  System Status
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className='my-8' style={{ backgroundColor: "#B8D8BA" }} />
        <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
          <p
            className='opacity-60 text-center md:text-left'
            style={{ color: "#D9DBBC" }}
          >
            &copy; 2025 POSify. All rights reserved. Made with ❤️ in Indonesia
          </p>
          <div
            className='flex space-x-6 text-sm opacity-60'
            style={{ color: "#D9DBBC" }}
          >
            <a href='#' className='hover:opacity-100 transition-opacity'>
              Privacy Policy
            </a>
            <a href='#' className='hover:opacity-100 transition-opacity'>
              Terms of Service
            </a>
            <a href='#' className='hover:opacity-100 transition-opacity'>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
