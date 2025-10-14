"use client";
import { TopBar } from "@/components/layout/TopBar";
import { SideMenu } from "@/components/menu/SideMenu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Legend,
  Bar,
  BarChart,
  LineChart,
  ScatterChart,
  Scatter,
} from "recharts";

export default function BillingPage() {
  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 14000 },
    { month: "Apr", revenue: 17000 },
    { month: "May", revenue: 16000 },
    { month: "Jun", revenue: 18000 },
  ];

  const expensesData = [
    { category: "Marketing", amount: 4000 },
    { category: "Salaries", amount: 7000 },
    { category: "Operations", amount: 3000 },
    { category: "R&D", amount: 2000 },
  ];

  const scatterData = [
    { x: 5, y: 10 },
    { x: 10, y: 15 },
    { x: 15, y: 12 },
    { x: 20, y: 25 },
    { x: 25, y: 20 },
  ];

  const revenueVsExpenses = [
    { month: "Jan", revenue: 12000, expenses: 8000 },
    { month: "Feb", revenue: 15000, expenses: 9000 },
    { month: "Mar", revenue: 14000, expenses: 7000 },
    { month: "Apr", revenue: 17000, expenses: 10000 },
    { month: "May", revenue: 16000, expenses: 8500 },
    { month: "Jun", revenue: 18000, expenses: 9500 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1535] to-[#1a1f3a] text-white">
      <SideMenu />

      <main className="flex-1 overflow-auto p-8 space-y-8">
        <TopBar />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Card className="bg-[#1a1f3a] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Ingresos Mensuales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1f3a] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Gastos por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={expensesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="category" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1f3a] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Dispersión de Datos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" dataKey="x" stroke="#94a3b8" />
                  <YAxis type="number" dataKey="y" stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Scatter data={scatterData} fill="#10b981" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1f3a] border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Comparativa Ingresos vs Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueVsExpenses}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                  <Line type="monotone" dataKey="expenses" stroke="#f97316" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}