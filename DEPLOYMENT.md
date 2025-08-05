# 🚀 Deployment Guide: Render + Vercel + MongoDB Atlas

This guide will walk you through deploying your Task Manager application to production using Render, Vercel, and MongoDB Atlas.

## 📋 Prerequisites

- [GitHub](https://github.com) account
- [Render](https://render.com) account (free tier available)
- [Vercel](https://vercel.com) account (free tier available)
- [MongoDB Atlas](https://mongodb.com/atlas) account (free tier available)

## 🗄️ Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Cluster

1. **Sign up/Login** to [MongoDB Atlas](https://mongodb.com/atlas)
2. **Create a new project** (e.g., "Task Manager")
3. **Build a database**:
   - Choose "FREE" tier (M0)
   - Select cloud provider (AWS/Google Cloud/Azure)
   - Choose region closest to your users
   - Click "Create"

### 1.2 Configure Database Access

1. **Go to Database Access** in the left sidebar
2. **Add New Database User**:
   - Username: `task-manager-user`
   - Password: Generate a strong password
   - Built-in Role: `Read and write to any database`
   - Click "Add User"

### 1.3 Configure Network Access

1. **Go to Network Access** in the left sidebar
2. **Add IP Address**:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

### 1.4 Get Connection String

1. **Go to Database** in the left sidebar
2. **Click "Connect"** on your cluster
3. **Choose "Connect your application"**
4. **Copy the connection string**
5. **Replace `<password>` with your database user password**
6. **Replace `<dbname>` with `task-manager`**

**Example connection string:**
```
mongodb+srv://task-manager-user:yourpassword@cluster0.xxxxx.mongodb.net/task-manager?retryWrites=true&w=majority
```

## 🌐 Step 2: Backend Deployment (Render)

### 2.1 Connect GitHub Repository

1. **Login** to [Render](https://render.com)
2. **Click "New +"** → "Web Service"
3. **Connect your GitHub repository**
4. **Select the repository** containing your Task Manager code

### 2.2 Configure Web Service

**Basic Settings:**
- **Name**: `task-manager-api`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty (root of repository)
- **Build Command**: `cd server && npm install`
- **Start Command**: `cd server && npm start`

**Environment Variables:**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://task-manager-user:yourpassword@cluster0.xxxxx.mongodb.net/task-manager?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
CLIENT_URL=https://your-app.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

### 2.3 Deploy

1. **Click "Create Web Service"**
2. **Wait for deployment** (usually 2-5 minutes)
3. **Note your Render URL** (e.g., `https://task-manager-api.onrender.com`)

## 🎨 Step 3: Frontend Deployment (Vercel)

### 3.1 Connect GitHub Repository

1. **Login** to [Vercel](https://vercel.com)
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Select the repository**

### 3.2 Configure Project

**Framework Preset**: `Create React App`
**Root Directory**: `client`
**Build Command**: `npm run build`
**Output Directory**: `build`
**Install Command**: `npm install`

### 3.3 Environment Variables

**Add these environment variables:**
```
REACT_APP_API_URL=https://your-render-url.onrender.com/api
REACT_APP_ENV=production
```

### 3.4 Deploy

1. **Click "Deploy"**
2. **Wait for deployment** (usually 1-3 minutes)
3. **Note your Vercel URL** (e.g., `https://task-manager.vercel.app`)

## 🔧 Step 4: Update Backend CORS

After getting your Vercel URL, update the Render environment variables:

1. **Go back to Render dashboard**
2. **Select your web service**
3. **Go to Environment tab**
4. **Update `CLIENT_URL`** with your Vercel URL
5. **Redeploy** the service

## 🧪 Step 5: Testing

### 5.1 Test Backend API

```bash
# Test health endpoint
curl https://your-render-url.onrender.com/health

# Expected response:
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "version": "1.0.0"
}
```

### 5.2 Test Frontend

1. **Visit your Vercel URL**
2. **Create first admin account**
3. **Test login functionality**
4. **Test task creation and management**

## 🔒 Step 6: Security Checklist

- [ ] **JWT Secret**: Use a strong, unique secret
- [ ] **MongoDB Password**: Use a strong password
- [ ] **CORS**: Only allow your Vercel domain
- [ ] **Rate Limiting**: Configured and working
- [ ] **HTTPS**: Both Render and Vercel provide HTTPS
- [ ] **Environment Variables**: All secrets are in environment variables

## 📊 Step 7: Monitoring

### 7.1 Render Monitoring

- **Logs**: Available in Render dashboard
- **Health Checks**: Automatic health monitoring
- **Uptime**: Monitor service availability

### 7.2 Vercel Analytics

- **Performance**: Built-in performance monitoring
- **Analytics**: Optional analytics integration
- **Deployments**: Automatic deployment tracking

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure `CLIENT_URL` is set correctly in Render
   - Check that the URL includes `https://`

2. **Database Connection Issues**:
   - Verify MongoDB Atlas network access allows all IPs
   - Check connection string format
   - Ensure database user has correct permissions

3. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

4. **Environment Variables**:
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify variable values are correct

### Getting Help

- **Render Support**: [Render Documentation](https://render.com/docs)
- **Vercel Support**: [Vercel Documentation](https://vercel.com/docs)
- **MongoDB Atlas**: [Atlas Documentation](https://docs.atlas.mongodb.com)

## 🔄 Step 8: Continuous Deployment

Both Render and Vercel automatically deploy when you push to your main branch:

1. **Make changes to your code**
2. **Push to GitHub**
3. **Automatic deployment** will trigger
4. **Monitor deployment** in respective dashboards

## 📈 Next Steps

- **Custom Domain**: Add your own domain name
- **SSL Certificate**: Automatic with Render/Vercel
- **Monitoring**: Set up external monitoring (UptimeRobot, etc.)
- **Backups**: Configure MongoDB Atlas backups
- **Scaling**: Upgrade to paid plans when needed

---

**🎉 Congratulations!** Your Task Manager application is now deployed and ready for production use. 