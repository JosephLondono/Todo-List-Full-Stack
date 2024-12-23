# Todo List Full Stack Application

Una aplicación de lista de tareas (Todo List) desarrollada con stack completo (frontend y backend).

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (versión recomendada: 16.x o superior)
- npm (normalmente viene con Node.js)

## Estructura del Proyecto

El proyecto está organizado en una estructura monorepo con dos principales directorios:

```
├── front-end/     # Aplicación frontend
├── back-end/      # Servidor backend
└── package.json   # Configuración root del proyecto
```

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/JosephLondono/Todo-List-Full-Stack
cd Todo-List-Full-Stack
```

2. Instala las dependencias de todos los workspaces:

```bash
npm run install:all
```

Este comando ejecutará la instalación de dependencias tanto para el frontend como para el backend.

## Ejecución del Proyecto

Para ejecutar la aplicación completa (frontend y backend simultáneamente):

```bash
npm start
```

Este comando iniciará:

- El servidor backend en modo desarrollo
- La aplicación frontend en modo desarrollo

### Ejecutar Componentes por Separado

Si prefieres ejecutar cada parte independientemente:

- Para el backend:

```bash
npm run start:backend
```

- Para el frontend:

```bash
npm run start:frontend
```

## Scripts Disponibles

- `npm start`: Inicia tanto el frontend como el backend
- `npm run start:backend`: Inicia solo el servidor backend
- `npm run start:frontend`: Inicia solo la aplicación frontend
- `npm run install:all`: Instala las dependencias de todos los workspaces
- `npm run install:backend`: Instala solo las dependencias del backend
- `npm run install:frontend`: Instala solo las dependencias del frontend
- `npm run co`: Ejecuta el asistente de commits de sui-mono

## Documentación Detallada

Para obtener información más detallada sobre cada parte del proyecto, puedes consultar la documentación específica en cada carpeta:

### Frontend

```bash
cd front-end
cat README.md  # Para ver la documentación del frontend
```

### Backend

```bash
cd back-end
cat README.md  # Para ver la documentación del backend
```

Cada carpeta contiene su propia documentación con detalles específicos
