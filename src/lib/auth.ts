import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../stores/authStore';

interface DecodedToken {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    }
    return false;
  } catch (error) {
    return true;
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const { refreshToken, login } = useAuthStore.getState();
  if (!refreshToken) return null;

  try {
    const response = await fetch('/api/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error('Failed to refresh token');

    const data = await response.json();
    login(data);

    return data.accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};
