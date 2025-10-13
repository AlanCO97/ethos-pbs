
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GenericResponse, ValidationDetail } from "./schemas/responses";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export interface ApiError {
  code: string;
  message: string;
  details?: ValidationDetail[];
}
export function handleApiError(result: { error: ApiError; timestamp?: string }): GenericResponse {
  const { error, timestamp } = result;

  if (error.code === "VALIDATION_ERROR" && Array.isArray(error.details)) {
    const details: ValidationDetail[] = error.details.map((d) => ({
      path: d.path,
      message: d.schema?.error || d.message,
      schema: d.schema,
    }));

    const message = details
      .map((d) => `• ${d.path.replace(/^\//, "")}: ${d.message}`)
      .join("\n");

    return {
      success: false,
      message: message || error.message || "Error de validación",
      timestamp: timestamp || "",
    };
  }

  return {
    success: false,
    message: error.message || "Error de la aplicación",
    timestamp: timestamp || "",
  };
}
