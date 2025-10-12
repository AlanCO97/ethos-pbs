import { SupabaseClient } from "@supabase/supabase-js";
import { UserRepository } from "../../../application/ports/UserRepository";
import { User } from "../../../domain/user/User";
import { PaginationParams, PaginatedResult } from "../../../application/ports/common";
import { AppError } from "../http/middlewares/errorHandler";

export class UserSupabaseRepository implements UserRepository {
    constructor(private supabase: SupabaseClient) {}

    async getAll(pagination?: PaginationParams): Promise<PaginatedResult<User>> {
        const page = Math.max(1, pagination?.page || 1);
        const limit = Math.min(100, Math.max(1, pagination?.limit || 10));
        
        try {
            const { count, error: countError } = await this.supabase
                .from('users')
                .select('id', { count: 'exact', head: true })
                .is('deleted', null);
            
            if (countError) {
                console.error('Count error:', countError);
                throw new AppError('Fallo al hacer el conteo de usuarios', 'COUNT_ERROR', 500);
            }
            
            const totalItems = count || 0;
            const totalPages = Math.ceil(totalItems / limit);
            
            if (totalItems === 0 || page > totalPages) {
                console.log('Retornar vacio - pagina fuera de rango');
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
            
            const { data, error } = await this.supabase
                .from('users')
                .select('*')
                .is('deleted', null)
                .order('created_at', { ascending: false })
                .range(offset, offset + limit - 1);
            
            if (error) {
                console.error('Data fetch error:', error);
                throw new AppError('Fallo al obtener los usuarios', 'FETCH_ERROR', 500);
            }
            
            
            return {
                data: (data || []).map(row => User.fromDatabase(row)),
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
            
            if (error instanceof AppError) {
                throw error;
            }
            
            throw new AppError(
                'Error inesperado',
                'REPOSITORY_ERROR',
                500
            );
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .is('deleted', null)
            .single();
        
        if (error) {
            if (error.code === 'PGRST116') return null;

            throw error;
        }

        return User.fromDatabase(data)
    }

    async create(user: User): Promise<User> {
        const { data, error } = await this.supabase
            .from('users')
            .insert([{
                name: user.name,
                paternal_surname: user.paternalSurname,
                maternal_surname: user.maternalSurname,
                email: user.email,
                hashed_password: user.hashedPassword,
                created_at: user.createdAt,
                updated_at: user.updatedAt,
                deleted: user.deleted,
            }])
            .select()
            .single()
        
        if (error) throw error
        return User.fromDatabase(data)
    }
}