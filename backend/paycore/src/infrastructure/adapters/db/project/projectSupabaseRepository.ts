import { SupabaseClient } from "@supabase/supabase-js";
import { ProjectRepository } from "../../../../application/project/ports/ProjectRepository";
import { Project } from "../../../../domain/project/Project";
import { PaginationParams, PaginatedResult } from "../../../../application/common/ports/Pagination";
import { ProjectStatus } from "../../../../domain/project_status/ProjectStatus";
import { AppError } from "../../http/common/middlewares/errorHandler";

export class ProjectSupabaseRepository implements ProjectRepository {
    constructor(private supabase: SupabaseClient) {}

    async create(project: Project): Promise<Project> {
        const { data } = await this.supabase.from('project').insert({
        name: project.name,
        status_id: project.status.id,
        created_at: project.createdAt,
        updated_at: project.updatedAt,
        deleted: project.deleted,
        }).select().single();

        return Project.fromDatabase(data, project.status)
    }

    async getAll(pagination?: PaginationParams): Promise<PaginatedResult<Project>> {
        const page = Math.max(1, pagination?.page || 1);
        const limit = Math.min(100, Math.max(1, pagination?.limit || 10));

        try {
            // contar proyectos activos (deleted IS NULL)
            const { count, error: countError } = await this.supabase
                .from('project')
                .select('id', { count: 'exact', head: true })
                .is('deleted', null);

            if (countError) {
                console.error('Count error:', countError);
                throw new AppError('Fallo al hacer el conteo de proyectos', 'COUNT_ERROR', 500);
            }

            const totalItems = count || 0;
            const totalPages = Math.ceil(totalItems / limit);

            if (totalItems === 0 || page > totalPages) {
                return {
                    data: [],
                    pagination: {
                        currentPage: page,
                        totalPages,
                        totalItems,
                        itemsPerPage: limit,
                        hasNext: false,
                        hasPrev: page > 1
                    }
                };
            }

            const offset = (page - 1) * limit;

            // traer proyectos con JOIN a status
            const { data, error } = await this.supabase
                .from('project')
                .select(`
                    *,
                    status:project_status(*)  
                `)
                .is('deleted', null)
                .order('created_at', { ascending: false })
                .range(offset, offset + limit - 1);

            if (error) {
                console.error('Data fetch error:', error);
                throw new AppError('Fallo al obtener los proyectos', 'FETCH_ERROR', 500);
            }

            return {
                data: (data || []).map(row => {
                    const status = ProjectStatus.fromDatabase(row.status);
                    return Project.fromDatabase(row, status);
                }),
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems,
                    itemsPerPage: limit,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            };

        } catch (error) {
            console.error('Repository error:', error);

            if (error instanceof AppError) throw error;

            throw new AppError('Error inesperado', 'REPOSITORY_ERROR', 500);
        }
    }
}