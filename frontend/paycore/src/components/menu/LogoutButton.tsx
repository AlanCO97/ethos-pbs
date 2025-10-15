"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/actions/utils";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-3 px-4 py-3 mt-6 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200"
    >
      <LogOut size={18} />
      <span className="text-sm font-medium">
        {isPending ? "SigninOut..." : "SignOut"}
      </span>
    </button>
  );
}