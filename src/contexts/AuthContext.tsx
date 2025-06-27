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
// This is a safety net, especially for the updateUser function.
const cleanForFirestore = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(v => cleanForFirestore(v));
    }

    const newObj: {[key: string]: any} = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (value !== undefined) {
                newObj[key] = cleanForFirestore(value);
            }
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
    const { email, role, name, isDemo = false, profileData = {} } = details;

    // Start with a base user object that is always valid
    let newUser: User = {
      id: `${role}-${Date.now()}`,
      email: email,
      role: role,
      name: name,
      isDemo: isDemo,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profileImageUrl: null,
      clientProfile: null,
      providerProfile: null,
      inspectorProfile: null,
    };
    
    // Meticulously build the profile object to ensure no `undefined` values are ever present.
    // This is the definitive fix for the 400 Bad Request error from Firestore.
    if (role === 'client') {
        const p = (profileData as Partial<ClientProfileData>);
        newUser.clientProfile = {
            companyName: p.companyName || '',
            industry: p.industry || '',
            primaryLocation: p.primaryLocation || '',
            contactNumber: p.contactNumber || '',
        };
    } else if (role === 'provider') {
        const p = (profileData as Partial<ProviderProfileData>);
        newUser.providerProfile = {
            companyName: p.companyName || '',
            location: p.location || '',
            contactNumber: p.contactNumber || '',
            servicesOffered: p.servicesOffered || [],
            personnelQualifications: p.personnelQualifications || [],
            certifications: p.certifications || [],
            procedureInfoUrl: p.procedureInfoUrl || null,
            companyLogoUrl: p.companyLogoUrl || null,
            isVerified: false,
            availableDocuments: [],
            baseRate: 0,
            rating: 4.0, // Default rating
            specialization: p.specialization || null,
            description: p.description || null,
            dataAiHint: p.dataAiHint || null,
            lat: p.lat || null,
            lng: p.lng || null,
            serviceRadius: p.serviceRadius || '',
        };
    } else if (role === 'inspector') {
        const p = (profileData as Partial<InspectorProfileData>);
        newUser.inspectorProfile = {
            association: p.association || 'freelancer',
            contactNumber: p.contactNumber || '',
            companyName: p.companyName || null,
            location: p.location || null,
            designation: p.designation || null,
            personnelQualifications: p.personnelQualifications || [],
        };
    }

    try {
      const userDocRef = doc(db, "users", newUser.id);
      // The `newUser` object is now guaranteed to be clean of `undefined` values.
      await setDoc(userDocRef, newUser);
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
     
     // Clean data on updates as a safety measure.
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
