import { SupabaseClient } from "@supabase/supabase-js";
import { ProjectRepository } from "../../../../application/project/ports/ProjectRepository";
import { Project } from "../../../../domain/project/Project";

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
}