"use client";

import { getUserFullName } from "@/actions/utils";
import { ActiveUsers } from "@/components/dashboard/ActiveUsers";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { OrdersOverview } from "@/components/dashboard/OrdersOverview";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { ReferralTracking } from "@/components/dashboard/ReferralTracking";
import { SalesOverview } from "@/components/dashboard/SalesOverview";
import { SatisfactionRate } from "@/components/dashboard/SatisfactionRate";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { TopBar } from "@/components/layout/TopBar";
import { SideMenu } from "@/components/menu/SideMenu";
import { useState, useEffect, startTransition } from "react";

export default function DashboardPage() {
  const [fullname, setFullname] = useState<string>("User");

  useEffect(() => {
    const stored = localStorage.getItem("fullname");
    if (stored) {
      setFullname(stored);
    } else {
      // Si no está en cache, pide al servidor
      startTransition(async () => {
        const name = await getUserFullName();
        if (name) {
          setFullname(name);
          localStorage.setItem("fullname", name);
        }
      });
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1535] to-[#1a1f3a]">
      <SideMenu />

      <main className="flex-1 overflow-auto">
        <TopBar />

        <div className="p-8">
          <DashboardHeader />
          
          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <WelcomeCard fullname={fullname} />
            <SatisfactionRate />
            <ReferralTracking />
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SalesOverview />
            <ActiveUsers />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProjectsTable />
            </div>

            <div className="lg:col-span-1">
              <OrdersOverview />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}