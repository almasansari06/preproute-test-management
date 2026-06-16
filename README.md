# Preproute Test Management App

Vite + React + TypeScript frontend for login, dashboard, create/edit test, add questions, preview and publish flow.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Update `.env`:

```env
VITE_API_BASE_URL=https://your-api-url.com
```

## Features

- Login with userId/password
- JWT token stored in localStorage or sessionStorage
- Axios interceptor adds `Authorization: Bearer <token>`
- Protected dashboard routes
- Test listing with search
- Create/Edit test form
- Subject, topics and sub-topics API integration
- Add MCQ questions locally and bulk save
- Preview questions and publish test

## Routes

- `/login`
- `/dashboard`
- `/tests/create`
- `/tests/:id/edit`
- `/tests/:id/questions`
- `/tests/:id/preview`
