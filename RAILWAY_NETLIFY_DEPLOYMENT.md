# 🚀 BloomWatch Complete Deployment Guide
## Railway (Backend + PostgreSQL) + Netlify (Frontend)

---

## 📋 Prerequisites
- GitHub account
- Railway account (https://railway.app)
- Netlify account (https://netlify.com)

---

## PART 1: Railway - Backend & Database Deployment

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy PostgreSQL"
3. Database will be created automatically

### Step 3: Get Database Connection URL
1. Click on your PostgreSQL service
2. Go to "Connect" tab
3. Copy the "Postgres Connection URL":
   ```
   postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
   ```
4. **Save this URL** - you'll need it in Step 6

### Step 4: Add Backend Service
1. In the same project, click "New" → "GitHub Repo"
2. Connect your GitHub account if not already
3. Select: `BloomWatch-Nasa-space-app-challenge-2025`
4. Click "Deploy"

### Step 5: Configure Backend Service
1. Click on your backend service (not database)
2. Go to "Settings" tab
3. Find **"Root Directory"** or **"Service Root"**
4. Set it to: `backend`
5. Save changes

### Step 6: Add Environment Variables
1. Still in backend service settings
2. Go to "Variables" tab
3. Click "New Variable" and add these one by one:

```env
DATABASE_URL=postgresql://postgres:ismWpCwPBhGitqocqjvNskKpWWlWRhGA@ballast.proxy.rlwy.net:44849/railway
JWT_SECRET=MySecureRandomKey123!@#$%
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=5000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
DB_POOL_MAX=20
DB_IDLE_TIMEOUT=30000
DB_CONNECTION_TIMEOUT=2000
NASA_API_KEY=DEMO_KEY
OPENWEATHER_API_KEY=002d20544b4ff6f4ad8e5c08d08d20d8
WEATHERAPI_KEY=753ed3df70204af1823195753260102
FRONTEND_URL=https://your-frontend-site.netlify.app
```

**Important Notes:**
- Replace `<PASTE_YOUR_POSTGRES_URL_FROM_STEP_3>` with actual PostgreSQL URL from Step 3
- Replace `FRONTEND_URL` after you deploy frontend (Step 12)
- `JWT_SECRET` can be any random string - make it strong!

### Step 7: Deploy Backend
1. Click "Deploy" or wait for auto-deploy
2. Check "Deployments" tab for build logs
3. Once deployed, note your backend URL:
   ```
   https://your-backend-service.up.railway.app
   ```

### Step 8: Initialize Database (Run Migrations)
1. In Railway, go to backend service
2. Go to "Settings" → "Networking"
3. Copy your public domain
4. Use Postman or browser to test: `https://your-backend.up.railway.app/health`
5. If healthy, database is connected!

### Step 9: Generate Public Domain (if not auto-generated)
1. Backend service → Settings → Networking
2. Click "Generate Domain"
3. Copy this URL - you'll need it for frontend!

---

## PART 2: Netlify - Frontend Deployment

### Step 10: Create Netlify Account
1. Go to https://netlify.com
2. Sign up with GitHub

### Step 11: Deploy New Site
1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Authorize Netlify to access your GitHub
4. Select: `BloomWatch-Nasa-space-app-challenge-2025`

### Step 12: Configure Build Settings
1. **Root Directory:** `frontend`
2. **Build command:** `npm run build`
3. **Publish directory:** `dist`
4. Click "Show advanced" → "New variable"

### Step 13: Add Environment Variables
Add this variable in Netlify:

```env
VITE_API_BASE_URL=https://your-backend-service.up.railway.app/api
```

**Replace** `your-backend-service.up.railway.app` with your actual Railway backend URL from Step 9.

### Step 14: Deploy Frontend
1. Click "Deploy site"
2. Wait for build to complete
3. Once deployed, you'll get a URL like:
   ```
   https://your-site-name.netlify.app
   ```

### Step 15: Update Backend CORS (IMPORTANT!)
1. Go back to Railway
2. Backend service → Variables
3. Update `FRONTEND_URL` variable:
   ```
   FRONTEND_URL=https://bloomwatchrp.netlify.app
   ```
4. This allows backend to accept requests from your frontend
5. Backend will auto-redeploy

**Your Frontend URL:** https://bloomwatchrp.netlify.app

---

## PART 3: Testing Your Deployment

### Test 1: Backend Health Check
Visit: `https://your-backend.up.railway.app/health`

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-02T...",
  "database": "connected"
}
```

### Test 2: Frontend Loading
1. Visit your Netlify URL
2. Home page should load
3. Check browser console for any errors

### Test 3: Full Integration
1. Go to Login/Register page
2. Create a new account
3. Login with credentials
4. Profile avatar should appear in navigation
5. Click avatar to see profile details
6. Navigate to Dashboard, Search, Community

---

## 🔧 Common Issues & Solutions

### Issue 1: Railway build fails with "Error creating build plan"
**Solution:** Make sure Root Directory is set to `backend` in Railway service settings.

### Issue 2: Database connection fails
**Solution:** 
- Check DATABASE_URL is correctly copied
- Ensure PostgreSQL service is running in Railway
- Check /health endpoint for database status

### Issue 3: CORS errors in browser console
**Solution:**
- Update FRONTEND_URL in Railway backend variables
- Make sure it matches your Netlify domain exactly
- Redeploy backend after changing

### Issue 4: Frontend shows "Network Error"
**Solution:**
- Check VITE_API_BASE_URL in Netlify environment variables
- Make sure it ends with `/api`
- Redeploy frontend after fixing

### Issue 5: Authentication fails
**Solution:**
- Check JWT_SECRET is set in Railway
- Clear browser localStorage and cookies
- Try registering a new account

---

## 🎯 Production Checklist

- [ ] PostgreSQL database created in Railway
- [ ] Backend deployed with root directory set to `backend`
- [ ] All environment variables added to Railway backend
- [ ] Backend /health endpoint returns "healthy"
- [ ] Frontend deployed to Netlify
- [ ] VITE_API_BASE_URL set in Netlify
- [ ] FRONTEND_URL updated in Railway to Netlify URL
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Profile avatar appears after login
- [ ] Dashboard loads with data
- [ ] No CORS errors in browser console

---

## 📝 Quick Reference

### Railway Backend URL Pattern:
```
https://[service-name]-production-[hash].up.railway.app
```

### Netlify Frontend URL Pattern:
```
https://[site-name]-[hash].netlify.app
```

### Custom Domain (Optional):
- Railway: Settings → Networking → Add Custom Domain
- Netlify: Site settings → Domain management → Add custom domain

---

## 🔑 API Keys Summary

| Service | Free Tier | Where to Get |
|---------|-----------|--------------|
| NASA API | Yes | https://api.nasa.gov/ (or use DEMO_KEY) |
| OpenWeather | Yes | https://openweathermap.org/api |
| WeatherAPI | Yes | https://www.weatherapi.com/ |

---

## 🆘 Need Help?

- Railway Docs: https://docs.railway.app/
- Netlify Docs: https://docs.netlify.com/
- Project Issues: https://github.com/ripro805/BloomWatch-Nasa-space-app-challenge-2025/issues

---

## 🎉 Congratulations!

Your BloomWatch app is now live! Share your deployed URLs:
- **Frontend:** https://your-site.netlify.app
- **Backend API:** https://your-backend.up.railway.app

---

*Last updated: February 2, 2026*
