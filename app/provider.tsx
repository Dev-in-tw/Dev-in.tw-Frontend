"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  setTheme("dark");
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
