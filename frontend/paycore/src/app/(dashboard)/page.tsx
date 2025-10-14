import { getAllProjects } from "@/actions/projects";
import { getUserFullName } from "@/actions/utils";
import { DashboardWrapper } from "@/components/dashboard/DashboardWrapper";
import { Project } from "@/lib/schemas/project";


export default async function DashboardPage() {
  const fullname = await getUserFullName();

  const projectsResponse = await getAllProjects();

  const projects: Project[] = projectsResponse.success ? projectsResponse.data ?? [] : [];

  return <DashboardWrapper initialFullname={fullname ?? "User"} projects={projects} />
}