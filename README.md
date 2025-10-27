# Mern-Blog

A full-stack MERN (MongoDB, Express, React, Node) blog application — simple, extensible, and ready for development and deployment. This repository contains the backend API and the frontend React app to create, read, update, and delete blog posts, manage users and authentication, and handle file uploads (if enabled).

> NOTE: Adjust the commands and environment variables below to match the actual folder structure and scripts in this repository if they differ (for example, `server/` and `client/` directories).

Live :https://mern-blog-flame.vercel.app

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started (Development)](#getting-started-development)
- [Environment Variables](#environment-variables)
- [Project Structure (Example)](#project-structure-example)
- [API (Example Endpoints)](#api-example-endpoints)
- [Build & Production](#build--production)
- [Deployment Notes](#deployment-notes)
- [Contributing](#contributing)
- [Testing](#testing)
- [License](#license)
- [Contact](#contact)

## Features

- User authentication (register / login) — JWT-based
- Create, read, update, and delete blog posts
- Rich text or markdown post content (configurable on the frontend)
- Image upload support (optional — e.g., Cloudinary or local storage)
- Pagination and searching (optional)
- Role-based access control hooks (owner/admin checks)

## Tech Stack

- Frontend: React (+ hooks / router / context or Redux)
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Auth: JSON Web Tokens (JWT)
- Optional: Cloudinary or other file storage for images

## Prerequisites

- Node.js (>=16 recommended)
- npm or yarn
- MongoDB instance (local or hosted, e.g., MongoDB Atlas)

## Getting Started (Development)

This section assumes the repo is organized with `server/` and `client/` folders. If your repo is structured differently, adapt accordingly.

1. Clone the repository

   ```bash
   git clone https://github.com/Afzalshaikh78/Mern-Blog.git
   cd Mern-Blog
   ```

2. Install server dependencies

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies (in a separate terminal)

   ```bash
   cd ../client
   npm install
   ```

4. Configure environment variables (see below)

5. Start the backend and frontend

   - Option A — run independently:

     Backend:
     ```bash
     cd server
     npm run dev     # or: node index.js / npm start
     ```

     Frontend:
     ```bash
     cd client
     npm start
     ```

   - Option B — single command (monorepo with concurrently):
     If the project includes a root script that runs both client and server, you can run:
     ```bash
     npm run dev
     ```

6. Open the app:
   - Frontend: http://localhost:3000 (default CRA)
   - Backend API: http://localhost:5000 (or the port you configured)

## Environment Variables

Example environment variables (backend `.env`):

- MONGO_URI - MongoDB connection string
- JWT_SECRET - Secret used to sign JWT tokens
- PORT - (optional) backend server port, e.g., 5000
- CLIENT_URL - (optional) frontend origin for CORS
- CLOUDINARY_URL or CLOUD_NAME / CLOUD_API_KEY / CLOUD_API_SECRET - if using Cloudinary for uploads

Create `.env` in the server folder and add:

```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
CLIENT_URL=http://localhost:3000
```

If the app uses a frontend `.env`, add the client-side variables there (e.g., REACT_APP_API_URL).

## Project Structure (Example)

This is an example layout commonly used for MERN blog apps:

- /server
  - /controllers
  - /models
  - /routes
  - /middleware
  - server.js or index.js
- /client
  - /src
    - /components
    - /pages
    - /services (API wrappers)
    - App.js
- README.md
- .gitignore
- package.json (root or per-folder)

Adjust to match the actual structure in this repository.

## API (Example Endpoints)

These endpoints are common for a blog API — verify exact routes in your `server/routes`:

- Auth
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/auth/me
- Posts
  - GET /api/posts
  - GET /api/posts/:id
  - POST /api/posts
  - PUT /api/posts/:id
  - DELETE /api/posts/:id
- Users (admin features)
  - GET /api/users
  - GET /api/users/:id

All protected routes typically require `Authorization: Bearer <token>`.

## Build & Production

1. Build the frontend:

   ```bash
   cd client
   npm run build
   ```

2. Serve the build from the backend (if configured):

   - Copy `client/build` to a directory the server can serve, or ensure Express static middleware points to `client/build`.

3. Start the server in production mode:

   ```bash
   cd server
   NODE_ENV=production node index.js
   ```

Consider Dockerizing the app or using platforms like Heroku, Render, or DigitalOcean for deployment.

## Deployment Notes

- For Heroku: set environment variables in the dashboard, set the buildpack if necessary, and ensure the server serves the React build.
- For Vercel/Netlify: deploy the client and host the backend separately (e.g., on Render or Heroku).
- For MongoDB Atlas: whitelist your server IP (or set to accept connections from your hosting service).

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/some-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push: `git push origin feat/some-feature`
5. Open a Pull Request describing the change

Please add tests where appropriate and keep code style consistent.

## Testing

If there are tests configured, run them with:

```bash
# server tests
cd server
npm test

# client tests
cd client
npm test
```

Otherwise consider adding unit and integration tests with Jest, Supertest (server), and React Testing Library (client).

## License

This repository does not declare a license. If you want to open source it, consider adding an OSI-approved license (for example, MIT).

## Contact

Maintainer: Afzalshaikh78

If you want changes to this README (add a demo link, screenshots, or specific environment variables), tell me what to include or paste the actual `package.json` and folder layout and I'll update the README to exactly match the repo.
