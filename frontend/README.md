# ANTGEC Frontend

A modern Next.js frontend application for the ANTGEC platform, featuring authentication, event management, and course registration.

## Features

### 🔐 Authentication System
- **NextAuth.js Integration**: Secure authentication with multiple providers
- **Local Authentication**: Email/password login with backend integration
- **OAuth Support**: Google and Facebook login
- **Email Verification**: OTP-based email verification flow
- **Password Reset**: Secure password reset with OTP codes
- **Session Management**: Automatic token refresh and session handling

### 🎨 Modern UI/UX
- **Tailwind CSS**: Utility-first CSS framework
- **ShadCN UI**: High-quality, accessible components
- **Dark/Light Mode**: Theme switching support
- **Responsive Design**: Mobile-first responsive layouts
- **Micro-interactions**: Smooth animations and transitions

### 📱 Core Features
- **Event Management**: Browse and register for events
- **Course System**: Educational course enrollment
- **User Dashboard**: Personal account management
- **Payment Integration**: Stripe payment processing
- **Email Templates**: Professional email communications

## Quick Start

### Prerequisites
- Node.js 18+
- Backend API running (see backend README)

### Installation

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

### Environment Variables

Key environment variables to configure:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_VERSION=v1

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/         # Login page
│   │   ├── register/      # Registration page
│   │   ├── verify-email/  # Email verification
│   │   ├── forgot-password/ # Password reset request
│   │   ├── reset-password/  # Password reset form
│   │   └── auth/          # OAuth callback pages
│   ├── dashboard/         # User dashboard
│   ├── events/           # Event pages
│   ├── courses/          # Course pages
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── ui/              # ShadCN UI components
│   ├── layout/          # Layout components
│   ├── dashboard/       # Dashboard components
│   └── forms/           # Form components
├── lib/                 # Utility libraries
│   ├── api/            # API client and auth functions
│   ├── auth.ts         # NextAuth configuration
│   ├── utils.ts        # Utility functions
│   └── validations/    # Form validation schemas
├── providers/          # React context providers
├── types/             # TypeScript type definitions
└── middleware.ts      # Next.js middleware
```

## Authentication Flow

### Registration Process
1. User fills registration form
2. Backend creates account and sends OTP
3. User verifies email with OTP code
4. Account is activated and user can login

### Login Process
1. User enters credentials
2. NextAuth validates with backend
3. JWT tokens are managed automatically
4. User is redirected to dashboard

### OAuth Flow
1. User clicks OAuth provider button
2. Redirected to provider (Google/Facebook)
3. Provider redirects back with authorization
4. Backend creates/links account
5. User is signed in automatically

## API Integration

The frontend communicates with the backend through:

### NextAuth Providers
- **Credentials Provider**: For email/password authentication
- **Google Provider**: For Google OAuth
- **Facebook Provider**: For Facebook OAuth

### Direct API Calls
- **Registration**: Direct backend API call
- **Email Verification**: Direct backend API call
- **Password Reset**: Direct backend API call

### Example API Usage

```typescript
// Registration
import { authApi } from '@/lib/api/auth';

const handleRegister = async (data) => {
  try {
    await authApi.register(data);
    router.push('/verify-email');
  } catch (error) {
    toast.error(error.message);
  }
};

// Login with NextAuth
import { signIn } from 'next-auth/react';

const handleLogin = async (email, password) => {
  const result = await signIn('credentials', {
    email,
    password,
    redirect: false,
  });
  
  if (result?.error) {
    toast.error('Invalid credentials');
  } else {
    router.push('/dashboard');
  }
};
```

## Component Architecture

### Authentication Components
- **LoginForm**: Handles login with credentials and OAuth
- **RegisterForm**: User registration with validation
- **VerifyEmailForm**: OTP-based email verification
- **ForgotPasswordForm**: Password reset request
- **ResetPasswordForm**: New password setting with OTP

### Layout Components
- **SiteHeader**: Navigation with authentication state
- **SiteFooter**: Footer with links and information
- **Container**: Responsive container wrapper

### Dashboard Components
- **DashboardContent**: Main dashboard overview
- **SettingsContent**: User account settings
- **RegistrationCard**: Event registration display

## Styling and Theming

### Tailwind CSS Configuration
- Custom color palette
- Responsive breakpoints
- Component-specific utilities
- Dark mode support

### ShadCN UI Components
- Consistent design system
- Accessible components
- Customizable themes
- Built-in animations

### Design Principles
- Mobile-first responsive design
- Consistent spacing (8px grid)
- Clear visual hierarchy
- Accessible color contrasts
- Smooth micro-interactions

## State Management

### NextAuth Session
- Automatic session management
- JWT token handling
- User state persistence
- Secure token refresh

### React Context
- AuthProvider for authentication state
- Theme provider for dark/light mode
- Redux for complex state (if needed)

## Security Features

### Authentication Security
- Secure JWT token handling
- HTTP-only refresh tokens
- Automatic token refresh
- Session timeout handling

### Form Security
- Input validation with Zod
- CSRF protection
- XSS prevention
- Secure password requirements

### API Security
- Automatic token injection
- Request/response interceptors
- Error handling
- Rate limiting awareness

## Development Guidelines

### Code Organization
- Feature-based file structure
- Consistent naming conventions
- Proper TypeScript usage
- Component composition patterns

### Best Practices
- Use TypeScript for type safety
- Implement proper error handling
- Follow React best practices
- Maintain consistent code style
- Write meaningful commit messages

### Testing Strategy
- Component testing with Jest
- Integration testing for auth flows
- E2E testing for critical paths
- Accessibility testing

## Deployment

### Build Process
```bash
npm run build
```

### Environment Setup
- Set production environment variables
- Configure OAuth redirect URLs
- Update API endpoints
- Set secure NextAuth secret

### Deployment Checklist
- [ ] Environment variables configured
- [ ] OAuth providers configured
- [ ] API endpoints updated
- [ ] SSL certificates in place
- [ ] Error monitoring setup
- [ ] Performance monitoring enabled

## Troubleshooting

### Common Issues

**Authentication not working**
- Check backend API is running
- Verify environment variables
- Check OAuth provider configuration
- Ensure CORS is properly configured

**OAuth redirect errors**
- Verify redirect URLs in provider settings
- Check NextAuth URL configuration
- Ensure SSL is properly configured in production

**Session issues**
- Check NextAuth secret configuration
- Verify JWT token expiration settings
- Check cookie settings for production

### Debug Mode
Enable debug logging by setting:
```env
NEXTAUTH_DEBUG=true
```

## Contributing

1. Follow the established code structure
2. Use TypeScript for all new code
3. Implement proper error handling
4. Add appropriate tests
5. Update documentation as needed

## License

MIT License - see LICENSE file for details.