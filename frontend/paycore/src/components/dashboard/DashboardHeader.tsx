"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Bienvenido de nuevo, Mark Johnson 👋
        </p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        <PlusCircle className="mr-2 h-4 w-4" /> Nuevo proyecto
      </Button>
    </div>
  );
}