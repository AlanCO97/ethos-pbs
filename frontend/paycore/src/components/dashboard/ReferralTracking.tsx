"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReferralTracking() {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">
          Referral Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Invited</span>
              <span className="text-white font-semibold">145 people</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Bonus</span>
              <span className="text-white font-semibold">1,465</span>
            </div>
          </div>
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="w-full h-24 flex items-end justify-center gap-1">
                  <div className="w-3 h-16 bg-gradient-to-t from-green-500 to-green-400 rounded-t"></div>
                  <div className="w-3 h-20 bg-gradient-to-t from-green-500 to-green-400 rounded-t"></div>
                  <div className="w-3 h-12 bg-gradient-to-t from-green-500 to-green-400 rounded-t"></div>
                  <div className="w-3 h-20 bg-gradient-to-t from-green-500 to-green-400 rounded-t"></div>
                  <div className="w-3 h-18 bg-gradient-to-t from-green-500 to-green-400 rounded-t"></div>
                  <div className="w-3 h-24 bg-gradient-to-t from-green-500 to-green-400 rounded-t"></div>
                  <div className="w-3 h-20 bg-gradient-to-t from-green-500 to-green-400 rounded-t"></div>
                </div>
              </div>
              <div className="ml-6">
                <div className="text-xs text-gray-400 mb-1">Safety</div>
                <div className="text-3xl font-bold text-green-400">9.3</div>
                <div className="text-xs text-gray-400">Total Score</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}