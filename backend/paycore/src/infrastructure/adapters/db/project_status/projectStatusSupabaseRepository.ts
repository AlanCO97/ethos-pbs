import { SupabaseClient } from "@supabase/supabase-js";
import { ProjectStatusRepository } from "../../../../application/proyect_status/ports/ProjectStatusRepository";
import { ProyectStatus } from "../../../../domain/project_status/ProjectStatus";

export class ProjectStatusSupabaseRepository implements ProjectStatusRepository {
    constructor(private supabase: SupabaseClient) {}

    async getDefault(): Promise<ProyectStatus | null> {
        const { data, error } = await this.supabase
            .from('project_status')
            .select('*')
            .eq('name', 'pendiente')
            .is('deleted', null)
            .single();
        
        if (error) {
            if (error.code === 'PGRST116') return null;

            throw error;
        }

        return ProyectStatus.fromDatabase(data)
    }

    async getByID(id: number): Promise<ProyectStatus | null> {
        const { data, error } = await this.supabase
            .from('project_status')
            .select('*')
            .eq('id', id)
            .is('deleted', null)
            .single();
        
        if (error) {
            if (error.code === 'PGRST116') return null;

            throw error;
        }

        return ProyectStatus.fromDatabase(data)
    }
}