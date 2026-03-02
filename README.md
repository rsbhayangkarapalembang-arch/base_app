# Simple Auth CRUD API (Node.js + Express + Prisma + MySQL)

REST API production-ready style untuk fitur:
- Register
- Login
- CRUD User

## Tech Stack
- Node.js + Express
- Prisma + MySQL
- Joi validation
- Winston logging
- UUID (ID user)
- Bcrypt (password hashing)
- Jest + Supertest (unit test endpoint)

## Struktur Folder

```bash
src/
  app.js
  server.js
  config/
    env.js
    logger.js
    prisma.js
  controllers/
  middlewares/
  repositories/
  routes/
  services/
  utils/
  validators/
prisma/
  schema.prisma
tests/
```

## Setup
1. Copy env
```bash
cp .env.example .env
```

2. Install dependency
```bash
npm install
```

3. Generate Prisma client
```bash
npm run prisma:generate
```

4. Run migration
```bash
npm run prisma:migrate -- --name init
```

5. Start app
```bash
npm run dev
```

## API Endpoint
Base URL: `/api/v1`

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Users
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

## Test
```bash
npm test
```
