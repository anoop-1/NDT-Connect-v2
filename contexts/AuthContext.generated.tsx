// src/contexts/AuthContext.generated.tsx
"use client";

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';
// Update the import path below to the correct relative path if '@/lib/auth-service' does not exist.
// For example, if 'auth-service' is in 'src/lib/', use:
import { registerUser, getUserByEmail, updateUser as updateUserInDb } from '../lib/auth-service';
// Or adjust the path as needed based on your project structure.
import { MOCK_DEMO_CLIENT, MOCK_DEMO_PROVIDER } from '@/lib/mockData';

// Define a minimal User type here or import from the correct location
interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'provider' | 'admin' | 'inspector';
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

interface RegisterDetails {
  email: string;
  role: 'client' | 'provider' | 'admin' | 'inspector';
  name: string;
  isDemo?: boolean;
  profileData?: any;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  register: (details: RegisterDetails) => Promise<User | null>;
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
        console.error('Error parsing stored user:', error);
      }
    }
    setLoading(false);
  }, []);

  const register = async (details: RegisterDetails): Promise<User | null> => {
    const { email, role, name, isDemo, profileData } = details;

    if (isDemo) {
      const demoUser = role === 'client' ? MOCK_DEMO_CLIENT : MOCK_DEMO_PROVIDER;
      setUser(demoUser);
      localStorage.setItem('ndt-user', JSON.stringify(demoUser));
      return demoUser;
    }

    try {
      const newUser = await registerUser({ email, role, name, profileData });
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

  const loginWithEmail = async (email: string): Promise<User | null> => {
    try {
      const user = await getUserByEmail(email);
      if (user) {
        setUser(user);
        localStorage.setItem('ndt-user', JSON.stringify(user));
      }
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginAsDemoUser = (role: 'client' | 'provider') => {
    const demoUser = role === 'client' ? MOCK_DEMO_CLIENT : MOCK_DEMO_PROVIDER;
    setUser(demoUser);
    localStorage.setItem('ndt-user', JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ndt-user');
  };

  const updateUser = async (userToUpdate: User) => {
    try {
      await updateUserInDb(userToUpdate);
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
