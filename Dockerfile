FROM node:20

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Generar Prisma Client con binarios adecuados para Linux
RUN pnpm prisma generate

# Compilar TypeScript
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
