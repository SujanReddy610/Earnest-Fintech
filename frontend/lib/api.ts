import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const register = async (email: string, name: string, password: string) => {
  const response = await api.post('/auth/register', { email, name, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await api.post('/auth/refresh', { refreshToken });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getTasks = async (page = 1, limit = 10, status?: string, search?: string) => {
  const response = await api.get('/tasks', {
    params: { page, limit, status, search },
  });
  return response.data;
};

export const getTask = async (id: string) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (title: string, description?: string) => {
  const response = await api.post('/tasks', { title, description });
  return response.data;
};

export const updateTask = async (id: string, title?: string, description?: string, status?: string) => {
  const response = await api.patch(`/tasks/${id}`, { title, description, status });
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

export const toggleTaskStatus = async (id: string) => {
  const response = await api.post(`/tasks/${id}/toggle`);
  return response.data;
};
