# BloomWatch

NASA Space Apps Challenge 2025 project for monitoring flowering and pollinator health using community observations, weather signals, and NASA Earth data.

## Project Overview
BloomWatch is a full-stack platform that helps communities, researchers, and growers track pollination health trends by region. It combines user-submitted field observations with external geospatial and weather data to surface actionable insights.

### Why this project matters
- Pollinator decline directly impacts food systems and biodiversity.
- Regional environmental changes are hard to track without structured, shared data.
- BloomWatch turns scattered observations into a usable, location-aware intelligence layer.

## Key Capabilities
- Global country and region browsing for ecological monitoring.
- Observation submission workflow (crop, zone, pollinator counts, date, notes, optional geo fields).
- Pollinator health summaries and trend-friendly stats.
- NASA imagery and vegetation index endpoints for region-level context.
- Current weather, forecast, and air-quality integration with fallback strategy.
- Secure authentication and profile management.
- Caching layer for external API responses to reduce latency and API costs.

## Technology Stack (Updated)
_Last verified from project manifests on April 2, 2026._

### Frontend
- React `18.3.1`
- TypeScript `5.8.x`
- Vite `5.4.x`
- React Router DOM `6.30.x`
- TanStack React Query `5.83.x`
- Tailwind CSS `3.4.x`
- shadcn/ui + Radix UI primitives
- React Hook Form `7.61.x` + Zod `3.25.x`
- Recharts `2.15.x`
- Leaflet `1.9.x` + React Leaflet `4.2.x`
- Axios `1.6.x`

### Backend
- Node.js `>=18`
- Express `4.18.x`
- PostgreSQL + `pg` driver `8.11.x`
- JWT auth with `jsonwebtoken` `9.0.x`
- Password hashing with `bcryptjs` `2.4.x`
- Security middleware: `helmet`, `cors`, `express-rate-limit`, `compression`
- Scheduler support via `node-cron` `3.0.x`
- HTTP client: `axios` `1.6.x`

### Infrastructure and Delivery
- Frontend deployment: Netlify
- Backend deployment: Railway
- Database: PostgreSQL (Railway/local)
- Environment config via `.env`

## Monorepo Structure
```text
.
|-- frontend/                 # React + Vite client
|-- backend/                  # Express API and PostgreSQL integration
|-- API_DOCUMENTATION.md      # API integration notes
|-- QUICK_DEPLOY_GUIDE.md     # Quick deployment path
|-- RAILWAY_NETLIFY_DEPLOYMENT.md
|-- README.md
```

## High-Level Architecture
```text
Frontend (React + Query)
        |
        v
Backend REST API (Express)
        |
        +--> PostgreSQL (users, observations, stats, cache)
        |
        +--> NASA APIs (imagery, vegetation context)
        |
        +--> Weather APIs (current, forecast, air quality)
```

## Database Model Snapshot
Core tables used by the API:
- `users`
- `countries`
- `regions`
- `observations`
- `pollinator_stats`
- `weather_cache`
- `nasa_data_cache`
- `user_contributions`

## API Surface (Primary Routes)
Base URL example: `http://localhost:5000`

### Health
- `GET /health`

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`
- `POST /api/auth/change-password`

### Location
- `GET /api/countries`
- `GET /api/countries/:code`
- `GET /api/countries/:code/regions`
- `POST /api/countries`
- `POST /api/regions`

### Weather
- `GET /api/weather/:countryCode/:regionName/current`
- `GET /api/weather/:countryCode/:regionName/forecast`
- `GET /api/weather/:countryCode/:regionName/air-quality`

### NASA
- `GET /api/nasa/:countryCode/:regionName/imagery`
- `GET /api/nasa/:countryCode/:regionName/vegetation-index`

### Observations
- `GET /api/observations`
- `GET /api/observations/stats`
- `GET /api/observations/:id`
- `POST /api/observations`

### Pollinators
- `GET /api/pollinators/health-summary`
- `POST /api/pollinators/stats`
- `GET /api/pollinators/:countryCode/:regionName`
- `GET /api/pollinators/:countryCode/:regionName/external`

## Local Development Setup

### Prerequisites
- Node.js 18+
- npm 9+
- PostgreSQL 14+

### 1. Clone and install
```bash
git clone <your-repo-url>
cd "BloomWatch Nasa Space App Challange 2025"
```

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

### 2. Configure environment
Create backend `.env` from example:

```bash
cd ../backend
cp .env.example .env
```

On Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

Set at least:
- `DATABASE_URL`
- `JWT_SECRET`
- `NASA_API_KEY` (or `DEMO_KEY`)
- `OPENWEATHER_API_KEY`
- `WEATHERAPI_KEY`
- `FRONTEND_URL`

### 3. Run database migration and seed
```bash
npm run migrate
npm run seed
```

### 4. Run backend
```bash
npm run dev
```
API should be available at `http://localhost:5000`.

### 5. Run frontend (new terminal)
```bash
cd ../frontend
npm run dev
```
Frontend should be available at `http://localhost:5173`.

## Build for Production

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Backend
```bash
cd backend
npm start
```

## Security and Reliability Notes
- Rate limiter applied on `/api/*`.
- CORS allowlist with configurable frontend origin.
- Passwords hashed with bcrypt.
- JWT-based protected routes.
- Centralized error handling middleware.
- Graceful shutdown for HTTP server and DB pool.

## Deployment
- Netlify: deploy `frontend` build output.
- Railway: deploy `backend` service and configure environment variables.
- Use managed PostgreSQL (Railway or external) and run migrations on release.

Detailed guides:
- `QUICK_DEPLOY_GUIDE.md`
- `RAILWAY_NETLIFY_DEPLOYMENT.md`

## Testing and Validation Suggestions
Recommended verification before release:
- Auth flow: register -> login -> profile update.
- Observation flow: create observation -> verify in dashboard/community views.
- Regional APIs: weather + NASA endpoints for at least 2 country/region pairs.
- Cache behavior: repeat requests to confirm cached responses.

## Contribution Workflow
1. Fork the repo.
2. Create a feature branch.
3. Keep commits focused and descriptive.
4. Open a pull request with testing notes and screenshots (for UI changes).

## Credits
Built for NASA Space Apps Challenge 2025 by the BloomWatch team and contributors.

Data/service inspiration and integrations:
- NASA APIs
- OpenWeather
- WeatherAPI
- Community-contributed observations

## License
MIT (see `LICENSE` if available in your distribution).
