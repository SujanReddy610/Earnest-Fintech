'use client';

import React, { useState } from 'react';
import { updateTask, deleteTask, toggleTaskStatus } from '@/lib/api';
import { useToast } from '@/hooks/useToast';

interface TaskItemProps {
  task: any;
  onUpdate?: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateTask(task.id, title, description);
      addToast('Task updated successfully!', 'success');
      setIsEditing(false);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error: any) {
      addToast(
        error.response?.data?.error || 'Failed to update task',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    try {
      await toggleTaskStatus(task.id);
      addToast('Task status updated!', 'success');
      if (onUpdate) {
        onUpdate();
      }
    } catch (error: any) {
      addToast(
        error.response?.data?.error || 'Failed to toggle task',
        'error'
      );
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTask(task.id);
      addToast('Task deleted successfully!', 'success');
      if (onUpdate) {
        onUpdate();
      }
    } catch (error: any) {
      addToast(
        error.response?.data?.error || 'Failed to delete task',
        'error'
      );
    }
  };

  const statusColor = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
  };

  if (isEditing) {
    return (
      <form onSubmit={handleUpdate} className="bg-white p-4 rounded-lg shadow-md space-y-3 border-l-4 border-blue-500">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
      task.status === 'COMPLETED' ? 'border-green-500 opacity-75' : 'border-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`font-semibold text-gray-800 ${task.status === 'COMPLETED' ? 'line-through' : ''}`}>
            {title}
          </h4>
          {description && (
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          )}
          <div className="mt-2 flex items-center gap-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor[task.status as keyof typeof statusColor]}`}>
              {task.status}
            </span>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={handleToggle}
            className="text-blue-500 hover:text-blue-700 font-bold text-sm"
            title="Toggle status"
          >
            ✓
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-500 hover:text-yellow-700 font-bold text-sm"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 font-bold text-sm"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};
