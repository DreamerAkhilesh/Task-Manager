# FlowPilot Setup Guide

## Table of Contents
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development Setup](#development-setup)
- [Production Setup](#production-setup)
- [Database Setup](#database-setup)
- [Security Setup](#security-setup)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)

## System Requirements

### Hardware Requirements
- **Minimum**
  - CPU: 1 core @ 2.0 GHz
  - RAM: 2GB
  - Storage: 10GB SSD
  - Network: 10 Mbps

- **Recommended**
  - CPU: 2 cores @ 2.5 GHz
  - RAM: 4GB
  - Storage: 20GB SSD
  - Network: 50 Mbps

### Software Requirements
- **Operating Systems**
  - Windows 10/11
  - macOS 10.15+
  - Ubuntu 20.04 LTS or newer
  - CentOS 8 or newer

- **Required Software**
  - Node.js v14.0.0 or higher
  - MongoDB v4.4 or higher
  - npm v6.0.0 or higher
  - Git v2.20 or higher

## Installation

### 1. Repository Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/flowpilot.git

# Navigate to project directory
cd flowpilot

# Create necessary directories
mkdir -p server/uploads
mkdir -p server/logs
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flowpilot
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development
UPLOAD_PATH=./uploads
LOG_PATH=./logs
MAX_FILE_SIZE=5242880
SESSION_SECRET=your_session_secret
EOL
```

### 3. Frontend Setup
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create environment file
cat > .env << EOL
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_VERSION=$npm_package_version
REACT_APP_NAME=FlowPilot
EOL
```

## Configuration

### Database Configuration

1. **MongoDB Setup**
```bash
# Start MongoDB service
mongod --dbpath /path/to/data/db

# Create database user
mongo
> use flowpilot
> db.createUser({
    user: "flowpilot_user",
    pwd: "secure_password",
    roles: ["readWrite"]
})
```

2. **Database Initialization**
```bash
# Run database initialization script
cd server
npm run init-db
```

### Security Configuration

1. **JWT Configuration**
```javascript
// server/config/jwt.js
module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: '24h',
  refreshExpiresIn: '7d'
};
```

2. **Password Policy**
```javascript
// server/config/password.js
module.exports = {
  minLength: 8,
  requireSpecialChar: true,
  requireNumber: true,
  requireUppercase: true
};
```

## Development Setup

### 1. Start Development Servers

Using the start script:
```bash
node start.js
```

Or manually:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

### 2. Development Tools Setup

1. **VS Code Extensions**
   - ESLint
   - Prettier
   - MongoDB for VS Code
   - GitLens

2. **Postman Collection**
   - Import `postman_collection.json`
   - Set up environment variables

### 3. Testing Setup
```bash
# Install testing dependencies
npm install --save-dev jest supertest @testing-library/react

# Run tests
npm test
```

## Production Setup

### 1. Build Process
```bash
# Build frontend
cd client
npm run build

# Set production environment
cd ../server
NODE_ENV=production npm start
```

### 2. PM2 Configuration
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'flowpilot',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

## Database Setup

### 1. MongoDB Configuration
```yaml
# mongod.conf
systemLog:
  destination: file
  path: /var/log/mongodb/mongod.log
  logAppend: true
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
net:
  bindIp: 127.0.0.1
  port: 27017
security:
  authorization: enabled
```

### 2. Backup Configuration
```bash
# Create backup script
cat > backup.sh << EOL
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb://localhost:27017/flowpilot" --out="./backups/$TIMESTAMP"
EOL
```

## Security Setup

### 1. SSL Configuration
```bash
# Generate SSL certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout private.key -out certificate.crt
```

### 2. Security Headers
```javascript
// server/middleware/security.js
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**
```bash
# Check port usage
# Windows
netstat -ano | findstr :5000
# Linux/Mac
lsof -i :5000

# Kill process
# Windows
taskkill /PID <PID> /F
# Linux/Mac
kill -9 <PID>
```

2. **MongoDB Connection Issues**
```bash
# Check MongoDB status
systemctl status mongodb

# Check logs
tail -f /var/log/mongodb/mongod.log

# Test connection
mongo --eval "db.serverStatus()"
```

3. **Node.js Issues**
```bash
# Clear npm cache
npm cache clean --force

# Rebuild node modules
rm -rf node_modules
npm install
```

### Performance Optimization

1. **Node.js Optimization**
```bash
# Set Node.js flags
export NODE_OPTIONS="--max-old-space-size=4096"
```

2. **MongoDB Optimization**
```javascript
// Create indexes
db.tasks.createIndex({ "status": 1, "dueDate": 1 })
db.users.createIndex({ "email": 1 }, { unique: true })
```

## Deployment

### Heroku Deployment
```bash
# Create Heroku app
heroku create flowpilot

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Docker Deployment
```bash
# Build image
docker build -t flowpilot .

# Run container
docker run -d \
  -p 3000:3000 \
  -p 5000:5000 \
  -v /path/to/uploads:/app/uploads \
  -v /path/to/logs:/app/logs \
  --name flowpilot \
  flowpilot
```

### AWS Deployment
```bash
# Create EC2 instance
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t2.micro \
  --key-name flowpilot-key \
  --security-group-ids sg-xxxxxxxx

# Configure environment
aws ssm put-parameter \
  --name "/flowpilot/MONGODB_URI" \
  --value "your_mongodb_uri" \
  --type SecureString
```

## Monitoring

### 1. Application Monitoring
```javascript
// server/middleware/monitoring.js
const prometheus = require('prom-client');
const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });
```

### 2. Logging Configuration
```javascript
// server/config/logger.js
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## Backup and Recovery

### 1. Automated Backups
```bash
# Create backup script
cat > /etc/cron.daily/flowpilot-backup << EOL
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb://localhost:27017/flowpilot" --out="/backups/$TIMESTAMP"
find /backups -type d -mtime +7 -exec rm -rf {} \;
EOL
```

### 2. Recovery Process
```bash
# Restore from backup
mongorestore --uri="mongodb://localhost:27017/flowpilot" /backups/latest
```

## Support

For additional support:
- Email: support@flowpilot.com
- Documentation: [FlowPilot Docs](https://docs.flowpilot.com)
- GitHub Issues: [FlowPilot Issues](https://github.com/yourusername/flowpilot/issues) 