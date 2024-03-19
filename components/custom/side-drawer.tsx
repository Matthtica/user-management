import React from 'react'
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import Link from 'next/link';

interface SideDrawerProps extends React.HTMLAttributes<HTMLDivElement> { }
function SideDrawer({ children }: SideDrawerProps) {
  return <div className={cn("z-30 bg-background shadow-md w-14 transition-all",
    "duration-300 flex flex-col p-2 rounded-md m-2 mr-0 side-drawer",
    "justify-between")}>
    {children}
  </div>
}

interface SideButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  href: string,
  isCurrent: boolean;
}
function SideButton({ href, isCurrent, children, className }: SideButtonProps) {
  return <Link
    href={href}
    className={clsx("flex items-center gap-2 side-button justify-center w-full px-2 py-2 h-10 border border-input rounded-md",
      { "bg-primary text-primary-foreground": isCurrent }, className)} >
    {children}
  </Link>
}

interface SideButtonLabelProps extends React.HTMLAttributes<HTMLSpanElement> { }
function SideButtonLabel({ children, className, ...props }: SideButtonLabelProps) {
  return <span className={clsx("side-text", className)}{...props}>{children}</span>
}

interface SideButtonIconProps extends React.HTMLAttributes<HTMLDivElement> { }
function SideButtonIcon({ children, className, ...props }: SideButtonIconProps) {
  return <div className={clsx("transition-all duration-300", className)} {...props}>{children}</div>
}

export {
  SideDrawer,
  SideButton,
  SideButtonLabel,
  SideButtonIcon
}
