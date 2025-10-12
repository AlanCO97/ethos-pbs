import { User } from "../../../domain/user/User";
import { AppError } from "../../../infrastructure/adapters/http/common/middlewares/errorHandler";
import { SignInRequestDTO } from "../dtos/requests/SignInRequestDTO";
import { SignUpRequestDTO } from "../dtos/requests/SignUpRequestDTO";
import { PaginationParams } from "../../common/ports/Pagination";
import { PasswordService } from "../ports/passwordService";
import { UserRepository } from "../ports/UserRepository";


export class UserService {
    constructor(
        private userRepo: UserRepository,
        private passwordService: PasswordService
    ) {}

    async getAllUsers(pagination?: PaginationParams) {
        return await this.userRepo.getAll(pagination);
    }

    async signup(dto: SignUpRequestDTO): Promise<User> {

        const existingUser = await this.userRepo.findByEmail(dto.email);

        if (existingUser) {
            throw new AppError(
                `Ya existen un usuario registrado con el correo ${dto.email}`,
                'USER_ALREADY_EXISTS',
                409
            );
            
        }

        const hashedPassword = await this.passwordService.hash(dto.password);

        const user = User.create(
            dto.name,
            dto.paternalSurname,
            dto.email,
            hashedPassword,
            dto.maternalSurname
        );

        return await this.userRepo.create(user);
    }

    async signin(dto: SignInRequestDTO): Promise<User> {
        // Buscar usuario por email
        const user = await this.userRepo.findByEmail(dto.email);

        if (!user) {
            throw new AppError(
                'Invalid email or password',
                'INVALID_CREDENTIALS',
                401
            );
        }

        // Verificar contraseña
        const isValidPassword = await this.passwordService.verify(dto.password, user.hashedPassword);;

        if (!isValidPassword) {
            throw new AppError(
                'Invalid email or password',
                'INVALID_CREDENTIALS',
                401
            );
        }

        return user;
    }
}