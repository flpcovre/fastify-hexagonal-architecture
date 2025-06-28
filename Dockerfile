FROM node:24-slim

RUN apt-get update && apt-get install -y openssl

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN npx prisma generate

EXPOSE 3333

CMD ["pnpm", "run", "dev"]
