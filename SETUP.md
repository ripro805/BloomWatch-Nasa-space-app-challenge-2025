# BloomWatch - Complete Setup Guide 🌍🐝

BloomWatch project ta fully dynamic hoye geche! Static data theke dynamic PostgreSQL database e convert kora hoyeche.

## 🎯 Key Features

### Backend (Node.js/Express + PostgreSQL)
- ✅ User Authentication (JWT-based)
- ✅ Real-time data fetching from database
- ✅ NASA API integration
- ✅ Weather API integration
- ✅ Pollinator data APIs
- ✅ PostgreSQL database with complete schema
- ✅ RESTful API endpoints
- ✅ Ready for Render deployment

### Frontend (React + TypeScript + Vite)
- ✅ Dynamic data from backend APIs
- ✅ React Query for data fetching
- ✅ User authentication UI
- ✅ Login/Register pages
- ✅ Auth context management
- ✅ Ready for Netlify deployment

## 📁 Project Structure

```
BloomWatch/
├── backend/              # Node.js/Express Backend
│   ├── src/
│   │   ├── controllers/  # API controllers
│   │   ├── routes/       # API routes
│   │   ├── services/     # External API services
│   │   ├── middleware/   # Auth middleware
│   │   ├── config/       # Database config
│   │   └── database/     # Schema, migrations, seed
│   ├── .env.example      # Environment variables template
│   ├── package.json
│   └── render.yaml       # Render deployment config
│
└── frontend/             # React Frontend
    ├── src/
    │   ├── components/   # UI components
    │   ├── pages/        # Route pages
    │   ├── services/     # API service layer
    │   ├── contexts/     # React contexts (Auth)
    │   └── lib/          # Utilities
    ├── .env.example      # Environment variables template
    ├── package.json
    └── netlify.toml      # Netlify deployment config
```

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL installed and running
- Git installed

### 1. Backend Setup

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your values:
# DATABASE_URL=postgresql://username:password@localhost:5432/bloomwatch
# JWT_SECRET=your-secret-key
# OPENWEATHER_API_KEY=your-api-key
# etc.

# Create database
# Open psql or pgAdmin and create database:
# CREATE DATABASE bloomwatch;

# Run migrations (create tables)
npm run migrate

# (Optional) Seed database with sample data
npm run seed

# Start development server
npm run dev
```

Backend will run on http://localhost:5000

### 2. Frontend Setup

```powershell
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env:
# VITE_API_BASE_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend will run on http://localhost:5173

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update profile (requires auth)
- `POST /api/auth/change-password` - Change password (requires auth)

### Locations
- `GET /api/countries` - Get all countries
- `GET /api/countries/:code/regions` - Get regions by country

### Observations
- `GET /api/observations` - Get all observations
- `GET /api/observations/stats` - Get statistics
- `GET /api/observations/:id` - Get specific observation
- `POST /api/observations` - Create observation (optional auth)

### Weather
- `GET /api/weather/:countryCode/:regionName/current` - Current weather
- `GET /api/weather/:countryCode/:regionName/forecast` - Weather forecast
- `GET /api/weather/:countryCode/:regionName/air-quality` - Air quality

### NASA Data
- `GET /api/nasa/:countryCode/:regionName/imagery` - Satellite imagery
- `GET /api/nasa/:countryCode/:regionName/vegetation-index` - Vegetation data

### Pollinators
- `GET /api/pollinators/:countryCode/:regionName` - Pollinator data
- `GET /api/pollinators/health-summary` - Health summary

## 🌐 Deployment

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml`
5. Add environment variables:
   - `FRONTEND_URL` - Your Netlify URL
   - `JWT_SECRET` - Random secure string
   - `OPENWEATHER_API_KEY` - Your API key
   - `WEATHERAPI_KEY` - Your API key
   - `NASA_API_KEY` - DEMO_KEY or your key
6. Deploy!

Database will be automatically created via `render.yaml`.

### Frontend (Netlify)

1. Push code to GitHub
2. Create new site from Git on Netlify
3. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. Add environment variable:
   - `VITE_API_BASE_URL` - Your Render backend URL
5. Deploy!

## 📝 Database Schema

### Users Table
- Authentication and user profiles
- Tracks contributions

### Countries & Regions
- Location data with coordinates

### Observations
- User-submitted pollinator observations
- Links to users, regions
- Verification status

### Pollinator Stats
- Aggregated pollinator data
- Diversity indices

### Weather Cache
- Cached weather data

### NASA Data Cache
- Cached satellite imagery

### User Contributions
- Tracks user activity

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting
- CORS protection
- Helmet security headers
- SQL injection prevention
- XSS protection

## 📦 New Dependencies Added

### Backend
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication

### Frontend
- `axios` - HTTP client
- All other dependencies already installed

## 🛠️ Development Commands

### Backend
```powershell
npm run dev         # Start dev server with nodemon
npm start           # Start production server
npm run migrate     # Run database migrations
npm run seed        # Seed database
```

### Frontend
```powershell
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Lint code
```

## 🎨 Frontend Features

- **Authentication** - Login/Register with JWT
- **Dynamic Data** - All data from backend APIs
- **React Query** - Efficient data fetching & caching
- **Auth Context** - Global auth state management
- **Protected Routes** - Can add route protection
- **Toast Notifications** - User feedback
- **Responsive Design** - Mobile-first approach

## 🌟 Next Steps

1. ✅ Install dependencies: `npm install` in both folders
2. ✅ Setup PostgreSQL database
3. ✅ Configure .env files
4. ✅ Run migrations: `npm run migrate` in backend
5. ✅ Start backend: `npm run dev` in backend folder
6. ✅ Start frontend: `npm run dev` in frontend folder
7. ✅ Register a user and test the app!
8. ✅ Deploy to Render (backend) and Netlify (frontend)

## 📞 API Keys Needed

1. **OpenWeather API** - https://openweathermap.org/api
2. **WeatherAPI.com** (Alternative) - https://www.weatherapi.com/
3. **NASA API** (Optional, DEMO_KEY works) - https://api.nasa.gov/
4. **Google Maps API** (Optional, for maps) - https://console.cloud.google.com/

## ✨ What's Changed

- ❌ Removed all static/mock data
- ✅ Added PostgreSQL database with complete schema
- ✅ Implemented JWT authentication
- ✅ Created API service layer in frontend
- ✅ Integrated React Query for data fetching
- ✅ Added user registration and login
- ✅ Connected all components to backend APIs
- ✅ Added environment configuration
- ✅ Optimized for Render + Netlify deployment

Apnar project ekhon fully dynamic and production-ready! 🎉
