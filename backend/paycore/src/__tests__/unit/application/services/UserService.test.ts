import { beforeAll, beforeEach, describe, expect, it, mock } from "bun:test";
import { SignUpRequestDTO } from "../../../../application/dtos/requests/SignUpRequestDTO";
import { UserRepository } from "../../../../application/ports/UserRepository";
import { UserService } from "../../../../application/services/UserService";
import { User } from "../../../../domain/user/User";
import { PaginatedResult } from "../../../../application/ports/common";
import { AppError } from "../../../../infrastructure/adapters/http/middlewares/errorHandler";
import { SignInRequestDTO } from "../../../../application/dtos/requests/SignInRequestDTO";
import { PasswordService } from "../../../../application/ports/passwordService";

describe('UserService', () => {
    let userService: UserService;
    let mockUserRepository: UserRepository;
    let mockPasswordService: PasswordService;

    beforeEach(async () => {
        // Creacion de un mock para el repository utilizando la interfaz UserRepository
        mockUserRepository = {
            findByEmail: mock(() => Promise.resolve(null)),
            create: mock((user: User) => Promise.resolve(new User(
                '123',
                user.name,
                user.paternalSurname,
                user.maternalSurname,
                user.email,
                'hashed-password',
                new Date(),
                new Date(),
                null
            ))),
            getAll: mock((): Promise<PaginatedResult<User>> => Promise.resolve({
                data: [],
                pagination: {
                    currentPage: 1,
                    totalPages: 0,
                    totalItems: 0,
                    itemsPerPage: 10,
                    hasNext: false,
                    hasPrev: false
                }
            })),
        };

        mockPasswordService = {
            hash: mock(() => Promise.resolve('hashed-password-123')),
            verify: mock(() => Promise.resolve(true))
        };

        userService = new UserService(mockUserRepository, mockPasswordService);
    });

    describe('signup', () => {
        it('Usuario creado con exito', async () => {
            const signUpData: SignUpRequestDTO = {
                name: 'Juan',
                paternalSurname: 'Pérez',
                maternalSurname: 'González',
                email: 'juan@example.com',
                password: 'password123'
            };

            const result = await userService.signup(signUpData);

            // Verificar el User
            expect(result).toBeInstanceOf(User);
            expect(result.email).toBe('juan@example.com');
            expect(result.name).toBe('Juan');
            expect(result.paternalSurname).toBe('Pérez');
            expect(result.id).toBe('123');

            // Verificar que nuestro service llamo a nuestro repository
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('juan@example.com');
            expect(mockUserRepository.create).toHaveBeenCalled();
            
            // Dame el primer argumento de la primera llamada que mi userService.signup() le hizo al método create() de mi userRepository
            const createCall = (mockUserRepository.create as any).mock.calls[0][0];
            expect(createCall).toBeInstanceOf(User);
            expect(createCall.password).not.toBe('password123'); // Debe estar hasheado
        });

        it('Debe lanzar AppError si el usuario ya existe', async () => {
            // Mock para que findByEmail devuelva un usuario existente
            const existingUser = new User(
                '456',
                'Existing',
                'User',
                null,
                'juan@example.com',
                'some-hashed-password',
                new Date(),
                new Date(),
                null
            );
            
            // Simular que me devuelve el usuario previamente creado
            mockUserRepository.findByEmail = mock(() => Promise.resolve(existingUser));

            const signUpData: SignUpRequestDTO = {
                name: 'Juan',
                paternalSurname: 'Pérez',
                maternalSurname: 'González',
                email: 'juan@example.com',
                password: 'password123'
            };

            // Verificar que lanza el AppError específico
            await expect(userService.signup(signUpData)).rejects.toThrow(AppError);
            
            // Verificar el mensaje y código específicos
            try {
                await userService.signup(signUpData);
            } catch (error) {
                expect(error).toBeInstanceOf(AppError);
                expect((error as AppError).message).toBe('Ya existen un usuario registrado con el correo juan@example.com');
                expect((error as AppError).code).toBe('USER_ALREADY_EXISTS');
                expect((error as AppError).statusCode).toBe(409);
            }

            // Verificar que se verificó el email
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('juan@example.com');
            // Verificar que no se llamo a la creacion del usuario
            expect(mockUserRepository.create).not.toHaveBeenCalled();
        });

        it('Debe hashear la contraseña antes de crear el usuario', async () => {
            const signUpData: SignUpRequestDTO = {
                name: 'Juan',
                paternalSurname: 'Pérez',
                maternalSurname: null,
                email: 'juan@example.com',
                password: 'password123'
            };

            await userService.signup(signUpData);

            // Obtiene el primer argumento de la primer llamada del create en el userService.signup
            const createCall = (mockUserRepository.create as any).mock.calls[0][0];
            // Se verifica que la contra no este en text plano
            expect(createCall.hashedPassword).not.toBe('password123');
            // Se verifica la longitud de la contrasena para ver que este hasheada
            expect(createCall.hashedPassword.length).toBeGreaterThan(15);
        });

        it('Debe crear usuario sin apellido materno', async () => {
            const signUpData: SignUpRequestDTO = {
                name: 'Juan',
                paternalSurname: 'Pérez',
                maternalSurname: null,
                email: 'juan@example.com',
                password: 'password123'
            };

            const result = await userService.signup(signUpData);
            
            // Verificar que le apellido materno del usuario se nulo
            expect(result.maternalSurname).toBeNull();
            // Verificar que se llamo al metodo de la creacion del usuario en el repository
            expect(mockUserRepository.create).toHaveBeenCalled();
        });
    });

    describe('signin', () => {
        it('Usuario autenticado con éxito', async () => {
            const existingUser = new User(
                '123',
                'Juan',
                'Pérez',
                null,
                'juan@example.com',
                'hashed-password-123',
                new Date(),
                new Date(),
                null
            );
            
            // Mock que me devuelve el usuario previamente creado
            mockUserRepository.findByEmail = mock(() => Promise.resolve(existingUser));
            // Mock: contraseña es válida
            mockPasswordService.verify = mock(() => Promise.resolve(true));

            const signInData: SignInRequestDTO = {
                email: 'juan@example.com',
                password: 'password123'
            };

            const result = await userService.signin(signInData);

            expect(result).toBeInstanceOf(User);
            expect(result.email).toBe('juan@example.com');
            expect(result.name).toBe('Juan');
            expect(result.paternalSurname).toBe('Pérez');
            expect(result.id).toBe('123');

            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('juan@example.com');
            expect(mockPasswordService.verify).toHaveBeenCalledWith('password123', 'hashed-password-123');
        });

        it('Debe lanzar AppError si el usuario no existe', async () => {
            // Mock: usuario no existe
            mockUserRepository.findByEmail = mock(() => Promise.resolve(null));

            const signInData: SignInRequestDTO = {
                email: 'noexiste@example.com',
                password: 'password123'
            };

            await expect(userService.signin(signInData)).rejects.toThrow(AppError);
            
            try {
                await userService.signin(signInData);
            } catch (error) {
                expect(error).toBeInstanceOf(AppError);
                expect((error as AppError).message).toBe('Invalid email or password');
                expect((error as AppError).code).toBe('INVALID_CREDENTIALS');
                expect((error as AppError).statusCode).toBe(401);
            }

            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('noexiste@example.com');
            // No debe verificar contraseña si no encuentra usuario
            expect(mockPasswordService.verify).not.toHaveBeenCalled();
        });

        it('Debe lanzar AppError si la contraseña es incorrecta', async () => {
            const existingUser = new User(
                '123',
                'Juan',
                'Pérez',
                null,
                'juan@example.com',
                'hashed-password-123',
                new Date(),
                new Date(),
                null
            );
            
            // Mock: usuario existe pero contraseña incorrecta
            mockUserRepository.findByEmail = mock(() => Promise.resolve(existingUser));
            mockPasswordService.verify = mock(() => Promise.resolve(false));

            const signInData: SignInRequestDTO = {
                email: 'juan@example.com',
                password: 'wrongpassword'
            };

            await expect(userService.signin(signInData)).rejects.toThrow(AppError);
            
            try {
                await userService.signin(signInData);
            } catch (error) {
                expect(error).toBeInstanceOf(AppError);
                expect((error as AppError).message).toBe('Invalid email or password');
                expect((error as AppError).code).toBe('INVALID_CREDENTIALS');
                expect((error as AppError).statusCode).toBe(401);
            }

            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('juan@example.com');
            expect(mockPasswordService.verify).toHaveBeenCalledWith('wrongpassword', 'hashed-password-123');
        });
    });

    describe('getAllUsers', () => {
    it('Debe retornar usuarios paginados', async () => {
        const mockUsers = [
            new User(
                '1',
                'User 1',
                'Surname 1',
                null,
                'user1@example.com',
                'hashed-password',
                new Date(),
                new Date(),
                null
            ),
            new User(
                '2',
                'User 2', 
                'Surname 2',
                null,
                'user2@example.com',
                'hashed-password',
                new Date(),
                new Date(),
                null
            )
        ];

        const paginatedResult: PaginatedResult<User> = {
            data: mockUsers,
            pagination: {
                currentPage: 1,
                totalPages: 1,
                totalItems: 2,
                itemsPerPage: 10,
                hasNext: false,
                hasPrev: false
            }
        };
        
        mockUserRepository.getAll = mock(() => Promise.resolve(paginatedResult));

        const result = await userService.getAllUsers({ page: 1, limit: 10 });

        expect(result).toEqual(paginatedResult);
        expect(result.data).toHaveLength(2);
        expect(result.data[0]).toBeInstanceOf(User);
        expect(result.data[0].email).toBe('user1@example.com');
        expect(result.pagination.totalItems).toBe(2);
        expect(result.pagination.currentPage).toBe(1);
        expect(result.pagination.hasNext).toBe(false);
        expect(result.pagination.hasPrev).toBe(false);

        expect(mockUserRepository.getAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });

    it('Debe de manejar resultados vacios', async () => {
        const emptyResult: PaginatedResult<User> = {
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
        
        mockUserRepository.getAll = mock(() => Promise.resolve(emptyResult));

        const result = await userService.getAllUsers({ page: 1, limit: 10 });

        expect(result.data).toHaveLength(0);
        expect(result.pagination.totalItems).toBe(0);
        expect(result.pagination.totalPages).toBe(0);
    });

    it('Debe manejar paginacion con multiples paginas', async () => {
        const mockUsers = [
            new User(
                '1',
                'User 1',
                'Surname 1',
                null,
                'user1@example.com',
                'hashed-password',
                new Date(),
                new Date(),
                null
            )
        ];

        const paginatedResult: PaginatedResult<User> = {
            data: mockUsers,
            pagination: {
                currentPage: 2,
                totalPages: 5,
                totalItems: 50,
                itemsPerPage: 10,
                hasNext: true,
                hasPrev: true
            }
        };
        
        mockUserRepository.getAll = mock(() => Promise.resolve(paginatedResult));

        const result = await userService.getAllUsers({ page: 2, limit: 10 });

        expect(result.pagination.currentPage).toBe(2);
        expect(result.pagination.totalPages).toBe(5);
        expect(result.pagination.hasNext).toBe(true);
        expect(result.pagination.hasPrev).toBe(true);
        expect(mockUserRepository.getAll).toHaveBeenCalledWith({ page: 2, limit: 10 });
    });

    it('debe manejar una paginacion por default cuando no se le mandan parametros de paginacion', async () => {
        const defaultResult: PaginatedResult<User> = {
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
            
            mockUserRepository.getAll = mock(() => Promise.resolve(defaultResult));

            const result = await userService.getAllUsers();

            expect(result.pagination.currentPage).toBe(1);
            expect(result.pagination.itemsPerPage).toBe(10);
            expect(mockUserRepository.getAll).toHaveBeenCalledWith(undefined);
        });
    });
});