'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api';
import { setAuthToken } from '@/lib/api';
import { useAuthContext } from '@/lib/AuthContext';
import { useToast } from '@/hooks/useToast';

interface LoginFormProps {
  onSuccess?: (data: any) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthContext();
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(email, password);
      setAuthToken(data.accessToken);
      setAuth(data.accessToken, data.refreshToken, data.user);
      addToast('Login successful!', 'success');
      if (onSuccess) {
        onSuccess(data);
      }
      // Use setTimeout to ensure state is updated before navigation
      setTimeout(() => {
        router.push('/dashboard');
      }, 100);
    } catch (error: any) {
      addToast(
        error.response?.data?.error || 'Login failed',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="text-blue-500 hover:underline font-bold">
          Register
        </Link>
      </p>
    </form>
  );
};
