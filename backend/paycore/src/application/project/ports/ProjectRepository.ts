import { Project } from "../../../domain/project/Project";
import { PaginationParams, PaginatedResult } from "../../common/ports/Pagination";

export interface ProjectRepository {
    // getAll(pagination?: PaginationParams): Promise<PaginatedResult<Project>>;
    create(project: Project): Promise<Project>;
}