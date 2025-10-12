import { ProjectStatus } from "../../../domain/project_status/ProjectStatus";

export interface ProjectStatusRepository {
    getDefault(): Promise<ProjectStatus | null>
    getByID(id: number): Promise<ProjectStatus | null>
}