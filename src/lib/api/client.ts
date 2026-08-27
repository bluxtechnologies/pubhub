import axios from 'axios';
import { API_CONFIG } from './config';
import { ApiError } from './errors';

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor to attach bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to normalize Laravel error payloads
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      throw new ApiError(
        data?.message || 'An error occurred while communicating with the server',
        status,
        data?.errors
      );
    }
    throw new ApiError(error.message || 'Network error', 0);
  }
);
