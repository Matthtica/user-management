'use client'
import React from "react";
import {
  SideDrawer,
  SideButton,
  SideButtonLabel,
  SideButtonIcon,
} from "@/components/custom/side-drawer";
import {
  UsersIcon,
  UserCogIcon,
  PenToolIcon,
  LayoutDashboardIcon,
  DotIcon,
} from 'lucide-react';
import { usePathname } from "next/navigation";
import ModeToggle from "@/components/custom/mode-toggle";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

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
  { text: "Dashboard", route: '/workspace/dashboard', icon: <LayoutDashboardIcon {...iconProps} /> },
  { text: "User", route: '/workspace/users', icon: <UsersIcon {...iconProps} /> },
  { text: "Role", route: '/workspace/roles', icon: <UserCogIcon {...iconProps} /> },
  { text: "Editor", route: '/workspace/editor', icon: <PenToolIcon {...iconProps} /> },
];

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const current_path = usePathname();

  return <div className="flex h-full bg-secondary">
    <SideDrawer>
      <div className="flex flex-col gap-3">
        <ModeToggle variant="outline" className="w-full h-10" />
        <div className="border-b w-5/6 mx-auto"></div>
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
      </div>
      <div className="w-full flex item-center justify-center p-1">
        <UserButton appearance={{
          elements: {
            card: "bg-background border border-input text-primary",
            headerTitle: "text-primary",
            userButtonPopoverActionButtonText: "text-primary",
            userButtonPopoverActionButtonIcon: "text-primary",
            userPreviewSecondaryIdentifier: "text-primary/60",
          }
        }}>
          <UserProfile appearance={{
            elements: {
              navbarButton: "bg-cyan-500",
              card: "bg-background border border-input text-primary",
              headerTitle: "text-primary",
              userButtonPopoverActionButtonText: "text-primary",
              userButtonPopoverActionButtonIcon: "text-primary",
              userPreviewSecondaryIdentifier: "text-primary/60",
            }
          }} />
        </UserButton>
      </div>
    </SideDrawer>
    <div className="flex-1 m-2 bg-background rounded-md shadow-md flex flex-col">
      {children}
    </div>
  </div>
}
