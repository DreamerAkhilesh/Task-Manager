# ✅ Backend-Frontend Integration Summary

- Backend: https://task-manager-api-r4tk.onrender.com
- Frontend: https://task-manager-ruddy-five-34.vercel.app

## Configuration

Frontend (Vercel env):
```env
REACT_APP_API_URL=https://task-manager-api-r4tk.onrender.com/api
REACT_APP_ENV=production
```

Backend (Render env):
```env
CLIENT_URL=https://task-manager-ruddy-five-34.vercel.app
JWT_SECRET=<strong-secret>
MONGODB_URI=<atlas-connection>
```

## Notes
- CORS is configured to allow your Vercel domain and *.vercel.app
- Auth token stored in localStorage and attached to API requests
- Logout clears token even if network fails

## Health
- `GET /health` → OK

## Troubleshooting
- CORS: Verify CLIENT_URL and redeploy backend
- 401: Ensure Authorization header is present; re-login if needed
- Clear site data when switching envs 