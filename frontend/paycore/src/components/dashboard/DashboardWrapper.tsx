"use client";

import { useState } from "react";
import { TopBar } from "../layout/TopBar";
import { SideMenu } from "../menu/SideMenu";
import { ActiveUsers } from "./ActiveUsers";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { OrdersOverview } from "./OrdersOverview";
import { ProjectsTable } from "./ProjectsTable";
import { ReferralTracking } from "./ReferralTracking";
import { SalesOverview } from "./SalesOverview";
import { SatisfactionRate } from "./SatisfactionRate";
import { WelcomeCard } from "./WelcomeCard";
import { Project } from "@/lib/schemas/project";

type DashboardWrapperProps = {
  initialFullname: string,
  projects: Project[],
}

export function DashboardWrapper({ initialFullname, projects }: DashboardWrapperProps) {
    const [ fullname ] = useState<string>(initialFullname);
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1535] to-[#1a1f3a]">
      <SideMenu />

      <main className="flex-1 overflow-auto">
        <TopBar />

        <div className="p-8">
          <DashboardHeader fullname={fullname} />

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
              <ProjectsTable projects={projects} />
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
