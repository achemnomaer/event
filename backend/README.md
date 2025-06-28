# ANTGEC Backend API

A robust authentication and authorization system built with Express.js, MongoDB, and Redis for the ANTGEC platform.

## Features

### 🔐 Authentication & Authorization
- **Local Authentication**: Email/password registration and login
- **OAuth Integration**: Google and Facebook login
- **JWT-based Security**: Access tokens (short-lived) and refresh tokens (HTTP-only cookies)
- **Role-based Access Control**: User and admin roles
- **Email Verification**: OTP-based email verification system
- **Password Reset**: Secure OTP-based password reset flow

### 📧 Email System
- **Titan SMTP Integration**: Professional email delivery
- **Template System**: Handlebars-based email templates
- **Queue Processing**: Bull queue for scalable email delivery
- **Retry Logic**: Automatic retry for failed email deliveries

### 🛡️ Security Features
- **Rate Limiting**: Configurable rate limits for different endpoints
- **Input Validation**: Zod-based request validation
- **Password Security**: bcrypt hashing with salt rounds
- **Secure Cookies**: HTTP-only, secure, SameSite cookies
- **CORS Protection**: Configurable CORS settings
- **Helmet Security**: Security headers and protection

### 🏗️ Architecture
- **Feature-based Structure**: Organized by business domains
- **ES Modules**: Modern JavaScript module system
- **Error Handling**: Centralized error handling with custom error classes
- **Environment Configuration**: Comprehensive environment-based config
- **Database Integration**: MongoDB with Mongoose ODM
- **Redis Integration**: For queue processing and caching

## Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 5+
- Redis 6+
- Titan SMTP account (or any SMTP provider)

### Installation

1. **Clone and setup**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start Services**
   ```bash
   # Start MongoDB (if local)
   mongod

   # Start Redis (if local)
   redis-server

   # Start the application
   npm run dev
   ```

### Environment Variables

Key environment variables to configure:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/antgec-backend

# JWT Secrets (use strong, unique values)
JWT_ACCESS_SECRET=your-super-secret-access-token-key
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# Email (Titan SMTP)
SMTP_HOST=smtp.titan.email
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-titan-smtp-password
EMAIL_FROM=noreply@yourdomain.com

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - Logout (requires auth)
- `POST /api/v1/auth/refresh` - Refresh access token

### Email Verification
- `POST /api/v1/auth/verify-email` - Verify email with OTP
- `POST /api/v1/auth/resend-verification` - Resend verification OTP

### Password Reset
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password with OTP

### OAuth
- `GET /api/v1/auth/google` - Initiate Google OAuth
- `GET /api/v1/auth/facebook` - Initiate Facebook OAuth

### Profile
- `GET /api/v1/auth/profile` - Get user profile (requires auth)

### Admin
- `GET /api/v1/auth/admin/users` - Admin-only endpoint

## Request/Response Examples

### Registration
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Email Verification
```bash
curl -X POST http://localhost:5000/api/v1/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456"
  }'
```

## Security Features

### Rate Limiting
- General API: 100 requests per 15 minutes
- Auth endpoints: 10 requests per 15 minutes  
- OTP endpoints: 3 requests per minute

### Password Requirements
- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number

### Token Security
- Access tokens: 15 minutes expiry
- Refresh tokens: 7 days expiry
- Refresh tokens stored in HTTP-only cookies
- Automatic token rotation on refresh

## Development

### Project Structure
```
src/
├── features/
│   └── auth/
│       ├── controllers/     # Request handlers
│       ├── routes/         # Route definitions
│       ├── services/       # Business logic
│       ├── models/         # Database models
│       ├── middlewares/    # Auth-specific middleware
│       └── utils/          # Auth utilities
├── middlewares/            # Global middleware
├── config/                 # Configuration files
├── utils/                  # Shared utilities
├── templates/              # Email templates
├── app.js                  # Express app setup
└── server.js              # Server entry point
```

### Available Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Integration with Frontend

The backend is designed to integrate seamlessly with your Next.js frontend:

1. **CORS Configuration**: Pre-configured for localhost:3000 and localhost:3025
2. **Cookie Handling**: Refresh tokens automatically managed via HTTP-only cookies
3. **Error Responses**: Consistent error format for frontend handling
4. **OAuth Redirects**: Configurable success/failure redirect URLs

### Frontend Integration Example
```javascript
// Login request
const response = await fetch('http://localhost:5000/api/v1/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Important for cookies
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
// Store accessToken in memory or secure storage
// Refresh token is automatically stored in HTTP-only cookie
```

## Production Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use strong, unique JWT secrets
3. Configure proper CORS origins
4. Set up SSL/TLS certificates
5. Use production MongoDB and Redis instances
6. Configure proper SMTP settings

### Security Checklist
- [ ] Strong JWT secrets configured
- [ ] CORS properly configured for production domains
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Database connections secured
- [ ] Environment variables secured
- [ ] Error logging configured

## Monitoring & Logging

The application includes comprehensive logging:
- Authentication events
- Email delivery status
- Error tracking
- Performance metrics
- Security events

## Support

For questions or issues:
1. Check the API documentation at `/api/v1/docs`
2. Review the error logs
3. Ensure all environment variables are properly configured
4. Verify database and Redis connections

## License

MIT License - see LICENSE file for details.