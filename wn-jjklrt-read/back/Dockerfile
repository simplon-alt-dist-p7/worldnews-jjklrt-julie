# Dockerfile pour le backend "read-back"
# ---------- BUILD ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# INSTALLER AUSSI devDependencies
RUN npm ci --include=dev

COPY . .

RUN npm run build

# debug
RUN ls -R /app


# ---------- PRODUCTION ----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

RUN ls -R /app

EXPOSE 3002
CMD ["node", "dist/index.js"]


