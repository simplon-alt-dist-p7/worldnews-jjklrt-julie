# Dockerfile pour le backend "write-back"
# ---------- BUILD ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# INSTALLER AUSSI devDependencies
RUN npm ci --include=dev

COPY . .

RUN npm run build

# ---------- PRODUCTION ----------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# seulement prod
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Copier les fichiers SQL nécessaires
COPY database ./database
COPY docker/db-init ./docker/db-init

ENV NODE_ENV=production

EXPOSE 3002

CMD ["node", "dist/index.js"]

