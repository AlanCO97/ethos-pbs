"use client";

import { Button } from "@/components/ui/button";
import { Project, ProjectFormData, ProjectSchema } from "@/lib/schemas/project";
import { PlusCircle } from "lucide-react";
import { Label } from "recharts";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { createProject } from "@/actions/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GenericResponse } from "@/lib/schemas/responses";

type DashboardHeaderProps = {
  fullname: string;
  onProjectAdded?: (project: Project) => void;
};

export function DashboardHeader({
  fullname,
  onProjectAdded,
}: DashboardHeaderProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();


  const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<ProjectFormData>({
      resolver: zodResolver(ProjectSchema),
      mode: "onBlur",
    });

    const onSubmit = (data: ProjectFormData) => {
    startTransition(async () => {
      const result = await createProject(data) as GenericResponse<Project>;

      if (result.success) {
        toast.success(result.message || "¡Registro agregado con exito!");
        if (result.data && onProjectAdded) {
          console.log(data)
          onProjectAdded(result.data);
        }
        setOpen(false);
        reset();
      } else {
        toast.error(result.message || "Error al hacer login");
      }
    });
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Bienvenido de nuevo, {fullname} 👋
        </p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Nuevo proyecto
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-[#1a1f3a] to-[#151a30] border-gray-700/50 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="space-y-3 pb-6 text-center ">
              <DialogTitle className="text-2xl font-bold text-white text-center ">
                Crear nuevo proyecto
              </DialogTitle>
              <DialogDescription className="text-gray-400 text-base text-center ">
                Dale un nombre único a tu proyecto para comenzar
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  Nombre del proyecto
                </Label>
                <Input
                  id="name"
                  placeholder="Nombre"
                  className={`bg-transparent border-gray-700 focus:border-blue-600 text-white rounded-2xl ${
                    errors.name ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  {...register('name')}
                  disabled={isPending}
                  autoFocus
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
            </div>

            <DialogFooter className="gap-3 sm:gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1 sm:flex-initial bg-gray-600 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Creando...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Crear proyecto
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
