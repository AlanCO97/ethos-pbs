import { t } from 'elysia';
import { paginationQuery } from './paginationSchema';
import { successResponseSchema, paginatedResponseSchema, errorResponseSchema } from './responseSchemas';

/* ===============================
        Domain Schema
   =============================== */
export const userSchema = t.Object({
  id: t.String(),
  name: t.String(),
  paternalSurname: t.String(),
  maternalSurname: t.Optional(t.Nullable(t.String())),
  email: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
});

export const publicUserSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
  fullName: t.String(),
});

/* ===============================
              Res Body
   =============================== */
export const userResponseSchema = successResponseSchema(userSchema);

export const publicUserResponseSchema = successResponseSchema(publicUserSchema);

export const signUpResponseSchema = userResponseSchema;

export const signInResponseSchema = successResponseSchema(
  t.Object({
    user: publicUserSchema,
    token: t.String(),
  }),
);

export const getAllUsersResponseSchema = paginatedResponseSchema(publicUserSchema);

/* ===============================
              Req Body
   =============================== */
export const signUpSchema = {
  body: t.Object({
    name: t.String({ minLength: 1, error: 'El Nombre es requerido' }),
    paternalSurname: t.String({ minLength: 1, error: 'El Apellido paterno es requerido' }),
    maternalSurname: t.Optional(t.Nullable(t.String())),
    email: t.String({ format: 'email', error: 'El Email no tiene un formato correcto' }),
    password: t.String({ minLength: 8, error: 'La Contraseña debe de tener al menos 8 caracteres' }),
  }),
  response: {
    201: signUpResponseSchema,
    400: errorResponseSchema,
    409: errorResponseSchema,
  },
};

export const signInSchema = {
  body: t.Object({
    email: t.String({ format: 'email', error: 'El Email no tiene un formato correcto' }),
    password: t.String({ minLength: 8, error: 'La Contraseña debe de tener al menos 8 caracteres' }),
  }),
  response: {
    200: signInResponseSchema,
    401: errorResponseSchema,
    400: errorResponseSchema,
  },
};

export const getAllUsersSchema = {
    query: paginationQuery,
    response: {
        200: getAllUsersResponseSchema,
        401: errorResponseSchema,
        400: errorResponseSchema
    }
};

/* ===============================
              Swagger
   =============================== */
export const signUpDocumentation = {
  summary: 'Registrar nuevo usuario',
  description: 'Crea una nueva cuenta de usuario en el sistema',
  tags: ['Authentication'],
};

export const signInDocumentation = {
  summary: 'Iniciar sesión',
  description: 'Autentica un usuario y devuelve un token JWT',
  tags: ['Authentication'],
};

export const getAllUsersSchemaDocumentation = {
    summary: 'Obtener todos los usuarios',
    description: 'Retorna una lista paginada de todos los usuarios activos',
    tags: ['Users'],
    security: [{ BearerAuth: [] }]
}