import User from '../models/User.js';
import OTP from '../models/OTP.js';
import { generateTokens } from '../utils/tokenUtils.js';
import { generateOTP, generateOTPExpiry } from '../utils/otpUtils.js';
import { emailQueue } from '../../../utils/emailQueue.js';
import { AppError } from '../../../utils/AppError.js';

export class AuthService {
  static async register(userData) {
    const { firstName, lastName, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('User already exists with this email', 409);
    }

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password
    });

    await user.save();

    // Generate OTP for email verification
    const otp = generateOTP();
    const otpExpiry = generateOTPExpiry();

    await OTP.create({
      email,
      otp,
      type: 'email_verification',
      expiresAt: otpExpiry
    });

    // Send verification email
    await emailQueue.add('send-verification-email', {
      email,
      firstName,
      otp
    });

    return {
      user: user.toJSON(),
      message: 'Registration successful. Please check your email for verification code.'
    };
  }

  static async login(email, password) {
    // Find user with password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError('Account has been deactivated', 401);
    }

    // For OAuth users without password
    if (!user.password && (user.googleId || user.facebookId)) {
      throw new AppError('Please use social login for this account', 401);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      throw new AppError('Please verify your email before logging in', 401);
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Save refresh token
    await user.addRefreshToken(refreshToken);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    return {
      user: user.toJSON(),
      accessToken,
      refreshToken
    };
  }

  static async verifyEmail(email, otp) {
    // Find valid OTP
    const otpRecord = await OTP.findOne({
      email,
      otp,
      type: 'email_verification',
      isUsed: false,
      expiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      throw new AppError('Invalid or expired verification code', 400);
    }

    // Check attempts
    if (otpRecord.attempts >= 5) {
      throw new AppError('Too many verification attempts. Please request a new code.', 429);
    }

    // Mark OTP as used
    otpRecord.isUsed = true;
    await otpRecord.save();

    // Update user email verification status
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.isEmailVerified = true;
    await user.save();

    return {
      message: 'Email verified successfully'
    };
  }

  static async resendVerificationOTP(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.isEmailVerified) {
      throw new AppError('Email is already verified', 400);
    }

    // Check if there's a recent OTP
    const recentOTP = await OTP.findOne({
      email,
      type: 'email_verification',
      createdAt: { $gt: new Date(Date.now() - 60000) } // 1 minute
    });

    if (recentOTP) {
      throw new AppError('Please wait before requesting a new verification code', 429);
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = generateOTPExpiry();

    await OTP.create({
      email,
      otp,
      type: 'email_verification',
      expiresAt: otpExpiry
    });

    // Send verification email
    await emailQueue.add('send-verification-email', {
      email,
      firstName: user.firstName,
      otp
    });

    return {
      message: 'Verification code sent successfully'
    };
  }

  static async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not
      return {
        message: 'If an account with this email exists, you will receive a password reset code.'
      };
    }

    // Check if there's a recent OTP
    const recentOTP = await OTP.findOne({
      email,
      type: 'password_reset',
      createdAt: { $gt: new Date(Date.now() - 60000) } // 1 minute
    });

    if (recentOTP) {
      throw new AppError('Please wait before requesting a new reset code', 429);
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = generateOTPExpiry();

    await OTP.create({
      email,
      otp,
      type: 'password_reset',
      expiresAt: otpExpiry
    });

    // Send reset email
    await emailQueue.add('send-password-reset-email', {
      email,
      firstName: user.firstName,
      otp
    });

    return {
      message: 'If an account with this email exists, you will receive a password reset code.'
    };
  }

  static async resetPassword(email, otp, newPassword) {
    // Find valid OTP
    const otpRecord = await OTP.findOne({
      email,
      otp,
      type: 'password_reset',
      isUsed: false,
      expiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      throw new AppError('Invalid or expired reset code', 400);
    }

    // Check attempts
    if (otpRecord.attempts >= 5) {
      throw new AppError('Too many reset attempts. Please request a new code.', 429);
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Mark OTP as used
    otpRecord.isUsed = true;
    await otpRecord.save();

    // Update password
    user.password = newPassword;
    await user.save();

    // Remove all refresh tokens (force re-login)
    await user.removeAllRefreshTokens();

    return {
      message: 'Password reset successfully'
    };
  }

  static async refreshToken(refreshToken) {
    const user = await User.findOne({
      'refreshTokens.token': refreshToken
    });

    if (!user) {
      throw new AppError('Invalid refresh token', 401);
    }

    // Remove the used refresh token
    await user.removeRefreshToken(refreshToken);

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    // Save new refresh token
    await user.addRefreshToken(newRefreshToken);

    return {
      accessToken,
      refreshToken: newRefreshToken
    };
  }

  static async logout(userId, refreshToken) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (refreshToken) {
      await user.removeRefreshToken(refreshToken);
    }

    return {
      message: 'Logged out successfully'
    };
  }

  static async logoutAll(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    await user.removeAllRefreshTokens();

    return {
      message: 'Logged out from all devices successfully'
    };
  }

  static async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return {
      user: user.toJSON()
    };
  }
}