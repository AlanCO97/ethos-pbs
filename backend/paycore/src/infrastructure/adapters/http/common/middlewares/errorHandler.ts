import { ResponseBuilder } from "../../../../../application/common/dtos/responses/ApiResponse";

export class AppError extends Error {
    constructor(
        public message: string,
        public code: string = 'ERROR',
        public statusCode: number = 400,
        public details?: any
    ) {
        super(message);
        this.name = 'AppError'
    }
}

export function handleError(error: any) {
    // Error que hayamos hecho nosotros de tipo AppError
    if (error instanceof AppError) {
        return {
            status: error.statusCode,
            body: ResponseBuilder.error(error.message, error.code, error.details),
        };
    }

    console.debug(error.name, error.code)
    
    // Error de validacion en schemas
    if (error.name === 'ValidationError' || error.code === 'VALIDATION') {
        return {
            status: 400,
            body: ResponseBuilder.error(
                'Validation error',
                'VALIDATION_ERROR',
                error.errors || error.all
            )
        }
    }

    // Error for 404
    if (error.code === 'NOT_FOUND') {
        return {
            status: 404,
            body: ResponseBuilder.error(
                'Page Not Found',
                'NOT_FOUND',
                error.errors || error.all
            )
        }
    }

    // Error generico
    console.error('Unhandled error:', error);
    return {
        status: 500,
        body: ResponseBuilder.error(
            'Internal server error',
            'INTERNAL_SERVER_ERROR'
        )
    }
}