'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

if (typeof window !== 'undefined') {
  let token = localStorage.getItem('access_token');
  if (!token) {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzgwOTM3ODI4LCJleHAiOjE4MDY4NTc4Mjh9.SQrmSi_oYk4cBbYWcRl3hija7OiMgJbzXASmWS0gU6Q';
    localStorage.setItem('access_token', token);
    localStorage.setItem('token', token);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      {children}
    </NextThemesProvider>
  );
}

