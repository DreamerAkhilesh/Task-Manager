# 🚀 Deployment Guide: Render + Vercel + MongoDB Atlas

This guide will walk you through deploying your Task Manager application to production using Render, Vercel, and MongoDB Atlas.

## 📋 Prerequisites

- GitHub account
- Render account
- Vercel account
- MongoDB Atlas account

## 🗄️ Step 1: MongoDB Atlas Setup

1) Create a free cluster (M0), allow access from anywhere, create a DB user, and copy your connection string

## 🌐 Step 2: Backend Deployment (Render)

### Configure Web Service

- Name: task-manager-api
- Environment: Node
- Build Command: `cd server && npm install`
- Start Command: `cd server && npm start`

### Environment Variables
```
NODE_ENV=production
PORT=5000
MONGODB_URI=<your Atlas connection string>
JWT_SECRET=<strong-secret>
CLIENT_URL=https://task-manager-ruddy-five-34.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

Deploy and note your backend URL:
- https://task-manager-api-r4tk.onrender.com

## 🎨 Step 3: Frontend Deployment (Vercel)

- Framework Preset: Create React App
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

### Environment Variables
```
REACT_APP_API_URL=https://task-manager-api-r4tk.onrender.com/api
REACT_APP_ENV=production
```

Deploy and note your frontend URL:
- https://task-manager-ruddy-five-34.vercel.app

## 🔧 Step 4: Update Backend CORS

Ensure your backend allows your Vercel domain via `CLIENT_URL`. The server also accepts any `*.vercel.app` origin.

After updating env, redeploy your backend on Render.

## 🧪 Step 5: Testing

- Health: `curl https://task-manager-api-r4tk.onrender.com/health`
- Open frontend and register/login
- Verify Network tab shows API calls to Render with `Authorization: Bearer <token>` after login

## 🔒 Security Checklist

- Use strong `JWT_SECRET`
- Limit CORS to your Vercel domain in production
- Keep rate limiting enabled

## 🚨 Troubleshooting

- CORS Errors: Check `CLIENT_URL` in Render, and `REACT_APP_API_URL` in Vercel
- 401 Unauthorized: Ensure you’re logged in; token exists and is sent in `Authorization` header
- Database: Verify Atlas IP allow-list and credentials

## 🔄 Continuous Deployment

Render and Vercel redeploy on push to main. Monitor logs in their dashboards.

---

**Deployed URLs**
- Frontend: https://task-manager-ruddy-five-34.vercel.app
- Backend: https://task-manager-api-r4tk.onrender.com
- Health: https://task-manager-api-r4tk.onrender.com/health 