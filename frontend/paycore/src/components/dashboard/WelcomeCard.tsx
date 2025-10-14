"use client";

import { Card, CardContent } from "@/components/ui/card";

type WelcomeCardProps = {
  fullname: string;
};

export function WelcomeCard({ fullname }: WelcomeCardProps) {
  return (
    <Card className="bg-gradient-to-br from-blue-600/40 via-blue-700/30 to-purple-600/30 border-0 backdrop-blur-sm overflow-hidden relative">
      <CardContent className="p-6 flex flex-col items-start justify-between h-full relative z-10">
        <div className="absolute top-0 right-0 w-48 h-48 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-blue-300/40 to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 w-full">
          <div className="mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-500/30 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
              <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path
                  d="M20,50 Q30,30 50,50 T80,50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-blue-300"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="8"
                  fill="currentColor"
                  className="text-blue-400"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Welcome back,
            <br />
            {fullname}
          </h2>
          <p className="text-gray-300 text-sm mb-4">
            Glad to see you again!
            <br />
            Ask me anything.
          </p>
          <button className="text-blue-300 text-sm hover:text-blue-200 transition flex items-center gap-1">
            Tap to record →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}