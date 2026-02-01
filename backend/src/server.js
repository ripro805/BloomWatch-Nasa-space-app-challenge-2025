import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import nasaRoutes from './routes/nasaRoutes.js';
import observationRoutes from './routes/observationRoutes.js';
import pollinatorRoutes from './routes/pollinatorRoutes.js';

// Import database
import pool from './config/database.js';

// Import error handler
import { errorHandler } from './utils/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:3000'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression middleware
app.use(compression());

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api', locationRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/nasa', nasaRoutes);
app.use('/api/observations', observationRoutes);
app.use('/api/pollinators', pollinatorRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'BloomWatch API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile',
        updateProfile: 'PUT /api/auth/profile',
        changePassword: 'POST /api/auth/change-password'
      },
      countries: '/api/countries',
      regions: '/api/countries/:code/regions',
      weather: '/api/weather/:countryCode/:regionName/current',
      forecast: '/api/weather/:countryCode/:regionName/forecast',
      airQuality: '/api/weather/:countryCode/:regionName/air-quality',
      nasaImagery: '/api/nasa/:countryCode/:regionName/imagery',
      vegetationIndex: '/api/nasa/:countryCode/:regionName/vegetation-index',
      observations: '/api/observations',
      pollinators: '/api/pollinators/:countryCode/:regionName',
      pollinatorHealth: '/api/pollinators/health-summary'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handling middleware - use the improved error handler
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║   🌍 BloomWatch API Server Running      ║
╠══════════════════════════════════════════╣
║   Port: ${PORT.toString().padEnd(32)} ║
║   Environment: ${(process.env.NODE_ENV || 'development').padEnd(23)} ║
║   Frontend: ${(process.env.FRONTEND_URL || 'http://localhost:5173').padEnd(26)} ║
╚══════════════════════════════════════════╝
  `);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} signal received: closing HTTP server`);
  server.close(() => {
    console.log('HTTP server closed');
    pool.end(() => {
      console.log('Database pool closed');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;
