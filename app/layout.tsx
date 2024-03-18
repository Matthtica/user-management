'use client'
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });


const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} flex h-screen`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
          >
            <QueryClientProvider client={queryClient}>
              <div className="w-full">
                {children}
              </div>
              <Toaster />
            </QueryClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
