"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import AuthProvider from "@/components/AuthProvider";

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
