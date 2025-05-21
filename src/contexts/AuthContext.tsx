// src/contexts/AuthContext.tsx
"use client";

import type { User } from '@/lib/types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  login: (email: string, role: 'client' | 'provider') => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load user from localStorage (very basic persistence)
    try {
      const storedUser = localStorage.getItem('ndt-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      localStorage.removeItem('ndt-user');
    }
    setLoading(false);
  }, []);

  const login = (email: string, role: 'client' | 'provider') => {
    const newUser: User = { id: Date.now().toString(), email, role, name: email.split('@')[0] };
    setUser(newUser);
    try {
      localStorage.setItem('ndt-user', JSON.stringify(newUser));
    } catch (error) {
       console.error("Failed to save user to localStorage", error);
    }
  };

  const logout = () => {
    setUser(null);
    try {
     localStorage.removeItem('ndt-user');
    } catch (error) {
      console.error("Failed to remove user from localStorage", error);
    }
  };
  
  // Ensure loading state reflects initial check
  useEffect(() => {
    if (user !== null) { // if user is loaded (either from storage or login)
      setLoading(false);
    }
  }, [user]);


  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}