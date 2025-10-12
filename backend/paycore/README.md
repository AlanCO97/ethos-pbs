# 🤑 PayCore

Proyecto para el manejo de usuarios y proyectos de PayCore.

## 🚀 Instalación

Clona el repositorio e instala dependencias:

```bash
bun install
```

## 🧑‍💻 Desarrollo

Ejecuta el servidor en modo desarrollo:

```bash
bun run dev
```

El servidor estará disponible en:
👉 http://localhost:{port}

## 🧱 Estructura del proyecto

```
src
├── __tests__
│   └── unit
│       ├── application
│       │   └── users
│       │       └── services
│       │           └── UserService.test.ts
│       └── domain
│           └── user
│               └── User.test.ts
├── application
│   ├── common
│   │   ├── dtos
│   │   │   └── responses
│   │   │       └── ApiResponse.ts
│   │   └── ports
│   │       └── Pagination.ts
│   └── users
│       ├── dtos
│       │   ├── requests
│       │   │   ├── SignInRequestDTO.ts
│       │   │   └── SignUpRequestDTO.ts
│       │   └── responses
│       │       └── UserResponse.ts
│       ├── ports
│       │   ├── passwordService.ts
│       │   └── UserRepository.ts
│       └── services
│           └── UserService.ts
├── domain
│   └── user
│       └── User.ts
├── index.ts
└── infrastructure
    ├── adapters
    │   ├── crypto
    │   │   └── BunPasswordService.ts
    │   ├── db
    │   │   └── users
    │   │       ├── migrations
    │   │       │   └── create_users_table.sql
    │   │       └── userSupabaseRepository.ts
    │   └── http
    │       ├── common
    │       │   ├── middlewares
    │       │   │   ├── auth.ts
    │       │   │   └── errorHandler.ts
    │       │   └── schemas
    │       │       ├── paginationSchema.ts
    │       │       └── responseSchemas.ts
    │       └── users
    │           ├── controllers
    │           │   └── userController.ts
    │           ├── routes
    │           │   └── userRoutes.ts
    │           └── schemas
    │               └── userSchemas.ts
    ├── config
    │   └── supabase.ts
    └── di
        └── users.ts
```

## 🧪 Tests

Ejecuta los tests con:

```bash
bun test
```

## 📚 Documentacion

La Documentacion esta disponible en

http://localhost:{port}/api/swagger

## ⚙️ Configuración

Variables de entorno necesarias:

```env
SUPABASE_URL=
SUPABASE_KEY=
JWT_SECRET=
PORT=
```

Guárdalas en un archivo `.env` en la raíz del proyecto.