'use client'
import React from "react";
import { ThemeProvider } from '@/components/theme-provider';
import { SideDrawer, SideButton, SideButtonLabel, SideButtonIcon } from "@/components/custom/side-drawer";
import TanstackQueryClientProvider from "@/lib/tanstack-queryclient-provider";
import { Toaster } from "@/components/ui/toaster";
import { Home, Users, UserCog, PenTool } from 'lucide-react';
import { usePathname } from "next/navigation";

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
  { text: "User", route: '/workspace/users', icon: <Users {...iconProps} /> },
  { text: "Role", route: '/workspace/roles', icon: <UserCog {...iconProps} /> },
  { text: "Editor", route: '/workspace/editor', icon: <PenTool {...iconProps} /> },
];

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const current_path = usePathname();

  return <div className="flex h-full bg-secondary">
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
  </div>
}
