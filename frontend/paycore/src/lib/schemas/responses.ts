export interface GenericResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

export interface PaginationResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  pagination?: Record<string, unknown>;
  timestamp: string;
}

export interface ValidationDetail {
  path: string;
  message: string;
  schema?: {
    error?: string;
  };
}