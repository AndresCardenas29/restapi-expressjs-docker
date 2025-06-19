# BRM API

Este proyecto es una API REST construida con Node.js, Express, TypeScript y Prisma, usando PostgreSQL como base de datos y Docker para el despliegue.

## Estructura del proyecto

```
├── prisma/               # Esquema y migraciones de Prisma
├── src/
│   ├── controllers/      # Lógica de negocio (controladores)
│   ├── middlewares/      # Middlewares personalizados
│   ├── libs/             # Utilidades y helpers
│   ├── repositories/     # Acceso a datos (Prisma)
│   ├── routes/           # Definición de rutas
│   └── index.ts          # Punto de entrada de la app
├── Dockerfile            # Imagen de la app
├── docker-compose.yml    # Orquestación de servicios
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración de TypeScript
└── README.md             # Este archivo
```

## Despliegue con Docker

1. **Clona el repositorio y entra a la carpeta del proyecto:**

   ```sh
   git https://github.com/AndresCardenas29/restapi-expressjs-docker
   cd restapi-expressjs-docker
   ```

2. **Construye los contenedores:**

   ```sh
   docker compose build
   ```

3. **Levanta los servicios:**

   ```sh
   docker compose up
   ```

   Esto levantará dos servicios:
   - `express_app`: La API en Node.js
   - `postgres_db`: La base de datos PostgreSQL

4. **La API estará disponible en:**

   [http://localhost:3000](http://localhost:3000)

## Endpoints principales

- `GET    /users`         → Lista todos los usuarios
- `POST   /users`         → Crea un usuario
- `GET    /users/:id`     → Obtiene un usuario por ID
- `PATCH  /users/:id`     → Actualiza un usuario por ID
- `DELETE /users/:id`     → Elimina un usuario por ID
- `POST   /users/auth`    → Login de usuario

## Notas
- El archivo `.env` contiene la cadena de conexión a la base de datos y no debe subirse al repositorio.
- Prisma se encarga de la conexión y migraciones de la base de datos.
- Puedes modificar el esquema en `prisma/schema.prisma` y luego ejecutar las migraciones dentro del contenedor.

## Migraciones y Prisma

Para correr migraciones o generar el cliente de Prisma dentro del contenedor, puedes usar:

```sh
# Abre una terminal en el contenedor de la app
 docker compose exec app sh

# Ejecuta migraciones
 pnpm prisma migrate dev

# Genera el cliente
 pnpm prisma generate
```
