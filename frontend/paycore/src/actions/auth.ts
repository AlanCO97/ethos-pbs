"use server";

import { SignInFormData, SignUpFormData } from "@/lib/schemas/auth";
import { GenericResponse } from "@/lib/schemas/responses";
import { handleApiError } from "@/lib/utils";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL || "http://localhost:3001";

export async function signUpAction(
  formData: SignUpFormData
): Promise<GenericResponse> {
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
      return handleApiError(result);
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

export async function signInAction(
  formData: SignInFormData
): Promise<GenericResponse> {
  try {
    const response = await fetch(`${API_URL}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return handleApiError(result);
    }

    const cookieStore = cookies();
    (await cookieStore).set('auth-token', result.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });

    return {
      success: true,
      message: result.message || "Login exitoso",
      data: result.data,
      timestamp: result.timestamp || "",
    };
  } catch (err) {
    console.error("Error en signInAction:", err);
    return {
      success: false,
      message: "Error de conexión con el servidor",
      timestamp: "",
    };
  }
}