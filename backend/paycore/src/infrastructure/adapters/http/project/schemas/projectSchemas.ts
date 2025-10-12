import { t } from "elysia";
import { successResponseSchema, paginatedResponseSchema, errorResponseSchema } from "../../common/schemas/responseSchemas";

/* ===============================
        Domain Schema
   =============================== */
export const publicProjectSchema = t.Object({
    id: t.String(),
    name: t.String(),
    status: t.String(), // nombre del status
});

/* ===============================
        Response Body
   =============================== */
export const publicProjectResponseSchema = successResponseSchema(publicProjectSchema);
export const getAllProjectsResponseSchema = paginatedResponseSchema(publicProjectSchema);

/* ===============================
        Request Body
   =============================== */
export const createProjectSchema = {
    body: t.Object({
        name: t.String({ minLength: 1, error: 'El nombre del proyecto es requerido' }),
    }),
    response: {
        201: publicProjectResponseSchema,
        400: errorResponseSchema,
    },
};

/* ===============================
        Swagger / Documentation
   =============================== */
export const createProjectDocumentation = {
    summary: 'Crear nuevo proyecto',
    description: 'Crea un nuevo proyecto con estado por defecto "pendiente"',
    tags: ['Projects'],
};