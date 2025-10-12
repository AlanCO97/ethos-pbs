import { ProyectStatus } from "../../../domain/project_status/ProjectStatus";

export interface ProjectStatusRepository {
    getDefault(): Promise<ProyectStatus | null>
    getByID(id: number): Promise<ProyectStatus | null>
}