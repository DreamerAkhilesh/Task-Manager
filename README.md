# Task Management System

A full-stack web application for managing tasks with user authentication, role-based access control, and file attachments.

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

### 🚀 Quick Start (With Deployed Backend)

Since the backend is already deployed, you can start the frontend immediately:

1. **Clone the repository:**
```bash
git clone <repository-url>
cd task-manager
```

2. **Install frontend dependencies:**
```bash
cd client
npm install
```

3. **Start the frontend:**
```bash
npm start
```

4. **Create First Admin:**
   - Visit `http://localhost:3000/create-first-admin`
   - Create your first admin account
   - Login and start using the application

The frontend will automatically connect to the deployed backend at `https://task-manager-api-r4tk.onrender.com`

### 🔧 Full Local Setup (Optional)

If you want to run both frontend and backend locally:

1. **Clone the repository:**
```bash
git clone <repository-url>
cd task-manager
```

2. **Install dependencies:**
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. **Environment Setup:**
   
   **Backend:**
   ```bash
   cd server
   cp env.example .env
   # Edit .env with your configuration
   ```
   
   **Frontend:**
   ```bash
   cd client
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB:**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or install MongoDB locally
   ```

5. **Run with Docker (Recommended):**
```bash
docker-compose up
```

6. **Run locally:**
```bash
# Start backend (from server directory)
cd server
npm run dev

# Start frontend (from client directory)
cd client
npm start
```

7. **Create First Admin:**
   - Visit `http://localhost:3000/create-first-admin`
   - Create your first admin account
   - Login and start using the application

## 🚀 Deployment

This application is configured for easy deployment to production using:

- **Backend**: [Render](https://render.com) (free tier available)
- **Frontend**: [Vercel](https://vercel.com) (free tier available)
- **Database**: [MongoDB Atlas](https://mongodb.com/atlas) (free tier available)

### ✅ Backend Integration Status

The backend is **successfully deployed** and integrated:

- **Backend URL**: `https://task-manager-api-r4tk.onrender.com`
- **Health Check**: ✅ Working
- **API Endpoints**: ✅ All endpoints accessible
- **CORS Configuration**: ✅ Properly configured for frontend integration

For detailed integration information, see: [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)

### Quick Deployment

1. **Run the deployment script:**
   ```bash
   # On Windows:
   deploy.bat
   
   # On Unix/Linux/Mac:
   chmod +x deploy.sh
   ./deploy.sh
   ```

2. **Follow the detailed guide:**
   - [Complete Deployment Guide](DEPLOYMENT.md)

### Deployment Features

- ✅ **Production-ready security** (rate limiting, CORS, helmet)
- ✅ **Automatic HTTPS** (provided by Render/Vercel)
- ✅ **Continuous deployment** (auto-deploy on git push)
- ✅ **Health monitoring** (automatic health checks)
- ✅ **Environment management** (secure environment variables)
- ✅ **Performance optimization** (compression, caching)

## API Documentation

API documentation is available at `/api-docs` when running the server.

## Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## Project Structure

```
task-manager/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/         # Redux store
│   │   ├── services/      # API services
│   │   └── utils/         # Utility functions
│   └── env.example        # Frontend environment example
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── env.example       # Backend environment example
├── docker-compose.yml     # Docker configuration
├── render.yaml           # Render deployment config
├── vercel.json           # Vercel deployment config
├── DEPLOYMENT.md         # Detailed deployment guide
└── README.md             # Project documentation
```

## Troubleshooting

### Common Issues:

1. **401 Unauthorized Errors:**
   - Ensure JWT_SECRET is set in server .env
   - Check that token is being stored in localStorage
   - Verify API URL configuration

2. **MongoDB Connection Issues:**
   - Ensure MongoDB is running
   - Check MONGODB_URI in server .env
   - Verify network connectivity

3. **File Upload Issues:**
   - Ensure uploads directory exists in server
   - Check file size limits
   - Verify file type restrictions

4. **CORS Issues:**
   - Check CLIENT_URL in server .env
   - Ensure frontend and backend ports match

5. **Deployment Issues:**
   - Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed troubleshooting
   - Verify environment variables are set correctly
   - Check deployment logs in Render/Vercel dashboards

## Security

- 🔒 **JWT Authentication** with secure token handling
- 🛡️ **Rate Limiting** to prevent abuse
- 🔐 **CORS Protection** with configurable origins
- 🚫 **Input Validation** and sanitization
- 📝 **Security Headers** with Helmet.js
- 🔑 **Environment Variables** for sensitive data

## Performance

- ⚡ **Compression** middleware for faster responses
- 🗄️ **Database Indexing** for optimal queries
- 📦 **Code Splitting** and lazy loading
- 🎯 **Optimized Builds** with source map generation disabled
- 🔄 **Caching** strategies for static assets

## License

MIT 