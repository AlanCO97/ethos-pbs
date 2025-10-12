export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginationMetadata {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginatedResult<T> {
    data: T[];
    pagination: PaginationMetadata;
}