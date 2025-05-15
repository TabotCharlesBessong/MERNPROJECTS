/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext } from "react";
import useAuth from "@/hooks/use-auth";

type UserType = {
  name: string;
  email: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  userPreferences: {
    enable2FA: boolean;
  };
};

// Define the context shape
type AuthContextType = {
  user?: UserType;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, error, isLoading, isFetching, refetch } = useAuth();
  const user = data?.data?.user;

  return (
    <AuthContext.Provider
      value={{ user, error, isLoading, isFetching, refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
