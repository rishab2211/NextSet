# Multi-stage Dockerfile for NextSet PWA Web Client
FROM node:20-alpine AS builder

WORKDIR /app

# Install monorepo dependencies
COPY package.json package-lock.json* ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/web/package.json ./apps/web/
COPY apps/api/package.json ./apps/api/

RUN npm ci

# Copy source files
COPY tsconfig.json ./
COPY packages/shared ./packages/shared
COPY apps/web ./apps/web

# Optional build arg for pointing to production API
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-https://nextset-api-production.rishabraj2211.workers.dev}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL:-https://nextset-4u3.pages.dev}

# Build static PWA export
RUN npm run build:web

# Production Web Server (Ultra-lightweight Alpine Nginx)
FROM nginx:alpine AS runner

COPY --from=builder /app/apps/web/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
