"use server";

import { Project } from "@/lib/schemas/project";
import { PaginationResponse } from "@/lib/schemas/responses";
import { getAllProjects } from "./projects";

export async function fetchProjectsPage(
  page: number,
  limit: number
): Promise<PaginationResponse<Project[]>> {
  return getAllProjects({ page, limit });
}