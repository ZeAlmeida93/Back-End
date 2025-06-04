# Movie Trailer Rating API

This project implements the final backend exercise with authentication, movie management and role based access.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in `04_Final-Project` with the following variables:
   ```bash
   MONGO_URI=mongodb://localhost:27017/movies
   SECRET_KEY=your_jwt_secret
   PORT=7989 # optional
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Start the server:
   ```bash
   node dist/main.js
   ```

## Usage

- Register with `POST /auth/register` and login via `POST /auth/login` to receive a JWT.
- Use the token in the `Authorization` header as `Bearer <token>` to access protected endpoints.
- Admin users can manage movies and other users.

## Troubleshooting

If you see `TypeError: argument handler must be a function`, verify that your route files import the router from **Express**:

```ts
import { Router } from 'express';
```

Using the `router` package instead of Express will cause this error.
