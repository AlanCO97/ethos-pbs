
import { ProjectService } from "../../application/project/services/projectService";
import { ProjectSupabaseRepository } from "../adapters/db/project/projectSupabaseRepository";
import { ProjectStatusSupabaseRepository } from "../adapters/db/project_status/projectStatusSupabaseRepository";
import { ProjectController } from "../adapters/http/project/controllers/projectController";
import { supabase } from "../config/supabase";

const projectRepository = new ProjectSupabaseRepository(supabase);
const projectStatusRepository = new ProjectStatusSupabaseRepository(supabase)
const projectService = new ProjectService(projectRepository, projectStatusRepository);
export const projectController = new ProjectController(projectService)