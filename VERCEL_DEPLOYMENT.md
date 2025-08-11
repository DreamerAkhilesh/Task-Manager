# 🚀 Vercel Deployment Guide

## Environment Variables (Vercel)

Set in Project Settings → Environment Variables:

- Key: `REACT_APP_API_URL`
  - Value: `https://task-manager-api-r4tk.onrender.com/api`
  - Environments: Production, Preview, Development
- Key: `REACT_APP_ENV`
  - Value: `production`
  - Environments: Production, Preview, Development

## Build Settings

- Framework Preset: Create React App
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

## After Deploy

- Update backend CORS: on Render set `CLIENT_URL=https://task-manager-ruddy-five-34.vercel.app` and redeploy
- Test Register/Login
- Check Network tab for API calls to Render with proper Authorization header after login

## Troubleshooting

- Secret/Env Errors: Re-enter env vars exactly
- CORS Errors: Ensure Render `CLIENT_URL` matches your Vercel URL (https)
- API Health: `curl https://task-manager-api-r4tk.onrender.com/health` 