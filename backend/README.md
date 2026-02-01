# BloomWatch Backend API

Backend API for BloomWatch - Pollinator tracking and agricultural monitoring system.

## Features

- 🌍 NASA Earth Observatory Data Integration
- 🌦️ Weather API Integration
- 🐝 Pollinator Data Management
- 📊 Real-time Agricultural Monitoring
- 🗄️ PostgreSQL Database
- 🔒 Secure API with Rate Limiting

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **External APIs**: NASA API, OpenWeather, WeatherAPI

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your credentials

4. Run database migrations:
```bash
npm run migrate
```

5. Seed the database (optional):
```bash
npm run seed
```

6. Start development server:
```bash
npm run dev
```

## API Endpoints

### Countries & Regions
- `GET /api/countries` - Get all countries
- `GET /api/countries/:country/regions` - Get regions for a country

### Weather Data
- `GET /api/weather/:country/:region` - Get weather data for a location

### NASA Data
- `GET /api/nasa/earth-imagery` - Get satellite imagery
- `GET /api/nasa/vegetation-index` - Get NDVI data

### Observations
- `GET /api/observations` - Get all observations
- `POST /api/observations` - Create new observation
- `GET /api/observations/:id` - Get specific observation

### Pollinator Data
- `GET /api/pollinators` - Get pollinator statistics
- `GET /api/pollinators/:region` - Get regional pollinator data

## Deployment (Render)

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy!

## License

MIT
