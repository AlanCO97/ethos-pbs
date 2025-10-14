"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MoreVertical } from "lucide-react";
import { useMemo } from "react";

export function SalesOverview() {
  const salesData = useMemo(
    () => [
      { month: "Jan", sales: 300, users: 200 },
      { month: "Feb", sales: 250, users: 350 },
      { month: "Mar", sales: 400, users: 300 },
      { month: "Apr", sales: 350, users: 450 },
      { month: "May", sales: 470, users: 400 },
      { month: "Jun", sales: 380, users: 480 },
      { month: "Jul", sales: 420, users: 600 },
      { month: "Aug", sales: 360, users: 550 },
      { month: "Sep", sales: 450, users: 500 },
      { month: "Oct", sales: 500, users: 650 },
      { month: "Nov", sales: 480, users: 700 },
      { month: "Dec", sales: 550, users: 750 },
    ],
    []
  );

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-white mb-1">
              Sales overview
            </CardTitle>
            <p className="text-sm text-green-400">(+5) more in 2021</p>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <MoreVertical size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="salesGradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="salesGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.2}
            />
            <XAxis dataKey="month" stroke="#64748b" tick={{ fill: "#94a3b8" }} />
            <YAxis stroke="#64748b" tick={{ fill: "#94a3b8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "white"
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#salesGradient1)"
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#salesGradient2)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}