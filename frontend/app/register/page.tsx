'use client';

import { RegisterForm } from '@/components/RegisterForm';
import { ToastContainer } from '@/components/Toast';
import { useToast } from '@/hooks/useToast';

export default function RegisterPage() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h1>
        <RegisterForm />
      </div>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
