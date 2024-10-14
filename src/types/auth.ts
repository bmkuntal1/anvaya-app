export interface User {
  id: number;
  email: string;
  role: 'admin' | 'job-seeker' | 'recruiter'; // these are dummy roles actual roles are admin, manager, lead, member
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: Date | null;
  login: (tokens: Tokens) => void;
  logout: () => void;
  isTokenExpired: () => boolean;
  refreshAccessToken: () => Promise<string>;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expires: Date;
}
