import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/providers/Socket";
import { TheProviders } from "@/providers/Theme";
import ThemeSwitch from "@/providers/ThemeSwitch";
import { AuthContextProvider } from "@/providers/ClientAuth";
import {Toaster} from "sonner"

const inter = Oxanium({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatterBox - Connect and Chat in Real-Time",
  description:
    "ChatterBox is a modern, user-friendly chat application that allows you to connect with friends, family, and colleagues in real-time.",
  openGraph: {
    images: [
      {
        url: "https://utfs.io/f/rPTSFWjsAVS8YEnjXIXKbQDzV6tPEgsULHOeNcJx95iouZvr"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SocketProvider>
          <AuthContextProvider>
            <TheProviders>
              <ThemeSwitch />
              <Toaster />
              {children}
            </TheProviders>
          </AuthContextProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
