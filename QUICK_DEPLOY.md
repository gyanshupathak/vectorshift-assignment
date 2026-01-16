# Quick Deployment Guide

## 🚀 Fastest Way: Vercel + Railway (Recommended)

### Backend (Railway) - 5 minutes
1. Push code to GitHub
2. Go to [railway.app](https://railway.app) → New Project → GitHub
3. Select repo → Auto-deploys!
4. Add env var: `ALLOWED_ORIGINS` = `https://your-frontend.vercel.app` (add after frontend deploy)
5. Copy your Railway URL (e.g., `https://yourapp.railway.app`)

### Frontend (Vercel) - 3 minutes
1. Go to [vercel.com](https://vercel.com) → New Project → GitHub
2. Select repo → Set **Root Directory** to `frontend`
3. Add env var: `REACT_APP_API_URL` = `https://yourapp.railway.app`
4. Deploy!

### Update Backend CORS
- Go back to Railway → Update `ALLOWED_ORIGINS` with your Vercel URL
- Redeploy backend

## 📋 Environment Variables Checklist

### Frontend (Vercel/Netlify)
- ✅ `REACT_APP_API_URL` = Your backend URL

### Backend (Railway/Render)
- ✅ `ALLOWED_ORIGINS` = Your frontend URL (comma-separated if multiple)

## 🔗 Test Your Deployment

1. Visit frontend URL
2. Open browser console (F12)
3. Create a pipeline and submit
4. Check network tab - API calls should go to your backend
5. No CORS errors = Success! ✅

## 💡 Pro Tips

- **Always deploy backend first**, then frontend
- Update backend CORS after getting frontend URL
- Test backend directly: `https://your-backend.com/` should return `{"Ping":"Pong"}`
- Both platforms have free tiers perfect for this project!
