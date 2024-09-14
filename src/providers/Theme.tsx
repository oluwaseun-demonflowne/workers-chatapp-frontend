"use client";

import { ThemeProvider } from "next-themes";

export function TheProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}{" "}
    </ThemeProvider>
  );
}
