import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 5000,
  apiVersion: process.env.API_VERSION || 'v1',

  // Database
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/antgec-backend',
  mongodbTestUri: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/antgec-backend-test',

  // JWT
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'fallback-access-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

  // Cookies
  cookieSecret: process.env.COOKIE_SECRET || 'fallback-cookie-secret',

  // OAuth
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  facebookAppSecret: process.env.FACEBOOK_APP_SECRET,

  // Frontend URLs
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  oauthSuccessRedirect: process.env.OAUTH_SUCCESS_REDIRECT || 'http://localhost:3000/auth/success',
  oauthFailureRedirect: process.env.OAUTH_FAILURE_REDIRECT || 'http://localhost:3000/auth/error',

  // Email
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.titan.email',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  emailFrom: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
  emailFromName: process.env.EMAIL_FROM_NAME || 'ANTGEC',

  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },

  // OTP
  otp: {
    expiresIn: parseInt(process.env.OTP_EXPIRES_IN) || 600000, // 10 minutes
    length: parseInt(process.env.OTP_LENGTH) || 6,
    resendCooldown: parseInt(process.env.OTP_RESEND_COOLDOWN) || 60000 // 1 minute
  }
};