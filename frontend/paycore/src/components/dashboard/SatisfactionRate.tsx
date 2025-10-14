"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SatisfactionRate() {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">
          Satisfaction Rate
        </CardTitle>
        <p className="text-xs text-gray-500">From all projects</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-700/50"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray="351.86"
              strokeDashoffset="35.186"
              className="text-blue-500"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm text-gray-400">0%</div>
              <div className="text-3xl font-bold text-white">95%</div>
              <div className="text-sm text-gray-400">100%</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400">Based on likes</p>
      </CardContent>
    </Card>
  );
}