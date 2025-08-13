# Task Management System

A full-stack web application for managing tasks with user authentication, role-based access control, and file attachments.

## Live Deployment

- Frontend: https://task-manager-ruddy-five-34.vercel.app
- Backend (API): https://task-manager-api-r4tk.onrender.com
- Health: https://task-manager-api-r4tk.onrender.com/health

## Features

- 🔒 JWT-based authentication with role-based access control
- 👥 User management (Admin and User roles)
- 📝 Task management with CRUD operations
- 📎 PDF document attachments (up to 3 per task)
- 🔍 Advanced filtering and sorting
- 📱 Responsive design with modern UI

## Tech Stack

### Backend
- Node.js + Express
- MongoDB
- JWT Authentication
- Jest for testing

### Frontend
- React
- Tailwind CSS
- Redux Toolkit
- React Router

## Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose (optional)
- MongoDB (if running locally)

## Setup Instructions

### 🚀 Quick Start (Using Deployed Backend)

- Open the live app: https://task-manager-ruddy-five-34.vercel.app
- Or run the frontend locally against the deployed API:

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Create a `.env` file in `client/` with:
```env
REACT_APP_API_URL=https://task-manager-api-r4tk.onrender.com/api
REACT_APP_ENV=production
```

4. Start the frontend:
```bash
npm start
```

5. Create First Admin (only once):
- Visit `/create-first-admin` on your frontend (live or local)
- Create the first admin, then login

The frontend connects to: `https://task-manager-api-r4tk.onrender.com`

### 🔧 Full Local Setup (Optional)

If you want to run both frontend and backend locally:

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
```bash
# Backend
yarn install || npm install --prefix server
# Frontend
npm install --prefix client
```

3. Environment Setup:

Backend:
```bash
cd server
cp env.example .env
# Ensure CLIENT_URL=http://localhost:3000
```

Frontend:
```bash
cd client
cp env.example .env
# Ensure REACT_APP_API_URL=http://localhost:5000/api
```

4. Start MongoDB (Docker example):
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. Run with Docker (Recommended):
```bash
docker-compose up
```

6. Run locally:
```bash
# Backend
cd server
npm run dev
# Frontend
cd ../client
npm start
```

7. Create First Admin: (This route should be used to create Admin)
- Visit `http://localhost:3000/create-first-admin`
- Create your first admin account

## 🚀 Deployment

- Backend: Render (https://render.com)
- Frontend: Vercel (https://vercel.com)
- Database: MongoDB Atlas

### ✅ Backend Integration Status

Deployed backend: https://task-manager-api-r4tk.onrender.com

- Backend URL: `https://task-manager-api-r4tk.onrender.com`
- Health Check: ✅ Working
- API Endpoints: ✅ Accessible
- CORS: ✅ Configured for localhost and Vercel domain

See [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)

### Quick Deployment

1. Run the deployment script:
```bash
# Windows
deploy.bat
# Unix/Mac
chmod +x deploy.sh
./deploy.sh
```

2. See [DEPLOYMENT.md](DEPLOYMENT.md) for full details

## API Documentation

See server controllers and routes. Health at `/health`.

## Troubleshooting

### 401 Unauthorized (Tasks/Users)
- You must be logged in; ensure a JWT token is present in `localStorage`
- Check requests include `Authorization: Bearer <token>` header
- If switching environments (local ↔ deployed), clear site data and login again

### CORS Errors
- Backend must allow your frontend origin (Render env `CLIENT_URL`)
- Frontend must point to the correct API (`REACT_APP_API_URL`)
- After changing env vars, redeploy both services

### Logout Redirect/Cache
- Logout clears token immediately; if redirected back to dashboard, clear site data and retry

### Browser Console WebSocket warnings
- Errors like `ws://localhost:8098/` are from dev extensions and are harmless in production

## Security

- 🔒 JWT Authentication
- 🛡️ Rate Limiting
- 🔐 CORS with explicit origins
- 📝 Helmet security headers

## Performance

- ⚡ Compression
- 📦 Optimized builds
- 🔄 Caching static assets

## License

MIT 
