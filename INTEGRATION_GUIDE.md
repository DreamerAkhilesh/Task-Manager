# Frontend-Backend Integration Guide

## Overview
Backend: `https://task-manager-api-r4tk.onrender.com`
Frontend: `https://task-manager-ruddy-five-34.vercel.app`

## ✅ Integration Status
- Backend deployed and accessible
- Frontend configured to use production API
- CORS configured for deployed frontend
- Environment variables set up

## Configuration

### Frontend Environment
Vercel → Project Settings → Environment Variables:
```env
REACT_APP_API_URL=https://task-manager-api-r4tk.onrender.com/api
REACT_APP_ENV=production
```

### API Service
- Uses `REACT_APP_API_URL`
- Falls back to `http://localhost:5000/api` in dev
- Attaches JWT from localStorage

### Backend CORS
- Accepts `CLIENT_URL` (Render env) and `*.vercel.app`
- Ensure `CLIENT_URL=https://task-manager-ruddy-five-34.vercel.app`

## Usage

### Development
```bash
cd client
npm start
```
- Runs on http://localhost:3000
- Calls deployed API by default (via env)

### Production
Built by Vercel. Browse the live URL.

## Testing

- Health:
```bash
curl https://task-manager-api-r4tk.onrender.com/health
```
- Endpoints:
  - Auth: `https://task-manager-api-r4tk.onrender.com/api/auth`
  - Users: `https://task-manager-api-r4tk.onrender.com/api/users`
  - Tasks: `https://task-manager-api-r4tk.onrender.com/api/tasks`

## Troubleshooting

- CORS: Update Render `CLIENT_URL`, redeploy backend
- 401: Ensure login succeeded and Authorization header is present
- Switching envs: Clear site data and login again

## Next Steps
- Monitor logs in Render/Vercel
- Add custom domain(s)
- Keep secrets in env vars only 