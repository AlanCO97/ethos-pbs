import { ResponseBuilder } from "../../../../../application/common/dtos/responses/ApiResponse";
import { PaginationParams } from "../../../../../application/common/ports/Pagination";
import { CreateRequestDTO } from "../../../../../application/project/dtos/requests/CreateRequestDTO";
import { ProjectResponse } from "../../../../../application/project/dtos/responses/ProjectResponse";
import { ProjectService } from "../../../../../application/project/services/projectService";

export class ProjectController {
    constructor(private projectService: ProjectService) {}

    async create(body: CreateRequestDTO) {
        const project = await this.projectService.create(body);
        const projectResponse: ProjectResponse = {
           ...project.toPublicResponse(),
            status: project.status.name,
        }

        return ResponseBuilder.success(projectResponse, "Proyecto creado con exito")
    }

    async getAll({ query }: { query: any }) {
        const pagination: PaginationParams = {
            page: Math.max(1, parseInt(query.page) || 1),
            limit: Math.min(50, Math.max(1, parseInt(query.limit) || 10))
        };

        const result = await this.projectService.getAll(pagination);

        const data: ProjectResponse[] = result.data.map(project => ({
        ...project.toPublicResponse(),
        status: project.status.name,
        }));

        return ResponseBuilder.paginated(
            data,
            result.pagination,
            'Proyectos obtenidos con exito'
        );
    }
}