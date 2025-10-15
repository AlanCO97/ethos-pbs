# 🚀 Dashboard Next.js - PayCore Frontend

Dashboard moderno construido con Next.js y shadcn/ui para la gestión de usuarios y proyectos de PayCore.

## ✨ Características principales

### 🔐 Autenticación y seguridad
- **Registro de usuarios** (`/signup`): Formulario con validación en tiempo real usando React Hook Form y Zod
- **Inicio de sesión** (`/signin`): Autenticación segura con validaciones robustas
- **Gestión de sesiones**: Tokens JWT almacenados en cookies del servidor (httpOnly)
- **Middleware de autenticación**: Validación automática de tokens (verificación y vigencia)
- **Cierre de sesión**: Eliminación segura de cookies y redirección automática
- **Notificaciones**: Toasts informativos para éxito y errores en todas las operaciones

### 📊 Dashboard principal (`/`)
- **Vista general**: Estadísticas y métricas con datos mock
- **Tabla de proyectos**: Datos obtenidos desde el servidor
- **Creación de proyectos**: Formulario validado para agregar nuevos proyectos
- **Actualización automática**: La tabla se actualiza al crear un proyecto exitosamente

### 📋 Gestión de datos (`/tables`)
- **Tabla de usuarios**: Listado completo con paginación dinámica
- **Tabla de proyectos**: Visualización paginada de proyectos
- **Paginación del servidor**: Peticiones optimizadas al backend de Elysia

### 📈 Análisis (`/billing`)
- **Gráficos interactivos**: Visualización de datos con información mock
- **Métricas financieras**: Dashboard de facturación

### 🎨 Experiencia de usuario
- **Página 404 personalizada**: Diseño custom para rutas no encontradas (ej: `/rtl`)
- **UI**: Componentes de shadcn/ui
- **Menú lateral**: Navegación intuitiva con estado activo
- **Feedback visual**: Toasts para todas las operaciones (éxito, error, sesión expirada)

## 🛠️ Tecnologías

- **Framework**: Next.js
- **Runtime**: Bun
- **UI**: shadcn/ui
- **Validaciones**: Zod + React Hook Form
- **Gráficos**: shadcn/ui (Recharts under the hood)
- **Notificaciones**: Sonner (toasts)
- **Estilos**: Tailwind CSS
- **Backend**: Elysia (servidor externo)

## 🚀 Instalación

Clona el repositorio e instala las dependencias con Bun:

```bash
bun install
```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
API_URL=
JWT_SECRET=
```

**Variables requeridas:**
- `API_URL`: URL del servidor backend de Elysia
- `JWT_SECRET`: Clave secreta para la verificación de tokens JWT

## 🧑‍💻 Desarrollo

Ejecuta el servidor de desarrollo:

```bash
bun run dev
```

El proyecto estará disponible en: 👉 http://localhost:3000

## 🧱 Estructura del proyecto

```
src
├── actions
│   ├── auth.ts
│   ├── projects.ts
│   ├── user.ts
│   └── utils.ts
├── app
│   ├── (auth)
│   │   ├── signin
│   │   │   └── page.tsx
│   │   └── signup
│   │       └── page.tsx
│   ├── (dashboard)
│   │   ├── billing
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── tables
│   │       └── page.tsx
│   ├── api
│   │   ├── projects
│   │   │   └── route.ts
│   │   └── users
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── components
│   ├── auth
│   │   ├── AuthImage.tsx
│   │   ├── SignInForm.tsx
│   │   └── SignUpForm.tsx
│   ├── dashboard
│   │   ├── ActiveUsers.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DashboardStats.tsx
│   │   ├── DashboardWrapper.tsx
│   │   ├── OrdersOverview.tsx
│   │   ├── ProjectsTable.tsx
│   │   ├── ReferralTracking.tsx
│   │   ├── SalesOverview.tsx
│   │   ├── SatisfactionRate.tsx
│   │   └── WelcomeCard.tsx
│   ├── footer
│   │   └── AuthFooter.tsx
│   ├── layout
│   │   └── TopBar.tsx
│   ├── menu
│   │   ├── LogoutButton.tsx
│   │   ├── MenuItem.tsx
│   │   └── SideMenu.tsx
│   ├── tables
│   │   ├── DataTable.tsx
│   │   └── TablePagination.tsx
│   └── ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── sonner.tsx
├── lib
│   ├── schemas
│   │   ├── auth.ts
│   │   ├── project.ts
│   │   ├── queryParams.ts
│   │   ├── responses.ts
│   │   └── tableConfig.ts
│   └── utils.ts
└── middleware.ts
```

## 🔐 Middleware de autenticación

El proyecto incluye un middleware que:
- ✅ Valida la existencia del token JWT en las cookies
- ✅ Verifica la autenticidad del token (previene tokens falsos)
- ✅ Valida la vigencia del token
- ⚠️ Redirige a `/signin` si el token es inválido o expiró
- 🔔 Muestra un toast informando que la sesión venció

## 🎯 Flujo de autenticación

1. **Registro** (`/signup`):
   - Usuario completa el formulario
   - Validaciones en tiempo real con Zod
   - Toast de confirmación o error
   - Redirección automática al `/signin`

2. **Login** (`/signin`):
   - Usuario ingresa credenciales
   - Validación de formulario
   - Token y nombre guardados en cookies del servidor
   - Redirección a `/` (dashboard)

3. **Sesión activa**:
   - Middleware valida el token en cada petición
   - Acceso permitido a rutas protegidas

4. **Cierre de sesión**:
   - Click en botón "SignOut" del menú lateral
   - Eliminación de cookies en el servidor
   - Redirección a `/signin`

## 📦 Comandos disponibles

```bash
# Desarrollo
bun run dev

# Build de producción
bun run build

# Iniciar producción
bun run start

# Linting
bun run lint
```

## 📝 Notas importantes

- Las cookies de sesión se almacenan en el **lado del servidor** (httpOnly) para mayor seguridad
- Todas las validaciones de formularios usan **Zod** para garantizar la integridad de datos
- La paginación de tablas se maneja en el **servidor backend** (Elysia) para optimizar el rendimiento
- La ruta `/rtl` no está implementada intencionalmente para demostrar la página 404 personalizada