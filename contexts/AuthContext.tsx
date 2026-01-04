// src/contexts/AuthContext.tsx
"use client";

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';
import { MOCK_DEMO_CLIENT, MOCK_DEMO_PROVIDER } from '@/lib/mockData';
import type { User } from '../lib/types';

interface RegisterDetails {
  email: string;
  role: 'client' | 'provider' | 'inspector';
  name: string;
  password?: string;
  isDemo?: boolean;
  profileData?: any;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  register: (details: RegisterDetails) => Promise<User | null>;
  loginWithEmail: (email: string, password?: string) => Promise<User | null>;
  loginAsDemoUser: (role: 'client' | 'provider') => void;
  logout: () => void;
  updateUser: (userToUpdate: User) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function sanitizeDemoUserRole<T extends User>(user: any, role: 'client' | 'provider'): T {
  return { ...user, role } as T;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserJson = localStorage.getItem('ndt-user');
    if (storedUserJson) {
      try {
        const storedUser = JSON.parse(storedUserJson) as User;
        if (storedUser && storedUser.id) {
          if (storedUser.createdAt) storedUser.createdAt = new Date(storedUser.createdAt);
          if (storedUser.updatedAt) storedUser.updatedAt = new Date(storedUser.updatedAt);
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
    setLoading(false);
  }, []);

  const register = async (details: RegisterDetails): Promise<User | null> => {
    const { email, role, name, password, isDemo, profileData } = details;
    if (isDemo) {
      const demoUser = role === 'client' ? sanitizeDemoUserRole(MOCK_DEMO_CLIENT, 'client') : sanitizeDemoUserRole(MOCK_DEMO_PROVIDER, 'provider');
      setUser(demoUser);
      localStorage.setItem('ndt-user', JSON.stringify(demoUser));
      return demoUser;
    }
    try {
      // Use API route instead of direct server import
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, name, password, profileData }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const newUser = await response.json();
      if (newUser) {
        setUser(newUser);
        localStorage.setItem('ndt-user', JSON.stringify(newUser));
      }
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, password?: string): Promise<User | null> => {
    try {
      // Use API route instead of direct server import
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const userData = await response.json();
      if (userData) {
        setUser(userData);
        localStorage.setItem('ndt-user', JSON.stringify(userData));
      }
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginAsDemoUser = (role: 'client' | 'provider') => {
    const demoUser = role === 'client' ? sanitizeDemoUserRole(MOCK_DEMO_CLIENT, 'client') : sanitizeDemoUserRole(MOCK_DEMO_PROVIDER, 'provider');
    setUser(demoUser);
    localStorage.setItem('ndt-user', JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ndt-user');
  };

  const updateUser = async (userToUpdate: User) => {
    try {
      // Use API route instead of direct server import
      const response = await fetch('/api/auth/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userToUpdate),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      setUser(userToUpdate);
      localStorage.setItem('ndt-user', JSON.stringify(userToUpdate));
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      loading,
      register,
      loginWithEmail,
      loginAsDemoUser,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
