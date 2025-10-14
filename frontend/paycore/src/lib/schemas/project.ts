import z from "zod";

export interface Project {
  id: string;
  name: string;
  status: "pendiente" | "en progreso" | "aprobado" | "cancelado";
}

export const ProjectSchema = z.object({
  name: z.string().min(1, 'El Nombre del proyecto es requerido'),
});

export type ProjectFormData = z.infer<typeof ProjectSchema>;