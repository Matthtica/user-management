import React from 'react'
import { Button } from '../ui/button';
import ModeToggle from './mode-toggle';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

interface SideDrawerProps extends React.HTMLAttributes<HTMLDivElement> {}
function SideDrawer({ children }: SideDrawerProps) {
  return <div className={cn("z-30 bg-background shadow-md w-14 relative transition-all",
    "duration-300 grid grid-cols-1 auto-rows-min gap-3 p-2 rounded-md m-2 mr-0 side-drawer",
    "overflow-y-scroll overflow-x-hidden")}>
    <ModeToggle className="w-full h-10"/>
    <div className="border-b w-5/6 mx-auto"></div>
    {children}
  </div>
}

interface SideButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isCurrent: boolean;
}
function SideButton({ isCurrent, children, className, onClick, ...props }: SideButtonProps) {
  return <Button onClick={onClick} variant={isCurrent ? 'default' : 'outline'} {...props}
    className={clsx("flex items-center gap-2 side-button justify-center w-full px-2 py-2 h-10", className)}>
    {children}
  </Button>
}

interface SideButtonLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}
function SideButtonLabel({ children, className, ...props }: SideButtonLabelProps) {
  return <span className={clsx("side-text", className)}{...props}>{children}</span>
}

interface SideButtonIconProps extends React.HTMLAttributes<HTMLDivElement> {}
function SideButtonIcon({ children, className, ...props }: SideButtonIconProps) {
  return <div className={clsx("transition-all duration-300", className)} {...props}>{children}</div>
}

export {
  SideDrawer,
  SideButton,
  SideButtonLabel,
  SideButtonIcon
}
