'use server'

import { PaginationParams } from "@/lib/schemas/queryParams";
import { GenericResponse, PaginationResponse } from "@/lib/schemas/responses";
import { authenticatedFetch } from "./utils";
import { Project, ProjectFormData } from "@/lib/schemas/project";
import { handleApiError } from "@/lib/utils";

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

export async function createProject(formData: ProjectFormData): Promise<GenericResponse> {
  try {
    const response = await authenticatedFetch(`${API_URL}/projects/create`, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      return handleApiError(result);
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
      timestamp: result.timestamp,
    };
  } catch (error) {
    console.error("Error en createProject:", error);
    return {
      success: false,
      message: "Error de conexión con el servidor",
      timestamp: "",
    };
  }
}