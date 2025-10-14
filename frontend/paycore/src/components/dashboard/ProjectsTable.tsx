"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MoreVertical } from "lucide-react";
import { Project } from "@/lib/schemas/project";

type ProjectsTable = {
  projects: Project[]
}

type ProjectsHybrid = {
  name: string;
  members: string[],
  status: string,
  completion: number
}

export function ProjectsTable({ projects }: ProjectsTable) {

  const projectsHybrid: ProjectsHybrid[] = projects.map(p => {
    return {
      name: p.name,
      members: ["👤", "👤", "👤"],
      status: p.status,
      completion: 100

    }
  })
  
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-white mb-1">
              Projects
            </CardTitle>
            <div className="flex items-center text-sm text-gray-400">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="text-green-400" size={16} />
                {projectsHybrid.length}
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase">
                <th className="pb-3 font-medium">Project</th>
                <th className="pb-3 font-medium">Members</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Completion</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {projectsHybrid.map((project, idx) => (
                <tr key={idx} className="border-t border-white/5">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                        {project.name[0]}
                      </div>
                      <span className="text-white text-sm">{project.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex -space-x-2">
                      {project.members.map((member, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-[#0a0e27] flex items-center justify-center text-xs"
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 text-white">{project.status}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-1 max-w-[80px]">
                        <div
                          className="bg-blue-500 h-1 rounded-full"
                          style={{ width: `${project.completion}%` }}
                        />
                      </div>
                      <span className="text-white text-xs">
                        {project.completion}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}