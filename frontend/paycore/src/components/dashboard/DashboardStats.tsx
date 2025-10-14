"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  positive: boolean;
}

function StatCard({ title, value, icon, change, positive }: StatCardProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">
          {title}
        </CardTitle>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <p
          className={`text-xs flex items-center gap-1 ${
            positive ? "text-green-400" : "text-red-400"
          }`}
        >
          <span className="font-semibold">{change}</span>
          <span className="text-gray-400">desde la última semana</span>
        </p>
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Today's Money"
        value="$53,000"
        icon={<DollarSign className="text-green-400" size={20} />}
        change="+55%"
        positive={true}
      />
      <StatCard
        title="Today's Users"
        value="2,300"
        icon={<Users className="text-blue-400" size={20} />}
        change="+5%"
        positive={true}
      />
      <StatCard
        title="New Clients"
        value="+3,052"
        icon={<TrendingUp className="text-red-400" size={20} />}
        change="-14%"
        positive={false}
      />
      <StatCard
        title="Total Sales"
        value="$173,000"
        icon={<DollarSign className="text-purple-400" size={20} />}
        change="+8%"
        positive={true}
      />
    </div>
  );
}