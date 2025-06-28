"use client";

import React, { createContext, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";

type AuthContextType = {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
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
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error('Invalid email or password');
    }

    // Redirect to dashboard after successful login
    router.push('/dashboard');
  };

  const register = async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    await authApi.register(data);
    // Redirect to verification page
    router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const verifyEmail = async (email: string, otp: string) => {
    await authApi.verifyEmail({ email, otp });
    router.push('/login?message=Email verified successfully. Please log in.');
  };

  const resendVerification = async (email: string) => {
    await authApi.resendVerification({ email });
  };

  const forgotPassword = async (email: string) => {
    await authApi.forgotPassword({ email });
    router.push(`/reset-password?email=${encodeURIComponent(email)}`);
  };

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    await authApi.resetPassword({ email, otp, newPassword });
    router.push('/login?message=Password reset successfully. Please log in with your new password.');
  };

  const isAuthenticated = !!session?.user;
  const loading = status === "loading";

  return (
    <AuthContext.Provider
      value={{
        user: session?.user || null,
        loading,
        login,
        register,
        logout,
        verifyEmail,
        resendVerification,
        forgotPassword,
        resetPassword,
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