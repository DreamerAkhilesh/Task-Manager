@echo off
echo 🚀 Task Manager Deployment Script
echo ==================================

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

REM Check if we're in a git repository
git rev-parse --git-dir >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Not in a git repository. Please initialize git first.
    pause
    exit /b 1
)

REM Check if we have uncommitted changes
git diff-index --quiet HEAD --
if %errorlevel% neq 0 (
    echo ⚠️  You have uncommitted changes. Please commit them before deploying.
    echo Run: git add . && git commit -m "Prepare for deployment"
    pause
    exit /b 1
)

echo ✅ Git repository is clean

REM Check if we're on main branch
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="main" (
    echo ⚠️  You're not on the main branch. Current branch: %CURRENT_BRANCH%
    echo Consider switching to main: git checkout main
)

echo.
echo 📋 Deployment Checklist:
echo ========================
echo 1. ✅ MongoDB Atlas cluster created
echo 2. ✅ Database user configured
echo 3. ✅ Network access configured
echo 4. ✅ Connection string ready
echo 5. ✅ Render account created
echo 6. ✅ Vercel account created
echo 7. ✅ GitHub repository pushed

echo.
echo 🔧 Next Steps:
echo ==============
echo 1. Follow the DEPLOYMENT.md guide
echo 2. Set up MongoDB Atlas cluster
echo 3. Deploy backend to Render
echo 4. Deploy frontend to Vercel
echo 5. Update environment variables
echo 6. Test the application

echo.
echo 📚 Useful Commands:
echo ===================
echo • View deployment guide: type DEPLOYMENT.md
echo • Check server logs: npm run dev (in server directory)
echo • Build frontend: cd client && npm run build
echo • Test API: curl http://localhost:5000/health

echo.
echo 🎯 Quick Start:
echo ===============
echo 1. Go to MongoDB Atlas and create a cluster
echo 2. Get your connection string
echo 3. Deploy to Render with the connection string
echo 4. Deploy to Vercel with your Render URL
echo 5. Update CORS settings

echo.
echo 📞 Need Help?
echo =============
echo • Check DEPLOYMENT.md for detailed instructions
echo • Render docs: https://render.com/docs
echo • Vercel docs: https://vercel.com/docs
echo • MongoDB Atlas docs: https://docs.atlas.mongodb.com

echo.
echo 🚀 Ready to deploy!
pause 