import { t, TSchema } from 'elysia';

// Esquema base para respuestas exitosas
export const successResponseSchema = <T extends TSchema>(dataSchema: T) => t.Object({
    success: t.Literal(true),
    data: dataSchema,
    message: t.Optional(t.String()),
    timestamp: t.String()
});

// Esquema para respuestas paginadas
export const paginatedResponseSchema = <T extends TSchema>(dataSchema: T) => t.Object({
    success: t.Literal(true),
    data: t.Array(dataSchema),
    pagination: t.Object({
        currentPage: t.Number(),
        totalPages: t.Number(),
        totalItems: t.Number(),
        itemsPerPage: t.Number(),
        hasNext: t.Boolean(),
        hasPrev: t.Boolean()
    }),
    message: t.Optional(t.String()),
    timestamp: t.String()
});

// Esquema para respuestas de error
export const errorResponseSchema = t.Object({
    success: t.Literal(false),
    error: t.Object({
        code: t.String(),
        message: t.String(),
        details: t.Optional(t.Any())
    }),
    timestamp: t.String()
});