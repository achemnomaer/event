import apiClient, { apiCall } from './client';

// Types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  authProvider: 'local' | 'google' | 'facebook';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  accessToken: string;
  message?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifyEmailData {
  email: string;
  otp: string;
}

export interface ResendVerificationData {
  email: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

// Auth API functions
export const authApi = {
  // Register
  register: async (data: RegisterData): Promise<{ success: boolean; message: string; user: User }> => {
    return apiCall({
      method: 'POST',
      url: '/auth/register',
      data,
    });
  },

  // Login
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiCall<AuthResponse>({
      method: 'POST',
      url: '/auth/login',
      data,
    });

    // Store access token
    if (typeof window !== 'undefined' && response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
    }

    return response;
  },

  // Verify email
  verifyEmail: async (data: VerifyEmailData): Promise<{ success: boolean; message: string }> => {
    return apiCall({
      method: 'POST',
      url: '/auth/verify-email',
      data,
    });
  },

  // Resend verification
  resendVerification: async (data: ResendVerificationData): Promise<{ success: boolean; message: string }> => {
    return apiCall({
      method: 'POST',
      url: '/auth/resend-verification',
      data,
    });
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordData): Promise<{ success: boolean; message: string }> => {
    return apiCall({
      method: 'POST',
      url: '/auth/forgot-password',
      data,
    });
  },

  // Reset password
  resetPassword: async (data: ResetPasswordData): Promise<{ success: boolean; message: string }> => {
    return apiCall({
      method: 'POST',
      url: '/auth/reset-password',
      data,
    });
  },

  // Get profile
  getProfile: async (): Promise<{ success: boolean; user: User }> => {
    return apiCall({
      method: 'GET',
      url: '/auth/profile',
    });
  },

  // Refresh token
  refreshToken: async (): Promise<{ success: boolean; accessToken: string }> => {
    const response = await apiCall<{ success: boolean; accessToken: string }>({
      method: 'POST',
      url: '/auth/refresh',
    });

    // Store new access token
    if (typeof window !== 'undefined' && response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken);
    }

    return response;
  },

  // Logout
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiCall<{ success: boolean; message: string }>({
      method: 'POST',
      url: '/auth/logout',
    });

    // Clear access token
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }

    return response;
  },

  // Logout from all devices
  logoutAll: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiCall<{ success: boolean; message: string }>({
      method: 'POST',
      url: '/auth/logout-all',
    });

    // Clear access token
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }

    return response;
  },
};

// OAuth URLs
export const getOAuthUrl = (provider: 'google' | 'facebook'): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION || 'v1';
  return `${baseUrl}/api/${apiVersion}/auth/${provider}`;
};