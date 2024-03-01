'use client'
import React from 'react'
import { Button } from '../ui/button';
import ArrowRightAltRoundedIcon from '~icons/material-symbols/arrow-right-alt-rounded';
import ModeToggle from './ModeToggle';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

interface SideDrawerProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  children?: React.ReactNode
}

interface SideButtonProps {
  isOpen: boolean,
  text: string,
  children?: React.ReactNode,
  onClick?: () => void
}

export function SideDrawer({ isOpen, setIsOpen, children }: SideDrawerProps) {

  let nav_width = isOpen ? 'w-auto' : 'w-[3.5em]';
  let arrow_direction = isOpen ? 'rotate-180' : '';

  return <div className={cn(nav_width, "h-screen shadow-lg relative flex gap-3 items-center flex-col p-2 transition-all duration-300")}>
    <ModeToggle className="w-full"/>
    {children}
    <Button
      size="icon"
      variant="outline"
      onClick={() => setIsOpen(!isOpen)}
      className="absolute right-0 translate-x-1/2 bottom-3 shadow-lg">
      <ArrowRightAltRoundedIcon className={cn(arrow_direction, "w-7 h-7")}/>
    </Button>
  </div>
}

export function SideButton({ isOpen, text, children, onClick }: SideButtonProps) {
  let width = isOpen ? 'justify-start w-full' : 'w-10 h-10 px-0 py-0';

  return <Button onClick={onClick} variant="outline" className={clsx("flex items-center gap-2 transition-all duration-300", width)}>
    {children}
    {isOpen ? <span>{text}</span> : ''}
  </Button>
}
