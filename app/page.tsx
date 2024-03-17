'use client'
import ModeToggle from "@/components/custom/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
            <Link href="/auth/login" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <LogInIcon {...iconProps} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
    <div className="h-[88em] flex flex-col items-center gap-2">
      <h1 className="text-8xl font-bold glow-text mt-28">
        Pico SBS
      </h1>
      <h2 className="text-xl">The most feature complete ERP solution, and it&apos;s cheap!!!</h2>
      <div className="flex gap-3 mt-5">
        <Button asChild>
          <Link href="/auth/signup">Sign up</Link>
        </Button>
        <Button variant="outline">Getting started</Button>
      </div>
    </div>
  </div>
}
