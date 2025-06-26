
// src/contexts/AuthContext.tsx
"use client";

import type { User, ClientProfileData, ProviderProfileData } from '@/lib/types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';

interface LoginDetails {
  email: string;
  role: 'client' | 'provider' | 'admin';
  name: string;
  isDemo?: boolean;
  profileData?: Partial<ClientProfileData & ProviderProfileData>;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  login: (details: LoginDetails) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('ndt-user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id && parsedUser.email && parsedUser.role) {
            setUser(parsedUser);
        } else {
            localStorage.removeItem('ndt-user');
        }
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      localStorage.removeItem('ndt-user');
    }
    setLoading(false);
  }, []);

  const login = (details: LoginDetails) => {
    const newUser: User = {
      id: Date.now().toString(),
      email: details.email,
      role: details.role,
      name: details.name,
      isDemo: details.isDemo || false,
    };

    if (details.role === 'client' && details.profileData) {
      newUser.clientProfile = details.profileData as ClientProfileData;
    } else if (details.role === 'provider' && details.profileData) {
      const providerProfileData = details.profileData as ProviderProfileData;
      newUser.providerProfile = {
        location: providerProfileData.location || "",
        servicesOffered: providerProfileData.servicesOffered || [],
        contactNumber: providerProfileData.contactNumber || "",
        procedureInfoUrl: providerProfileData.procedureInfoUrl || "",
        companyLogoUrl: providerProfileData.companyLogoUrl || "",
        certifications: providerProfileData.certifications || [],
        personnelQualifications: providerProfileData.personnelQualifications || [],
        isVerified: providerProfileData.isVerified || false,
        availableDocuments: providerProfileData.availableDocuments || [],
        baseRate: providerProfileData.baseRate || 0,
        serviceRadius: providerProfileData.serviceRadius || "",
      };
    }

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

  useEffect(() => {
    setLoading(false);
  }, [user]);


  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
