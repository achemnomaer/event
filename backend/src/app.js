import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { config } from './config/index.js';
import { rateLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

// Import passport configuration
import './config/passport.js';

// Import routes
import authRoutes from './features/auth/routes/authRoutes.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: [config.frontendUrl, 'http://localhost:3000', 'http://localhost:3025'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(config.cookieSecret));

// Passport middleware
app.use(passport.initialize());

// Rate limiting
app.use(rateLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    version: config.apiVersion
  });
});

// API routes
app.use(`/api/${config.apiVersion}/auth`, authRoutes);

// API documentation endpoint
app.get(`/api/${config.apiVersion}/docs`, (req, res) => {
  res.json({
    message: 'ANTGEC Backend API Documentation',
    version: config.apiVersion,
    endpoints: {
      auth: {
        register: 'POST /api/v1/auth/register',
        login: 'POST /api/v1/auth/login',
        logout: 'POST /api/v1/auth/logout',
        refresh: 'POST /api/v1/auth/refresh',
        verifyEmail: 'POST /api/v1/auth/verify-email',
        resendVerification: 'POST /api/v1/auth/resend-verification',
        forgotPassword: 'POST /api/v1/auth/forgot-password',
        resetPassword: 'POST /api/v1/auth/reset-password',
        googleAuth: 'GET /api/v1/auth/google',
        facebookAuth: 'GET /api/v1/auth/facebook',
        profile: 'GET /api/v1/auth/profile'
      }
    }
  });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;