# Backend Todo List Application

Backend de la aplicación Todo List desarrollada con Nest.js, proporcionando un sistema robusto de autenticación, gestión de usuarios y tareas.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- Node.js (versión recomendada: 18.x o superior).
- npm o pnpm como gestor de paquetes.

## Características Principales

- 🔐 **Autenticación y Autorización**:
  - Manejo de autenticación basada en tokens JWT.
  - Endpoints protegidos para usuarios autenticados.
- ✅ **Gestión de Tareas**:
  - Crear, editar, eliminar y listar tareas.
- 📄 **Documentación Automática**:
  - Swagger disponible en `/docs`.
  - Documentación de componentes con Compodoc.

## Variables de entorno

Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
SECRETKEY_AUTH="your_secret_key"
URL_FRONTEND_LOCAL="http://localhost:8080"
URL_FRONTEND_PROD="your_production_url"
```

## Ejecución

### Modo Desarrollo

Para iniciar el servidor en modo desarrollo con reinicio automático:

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`.

### Modo Producción

Para compilar y ejecutar en modo producción:

```bash
npm run build
npm run start:prod
```

## Rutas API

El backend expone las siguientes rutas bajo el prefijo `/api/v1/`:

### UsersController

- **POST** `/users` - Crear un nuevo usuario.
- **GET** `/users` - Obtener todos los usuarios.
- **DELETE** `/users/clear` - Eliminar todos los usuarios.
- **DELETE** `/users/:id` - Eliminar un usuario específico.
- **PUT** `/users` - Actualizar un usuario.

### AuthController

- **POST** `/auth` - Iniciar sesión.
- **GET** `/auth/data-user` - Obtener datos del usuario autenticado.
- **POST** `/auth/register` - Registrar un nuevo usuario.

### TaskController

- **GET** `/task` - Obtener todas las tareas.
- **POST** `/task` - Crear una nueva tarea.
- **DELETE** `/task/:id` - Eliminar una tarea específica.
- **PUT** `/task` - Actualizar una tarea existente.
- **PATCH** `/task/updateStatus` - Actualizar el estado de una tarea.

## Documentación

### Swagger

La documentación de la API está disponible en:

```
http://localhost:3000/docs
```

### Compodoc

La documentación técnica del backend generada con Compodoc puede visualizarse ejecutando:

```bash
npm run docs
```

Esto iniciará un servidor en `http://localhost:5000`. También puedes encontrar los archivos generados en el directorio `documentation`.

## Variables de Entorno

| Variable           | Descripción                    | Requerida |
| ------------------ | ------------------------------ | --------- |
| SECRETKEY_AUTH     | Clave secreta para JWT         | Sí        |
| URL_FRONTEND_LOCAL | URL del frontend en desarrollo | Sí        |
| URL_FRONTEND_PROD  | URL del frontend en producción | No        |

## Scripts Disponibles

- `npm run start:dev` - Inicia el servidor en modo desarrollo.
- `npm run build` - Compila el proyecto.
- `npm run start:prod` - Inicia el servidor en modo producción.
- `npm run test` - Ejecuta las pruebas.
- `npm run lint` - Corre el linter.
- `npm run docs` - Genera la documentación con Compodoc.

## Dependencias Principales

- **Nest.js**: Framework backend principal.
- **TypeORM**: Gestión de base de datos.
- **JWT**: Autenticación basada en tokens.
- **Swagger**: Documentación de la API.
- **Compodoc**: Documentación técnica del código.

---

Este backend forma parte de una aplicación completa de lista de tareas. Para detalles sobre el frontend, consulta la documentación correspondiente.
