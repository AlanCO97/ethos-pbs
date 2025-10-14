"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MoreVertical } from "lucide-react";

const orders = [
  {
    id: "$2400",
    title: "Design changes",
    code: "27.DEC.7:20PM",
    color: "bg-green-500",
  },
  {
    id: "New order",
    title: "#1478423",
    code: "27.DEC.9:31PM",
    color: "bg-red-500",
  },
  {
    id: "Server Payments",
    title: "for April",
    code: "21.DEC.9:28PM",
    color: "bg-yellow-500",
  },
  {
    id: "New card added",
    title: "for order #3210145",
    code: "20.DEC.3:52PM",
    color: "bg-purple-500",
  },
  {
    id: "Unlock packages",
    title: "for Development",
    code: "19.DEC.11:35PM",
    color: "bg-orange-500",
  },
  {
    id: "New order",
    title: "#9851258",
    code: "18.DEC.4:41PM",
    color: "bg-pink-500",
  },
];

export function OrdersOverview() {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-white mb-1">
              Orders overview
            </CardTitle>
            <div className="flex items-center text-sm text-gray-400">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="text-green-400" size={16} />
                +30%
              </span>
              <span className="ml-1">this month</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400">
            <MoreVertical size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div
                className={`w-2 h-2 rounded-full ${order.color} mt-2 flex-shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-white font-semibold text-sm">
                    {order.id}
                  </span>
                  <span className="text-gray-400 text-sm">{order.title}</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">{order.code}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}