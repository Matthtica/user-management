'use client'
import React from 'react'
import { FC } from 'react';
import { Button } from '../ui/button';
import ArrowRightAltRoundedIcon from '~icons/material-symbols/arrow-right-alt-rounded';
import ModeToggle from './mode-toggle';
import { cn } from '@/lib/utils';
import clsx from 'clsx';

interface SideDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
const SideDrawer: FC<SideDrawerProps> = ({ isOpen, setIsOpen, children }) => {

  let nav_width = isOpen ? 'w-32' : 'w-[3.5em]';
  let arrow_direction = isOpen ? 'rotate-180' : '';

  return <div className={cn("z-30 bg-background shadow-md relative flex gap-3 items-center flex-col p-2 rounded-md m-2 mr-0 transition-all duration-300", nav_width)}>
    <ModeToggle className="w-full"/>
    {children}
    <Button
      size="icon"
      variant="outline"
      onClick={() => setIsOpen(!isOpen)}
      className="absolute -right-1 translate-x-1/2 bottom-3 shadow-lg">
      <ArrowRightAltRoundedIcon className={cn("w-7 h-7 transition-all duration-300", arrow_direction)}/>
    </Button>
  </div>
}

interface SideButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isOpen: boolean,
  text: string,
}
const SideButton: FC<SideButtonProps> = ({ isOpen, text, children, className, onClick, ...props }) => {
  return <Button onClick={onClick} variant="outline" {...props}
    className={clsx("flex items-center gap-2 transition-all duration-300 justify-center h-10 w-10 px-0 py-0", {"justify-start w-full px-2 py-2": isOpen}, className)}>
    {children}
    {isOpen ? <span className="display-none">{text}</span> : ''}
  </Button>
}

export {
  SideDrawer,
  SideButton
}
