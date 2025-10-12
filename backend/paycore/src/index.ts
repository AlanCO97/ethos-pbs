import { Elysia } from "elysia";
import { Logestic } from "logestic";
import { createUserRoutes } from "./infrastructure/adapters/http/users/routes/userRoutes";
import { userController } from "./infrastructure/di/users";
import { cors } from "@elysiajs/cors";
import { helmet } from "elysia-helmet";
import { rateLimit } from "elysia-rate-limit";
import { handleError, AppError } from "./infrastructure/adapters/http/common/middlewares/errorHandler";
import { swagger } from "@elysiajs/swagger";


const app = new Elysia({ prefix: '/api' })
  .use(cors())
  .use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
      }
    }
  }))
  .onError(({ error, code, set }) => {
      const { status, body } = handleError(error);
      set.status = status;
      return body;
  })
  .use(rateLimit({
      max: 100,
      duration: 60_000,
      errorResponse: new AppError(
          'Rate limit exceeded',
          'RATE_LIMIT',
          429,
      ),
  }))
  .use(swagger({documentation: {
      info: {
          title: 'Users API',
          version: '1.0.0',
          description: 'API para gestión de usuarios'
      },
      tags: [
          { name: 'Authentication', description: 'Endpoints de autenticación' },
          { name: 'Users', description: 'Gestión de usuarios' },
      ],
      components: {
          securitySchemes: {
              BearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT'
              }
          }
      }
  }}))
  .use(Logestic.preset('fancy')
  .use(createUserRoutes(userController))
)

const port = Number(process.env.PORT) || 3000;

app.listen(port)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);