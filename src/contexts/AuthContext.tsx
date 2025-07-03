
// src/contexts/AuthContext.tsx
"use client";

import type { User, ClientProfileData, ProviderProfileData, InspectorProfileData } from '@/lib/types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, getDocs, collection, query, where, limit, Timestamp } from "firebase/firestore";
import { MOCK_DEMO_CLIENT, MOCK_DEMO_PROVIDER } from '@/lib/mockData';

interface RegisterDetails {
  email: string;
  role: 'client' | 'provider' | 'admin' | 'inspector';
  name: string;
  isDemo?: boolean;
  profileData: any; // Allow any from form
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
          if (storedUser.createdAt && !(storedUser.createdAt instanceof Date)) storedUser.createdAt = new Date(storedUser.createdAt);
          if (storedUser.updatedAt && !(storedUser.updatedAt instanceof Date)) storedUser.updatedAt = new Date(storedUser.updatedAt);
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

  const register = async (details: RegisterDetails): Promise<User | null> => {
    const { email, role, name, isDemo = false, profileData } = details;

    const baseUser: Omit<User, 'id'> = {
      email: email,
      role: role,
      name: name,
      isDemo: isDemo,
      isActive: true,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      profileImageUrl: null,
      clientProfile: null,
      providerProfile: null,
      inspectorProfile: null,
    };

    let finalUser: Omit<User, 'id'> = baseUser;

    if (role === 'client') {
      finalUser.clientProfile = {
        companyName: profileData.companyName,
        industry: profileData.industry,
        primaryLocation: profileData.primaryLocation,
        contactNumber: profileData.contactNumber,
      };
    } else if (role === 'provider') {
        const firstService = profileData.servicesOffered?.[0];
        finalUser.providerProfile = {
            companyName: profileData.companyName,
            location: profileData.location,
            contactNumber: profileData.contactNumber,
            servicesOffered: profileData.servicesOffered || [],
            personnelQualifications: profileData.personnelQualifications || [],
            certifications: profileData.certifications || [],
            procedureInfoUrl: profileData.procedureInfoUrl || null,
            companyLogoUrl: profileData.companyLogoUrl || null,
            isVerified: false,
            availableDocuments: [],
            serviceRadius: '50 miles',
            baseRate: firstService?.rate || 0,
            description: 'Newly registered provider specializing in specified services.',
            specialization: 'General NDT',
            rating: 4.0,
        };
    } else if (role === 'inspector') {
      finalUser.inspectorProfile = {
        association: profileData.association,
        contactNumber: profileData.contactNumber,
        companyName: profileData.companyName || null,
        location: profileData.location || null,
        designation: profileData.designation || null,
        personnelQualifications: [] // Keep it simple for registration
      };
    }

    try {
      const id = `${role}-${Date.now()}`;
      const userToStoreInDb = { ...finalUser, id };
      const userDocRef = doc(db, 'users', id);
      await setDoc(userDocRef, userToStoreInDb);
      
      const localUser = {
          ...userToStoreInDb,
          createdAt: (userToStoreInDb.createdAt as Timestamp).toDate(),
          updatedAt: (userToStoreInDb.updatedAt as Timestamp).toDate(),
      };
      storeUserSession(localUser as User);

      return localUser as User;
    } catch (error) {
      console.error("Error creating user in Firestore:", error);
      console.error("Data that failed to write:", JSON.stringify(finalUser, null, 2));
      return null;
    }
  };
  
  const loginWithEmail = async (email: string): Promise<User | null> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email), where("isDemo", "!=", true), limit(1));
    
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        
        const userDoc = querySnapshot.docs[0];
        const data = userDoc.data();
        
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
        throw error;
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
     
     // Create a Firestore-compatible version of the user object
     const firestoreUser = {
       ...userToUpdate,
       createdAt: Timestamp.fromDate(new Date(userToUpdate.createdAt)),
       updatedAt: Timestamp.fromDate(new Date()), // Always update timestamp on change
     };
     
     await setDoc(userDocRef, firestoreUser, { merge: true });

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
