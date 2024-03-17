'use client'
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import TanstackQueryClientProvider from "@/lib/tanstack-queryclient-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <TanstackQueryClientProvider>
            <div className="w-full">
              {children}
            </div>
            <Toaster />
          </TanstackQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
