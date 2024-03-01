'use client'
//import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider'
import UserThreeLight from '~icons/ph/users-three';
import UserRoleSetting from '~icons/clarity/administrator-line'
import HomeOutline from '~icons/ant-design/home-outlined'
import { SideDrawer, SideButton } from "@/components/custom/SideDrawer";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  return (
    <html lang="en">
      <body className={`${inter.className} flex bg-secondary h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <SideButton isOpen={isOpen} text="Home" onClick={() => router.push('/')}>
              <HomeOutline />
            </SideButton>
            <SideButton isOpen={isOpen} text="User" onClick={() => router.push('/users')}>
              <UserThreeLight />
            </SideButton>
            <SideButton isOpen={isOpen} text="Role" onClick={() => router.push('/roles')}>
              <UserRoleSetting />
            </SideButton>
          </SideDrawer>
          <div className="flex-1 m-2 bg-background rounded-md overflow-hidden shadow-md">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
