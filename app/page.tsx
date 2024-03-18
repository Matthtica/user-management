'use client'
import LinkButton from "@/components/custom/link-button";
import ModeToggle from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserButton } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import Link from "next/link";

const iconProps = {
  size: "1.5em",
  strokeWidth: "2px"
}

export default function Home() {
  return <div className="h-screen">
    <div className="w-screen p-2 flex justify-end bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <ModeToggle variant="ghost" />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/sign-in" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <LogInIcon {...iconProps} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <UserButton />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    <div className="h-[88em] flex flex-col items-center gap-2">
      <h1 className="text-8xl font-bold glow-text mt-28 uppercase">
        silver
      </h1>
      <h2 className="text-xl">The most feature complete ERP solution, and it&apos;s cheap!!!</h2>
      <div className="flex gap-3 mt-5">
        <LinkButton href="/sign-up">Sign up</LinkButton>
        <LinkButton href="/workspace/roles" variant="outline">Getting started</LinkButton>
      </div>
    </div>
  </div>
}
