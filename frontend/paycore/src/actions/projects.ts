import { PaginationParams } from "@/lib/schemas/queryParams";
import { PaginationResponse } from "@/lib/schemas/responses";
import { authenticatedFetch } from "./utils";
import { Project } from "@/lib/schemas/project";

const API_URL = process.env.API_URL || "http://localhost:3001";

export async function getAllProjects({
  page = 1,
  limit = 10,
}: PaginationParams = {}): Promise<PaginationResponse<Project[]>> {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    }).toString();

    const response = await authenticatedFetch(`${API_URL}/projects/all?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
        const { error, timestamp } = result;
        return {
            success: false,
            message: error.message || "Error de validación",
            data: [],
            pagination: {},
            timestamp: timestamp || new Date().toISOString(),
        }
    }

    return {
      success: true,
      message: result.message,
      data: result.data as Project[],
      pagination: result.pagination,
      timestamp: result.timestamp || new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error en getAllProjects:", error);

    return {
      success: false,
      message: "Error de conexión con el servidor",
      data: [],
      pagination: {},
      timestamp: new Date().toISOString(),
    };
  }
}