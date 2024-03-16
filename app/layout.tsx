'use client'
//import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { SideDrawer, SideButton, SideButtonLabel, SideButtonIcon } from "@/components/custom/side-drawer";
import { useRouter } from "next/navigation";
import TanstackQueryClientProvider from "@/lib/tanstack-queryclient-provider";
import { Toaster } from "@/components/ui/toaster";
import { Home, Users, UserCog, PenTool } from 'lucide-react';
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

interface RouteConfig {
  text: string,
  route: string,
  icon: React.ReactElement
}

const iconProps = {
  strokeWidth: "2px",
  size: "1.5em"
}

const routes: RouteConfig[] = [
  { text: "Home", route: '/', icon: <Home {...iconProps} /> },
  { text: "User", route: '/users', icon: <Users {...iconProps} /> },
  { text: "Role", route: '/roles', icon: <UserCog {...iconProps} /> },
  { text: "Editor", route: '/editor', icon: <PenTool {...iconProps} /> },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const current_path = usePathname();

  return (
    <html lang="en">
      <body className={`${inter.className} flex bg-primary-foreground h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <TanstackQueryClientProvider>
            <SideDrawer>
              {routes.map((route) => (
                <SideButton
                  key={route.text}
                  href={route.route}
                  isCurrent={current_path === route.route}
                >
                  <SideButtonIcon>{route.icon}</SideButtonIcon>
                  <SideButtonLabel>{route.text}</SideButtonLabel>
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
