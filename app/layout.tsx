'use client'
//import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider'
import UserThreeLight from '~icons/ph/users-three';
import UserRoleSetting from '~icons/clarity/administrator-line'
import HomeOutline from '~icons/ant-design/home-outlined'
import { SideDrawer, SideButton } from "@/components/custom/side-drawer";
import { useRouter } from "next/navigation";
import TanstackQueryClientProvider from "@/lib/tanstack-queryclient-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = React.useState('/');

  const changeRoute = (route: string) => {
    setCurrentRoute(route);
    router.push(route);
  }

  return (
    <html lang="en">
      <body className={`${inter.className} flex bg-primary-foreground h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <TanstackQueryClientProvider>
            <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <SideButton
                isOpen={isOpen}
                isCurrent={currentRoute === '/'}
                text="Home"
                onClick={() => changeRoute('/')}>
                <HomeOutline />
              </SideButton>
              <SideButton
                isOpen={isOpen}
                isCurrent={currentRoute === '/users'}
                text="User"
                onClick={() => changeRoute('/users')}>
                <UserThreeLight />
              </SideButton>
              <SideButton
                isOpen={isOpen}
                isCurrent={currentRoute === '/roles'}
                text="Role"
                onClick={() => changeRoute('/roles')}>
                <UserRoleSetting />
              </SideButton>
            </SideDrawer>
            <div className="flex-1 m-2 bg-background rounded-md shadow-md flex flex-col">
              {children}
            </div>
            <Toaster />
          </TanstackQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
