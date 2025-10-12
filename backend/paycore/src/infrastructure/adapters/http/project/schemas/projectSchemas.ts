import { t } from "elysia";
import { successResponseSchema, paginatedResponseSchema, errorResponseSchema } from "../../common/schemas/responseSchemas";
import { paginationQuery } from "../../common/schemas/paginationSchema";

/* ===============================
        Domain Schema
   =============================== */
export const publicProjectSchema = t.Object({
    id: t.String(),
    name: t.String(),
    status: t.String(),
});

/* ===============================
        Response Body
   =============================== */
export const publicProjectResponseSchema = successResponseSchema(publicProjectSchema);
export const getAllProjectsResponseSchema = paginatedResponseSchema(publicProjectSchema);
export const getAllProjectResponseSchema = paginatedResponseSchema(publicProjectSchema);

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

export const getAllProjectsSchema = {
    query: paginationQuery,
    response: {
        200: getAllProjectResponseSchema,
        401: errorResponseSchema,
        400: errorResponseSchema
    }
};

/* ===============================
        Swagger / Documentation
   =============================== */
export const createProjectDocumentation = {
    summary: 'Crear nuevo proyecto',
    description: 'Crea un nuevo proyecto con estado por defecto "pendiente"',
    tags: ['Projects'],
};

export const getAllProjectsSchemaDocumentation = {
    summary: 'Obtener todos los proyectos',
    description: 'Retorna una lista paginada de todos los proyectos activos',
    tags: ['Projects'],
    security: [{ BearerAuth: [] }]
}