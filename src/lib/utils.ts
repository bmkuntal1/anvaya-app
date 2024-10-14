import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function staticFileUrl(path: string) {
  if (!path) return '';
  const url = import.meta.env.VITE_API_URL.replace('/api', '');
  return `${url}/${path}`;
}

export function getQueryString(params: Record<string, string | number | boolean | undefined>) {
  return Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}
