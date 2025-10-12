import { describe, beforeEach, mock, it, expect } from "bun:test";
import { PaginationParams, PaginatedResult } from "../../../../../application/common/ports/Pagination";
import { CreateRequestDTO } from "../../../../../application/project/dtos/requests/CreateRequestDTO";
import { ProjectRepository } from "../../../../../application/project/ports/ProjectRepository";
import { ProjectService } from "../../../../../application/project/services/projectService";
import { ProjectStatusRepository } from "../../../../../application/proyect_status/ports/ProjectStatusRepository";
import { Project } from "../../../../../domain/project/Project";
import { ProjectStatus } from "../../../../../domain/project_status/ProjectStatus";
import { AppError } from "../../../../../infrastructure/adapters/http/common/middlewares/errorHandler";

describe('ProjectService', () => {
    let projectService: ProjectService;
    let mockProjectRepo: ProjectRepository;
    let mockStatusRepo: ProjectStatusRepository;

    beforeEach(() => {
        mockProjectRepo = {
            create: mock((project: Project) => Promise.resolve(
                new Project(project.id, project.name, project.status, project.createdAt, project.updatedAt, project.deleted)
            )),
            getAll: mock((pagination?: PaginationParams): Promise<PaginatedResult<Project>> => {
                const status = new ProjectStatus('1', 'pendiente', new Date(), new Date());
                const data = [
                    new Project('1', 'Proyecto A', status, new Date(), new Date()),
                    new Project('2', 'Proyecto B', status, new Date(), new Date()),
                    new Project('3', 'Proyecto C', status, new Date(), new Date())
                ];
                return Promise.resolve({
                    data,
                    pagination: {
                        currentPage: pagination?.page || 1,
                        totalPages: 1,
                        totalItems: data.length,
                        itemsPerPage: pagination?.limit || 10,
                        hasNext: false,
                        hasPrev: false
                    }
                });
            })
        } as any;

        mockStatusRepo = {
            getDefault: mock(() => Promise.resolve(new ProjectStatus('1', 'pendiente', new Date(), new Date())))
        } as any;

        projectService = new ProjectService(mockProjectRepo, mockStatusRepo);
    });

    describe('create', () => {
        it('debe crear un proyecto con status por defecto', async () => {
            const dto: CreateRequestDTO = { name: 'Proyecto X' };

            const project = await projectService.create(dto);

            expect(project).toBeInstanceOf(Project);
            expect(project.name).toBe('Proyecto X');
            expect(project.status.name).toBe('pendiente');

            // Verificar que se llamó al repository correctamente
            expect(mockStatusRepo.getDefault).toHaveBeenCalled();
            expect(mockProjectRepo.create).toHaveBeenCalled();

            const createCall = (mockProjectRepo.create as any).mock.calls[0][0];
            expect(createCall.status.name).toBe('pendiente');
        });

        it('debe lanzar AppError si no hay status por defecto', async () => {
            (mockStatusRepo.getDefault as any).mockResolvedValue(null);
            const dto: CreateRequestDTO = { name: 'Proyecto X' };

            await expect(projectService.create(dto)).rejects.toThrow(AppError);
            try {
                await projectService.create(dto);
            } catch (error) {
                expect((error as AppError).message).toBe('No se encontró un estatus por defecto');
                expect((error as AppError).code).toBe('PROJECT_STATUS_DEFAULT_NOT_FOUND');
                expect((error as AppError).statusCode).toBe(500);
            }
        });
    });

    describe('getAll', () => {
        it('debe retornar un resultado paginado vacío', async () => {
            const emptyResult: PaginatedResult<Project> = {
                data: [],
                pagination: {
                    currentPage: 1,
                    totalPages: 0,
                    totalItems: 0,
                    itemsPerPage: 10,
                    hasNext: false,
                    hasPrev: false
                }
            };
            
            mockProjectRepo.getAll = mock(() => Promise.resolve(emptyResult))
            const result = await projectService.getAll({ page: 1, limit: 10 });

            expect(result.data).toEqual([]);
            expect(result.pagination.currentPage).toBe(1);
            expect(result.pagination.totalItems).toBe(0);

            expect(mockProjectRepo.getAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
        });

        it('debe llamar al repository con undefined si no se pasa paginación', async () => {
            await projectService.getAll();
            expect(mockProjectRepo.getAll).toHaveBeenCalledWith(undefined);
        });
    });

    it('debe retornar proyectos con paginación correcta', async () => {
        const result = await projectService.getAll({ page: 1, limit: 10 });

        expect(result.data.length).toBe(3);
        expect(result.data[0].name).toBe('Proyecto A');
        expect(result.data[1].name).toBe('Proyecto B');
        expect(result.data[2].status.name).toBe('pendiente');

        expect(result.pagination.currentPage).toBe(1);
        expect(result.pagination.totalItems).toBe(3);
        expect(result.pagination.itemsPerPage).toBe(10);

        // Verificar que se llamó al repository con los parámetros correctos
        expect(mockProjectRepo.getAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
});