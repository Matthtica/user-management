'use client'
//import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import UserThreeLight from '~icons/ph/users-three';
import UserRoleSetting from '~icons/clarity/administrator-line';
import HomeOutline from '~icons/ant-design/home-outlined';
import TextEditorNavIcon from '~icons/gala/editor';
import { SideDrawer, SideButton } from "@/components/custom/side-drawer";
import { useRouter } from "next/navigation";
import TanstackQueryClientProvider from "@/lib/tanstack-queryclient-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

interface RouteConfig {
  text: string,
  route: string,
  icon: React.ReactElement
}

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

  const routes: RouteConfig[] = [
    { text: "Home", route: '/', icon: <HomeOutline /> },
    { text: "User", route: '/users', icon: <UserThreeLight /> },
    { text: "Role", route: '/roles', icon: <UserRoleSetting /> },
    { text: "Editor", route: '/editor', icon: <TextEditorNavIcon /> },
  ];

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
              {routes.map((route) => (
                <SideButton
                  key={route.text}
                  isOpen={isOpen}
                  isCurrent={currentRoute === route.route}
                  text={route.text}
                  onClick={() => changeRoute(route.route)}
                >
                  {route.icon}
                </SideButton>
              ))}
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
