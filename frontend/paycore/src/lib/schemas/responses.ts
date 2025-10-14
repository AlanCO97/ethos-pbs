export interface GenericResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

export interface PaginationResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: {
    currentPage?: number,
    totalPages?: number,
    totalItems?: number,
    itemsPerPage?: number,
    hasNext?: boolean,
    hasPrev?: boolean
  };
  timestamp: string;
}

export interface ValidationDetail {
  path: string;
  message: string;
  schema?: {
    error?: string;
  };
}