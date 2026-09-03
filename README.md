# Job Portal — Admin Portal

A job portal admin panel for managing companies, categories, and job postings.

Admins can log in, view dashboard stats, and create/edit/delete/search/filter job postings and companies.

## Live Demo

- **Frontend:** https://job-portal-plum-seven-88.vercel.app
- **Backend API:** https://job-portal-ilj0.onrender.com/api

**Admin login:** `admin@jobportal.com` / `Admin@1234`

Note: the backend is on Render's free tier, so a cold link may take ~30-60s to wake up on the first request.

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
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token, for company logo uploads (see below) |

Generate a JWT secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

### Company logo uploads (Vercel Blob)

Company logos are stored in [Vercel Blob](https://vercel.com/docs/vercel-blob). To enable uploads locally:

1. In your Vercel project → **Storage** → **Create Database** → **Blob** → set access to **Public** and check "Add a read-write token env var to this connection."
2. Copy the resulting `BLOB_READ_WRITE_TOKEN` value into `backend/.env`.

Without this, everything else works — creating/editing companies just won't accept a logo file.

### Seeded data

`npm run prisma:seed` creates one admin account, 6 categories, 10 companies (with placeholder logos), and 15 sample jobs. It's idempotent — safe to run more than once. Admin login credentials are at the top of this README.

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
- Dashboard with job stats (including immediate-joiner and company counts) and a jobs-by-category breakdown
- Job listing with search (debounced), category/experience filters, and pagination
- Job create/edit (shared form) and delete, with confirmation dialogs for destructive actions, including:
  - Company (selected from the Companies list below), years of experience (free text), and an immediate-joiner flag
  - Rich-text "additional notes" field
  - Salary range shown in ₹, explicitly labeled per month
- Job details page
- Company management: list, create/edit, and delete (blocked while a company still has jobs), with logo upload
- Responsive layout (desktop, tablet, and mobile)
