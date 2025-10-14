import { getAllProjects } from "@/actions/projects";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const result = await getAllProjects({ page, limit });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en API route:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}