'use client'
import React from "react";
import RawMdiAlarmOff from '~icons/mdi/alarm-off';
import UserThreeLight from '~icons/ph/users-three';
import { SideDrawer, SideButton } from "@/components/custom/SideDrawer";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);

  return <div className="w-100 h-screen flex">
    <SideDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
      <SideButton isOpen={isOpen} text="Alarm Off">
        <RawMdiAlarmOff />
      </SideButton>
      <SideButton isOpen={isOpen} text="User">
        <UserThreeLight />
      </SideButton>
    </SideDrawer>
  </div>
}
