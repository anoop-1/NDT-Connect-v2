
// src/contexts/AuthContext.tsx
"use client";

import type { User, ClientProfileData, ProviderProfileData } from '@/lib/types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';

interface LoginDetails {
  email: string;
  role: 'client' | 'provider';
  name: string;
  profileData: Partial<ClientProfileData & ProviderProfileData>;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>; // Expose setUser for profile updates
  loading: boolean;
  login: (details: LoginDetails) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load user from localStorage
    try {
      const storedUser = localStorage.getItem('ndt-user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        // Basic validation of stored user structure
        if (parsedUser && parsedUser.id && parsedUser.email && parsedUser.role) {
            setUser(parsedUser);
        } else {
            localStorage.removeItem('ndt-user'); // Clear invalid stored user
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
      id: Date.now().toString(), // Simple unique ID for mock
      email: details.email,
      role: details.role,
      name: details.name
    };

    if (details.role === 'client') {
      newUser.clientProfile = details.profileData as ClientProfileData;
    } else if (details.role === 'provider') {
      // Ensure all expected fields for ProviderProfileData are handled
      const providerProfile: ProviderProfileData = {
        location: (details.profileData as ProviderProfileData).location || "",
        servicesOffered: (details.profileData as ProviderProfileData).servicesOffered || [],
        contactNumber: (details.profileData as ProviderProfileData).contactNumber || "",
        pricingDetails: (details.profileData as ProviderProfileData).pricingDetails || "",
        procedureInfo: (details.profileData as ProviderProfileData).procedureInfo || "",
        acceptanceCriteriaInfo: (details.profileData as ProviderProfileData).acceptanceCriteriaInfo || "",
        companyLogoUrl: (details.profileData as ProviderProfileData).companyLogoUrl || "",
        baseRate: (details.profileData as ProviderProfileData).baseRate || 0,
        certifications: (details.profileData as ProviderProfileData).certifications || [],
        personnelQualifications: (details.profileData as ProviderProfileData).personnelQualifications || [],
        isVerified: (details.profileData as ProviderProfileData).isVerified || false, // Default to false
      };
      newUser.providerProfile = providerProfile;
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

  // Update loading state when user changes, ensuring it becomes false once user is set (either from localStorage or login)
  useEffect(() => {
    setLoading(false);
  }, [user]);


  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
