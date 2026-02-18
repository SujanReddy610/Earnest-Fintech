'use client';

import React, { useState } from 'react';
import { createTask } from '@/lib/api';
import { useToast } from '@/hooks/useToast';

interface TaskFormProps {
  onSuccess?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTask(title, description);
      addToast('Task created successfully!', 'success');
      setTitle('');
      setDescription('');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      addToast(
        error.response?.data?.error || 'Failed to create task',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Create New Task</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task description (optional)"
          rows={3}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
      >
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};
