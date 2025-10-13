"use server";

import { SignUpFormData } from "@/lib/schemas/auth";

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

interface ValidationDetail {
  path: string;
  message: string;
  schema?: {
    error?: string;
  };
}

const API_URL = process.env.API_URL || "http://localhost:3001";

export async function signUpAction(formData: SignUpFormData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        paternalSurname: formData.paternalSurname,
        maternalSurname: formData.maternalSurname,
        email: formData.email,
        password: formData.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {

        const { error, timestamp } = result;

        if (error.code === "VALIDATION_ERROR" && Array.isArray(error.details)) {
            const details: ValidationDetail[] = error.details.map((d: ValidationDetail) => ({
                path: d.path,
                message: d.schema?.error || d.message,
                schema: d.schema,
            }));

            const message = details
                .map((d) => `${d.path.replace(/^\//, "")}: ${d.message} `)
                .join("");

            return {
                success: false,
                message: message || error.message || "Error de validación",
                timestamp: timestamp || "",
            };
        }

        return {
            success: false,
            message: error.message || "Error al crear la cuenta",
            timestamp: timestamp || "",
        };
    }

    return {
      success: true,
      message: result.message,
      data: result,
      timestamp: result.timestamp || "",
    };
  } catch (error) {
    console.error("Error en signUpAction:", error);
    return {
      success: false,
      message: "Error de conexión con el servidor",
      timestamp: "",
    };
  }
}