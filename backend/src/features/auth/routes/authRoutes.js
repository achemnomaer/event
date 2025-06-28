import express from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/authController.js';
import { authenticate, authorize } from '../middlewares/authMiddleware.js';
import {
  validateRegister,
  validateLogin,
  validateVerifyEmail,
  validateResendVerification,
  validateForgotPassword,
  validateResetPassword
} from '../middlewares/validation.js';

const router = express.Router();

// Local authentication routes
router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.post('/verify-email', validateVerifyEmail, AuthController.verifyEmail);
router.post('/resend-verification', validateResendVerification, AuthController.resendVerification);
router.post('/forgot-password', validateForgotPassword, AuthController.forgotPassword);
router.post('/reset-password', validateResetPassword, AuthController.resetPassword);

// Token management
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', authenticate, AuthController.logout);
router.post('/logout-all', authenticate, AuthController.logoutAll);

// Profile
router.get('/profile', authenticate, AuthController.getProfile);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/v1/auth/oauth/failure' }),
  AuthController.oauthSuccess
);

// Facebook OAuth routes
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/api/v1/auth/oauth/failure' }),
  AuthController.oauthSuccess
);

// OAuth handlers
router.get('/oauth/failure', AuthController.oauthFailure);

// Admin only routes
router.get('/admin/users', authenticate, authorize('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Admin access granted',
    user: req.user
  });
});

export default router;