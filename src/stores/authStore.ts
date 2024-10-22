import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { AuthState, Tokens, User } from '@/types/auth';
import axios from 'axios';
import dayjs from 'dayjs';

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
        set({
          isAuthenticated: true,
          user: decodedToken,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresAt: tokens.expires,
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
          set({
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
            expiresAt: newTokens.expires,
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
        return dayjs().isAfter(expiresAt);
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
