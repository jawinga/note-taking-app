"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotesProvider } from "./context/NotesContext";
import { TagsProvider } from "./context/TagsContext";
import MenuBar from "./components/layout/MenuBar";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideMenuBar =
    pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TagsProvider>
            <NotesProvider>
              {hideMenuBar ? (
                // Pages without MenuBar (auth pages)
                <>{children}</>
              ) : (
                // Pages with MenuBar
                <div className="flex h-screen">
                  <MenuBar />
                  <main className="flex-1 overflow-y-auto">{children}</main>
                </div>
              )}
            </NotesProvider>
          </TagsProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
