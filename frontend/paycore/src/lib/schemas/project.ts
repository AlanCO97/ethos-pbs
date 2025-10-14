export interface Project {
  id: string;
  name: string;
  status: "pendiente" | "en progreso" | "aprobado" | "cancelado";
}