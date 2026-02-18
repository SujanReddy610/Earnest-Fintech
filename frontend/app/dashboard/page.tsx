'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/AuthContext';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { ToastContainer } from '@/components/Toast';
import { useToast } from '@/hooks/useToast';
import { setAuthToken, logout as logoutApi } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const { accessToken, user, loading, logout, setAccessToken } = useAuthContext();
  const { toasts, removeToast } = useToast();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!loading && !accessToken) {
      router.push('/login');
    } else if (accessToken) {
      setAuthToken(accessToken);
    }
  }, [loading, accessToken, router]);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      // Logout anyway even if API call fails
    }
    logout();
    router.push('/');
  };

  const handleTaskCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
            <p className="text-gray-600 text-sm">Welcome, {user.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Task Form */}
          <div className="md:col-span-1">
            <TaskForm onSuccess={handleTaskCreated} />
          </div>

          {/* Task List */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Tasks</h2>
              <TaskList refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>
      </main>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
