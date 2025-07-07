// src/contexts/AuthContext.tsx
"use client";

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';
import { MOCK_DEMO_CLIENT, MOCK_DEMO_PROVIDER } from '@/lib/mockData';
import type { User } from '@/lib/types';

interface RegisterDetails {
  email: string;
  role: 'client' | 'provider' | 'admin' | 'inspector';
  name: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  register: (details: RegisterDetails) => Promise<User>;
  loginWithEmail: (email: string) => Promise<User | null>;
  loginAsDemoUser: (role: 'client' | 'provider') => void;
  logout: () => void;
  updateUser: (userToUpdate: User) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
        console.error("Error parsing user from localStorage", error);
        localStorage.removeItem('ndt-user');
      }
    }
    setLoading(false);
  }, []);

  const storeUserSession = (userToStore: User) => {
    setUser(userToStore);
    localStorage.setItem('ndt-user', JSON.stringify(userToStore));
  };

  const register = async (details: { email: string; role: string; name: string; isDemo?: boolean }) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });
      let errorMsg = 'Registration failed';
      if (!res.ok) {
        try {
          const err = await res.json();
          if (err && err.message) errorMsg = err.message;
        } catch {}
        throw new Error(errorMsg);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };
  
  const loginWithEmail = async (email: string, password: string): Promise<User> => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
  
      if (data.user) {
        setUser(data.user);
        localStorage.setItem('ndt-user', JSON.stringify(data.user));
        return data.user;
      }
  
      throw new Error('No user data returned');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Define proper demo users for demo login
  const DEMO_CLIENT_USER: User = {
    id: 'demo-client',
    email: 'demo-client@example.com',
    name: 'Demo Client',
    role: 'client',
    createdAt: new Date(),
    updatedAt: new Date(),
    verified: true,
    verificationToken: null,
  };
  const DEMO_PROVIDER_USER: User = {
    id: 'demo-provider',
    email: 'demo-provider@example.com',
    name: 'Demo Provider',
    role: 'provider',
    createdAt: new Date(),
    updatedAt: new Date(),
    verified: true,
    verificationToken: null,
  };

  const loginAsDemoUser = (role: 'client' | 'provider') => {
    const demoUser = role === 'client' ? DEMO_CLIENT_USER : DEMO_PROVIDER_USER;
    storeUserSession(demoUser);
  };

  const updateUser = async (userToUpdate: User) => {
    // For demo users, just update session
    if (userToUpdate.id === 'demo-client' || userToUpdate.id === 'demo-provider') {
      storeUserSession(userToUpdate);
      return;
    }

    // Removed Firestore logic

    storeUserSession(userToUpdate);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('ndt-user');
    await fetch('/api/logout');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, register, loginWithEmail, loginAsDemoUser, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
