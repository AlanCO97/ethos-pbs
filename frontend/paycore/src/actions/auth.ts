"use server";

import { redirect } from "next/navigation";

export interface SignUpData {
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: any;
  timestamp: string;
}

const API_URL = process.env.API_URL || "http://localhost:3001";

export async function signUpAction(formData: SignUpData): Promise<AuthResponse> {
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
      return {
        success: false,
        message: result.error.message || "Error al crear la cuenta",
        timestamp: result.timestamp || "",
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