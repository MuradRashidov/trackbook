import { Menu } from "@/components/Menu";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div  className="h-screen flex">
        <div className="w-[14%] md:w-[8%] lg:w-[14] xl:w-[16%] p-4">
          <Link className="flex items-center justify-center gap-2 lg:justify-start" href="/">
              <Image src="/logo.png" alt="school management" width={32} height={32}/>
              <span className="hidden lg:block font-bold">TrackBook</span>
          </Link>
          <Menu/>
        </div>
        <div className="w-[86%] md:w-[92%] lg:w-[84] xl:w-[86%] h-auto bg-[#f7f8fa]  flex flex-col">
          <Navbar/>
          {children}
        </div>
    </div>
  );
};

export default DashboardLayout;