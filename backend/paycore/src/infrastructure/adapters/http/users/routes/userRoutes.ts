import { Elysia } from "elysia";
import { UserController } from "../controllers/userController";
import { authGuard } from "../../common/middlewares/auth";
import { jwt } from "@elysiajs/jwt";
import { signUpSchema, signUpDocumentation, signInSchema, signInDocumentation, getAllUsersSchema, getAllUsersSchemaDocumentation } from "../schemas/userSchemas";


export const createUserRoutes = (userController: UserController) => {

    return new Elysia({ prefix: '/users' })
        .use(
            jwt({
                name: 'jwt',
                secret: process.env.JWT_SECRET || 'SUPER_SECRETO',
                exp: '24h'
            })
        )
        .post('/signup', async ({ body }) => {
            return await userController.signup(body)
        }, {
            ...signUpSchema,
            detail: signUpDocumentation
        })
        .post('/signin', async ({ body, jwt, set }) => {
            const result = await userController.signin(body, jwt);
            
            const token = result.data.token;
            
            set.cookie = {
                auth_token: {
                    value: token,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 60 * 60 * 24,
                }
            }
            return result;
        }, {
            ...signInSchema,
            detail: signInDocumentation
        })
        .derive(authGuard)
        .get('/all', async ({ query, user }) => {
            console.log('Usuario autenticado:', user);
            return await userController.getAllUsers({query})
        }, {
            ...getAllUsersSchema,
            detail: getAllUsersSchemaDocumentation,
        });
}