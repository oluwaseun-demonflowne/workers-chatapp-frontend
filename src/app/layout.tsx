import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/providers/Socket";
import { TheProviders } from "@/providers/Theme";
import ThemeSwitch from "@/providers/ThemeSwitch";
import { AuthContextProvider } from "@/providers/ClientAuth";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
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
              {children}
            </TheProviders>
            {/* <div className="flex bg-[#6b8a7a] justify-center items-center h-screen">
            {list}
            {chat}
          </div> */}
          </AuthContextProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
