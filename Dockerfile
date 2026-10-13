# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app

# Dependency production saja
FROM base AS prod-deps
COPY package*.json ./
RUN npm ci --omit=dev

# Dependency lengkap (dev) untuk lint & test
FROM base AS dev-deps
COPY package*.json ./
RUN npm ci

# Stage test: build gagal jika lint/format/test gagal (dipakai Jenkins)
FROM dev-deps AS test
COPY . .
RUN npm run lint && npm run format:check && npm test

# Image production (ramping, non-root)
FROM base AS production
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src

USER node
EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "src/server.js"]
