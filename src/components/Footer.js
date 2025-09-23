export function SiteFooter() {
  return (
    <footer className='border-t'>
      <div className='container mx-auto px-4 py-6 text-sm text-muted-foreground flex items-center justify-between'>
        <p>&copy; {new Date().getFullYear()} Multi-Store POS</p>
        <p className='hidden sm:block'>Built with Next.js & shadcn/ui</p>
      </div>
    </footer>
  );
}
