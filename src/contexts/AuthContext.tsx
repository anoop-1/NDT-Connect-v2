// src/contexts/AuthContext.tsx
"use client";

import type { User, ClientProfileData, ProviderProfileData, InspectorProfileData } from '@/lib/types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, getDocs, collection, query, where, limit } from "firebase/firestore";
import { MOCK_DEMO_CLIENT, MOCK_DEMO_PROVIDER } from '@/lib/mockData';

interface RegisterDetails {
  email: string;
  role: 'client' | 'provider' | 'admin' | 'inspector';
  name: string;
  isDemo?: boolean;
  profileData?: Partial<ClientProfileData & ProviderProfileData & InspectorProfileData>;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>; // For direct state manipulation if needed
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
    const { email, role, name, isDemo = false, profileData = {} } = details;

    let newUser: User = {
      id: `${role}-${Date.now()}`,
      email: email,
      role: role,
      name: name,
      isDemo: isDemo,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      profileImageUrl: null,
      clientProfile: null,
      providerProfile: null,
      inspectorProfile: null,
    };
    
    if (role === 'client') {
        newUser.clientProfile = profileData as ClientProfileData;
    } else if (role === 'provider') {
        newUser.providerProfile = profileData as ProviderProfileData;
    } else if (role === 'inspector') {
        newUser.inspectorProfile = profileData as InspectorProfileData;
    }

    try {
      const userDocRef = doc(db, "users", newUser.id);
      // Create a clean, plain object for Firestore by serializing and deserializing.
      // This reliably removes 'undefined' values and converts Dates to ISO strings,
      // preventing Firestore write errors.
      const dataForFirestore = JSON.parse(JSON.stringify(newUser));
      
      await setDoc(userDocRef, dataForFirestore);
      return newUser;
    } catch (error) {
      console.error("Error creating user in Firestore:", error);
      return null;
    }
  };
  
  const loginWithEmail = async (email: string): Promise<User | null> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email), where("isDemo", "!=", true), limit(1));
    
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

  const loginAsDemoUser = (role: 'client' | 'provider') => {
    const demoUser = role === 'client' ? MOCK_DEMO_CLIENT : MOCK_DEMO_PROVIDER;
    storeUserSession(demoUser);
  };

  const updateUser = async (userToUpdate: User) => {
     if (userToUpdate.isDemo) {
        storeUserSession(userToUpdate);
        return;
     }

     const userDocRef = doc(db, "users", userToUpdate.id);
     
     // Use the same robust cleaning method for updates.
     const dataForFirestore = JSON.parse(JSON.stringify(userToUpdate));
     await setDoc(userDocRef, dataForFirestore, { merge: true });
     storeUserSession(userToUpdate);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ndt-user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, register, loginWithEmail, loginAsDemoUser, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
