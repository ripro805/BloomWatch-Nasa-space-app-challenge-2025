# 🚀 Quick Deployment Reference Card

## Railway Backend Setup (3 Steps)

### 1️⃣ Create PostgreSQL Database
```
Railway → New Project → Deploy PostgreSQL
Copy Connection URL: postgres://user:pass@host:5432/db
```

### 2️⃣ Deploy Backend
```
Railway → New → GitHub Repo → Select: BloomWatch-Nasa-space-app-challenge-2025
Settings → Root Directory: backend
```

### 3️⃣ Add Environment Variables
```
DATABASE_URL=<Your PostgreSQL URL from step 1>
JWT_SECRET=MySecureRandomKey123!@#
NASA_API_KEY=DEMO_KEY
OPENWEATHER_API_KEY=002d20544b4ff6f4ad8e5c08d08d20d8
WEATHERAPI_KEY=753ed3df70204af1823195753260102
FRONTEND_URL=https://your-site.netlify.app
```

**Copy Backend URL:** `https://your-service.up.railway.app`

---

## Netlify Frontend Setup (2 Steps)

### 1️⃣ Deploy Site
```
Netlify → Add new site → Import from GitHub
Select: BloomWatch-Nasa-space-app-challenge-2025
Root Directory: frontend
Build Command: npm run build
Publish Directory: dist
```

### 2️⃣ Add Environment Variable
```
VITE_API_BASE_URL=https://your-railway-backend.up.railway.app/api
```

**Copy Frontend URL:** `https://your-site.netlify.app`

---

## Final Step: Update CORS

Go back to Railway backend → Variables → Update:
```
FRONTEND_URL=https://your-actual-netlify-site.netlify.app
```

---

## Test Everything

1. Backend Health: `https://your-backend.up.railway.app/health`
2. Frontend: `https://your-site.netlify.app`
3. Register → Login → Check Profile Avatar

---

## 🎯 That's It! Your App is Live!

**Full Guide:** See `RAILWAY_NETLIFY_DEPLOYMENT.md` for detailed steps and troubleshooting.
