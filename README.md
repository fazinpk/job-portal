# Job Portal — Admin Portal

A job portal admin panel for managing job categories and postings.

Admins can log in, view dashboard stats, and create/edit/delete/search/filter job postings.

## Tech Stack

**Frontend:** React 19, Vite, TypeScript, Redux Toolkit + RTK Query, React Hook Form + Zod, Tailwind CSS, Headless UI

**Backend:** Node.js, Express, Prisma ORM, PostgreSQL, JWT authentication

## Project Structure

```
job-portal/
├── backend/   # Express API + Prisma
└── frontend/  # React admin portal
```

## Prerequisites

- Node.js 18+
- PostgreSQL (local instance, or a hosted connection string)

## Backend Setup

### Database setup

`npx prisma migrate deploy` applies migrations but does not create the database itself — it must already exist before running it. Either:

- **Local Postgres:** create it with `createdb job_portal` (or via `psql`: `CREATE DATABASE job_portal;`), or
- **Hosted Postgres** (Neon, Supabase, Render, etc.): the database is created automatically when you provision it — just copy its connection string into `DATABASE_URL`.

```bash
cd backend
npm install
cp .env.example .env   # then fill in real values, see below
npx prisma migrate deploy
npm run prisma:seed
npm run dev
```

The API runs on `http://localhost:4000` by default.

### Backend environment variables (`backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | Port the API listens on (default `4000`) |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `ACCESS_TOKEN_TTL` | Access token lifetime (e.g. `15m`) |
| `REFRESH_TOKEN_TTL_DAYS` | Refresh token lifetime in days |
| `CLIENT_ORIGIN` | Frontend origin, for CORS (e.g. `http://localhost:5173`) |

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

### Seeded data

`npm run prisma:seed` creates one admin account, 6 categories, and 15 sample jobs. It's idempotent — safe to run more than once.

**Admin login:** `admin@jobportal.com` / `Admin@1234`

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # then fill in the API URL, see below
npm run dev
```

The app runs on `http://localhost:5173` by default.

### Frontend environment variables (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API (e.g. `http://localhost:4000/api`) |

## Available Scripts

**Backend** (`cd backend`)

| Command | Description |
|---|---|
| `npm run dev` | Start the API with auto-reload |
| `npm start` | Start the API (production) |
| `npm run prisma:migrate` | Create/apply a migration in development |
| `npm run prisma:deploy` | Apply migrations (production) |
| `npm run prisma:seed` | Seed the database |
| `npm run prisma:studio` | Open Prisma Studio (DB browser) |

**Frontend** (`cd frontend`)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run oxlint |
| `npm run preview` | Preview the production build locally |

## Features

- JWT authentication (short-lived access token + rotating httpOnly refresh cookie), with silent refresh on page load and automatic retry on 401
- Dashboard with job stats and a jobs-by-category breakdown
- Job listing with search (debounced), category/experience filters, and pagination
- Job create/edit (shared form) and delete, with confirmation dialogs for destructive actions
- Job details page
- Responsive layout (desktop, tablet, and mobile)
