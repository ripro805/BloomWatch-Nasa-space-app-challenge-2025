# 🚀 Quick Start Guide - BloomWatch Backend

This is your quick reference to get the backend running in under 5 minutes!

## Prerequisites ✅

- Node.js 18+ installed
- PostgreSQL running
- Git (for cloning)

## Step-by-Step Setup

### 1. Navigate to Backend
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

### 4. Edit .env File
Open `.env` and update these critical values:
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/bloomwatch
JWT_SECRET=change-this-to-a-random-secret-string
```

### 5. Create Database
**Option A - Using psql:**
```bash
psql -U postgres
CREATE DATABASE bloomwatch;
\q
```

**Option B - Using the script:**
```bash
node create-database.js
```

### 6. Run Migrations
```bash
npm run migrate
```

### 7. Seed Sample Data (Optional)
```bash
npm run seed
```

### 8. Start Server
```bash
npm run dev
```

You should see:
```
╔══════════════════════════════════════════╗
║   🌍 BloomWatch API Server Running      ║
╠══════════════════════════════════════════╣
║   Port: 5000                             ║
║   Environment: development               ║
║   Frontend: http://localhost:5173        ║
╚══════════════════════════════════════════╝
```

## Test It Works 🧪

Open browser or use curl:
```bash
curl http://localhost:5000/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-02T...",
  "database": "connected"
}
```

## Common Issues & Solutions 🔧

### Port 5000 already in use
**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -i :5000
kill -9 <PID>
```

### Database connection failed
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists
- Check username/password

### Migration fails
- Ensure database exists
- Check DATABASE_URL is correct
- Try running `npm run migrate -- --fresh` (WARNING: Drops all tables)

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps 📚

1. ✅ Read [BACKEND_FIXES.md](BACKEND_FIXES.md) for what was fixed
2. ✅ Check [SUMMARY.md](SUMMARY.md) for complete overview
3. ✅ Review [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) for endpoints
4. ✅ See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for production deployment

## Available Scripts 📝

```bash
npm start          # Production server
npm run dev        # Development with nodemon
npm run migrate    # Run database migrations
npm run seed       # Seed sample data
```

## Environment Variables 🔐

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT tokens (min 32 characters)

### Optional
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS
- `OPENWEATHER_API_KEY` - Weather data API key
- `NASA_API_KEY` - NASA API key (default: DEMO_KEY)

## API Endpoints Preview 🌐

Once running, visit http://localhost:5000 to see all available endpoints.

### Quick Test Endpoints
```bash
# Health check
GET http://localhost:5000/health

# Get all countries
GET http://localhost:5000/api/countries

# Register user
POST http://localhost:5000/api/auth/register
{
  "email": "test@example.com",
  "password": "test123",
  "fullName": "Test User"
}

# Login
POST http://localhost:5000/api/auth/login
{
  "email": "test@example.com",
  "password": "test123"
}
```

## Production Deployment 🚀

For production deployment to Render:

1. Push code to GitHub
2. Create Render account
3. Create PostgreSQL database on Render
4. Create Web Service on Render
5. Set environment variables
6. Deploy!

See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for detailed steps.

## Need Help? 💬

1. Check error logs in console
2. Verify all environment variables are set
3. Ensure PostgreSQL is accessible
4. Review documentation files
5. Check [TEST_REPORT.md](../TEST_REPORT.md) for known working configuration

## Status ✅

All backend fixes applied:
- ✅ Server variable declared properly
- ✅ Route ordering fixed
- ✅ Database pool configured
- ✅ CORS improved
- ✅ Input validation added
- ✅ Error handling improved
- ✅ Environment template created
- ✅ Utilities added (logger, responses, error handler)

**Backend Status:** 🟢 PRODUCTION READY

---

Happy coding! 🎉
