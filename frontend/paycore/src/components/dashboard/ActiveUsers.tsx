"use client";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  DollarSign,
  TrendingUp,
  FileText,
} from "lucide-react";
import { useMemo } from "react";

export function ActiveUsers() {
  const activeUsersData = useMemo(
    () => [
      { day: "Mon", value: 200 },
      { day: "Tue", value: 260 },
      { day: "Wed", value: 190 },
      { day: "Thu", value: 310 },
      { day: "Fri", value: 270 },
      { day: "Sat", value: 360 },
      { day: "Sun", value: 310 },
    ],
    []
  );

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activeUsersData}>
            <CartesianGrid
              strokeDasharray="5 5"
              stroke="#334155"
              opacity={0.4}
            />
            <XAxis dataKey="day" stroke="#64748b" tick={{ fill: "#94a3b8" }} />
            <YAxis stroke="#64748b" tick={{ fill: "#94a3b8" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "white"
              }}
            />
            <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4 mt-4 text-sm">
        <div>
          <div className="text-base font-semibold text-white mb-1">
            Active Users
          </div>
          <p className="text-sm text-green-400">(+23) than last week</p>
        </div>

        {/* Métricas en fila */}
        <div className="w-full flex justify-center flex-wrap items-center gap-6 mt-3">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-blue-400" />
            <span className="text-white font-semibold">32,984</span>
            <span className="text-gray-400">Users</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-green-400" />
            <span className="text-white font-semibold">2.42m</span>
            <span className="text-gray-400">Clicks</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-purple-400" />
            <span className="text-white font-semibold">2,400$</span>
            <span className="text-gray-400">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-orange-400" />
            <span className="text-white font-semibold">320</span>
            <span className="text-gray-400">Items</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}