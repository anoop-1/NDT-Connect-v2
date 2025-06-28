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
           // Re-hydrate Date objects if they were stringified in localStorage
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

  const register = async (details: RegisterDetails) => {
    const { email, role, name, isDemo = false, profileData = {} } = details;

    const baseUser: User = {
      id: `${role}-${Date.now()}`, // Simple unique ID for now
      email: email,
      role: role,
      name: name,
      isDemo: isDemo,
      isActive: true, // All new users are active by default
      createdAt: new Date(),
      updatedAt: new Date(),
      profileImageUrl: null,
      clientProfile: null,
      providerProfile: null,
      inspectorProfile: null,
    };
    
    if (role === 'client' && profileData) {
        baseUser.clientProfile = {
            companyName: profileData.companyName || "",
            industry: profileData.industry || "",
            primaryLocation: profileData.primaryLocation || "",
            contactNumber: profileData.contactNumber || "",
        };
    } else if (role === 'provider' && profileData) {
        baseUser.providerProfile = {
            companyName: profileData.companyName || "",
            location: profileData.location || "",
            contactNumber: profileData.contactNumber || "",
            servicesOffered: profileData.servicesOffered || [],
            personnelQualifications: profileData.personnelQualifications || [],
            certifications: profileData.certifications || [],
            procedureInfoUrl: profileData.procedureInfoUrl || null,
            companyLogoUrl: profileData.companyLogoUrl || null,
            isVerified: false,
            availableDocuments: [],
            serviceRadius: "50 miles",
            baseRate: 0,
            description: `Newly registered provider.`,
            specialization: "General NDT",
            rating: 4.0,
        };
    } else if (role === 'inspector' && profileData) {
        baseUser.inspectorProfile = {
            association: profileData.association || 'freelancer',
            contactNumber: profileData.contactNumber || "",
            companyName: profileData.companyName || null,
            location: profileData.location || null,
            designation: profileData.designation || null,
            personnelQualifications: profileData.personnelQualifications || [],
        };
    }

    // --- NEW LOGIC ---
    // This robustly creates a deep copy and removes all `undefined` values,
    // which are not allowed by Firestore. It also converts Date objects to a format
    // that Firestore can handle, which resolves the 400 Bad Request error.
    const cleanUserObjectForFirestore = JSON.parse(JSON.stringify(baseUser));
    
    try {
      const userDocRef = doc(db, "users", cleanUserObjectForFirestore.id);
      // Use the cleaned object to write to Firestore
      await setDoc(userDocRef, cleanUserObjectForFirestore);
      
      // Store the original object (with Date objects intact) in the local session
      storeUserSession(baseUser);
      return baseUser;
    } catch (error) {
      console.error("Error creating user in Firestore:", error);
      console.error("Data that failed to write:", JSON.stringify(cleanUserObjectForFirestore, null, 2));
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
        const data = userDoc.data();
        
        // When fetching from Firestore, Timestamps need to be converted to Date objects
        const foundUser: User = { 
            id: userDoc.id, 
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt ? new Date(data.createdAt) : new Date()),
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : (data.updatedAt ? new Date(data.updatedAt) : new Date()),
        } as User;
        
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

     const cleanUserObjectForFirestore = JSON.parse(JSON.stringify(userToUpdate));
     const userDocRef = doc(db, "users", cleanUserObjectForFirestore.id);
     
     await setDoc(userDocRef, cleanUserObjectForFirestore, { merge: true });
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
