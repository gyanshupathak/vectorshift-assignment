# Deployment Guide

This guide will help you deploy both the frontend and backend of the VectorShift assignment.

## Prerequisites

- GitHub account (for code hosting)
- Accounts on hosting platforms:
  - **Frontend**: Vercel (recommended) or Netlify
  - **Backend**: Railway (recommended), Render, or Fly.io

## Option 1: Deploy to Vercel (Frontend) + Railway (Backend) - Recommended

### Step 1: Deploy Backend to Railway

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Railway**:
   - Go to [railway.app](https://railway.app) and sign up/login
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect it's a Python project
   - Add environment variable:
     - Key: `ALLOWED_ORIGINS`
     - Value: `https://your-frontend-url.vercel.app` (you'll update this after deploying frontend)
   - Railway will provide a URL like: `https://your-app.railway.app`
   - Copy this URL - you'll need it for the frontend

### Step 2: Deploy Frontend to Vercel

1. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "New Project" → "Import Git Repository"
   - Select your repository
   - Set the **Root Directory** to `frontend`
   - Add environment variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://your-backend-url.railway.app` (from Step 1)
   - Click "Deploy"

2. **Update Backend CORS**:
   - Go back to Railway dashboard
   - Update the `ALLOWED_ORIGINS` environment variable to include your Vercel URL:
     - Value: `https://your-frontend-url.vercel.app`
   - Redeploy the backend

## Option 2: Deploy to Netlify (Frontend) + Render (Backend)

### Step 1: Deploy Backend to Render

1. **Push code to GitHub** (same as above)

2. **Deploy to Render**:
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `vectorshift-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Add environment variable:
     - Key: `ALLOWED_ORIGINS`
     - Value: `https://your-frontend-url.netlify.app` (update after frontend deploy)
   - Click "Create Web Service"
   - Copy the URL provided

### Step 2: Deploy Frontend to Netlify

1. **Build the frontend locally first**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Drag and drop the `frontend/build` folder, OR
   - Connect GitHub repo:
     - Click "New site from Git"
     - Select repository
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `frontend/build`
   - Add environment variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://your-backend-url.onrender.com`
   - Deploy

3. **Update Backend CORS**:
   - Go back to Render dashboard
   - Update `ALLOWED_ORIGINS` to your Netlify URL

## Option 3: Deploy Both to Fly.io

### Backend Deployment

1. **Install Fly CLI**:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Initialize Fly app**:
   ```bash
   cd backend
   fly launch
   ```

3. **Set environment variables**:
   ```bash
   fly secrets set ALLOWED_ORIGINS=https://your-frontend-url.fly.dev
   ```

### Frontend Deployment

1. **Create fly.toml** in frontend directory:
   ```toml
   app = "your-frontend-app-name"
   primary_region = "iad"

   [build]
     builder = "paketobuildpacks/builder:base"

   [[services]]
     internal_port = 3000
     protocol = "tcp"
   ```

2. **Deploy**:
   ```bash
   cd frontend
   fly launch
   fly secrets set REACT_APP_API_URL=https://your-backend-url.fly.dev
   ```

## Environment Variables Summary

### Frontend (.env or platform settings)
- `REACT_APP_API_URL`: Your backend API URL (e.g., `https://your-backend.railway.app`)

### Backend (platform settings)
- `ALLOWED_ORIGINS`: Comma-separated list of frontend URLs (e.g., `https://your-frontend.vercel.app,http://localhost:3000`)

## Testing After Deployment

1. Visit your frontend URL
2. Open browser console (F12)
3. Try creating a pipeline and submitting it
4. Check that API calls are going to your backend URL
5. Verify CORS errors are not appearing

## Troubleshooting

### CORS Errors
- Make sure `ALLOWED_ORIGINS` in backend includes your exact frontend URL (with https://)
- No trailing slashes in URLs
- Restart backend after changing environment variables

### API Connection Errors
- Verify `REACT_APP_API_URL` is set correctly in frontend
- Check backend is running and accessible
- Test backend URL directly: `https://your-backend-url.com/` should return `{"Ping":"Pong"}`

### Build Errors
- Make sure all dependencies are in `package.json` (frontend) and `requirements.txt` (backend)
- Check Node.js and Python versions match platform requirements

## Quick Deploy Commands

### Local Build Test
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
```
