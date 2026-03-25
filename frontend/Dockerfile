# --- deps ---
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci

# --- build ---
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Optional: API URL beim Build "einbacken" (Next Public Env ist oft build-time)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_DEMO_MODE
ENV NEXT_PUBLIC_DEMO_MODE=$NEXT_PUBLIC_DEMO_MODE

RUN npm run build

# --- run ---
FROM node:20-alpine AS run
WORKDIR /app
RUN apk add --no-cache libc6-compat

# Default auf Production, kann jedoch ueber NODE_ENV=development ueberschrieben werden
ENV NODE_ENV=production \
	NEXT_HOST=0.0.0.0 \
	NEXT_PORT=3000

# Volles Projekt kopieren, damit auch der Dev-Server alle Quellcodes findet
COPY --from=build /app ./

EXPOSE 3000
CMD ["sh","-c","if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev -- -H \"$NEXT_HOST\" -p \"$NEXT_PORT\"; else npm run start -- -H \"$NEXT_HOST\" -p \"$NEXT_PORT\"; fi"]
