import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/authStore';

// Extend the InternalAxiosRequestConfig type to include the _retry property
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config: ExtendedAxiosRequestConfig) => {
    const authStore = useAuthStore.getState();
    console.log('Request interceptor called. Is token expired?', authStore.isTokenExpired());

    if (authStore.accessToken && authStore.isTokenExpired()) {
      try {
        console.log('Token expired, refreshing...');
        const newAccessToken = await authStore.refreshAccessToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (error) {
        console.error('Token refresh failed:', error);
        authStore.logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    } else if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const authStore = useAuthStore.getState();
      try {
        const newAccessToken = await authStore.refreshAccessToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout and redirect to login page
        authStore.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
