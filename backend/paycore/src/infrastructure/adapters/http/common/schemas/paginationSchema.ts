import { t } from "elysia";

export const paginationQuery = t.Object({
    page: t.Optional(t.Numeric({ 
        minimum: 1,
        description: 'Número de página',
        example: 1
    })),
    limit: t.Optional(t.Numeric({ 
        minimum: 1, 
        maximum: 100,
        description: 'Cantidad de elementos por página (máximo 100)',
        example: 10
    }))
});