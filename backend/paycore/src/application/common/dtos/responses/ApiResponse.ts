// Responses genericas

export interface SuccessResponse<T = any> {
    success: true;
    data: T;
    message?: string;
    timestamp: string;
}

export interface PaginatedSuccessResponse<T = any> {
    success: true;
    data: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    message?: string;
    timestamp: string;
}

export interface ErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: any;
    };
    timestamp: string;
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse | PaginatedSuccessResponse<T>;

export class ResponseBuilder {

    static success<T>(data: T, message?: string): SuccessResponse<T> {
        return {
            success: true,
            data,
            message,
            timestamp: new Date().toISOString(),
        };
    }

    static paginated<T>(
        data: T[],
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
            hasNext: boolean;
            hasPrev: boolean;
        },
        message?: string
    ): PaginatedSuccessResponse<T> {
        return {
            success: true,
            data,
            pagination,
            message,
            timestamp: new Date().toISOString(),
        };
    }

    static error(
        message: string,
        code: string = 'ERROR',
        details?: any
    ): ErrorResponse {
        return {
            success: false,
            error: {
                code,
                message,
                details,
            },
            timestamp: new Date().toISOString(),
        };
    }
}