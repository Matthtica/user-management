import Image from "next/image";
import RawMdiAlarmOff from '~icons/mdi/alarm-off';
import Cpp from '~icons/vscode-icons/file-type-cpp3';
import { SideDrawer } from "@/components/custom/SideDrawer";
import { Button } from '@/components/ui/button'

export default function Home() {
  return <div className="w-100 h-screen">
    <SideDrawer />
  </div>
}
