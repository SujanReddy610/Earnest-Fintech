'use client';

import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedUser = localStorage.getItem('user');

      setAccessToken(storedAccessToken);
      setRefreshTokenValue(storedRefreshToken);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
  }, []);

  const login = (token: string, refresh: string, userData: any) => {
    setAccessToken(token);
    setRefreshTokenValue(refresh);
    setUser(userData);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshTokenValue(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  const updateAccessToken = (newToken: string) => {
    setAccessToken(newToken);
    localStorage.setItem('accessToken', newToken);
  };

  return {
    accessToken,
    refreshTokenValue,
    user,
    loading,
    login,
    logout,
    updateAccessToken,
  };
};
