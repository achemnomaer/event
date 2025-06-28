"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authApi, type User } from "@/lib/api/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  verifyEmail: async () => {},
  resendVerification: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  refreshUser: async () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const refreshUser = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setUser(null);
        return;
      }

      const response = await authApi.getProfile();
      setUser(response.user);
    } catch (error) {
      console.error('Error refreshing user:', error);
      // Clear invalid token
      localStorage.removeItem('accessToken');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      setUser(response.user);
      
      // Redirect to dashboard or intended page
      const intendedPath = sessionStorage.getItem('intendedPath') || '/dashboard';
      sessionStorage.removeItem('intendedPath');
      router.push(intendedPath);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
      await authApi.register(data);
      // Don't set user here as email needs to be verified first
      // Redirect to verification page
      router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      router.push('/login');
    } catch (error) {
      // Even if logout fails on server, clear local state
      console.error('Logout error:', error);
      localStorage.removeItem('accessToken');
      setUser(null);
      router.push('/login');
    }
  };

  const verifyEmail = async (email: string, otp: string) => {
    try {
      await authApi.verifyEmail({ email, otp });
      // After verification, redirect to login
      router.push('/login?message=Email verified successfully. Please log in.');
    } catch (error) {
      throw error;
    }
  };

  const resendVerification = async (email: string) => {
    try {
      await authApi.resendVerification({ email });
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await authApi.forgotPassword({ email });
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    try {
      await authApi.resetPassword({ email, otp, newPassword });
      router.push('/login?message=Password reset successfully. Please log in with your new password.');
    } catch (error) {
      throw error;
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        verifyEmail,
        resendVerification,
        forgotPassword,
        resetPassword,
        refreshUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};