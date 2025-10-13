import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, 'El Nombre es requerido'),
  paternalSurname: z.string().min(1, 'El Apellido paterno es requerido'),
  maternalSurname: z.string().nullable().optional(), // 🎯 Equivale exactamente a tu backend
//   email: z.string().email('El Email no tiene un formato correcto'),
  email: z.email({error: 'El Email no tiene un formato correcto'}),
  password: z.string().min(8, 'La Contraseña debe de tener al menos 8 caracteres'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;