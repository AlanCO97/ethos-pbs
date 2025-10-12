import { Project } from "../../../domain/project/Project";
import { AppError } from "../../../infrastructure/adapters/http/common/middlewares/errorHandler";
import { ProjectStatusRepository } from "../../proyect_status/ports/ProjectStatusRepository";
import { CreateRequestDTO } from "../dtos/requests/CreateRequestDTO";
import { ProjectRepository } from "../ports/ProjectRepository";

export class ProjectService {
    constructor(
        private projectRepo: ProjectRepository, 
        private statusRepo: ProjectStatusRepository
    ) {}

    async create(dto: CreateRequestDTO): Promise<Project> {
        const defaultStatus = await this.statusRepo.getDefault();
        if (!defaultStatus) {
        throw new AppError(
            'No se encontró un estatus por defecto',
            'PROJECT_STATUS_DEFAULT_NOT_FOUND',
            500
        );
        }


        const project = Project.create(dto.name, defaultStatus)
        
        return this.projectRepo.create(project)
    }
}