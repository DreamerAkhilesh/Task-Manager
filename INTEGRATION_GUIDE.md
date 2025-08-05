# Frontend-Backend Integration Guide

## Overview
Your backend is successfully deployed at: `https://task-manager-api-r4tk.onrender.com`

## ✅ Integration Status
- ✅ Backend deployed and accessible
- ✅ Frontend configured to use production API
- ✅ CORS properly configured
- ✅ Environment variables set up

## 🔧 Configuration Steps Completed

### 1. Frontend Environment Configuration
The frontend is now configured to use your deployed backend:

**File: `client/.env`**
```env
REACT_APP_API_URL=https://task-manager-api-r4tk.onrender.com/api
```

### 2. API Configuration
The API service (`client/src/services/api.js`) is already configured to:
- Use the environment variable `REACT_APP_API_URL`
- Fall back to `http://localhost:5000/api` for development
- Handle authentication tokens automatically
- Include proper error handling

### 3. Backend CORS Configuration
The backend (`server/server.js`) is configured to accept requests from:
- `http://localhost:3000` (development)
- `https://localhost:3000` (development with HTTPS)
- Any URL specified in `CLIENT_URL` environment variable

## 🚀 How to Use

### Development Mode
1. **Start the frontend:**
   ```bash
   cd client
   npm start
   ```
   The app will run on `http://localhost:3000`

2. **The frontend will automatically connect to your deployed backend** at `https://task-manager-api-r4tk.onrender.com`

### Production Build
1. **Build for production:**
   ```bash
   cd client
   npm run build:prod
   ```

2. **Deploy the build folder** to your hosting platform (Vercel, Netlify, etc.)

## 🔍 Testing the Integration

### 1. Health Check
Your backend is responding correctly:
```bash
curl https://task-manager-api-r4tk.onrender.com/health
```
Response: `{"status":"ok","timestamp":"2025-08-05T19:58:37.286Z","uptime":374.536350458,"environment":"development","version":"1.0.0"}`

### 2. API Endpoints Available
- **Authentication:** `https://task-manager-api-r4tk.onrender.com/api/auth`
- **Users:** `https://task-manager-api-r4tk.onrender.com/api/users`
- **Tasks:** `https://task-manager-api-r4tk.onrender.com/api/tasks`

### 3. Frontend Testing
1. Open your browser to `http://localhost:3000`
2. Try to register/login
3. Check the browser's Network tab to see API calls to your deployed backend

## 🛠️ Troubleshooting

### Common Issues

#### 1. CORS Errors
If you see CORS errors in the browser console:
- The backend is already configured to accept requests from `localhost:3000`
- If deploying frontend to a different domain, update the `CLIENT_URL` in your backend environment

#### 2. API Connection Issues
- Verify the backend is running: `curl https://task-manager-api-r4tk.onrender.com/health`
- Check the `.env` file has the correct API URL
- Ensure the frontend is using the environment variable

#### 3. Authentication Issues
- Clear browser localStorage if switching between development/production
- Check that tokens are being stored correctly
- Verify the JWT_SECRET is set in your backend environment

### Debug Steps
1. **Check API calls in browser DevTools:**
   - Open Network tab
   - Look for calls to `task-manager-api-r4tk.onrender.com`
   - Check response status codes

2. **Verify environment variables:**
   ```javascript
   console.log('API URL:', process.env.REACT_APP_API_URL);
   ```

3. **Test API directly:**
   ```bash
   curl -X POST https://task-manager-api-r4tk.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password"}'
   ```

## 📋 Next Steps

### For Development
1. Start the frontend: `npm start`
2. Test all features (login, register, tasks, users)
3. Monitor browser console for any errors

### For Production Deployment
1. Build the frontend: `npm run build:prod`
2. Deploy the `build` folder to your hosting platform
3. Update the backend's `CLIENT_URL` to your frontend's production URL
4. Test the production deployment

## 🔐 Security Notes

- The backend uses JWT tokens for authentication
- CORS is properly configured for security
- Rate limiting is enabled on the backend
- HTTPS is enforced in production

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify the backend health endpoint
3. Test API endpoints directly with curl
4. Check environment variables are set correctly

Your integration is now complete and ready for use! 🎉 