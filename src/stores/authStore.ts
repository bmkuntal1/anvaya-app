import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { AuthState, Tokens, User } from '@/types/auth';
import axios from 'axios';

export const STORAGE_KEY = 'anvaya_s962';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      login: (tokens: Tokens) => {
        const decodedToken = jwtDecode<User>(tokens.accessToken);
        const expiresAt = Date.now() + tokens.expiresIn * 1000; // Convert expiresIn to milliseconds and add to current time
        set({
          isAuthenticated: true,
          user: decodedToken,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresAt,
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
          expiresAt: null,
        });
      },
      refreshAccessToken: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, { refreshToken });
          const newTokens: Tokens = response.data;
          const expiresAt = Date.now() + newTokens.expiresIn * 1000;
          set({
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
            expiresAt,
          });
          return newTokens.accessToken;
        } catch (error) {
          console.error('Failed to refresh token:', error);
          get().logout();
          throw error;
        }
      },
      isTokenExpired: () => {
        const { expiresAt } = get();
        if (!expiresAt) return true;
        return Date.now() >= expiresAt;
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          const storedData = localStorage.getItem(key);
          if (storedData) {
            return JSON.parse(storedData);
          }
          return null;
        },
        setItem: (key, value) => {
          const data = JSON.stringify(value);
          localStorage.setItem(key, data);
        },
        removeItem: (key) => localStorage.removeItem(key),
      })),
    }
  )
);
