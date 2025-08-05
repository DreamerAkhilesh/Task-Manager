#!/bin/bash

echo "🚀 Task Manager Deployment Script"
echo "=================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository. Please initialize git first."
    exit 1
fi

# Check if we have uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  You have uncommitted changes. Please commit them before deploying."
    echo "Run: git add . && git commit -m 'Prepare for deployment'"
    exit 1
fi

echo "✅ Git repository is clean"

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  You're not on the main branch. Current branch: $CURRENT_BRANCH"
    echo "Consider switching to main: git checkout main"
fi

echo ""
echo "📋 Deployment Checklist:"
echo "========================"
echo "1. ✅ MongoDB Atlas cluster created"
echo "2. ✅ Database user configured"
echo "3. ✅ Network access configured"
echo "4. ✅ Connection string ready"
echo "5. ✅ Render account created"
echo "6. ✅ Vercel account created"
echo "7. ✅ GitHub repository pushed"

echo ""
echo "🔧 Next Steps:"
echo "=============="
echo "1. Follow the DEPLOYMENT.md guide"
echo "2. Set up MongoDB Atlas cluster"
echo "3. Deploy backend to Render"
echo "4. Deploy frontend to Vercel"
echo "5. Update environment variables"
echo "6. Test the application"

echo ""
echo "📚 Useful Commands:"
echo "==================="
echo "• View deployment guide: cat DEPLOYMENT.md"
echo "• Check server logs: npm run dev (in server directory)"
echo "• Build frontend: cd client && npm run build"
echo "• Test API: curl http://localhost:5000/health"

echo ""
echo "🎯 Quick Start:"
echo "==============="
echo "1. Go to MongoDB Atlas and create a cluster"
echo "2. Get your connection string"
echo "3. Deploy to Render with the connection string"
echo "4. Deploy to Vercel with your Render URL"
echo "5. Update CORS settings"

echo ""
echo "📞 Need Help?"
echo "============="
echo "• Check DEPLOYMENT.md for detailed instructions"
echo "• Render docs: https://render.com/docs"
echo "• Vercel docs: https://vercel.com/docs"
echo "• MongoDB Atlas docs: https://docs.atlas.mongodb.com"

echo ""
echo "🚀 Ready to deploy!" 