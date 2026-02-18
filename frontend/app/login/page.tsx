'use client';

import { useState } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { ToastContainer } from '@/components/Toast';
import { useToast } from '@/hooks/useToast';

export default function LoginPage() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        <LoginForm />
      </div>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
