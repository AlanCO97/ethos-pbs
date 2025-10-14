"use server";

import { PaginationParams } from "@/lib/schemas/queryParams";
import { authenticatedFetch } from "./utils";
import { PaginationResponse } from "@/lib/schemas/responses";
import { User } from "@/lib/schemas/auth";

const API_URL = process.env.API_URL || "http://localhost:3001";

export async function getAllUsers({
  page = 1,
  limit = 10,
}: PaginationParams = {}): Promise<PaginationResponse<User[]>> {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    }).toString();

    const response = await authenticatedFetch(`${API_URL}/users/all?${query}`, {
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
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data as User[],
      pagination: result.pagination,
      timestamp: result.timestamp || new Date().toISOString(),
    };
  } catch (err) {
    console.error("Error fetching getAllUsers:", err);
    return {
      success: false,
      message: "Error de conexión con el servidor",
      data: [],
      pagination: {},
      timestamp: new Date().toISOString(),
    };
  }
}
