# FlowPilot Setup Guide

Welcome to FlowPilot! This guide will help you set up and start using FlowPilot in your organization.

## Quick Start

### Option 1: Using the Pre-built Version (Recommended)

1. Visit our website at [flowpilot.com](https://flowpilot.com)
2. Click on "Get Started"
3. Sign up for an account
4. Follow the onboarding wizard to set up your organization

### Option 2: Self-Hosted Installation

#### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Basic knowledge of command line

#### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/flowpilot.git
   cd flowpilot
   ```

2. **Install Dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the server directory with:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

4. **Start the Application**
   ```bash
   # Start the server
   cd server
   npm run dev

   # In a new terminal, start the client
   cd client
   npm start
   ```

5. **Access the Application**
   Open your browser and go to `http://localhost:3000`

## First-Time Setup

1. **Create Admin Account**
   - Visit the registration page
   - Fill in your details
   - Select "Admin" role
   - Complete registration

2. **Configure Organization**
   - Set up your organization name
   - Add departments
   - Configure user roles

3. **Invite Team Members**
   - Go to User Management
   - Click "Add User"
   - Enter team member details
   - Send invitations

## Basic Usage

### For Administrators

1. **User Management**
   - Add/remove users
   - Assign roles
   - Manage permissions

2. **Task Management**
   - Create tasks
   - Assign to team members
   - Set priorities and deadlines

3. **Reports**
   - View team performance
   - Track task completion
   - Generate reports

### For Team Members

1. **View Tasks**
   - Check assigned tasks
   - Update task status
   - Add comments and attachments

2. **Profile Management**
   - Update personal information
   - Change password
   - View task statistics

3. **Reports**
   - View personal performance
   - Track task completion
   - Monitor deadlines

## Features Overview

### Task Management
- Create and assign tasks
- Set priorities and deadlines
- Track progress
- Add file attachments
- Comment on tasks

### User Management
- Role-based access control
- User profiles
- Team organization
- Department management

### Reporting
- Task completion rates
- Team performance metrics
- Individual statistics
- Custom report generation

### Dashboard
- Task overview
- Performance metrics
- Recent activity
- Quick actions

## Support

### Getting Help
- Email: support@flowpilot.com
- Documentation: docs.flowpilot.com
- Community Forum: community.flowpilot.com

### Common Issues
1. **Login Problems**
   - Check your email and password
   - Ensure caps lock is off
   - Try password reset if needed

2. **Task Assignment Issues**
   - Verify user permissions
   - Check task status
   - Ensure proper role assignment

3. **Report Generation**
   - Verify data availability
   - Check date ranges
   - Ensure proper permissions

## Security

### Best Practices
1. **Password Management**
   - Use strong passwords
   - Change passwords regularly
   - Enable two-factor authentication

2. **Access Control**
   - Assign appropriate roles
   - Review permissions regularly
   - Monitor user activity

3. **Data Protection**
   - Regular backups
   - Secure file storage
   - Access logging

## Updates

### Checking for Updates
- Regular automatic updates
- Manual update option available
- Update notifications

### Update Process
1. Backup your data
2. Follow update instructions
3. Verify functionality
4. Test new features

## License

FlowPilot is licensed under the MIT License. See the LICENSE file for details.

---

For detailed technical documentation, please refer to DEVELOPMENT.md 