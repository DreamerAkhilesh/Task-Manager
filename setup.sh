#!/bin/bash

echo "🚀 Setting up Task Manager Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating server .env file..."
    cp env.example .env
    echo "⚠️  Please edit server/.env with your configuration"
else
    echo "✅ Server .env file already exists"
fi

cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating client .env file..."
    cp env.example .env
    echo "⚠️  Please edit client/.env with your configuration"
else
    echo "✅ Client .env file already exists"
fi

cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Edit server/.env with your MongoDB URI and JWT secret"
echo "2. Edit client/.env with your API URL"
echo "3. Start MongoDB (if not using Docker)"
echo "4. Run 'npm run dev' in server directory"
echo "5. Run 'npm start' in client directory"
echo "6. Visit http://localhost:3000/create-first-admin to create your first admin"
echo ""
echo "🐳 Or use Docker: docker-compose up" 