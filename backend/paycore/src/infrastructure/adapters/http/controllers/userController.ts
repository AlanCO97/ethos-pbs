import { SignInRequestDTO } from "../../../../application/dtos/requests/SignInRequestDTO";
import { SignUpRequestDTO } from "../../../../application/dtos/requests/SignUpRequestDTO";
import { ResponseBuilder } from "../../../../application/dtos/responses/ApiResponse";
import { AuthResponseData, UserResponseData } from "../../../../application/dtos/responses/UserResponse";
import { PaginationParams } from "../../../../application/ports/common";
import { UserService } from "../../../../application/services/UserService";

export class UserController {
    constructor(private userService: UserService) {}

    async getAllUsers({ query }: { query: any }) {
        const pagination: PaginationParams = {
            page: Math.max(1, parseInt(query.page) || 1),
            limit: Math.min(50, Math.max(1, parseInt(query.limit) || 10))
        };
        
        const result = await this.userService.getAllUsers(pagination);
        
        return ResponseBuilder.paginated(
            result.data.map(user => user.toPublicResponse()),
            result.pagination,
            'Usuarios obtenidos con exito'
        );
    }

    async signup(body: SignUpRequestDTO) {
        const user = await this.userService.signup(body)
        
        const userData: UserResponseData = {
            id: user.id,
            name: user.name,
            email: user.email,
            fullName: user.fullName,
        }
        
        return ResponseBuilder.success(userData, "Usuario creado con exito")
    }

    async signin(body: SignInRequestDTO, jwtHelper: any): Promise<any> {
        // Validar credenciales
        const user = await this.userService.signin(body);
        
        // Generar JWT con el helper de Elysia
        const token = await jwtHelper.sign({
            sub: user.id,
            email: user.email,
            name: user.name,
            fullName: user.fullName
        });

        // Construir respuesta
        const authData: AuthResponseData = {
            user: user.toPublicResponse(),
            token
        };

        return ResponseBuilder.success(authData, 'Login exitoso');
    }
}