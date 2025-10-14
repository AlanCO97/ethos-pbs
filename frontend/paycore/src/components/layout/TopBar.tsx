"use client";

import { Button } from "@/components/ui/button";
import { UserCircle, Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export function TopBar() {
  const pathname = usePathname().slice(1);

  function capitalizeFirstLetter(pathname: string): string {
      return String(pathname).charAt(0).toUpperCase() + String(pathname).slice(1);
  }
  
  return (
    <header className="bg-transparent backdrop-blur-sm border-b border-white/5 p-4 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <span className="text-gray-400 text-sm">Pages / {pathname === '' ? 'Dashboard' : capitalizeFirstLetter(pathname)}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Type here..."
            className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 w-64"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
        >
          <UserCircle size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
        >
          <Bell size={20} />
        </Button>
      </div>
    </header>
  );
}