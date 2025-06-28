import { AuthService } from '../services/authService.js';
import { generateTokens } from '../utils/tokenUtils.js';
import { config } from '../../../config/index.js';

export class AuthController {
  static async register(req, res) {
    const result = await AuthService.register(req.body);
    
    res.status(201).json({
      success: true,
      ...result
    });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    // Set refresh token as HTTP-only cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      user: result.user,
      accessToken: result.accessToken
    });
  }

  static async verifyEmail(req, res) {
    const { email, otp } = req.body;
    const result = await AuthService.verifyEmail(email, otp);

    res.json({
      success: true,
      ...result
    });
  }

  static async resendVerification(req, res) {
    const { email } = req.body;
    const result = await AuthService.resendVerificationOTP(email);

    res.json({
      success: true,
      ...result
    });
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;
    const result = await AuthService.forgotPassword(email);

    res.json({
      success: true,
      ...result
    });
  }

  static async resetPassword(req, res) {
    const { email, otp, newPassword } = req.body;
    const result = await AuthService.resetPassword(email, otp, newPassword);

    res.json({
      success: true,
      ...result
    });
  }

  static async refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not provided'
      });
    }

    const result = await AuthService.refreshToken(refreshToken);

    // Set new refresh token as HTTP-only cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      accessToken: result.accessToken
    });
  }

  static async logout(req, res) {
    const refreshToken = req.cookies.refreshToken;
    const result = await AuthService.logout(req.user._id, refreshToken);

    // Clear refresh token cookie
    res.clearCookie('refreshToken');

    res.json({
      success: true,
      ...result
    });
  }

  static async logoutAll(req, res) {
    const result = await AuthService.logoutAll(req.user._id);

    // Clear refresh token cookie
    res.clearCookie('refreshToken');

    res.json({
      success: true,
      ...result
    });
  }

  static async getProfile(req, res) {
    const result = await AuthService.getProfile(req.user._id);

    res.json({
      success: true,
      ...result
    });
  }

  // OAuth success handler
  static async oauthSuccess(req, res) {
    const { accessToken, refreshToken } = generateTokens(req.user._id);

    // Save refresh token to user
    await req.user.addRefreshToken(refreshToken);

    // Set refresh token as HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Redirect to frontend with access token
    const redirectUrl = `${config.oauthSuccessRedirect}?token=${accessToken}`;
    res.redirect(redirectUrl);
  }

  // OAuth failure handler
  static async oauthFailure(req, res) {
    res.redirect(config.oauthFailureRedirect);
  }
}