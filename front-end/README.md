# Frontend Todo List Application

Frontend de la aplicación Todo List desarrollada con Next.js 15, implementando un sistema completo de autenticación y gestión de tareas.

## Estructura del Proyecto

```
├── app/           # Directorio principal de Next.js (App Router)
├── components/    # Componentes reutilizables
├── lib/          # Utilidades y funciones auxiliares
├── types/        # Definiciones de tipos TypeScript
```

## Requisitos Previos

- Node.js (versión recomendada: 18.x o superior)
- npm o pnpm
- Next.js 15.

## Características Principales

- 🔐 Sistema de autenticación completo
  - Inicio de sesión con email y contraseña
  - Registro de nuevos usuarios
  - Cierre de sesión
- ✅ Gestión completa de tareas
  - Crear nuevas tareas
  - Editar tareas existentes
  - Eliminar tareas
  - Actualización en tiempo real
- 🔄 Sincronización con backend
  - Actualización manual mediante botón de refresh

## Instalación

1. Instala las dependencias:

```bash
npm install
# o
pnpm install
```

2. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno (opcionales):

```env
NEXT_PUBLIC_URL_PROD_BACKEND=tu_url_de_produccion
NEXT_PUBLIC_URL_DEV_BACKEND=tu_url_de_desarrollo
```

## Uso

### Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
# o
pnpm dev
```

La aplicación estará disponible en `http://localhost:8080`

## Rutas

- `/` - Página principal (protegida)
  - Dashboard con lista de tareas
  - Requiere autenticación
- `/auth` - Página de autenticación
  - Formulario de inicio de sesión
  - Formulario de registro

## Dependencias Principales

- Next.js 15
- cookies-next - Manejo de cookies para la autenticación

## Variables de Entorno

| Variable                     | Descripción                   | Requerida |
| ---------------------------- | ----------------------------- | --------- |
| NEXT_PUBLIC_URL_PROD_BACKEND | URL del backend en producción | Si        |
| NEXT_PUBLIC_URL_DEV_BACKEND  | URL del backend en desarrollo | Si        |

_Nota: Si no se proporcionan las variables de entorno, la aplicación dara fallos._

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea una build de producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
