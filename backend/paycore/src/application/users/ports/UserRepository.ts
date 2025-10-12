// Interfaz

import { User } from "../../../domain/user/User";
import { PaginationParams, PaginatedResult } from "../../common/ports/Pagination";

export interface UserRepository {
    getAll(pagination?: PaginationParams): Promise<PaginatedResult<User>>;
    create(user: User): Promise<User>
    findByEmail(email: string): Promise<User | null>
}