import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const API_BASE_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  let token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  
  if (!token && typeof window !== 'undefined') {
    // Auto-inject a long-lived JWT token for User 1 since there is no login UI
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzgwOTM3ODI4LCJleHAiOjE4MDY4NTc4Mjh9.SQrmSi_oYk4cBbYWcRl3hija7OiMgJbzXASmWS0gU6Q';
    localStorage.setItem('access_token', token);
    localStorage.setItem('token', token);
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear it
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        // Automatically reloading will re-inject the mock token 
        window.location.reload();
      }
    }
    return Promise.reject(error)
  }
)

export default api
