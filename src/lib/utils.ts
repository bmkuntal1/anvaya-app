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