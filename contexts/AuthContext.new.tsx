// src/contexts/AuthContext.tsx
"use client";

// Make sure 'User' is exported from '@/lib/types', or import the correct type if it has a different name
// Update the import path below to the correct relative path if '@/lib/types' does not exist.
// For example, if your types file is at 'src/lib/types.ts', use:
import type { User, ClientProfileData, ProviderProfileData, InspectorProfileData } from '../lib/types';
// Or adjust the path as needed based on your project structure.
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';
import { registerUser, getUserByEmail, updateUser as updateUserInDb } from '../lib/auth-service';
import { MOCK_DEMO_CLIENT, MOCK_DEMO_PROVIDER } from '../lib/mockData';

interface RegisterDetails {
  email: string;
  role: 'client' | 'provider' | 'admin' | 'inspector';
  name: string;
  isDemo?: boolean;
  profileData?: Partial<ClientProfileData & ProviderProfileData & InspectorProfileData> & {
      servicesOffered?: any[];
      personnelQualifications?: any[];
  };
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
  formLoading: boolean; // Added to match context value
  error: string | null; // Added to match context value
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false); // Add this line
  const [error, setError] = useState<string | null>(null);

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
    setFormLoading(true);
    setError(null);
    try {
      const { email, role, name, isDemo, profileData } = details;

      if (isDemo) {
        const demoUser = role === 'client' ? MOCK_DEMO_CLIENT : MOCK_DEMO_PROVIDER;
        setUser(demoUser);
        localStorage.setItem('ndt-user', JSON.stringify(demoUser));
        setFormLoading(false); // End loading
        return demoUser;
      }

      if (role === 'admin') {
        throw new Error('Cannot register user with role "admin".');
      }
      const newUser = await registerUser({ email, role: role as 'client' | 'provider' | 'inspector', name, profileData });
      if (newUser) {
        setUser(newUser);
        localStorage.setItem('ndt-user', JSON.stringify(newUser));
      }
      setFormLoading(false); // End loading
      return newUser;
    } catch (error: any) {
      setFormLoading(false);
      setError(error?.message || "Registration failed");
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
      // Fetch the updated user from backend to ensure state is in sync
      const updatedUser = await getUserByEmail(userToUpdate.email);
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('ndt-user', JSON.stringify(updatedUser));
      }
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
      formLoading, // Add this to context
      error, // expose error
    }}>
      {children}
    </AuthContext.Provider>
  );
}
