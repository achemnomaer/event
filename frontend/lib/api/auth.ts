import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v1";

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

export interface RegisterData {
  firstName: string;
  lastName: string;
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
    const response = await fetch(`${API_URL}/api/${API_VERSION}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }

    return result;
  },

  // Login (using NextAuth)
  login: async (email: string, password: string) => {
    const result = await nextAuthSignIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error('Invalid email or password');
    }

    return result;
  },

  // Logout (using NextAuth)
  logout: async () => {
    await nextAuthSignOut({ redirect: false });
  },

  // Verify email
  verifyEmail: async (data: VerifyEmailData): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_URL}/api/${API_VERSION}/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Verification failed');
    }

    return result;
  },

  // Resend verification
  resendVerification: async (data: ResendVerificationData): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_URL}/api/${API_VERSION}/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to resend verification');
    }

    return result;
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordData): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_URL}/api/${API_VERSION}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send reset code');
    }

    return result;
  },

  // Reset password
  resetPassword: async (data: ResetPasswordData): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_URL}/api/${API_VERSION}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Password reset failed');
    }

    return result;
  },
};

// OAuth URLs for direct redirect (if needed)
export const getOAuthUrl = (provider: 'google' | 'facebook'): string => {
  return `${API_URL}/api/${API_VERSION}/auth/${provider}`;
};