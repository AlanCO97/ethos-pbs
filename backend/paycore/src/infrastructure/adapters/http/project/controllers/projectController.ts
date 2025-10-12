import { ResponseBuilder } from "../../../../../application/common/dtos/responses/ApiResponse";
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
}