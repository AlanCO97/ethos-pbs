"use client";

import { LayoutDashboard, Table, FileText, Edit3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const routes = [
  {
    label: "Dashboard",
    route: "/",
    icon: <LayoutDashboard size={18} />
  },
  {
    label: "Tables",
    route: "/tables",
    icon: <Table size={18} />
  },
  {
    label: "Billing",
    route: "/billing",
    icon: <FileText size={18} />
  },
  {
    label: "RTL",
    route: "/rtl",
    icon: <Edit3 size={18} />
  },
];

export function SideMenu() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-[#0f1535]/80 to-[#0a0e27]/80 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col">

      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">P</span>
        </div>
        <span className="text-white font-semibold text-lg">PAYCORE</span>
      </div>


      <nav className="flex-1 space-y-1">
        {routes.map((item) => (
          <MenuItem
            key={item.route}
            icon={item.icon}
            label={item.label}
            route={item.route}
            active={pathname === item.route}
          />
        ))}
      </nav>

    </aside>
  );
}

function MenuItem({
  icon,
  label,
  route,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  route: string;
  active: boolean;
}) {
  return (
    <Link
      href={route}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        active
          ? "bg-white text-gray-900 shadow-lg shadow-white/20"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}