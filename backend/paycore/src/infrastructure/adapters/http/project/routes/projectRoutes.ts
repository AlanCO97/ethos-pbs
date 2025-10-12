import {Elysia} from "elysia";
import { ProjectController } from "../controllers/projectController";
import { jwt } from "@elysiajs/jwt";
import { authGuard } from "../../common/middlewares/auth";
import { createProjectDocumentation, createProjectSchema, getAllProjectsSchema, getAllProjectsSchemaDocumentation } from "../schemas/projectSchemas";

export const createProjectRoutes = (projectController: ProjectController) => {
    return new Elysia({prefix: '/projects'})
        .use(
            jwt({
                name: 'jwt',
                secret: process.env.JWT_SECRET || 'SUPER_SECRETO',
                exp: '24h'
            })
        )
        .derive(authGuard)
        .post('/create', async ({ body, user }) => {
            console.log('Usuario autenticado:', user);
            return await projectController.create(body)
        }, {
            ...createProjectSchema,
            detail: createProjectDocumentation
        })
        .get('/all', async ({ query, user }) => {
            console.log('Usuario autenticado:', user);
            return await projectController.getAll({query})
        }, {
            ...getAllProjectsSchema,
            detail: getAllProjectsSchemaDocumentation,
        });
}