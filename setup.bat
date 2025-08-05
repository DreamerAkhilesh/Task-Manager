@echo off
echo 🚀 Setting up Task Manager Application...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install server dependencies
echo 📦 Installing server dependencies...
cd server
call npm install

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating server .env file...
    copy env.example .env
    echo ⚠️  Please edit server/.env with your configuration
) else (
    echo ✅ Server .env file already exists
)

cd ..

REM Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating client .env file...
    copy env.example .env
    echo ⚠️  Please edit client/.env with your configuration
) else (
    echo ✅ Client .env file already exists
)

cd ..

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Edit server/.env with your MongoDB URI and JWT secret
echo 2. Edit client/.env with your API URL
echo 3. Start MongoDB (if not using Docker)
echo 4. Run 'npm run dev' in server directory
echo 5. Run 'npm start' in client directory
echo 6. Visit http://localhost:3000/create-first-admin to create your first admin
echo.
echo 🐳 Or use Docker: docker-compose up
pause 