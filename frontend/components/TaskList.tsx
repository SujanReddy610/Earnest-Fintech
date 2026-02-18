'use client';

import React, { useState, useEffect } from 'react';
import { getTasks } from '@/lib/api';
import { TaskItem } from './TaskItem';
import { useToast } from '@/hooks/useToast';

interface TaskListProps {
  refreshTrigger?: number;
}

export const TaskList: React.FC<TaskListProps> = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState<string>('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<any>(null);
  const { addToast } = useToast();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks(page, limit, status || undefined, search || undefined);
      setTasks(data.data);
      setPagination(data.pagination);
    } catch (error: any) {
      addToast(
        error.response?.data?.error || 'Failed to fetch tasks',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, limit, status, search, refreshTrigger]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {loading && <div className="text-center text-gray-600">Loading tasks...</div>}

      {!loading && tasks.length === 0 && (
        <div className="text-center text-gray-600 py-8">
          No tasks found. Create one to get started!
        </div>
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
        ))}
      </div>

      {pagination && pagination.pages > 1 && (
        <div className="flex justify-between items-center mt-6 p-4 bg-gray-100 rounded-lg">
          <div className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.pages} ({pagination.total} total)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1 || loading}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(pagination.pages, page + 1))}
              disabled={page === pagination.pages || loading}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
