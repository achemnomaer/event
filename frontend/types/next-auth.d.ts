import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
      firstName?: string;
      lastName?: string;
      role?: string;
      isEmailVerified?: boolean;
      authProvider?: string;
      image?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    isEmailVerified?: boolean;
    authProvider?: string;
    accessToken?: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string;
      name: string;
      firstName?: string;
      lastName?: string;
      role?: string;
      isEmailVerified?: boolean;
      authProvider?: string;
    };
  }
}