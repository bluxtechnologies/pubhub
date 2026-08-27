export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  useMock: import.meta.env.VITE_USE_MOCK_API !== 'false', // Default to true until Laravel backend is linked
  timeout: 10000,
};
