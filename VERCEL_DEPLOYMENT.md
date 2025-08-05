# 🚀 Vercel Deployment Guide

## ✅ Quick Fix for Your Current Issue

The error you're seeing is because Vercel is looking for a secret that doesn't exist. Here's how to fix it:

### Step 1: Clear the Environment Variables
1. In the Vercel deployment form, **remove** the current environment variables
2. **Delete** the `REACT_APP_API_URL` entry completely

### Step 2: Add Environment Variables Correctly
Add these environment variables **one by one**:

**First Variable:**
- **Key**: `REACT_APP_API_URL`
- **Value**: `https://task-manager-api-r4tk.onrender.com/api`
- **Environment**: Production, Preview, Development

**Second Variable:**
- **Key**: `REACT_APP_ENV`
- **Value**: `production`
- **Environment**: Production, Preview, Development

### Step 3: Verify Configuration
Make sure your deployment settings are:

- **Framework Preset**: Create React App
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

## 🔧 Alternative Method: Use vercel.json

If the above doesn't work, the `vercel.json` file I created will handle the environment variables automatically.

## 🚀 Deploy

1. Click **Deploy**
2. Wait for the build to complete
3. Your app will be available at the provided URL

## 🔍 Troubleshooting

### If you still get the secret error:
1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Go to "Environment Variables"
4. Delete any existing `REACT_APP_API_URL` entries
5. Add the variable again with the correct value

### If the build fails:
1. Check the build logs
2. Ensure all environment variables are set correctly
3. Verify the API URL is accessible

## 📋 Post-Deployment Checklist

After successful deployment:

1. **Test the application** at your Vercel URL
2. **Verify API connection** by trying to register/login
3. **Check browser console** for any CORS errors
4. **Update backend CORS** if needed (add your Vercel domain to allowed origins)

## 🔐 Security Note

Your backend CORS is currently configured for `localhost:3000`. After deployment, you may need to update your backend's `CLIENT_URL` environment variable to include your Vercel domain.

## 📞 Support

If you continue to have issues:
1. Check the Vercel build logs
2. Verify environment variables are set correctly
3. Test the API URL directly: `curl https://task-manager-api-r4tk.onrender.com/health` 