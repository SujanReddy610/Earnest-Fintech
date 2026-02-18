'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
  setAuth: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [refreshToken, setRefreshTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedUser = localStorage.getItem('user');

      if (storedAccessToken) {
        setAccessTokenState(storedAccessToken);
      }
      if (storedRefreshToken) {
        setRefreshTokenState(storedRefreshToken);
      }
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, []);

  const setAuth = (newAccessToken: string, newRefreshToken: string, newUser: User) => {
    setAccessTokenState(newAccessToken);
    setRefreshTokenState(newRefreshToken);
    setUserState(newUser);
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setAccessTokenState(null);
    setRefreshTokenState(null);
    setUserState(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  const setAccessToken = (token: string) => {
    setAccessTokenState(token);
    localStorage.setItem('accessToken', token);
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, user, loading, setAuth, logout, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
