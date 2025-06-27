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

// Helper function to recursively remove any fields with `undefined` values.
// Firestore rejects objects containing `undefined`.
const cleanForFirestore = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(v => cleanForFirestore(v));
    }

    const newObj: {[key: string]: any} = {};
    for (const key in obj) {
        if (obj[key] !== undefined) {
            newObj[key] = cleanForFirestore(obj[key]);
        }
    }

    return newObj;
};


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
    const profileData = details.profileData || {};

    let newUser: User = {
      id: `${details.role}-${Date.now()}`, // Simple unique ID
      email: details.email,
      role: details.role,
      name: details.name,
      isDemo: details.isDemo || false,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profileImageUrl: null,
      clientProfile: null,
      providerProfile: null,
      inspectorProfile: null,
    };

    if (details.role === 'client') {
      newUser.clientProfile = {
        companyName: profileData.companyName,
        industry: profileData.industry,
        primaryLocation: profileData.primaryLocation,
        contactNumber: profileData.contactNumber,
      };
    } else if (details.role === 'provider') {
      const providerProfile = profileData as ProviderProfileData;
      newUser.providerProfile = {
        companyName: providerProfile.companyName,
        location: providerProfile.location,
        contactNumber: providerProfile.contactNumber,
        procedureInfoUrl: providerProfile.procedureInfoUrl,
        companyLogoUrl: providerProfile.companyLogoUrl,
        servicesOffered: providerProfile.servicesOffered,
        personnelQualifications: providerProfile.personnelQualifications,
        certifications: providerProfile.certifications,
        isVerified: false,
        availableDocuments: [],
        baseRate: 0,
        serviceRadius: '',
        rating: 4.0,
        specialization: '',
        description: '',
      };
    } else if (details.role === 'inspector') {
      const inspectorProfile = profileData as InspectorProfileData;
      newUser.inspectorProfile = {
          association: inspectorProfile.association,
          contactNumber: inspectorProfile.contactNumber,
          companyName: inspectorProfile.companyName,
          location: inspectorProfile.location,
          designation: inspectorProfile.designation,
          personnelQualifications: [],
      };
    }

    try {
      const userDocRef = doc(db, "users", newUser.id);
      // This is the critical step: clean the object of any `undefined` values before sending.
      const cleanedUser = cleanForFirestore(newUser);
      await setDoc(userDocRef, cleanedUser);
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
     const dataToUpdate = {
        ...userToUpdate,
        updatedAt: new Date().toISOString(),
     };
     
     // Also clean data on updates to prevent errors.
     const cleanedData = cleanForFirestore(dataToUpdate);
     await setDoc(userDocRef, cleanedData, { merge: true });
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
