
// src/contexts/AuthContext.tsx
"use client";

import type { User, ClientProfileData, ProviderProfileData } from '@/lib/types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp, getDocs, collection, query, where, limit } from "firebase/firestore";

interface RegisterDetails {
  email: string;
  role: 'client' | 'provider' | 'admin';
  name: string;
  isDemo?: boolean;
  profileData?: Partial<ClientProfileData & ProviderProfileData>;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>; // For direct state manipulation if needed
  loading: boolean;
  register: (details: RegisterDetails) => Promise<User | null>;
  loginWithEmail: (email: string) => Promise<User | null>;
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

  const register = async (details: RegisterDetails) => {
    const newUser: User = {
      id: `${details.role}-${Date.now()}`, // Simple unique ID
      email: details.email,
      role: details.role,
      name: details.name,
      isDemo: details.isDemo || false,
      isActive: true, // New users are active by default
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
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

    try {
      await setDoc(doc(db, "users", newUser.id), newUser);
      // Don't store session here, let login page redirect and handle it
      return newUser;
    } catch (error) {
      console.error("Error creating user in Firestore:", error);
      return null;
    }
  };
  
  const loginWithEmail = async (email: string): Promise<User | null> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email), limit(1));
    
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null; // User not found
        }
        
        const userDoc = querySnapshot.docs[0];
        const foundUser = { id: userDoc.id, ...userDoc.data() } as User;
        
        if (!foundUser.isActive) {
            throw new Error("User account is inactive.");
        }

        storeUserSession(foundUser);
        return foundUser;

    } catch (error) {
        console.error("Error logging in with email:", error);
        throw error; // Re-throw to be caught by the form
    }
  };

  const updateUser = async (userToUpdate: User) => {
     const userDocRef = doc(db, "users", userToUpdate.id);
     const dataToUpdate = {
        ...userToUpdate,
        updatedAt: serverTimestamp(),
     };
     await setDoc(userDocRef, dataToUpdate, { merge: true });
     storeUserSession(userToUpdate); // Update state and local storage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ndt-user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, register, loginWithEmail, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
