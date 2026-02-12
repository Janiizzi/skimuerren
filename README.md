## Overview

This repo contains the **Skimuerren** raffle app: a Next.js frontend (App Router) and a FastAPI backend that stores raffles on disk. Both services are wired together with Docker Compose and proxied behind Caddy in production.

## Local development

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

Hot reloading is enabled because the project directory is mounted into the containers.

## Password protection

The entire Next.js site is protected by HTTP Basic Auth via `frontend/middleware.ts`. Credentials are defined through the `BASIC_AUTH_USERS` environment variable that is read at build/runtime.

```
BASIC_AUTH_USERS=user1:password1,user2:supersafe
```

- Multiple accounts can be defined by separating entries with commas.
- Each entry must follow `username:password` (no additional colons).
- If the variable is unset or empty, the middleware is skipped.

### Docker Compose

`docker-compose.yml` already exposes a placeholder:

```
environment:
	- BASIC_AUTH_USERS=admin:changeme
```

Change this before deploying anywhere outside of your laptop. You can also move the variable into an `.env` file that Docker Compose loads automatically.

### Without Docker

Create a `.env.local` inside `frontend/` and add the same variable. Next.js will pick it up when you run `npm run dev`.

## Useful commands

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Make sure the frontend talks to the correct backend URL via `NEXT_PUBLIC_API_URL` when running outside of Docker.
