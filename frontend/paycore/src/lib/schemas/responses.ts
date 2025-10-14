export interface GenericResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
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