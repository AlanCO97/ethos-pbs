import { getAllProjects } from "@/actions/projects";
import { TopBar } from "@/components/layout/TopBar";
import { SideMenu } from "@/components/menu/SideMenu";
import { DataTable } from "@/components/tables/DataTable";
import { CheckCircle2 } from "lucide-react";

export default async function Tables() {
  // Carga inicial
  const projectsData = await getAllProjects({ page: 1, limit: 10 });

  const tables = [
    {
      entity: "projects",
      title: "Proyectos",
      description: (
         <div className="flex items-center text-sm text-gray-400">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="text-green-400" size={16} />
              {projectsData.pagination?.totalItems || 0}
            </span>
            <span className="ml-1">this month</span>
          </div>
      ),
      apiEndpoint: "/api/tables",
      columns: [
        {
          header: "Nombre",
          accessor: "name",
          className: "font-medium",
        },
        {
          header: "Status",
          accessor: "status",
          render: "badge" as const,
        },
      ],
      initialData: projectsData,
      itemsPerPage: 10,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0f1535] to-[#1a1f3a]">
      <SideMenu />

      <main className="flex-1 overflow-auto">
        <TopBar />

        <div className="p-8 space-y-8">
          {tables.map((table) => (
            <DataTable
              key={table.entity}
              title={table.title}
              description={table.description}
              apiEndpoint={table.apiEndpoint}
              columns={table.columns}
              initialData={table.initialData}
              itemsPerPage={table.itemsPerPage}
            />
          ))}
        </div>
      </main>
    </div>
  );
}