// src/contexts/AuthContext.tsx
"use client";

import type { User, ClientProfileData, ProviderProfileData, InspectorProfileData } from '@/lib/types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect } from 'react';
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, getDocs, collection, query, where, limit, Timestamp } from "firebase/firestore";
import { MOCK_DEMO_CLIENT, MOCK_DEMO_PROVIDER } from '@/lib/mockData';
import bcrypt from 'bcryptjs';

interface RegisterDetails {
  email: string;
  password?: string;
  role: 'client' | 'provider' | 'admin' | 'inspector';
  name: string;
  isDemo?: boolean;
  profileData: any; // Allow any from form
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  register: (details: RegisterDetails) => Promise<User | null>;
  loginWithEmail: (email: string, password?: string) => Promise<User | null>;
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
    const { email, role, name, isDemo = false, profileData, password } = details;

    // Check if user already exists
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error("An account with this email already exists.");
    }
    
    if (!password) {
        throw new Error("Password is required for registration.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const baseUser: Omit<User, 'id'> = {
      email: email,
      role: role,
      name: name,
      password: hashedPassword,
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
        personnelQualifications: [] 
      };
    }

    try {
      const id = `${role}-${email.split('@')[0]}-${Date.now()}`;
      const userDocRef = doc(db, 'users', id);
      await setDoc(userDocRef, finalUser);
      
      const userToReturn = { 
        ...finalUser, 
        id, 
        createdAt: (finalUser.createdAt as Timestamp).toDate(),
        updatedAt: (finalUser.updatedAt as Timestamp).toDate(),
      } as User;

      // Do not log in user upon registration. They must log in manually.
      return userToReturn;
    } catch (error) {
      console.error("Error creating user in Firestore:", error);
      throw new Error("Failed to create user account in the database.");
    }
  };
  
  const loginWithEmail = async (email: string, password?: string): Promise<User | null> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email), limit(1));
    
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            throw new Error("No account found with this email.");
        }
        
        const userDoc = querySnapshot.docs[0];
        const data = userDoc.data();
        
        if (data.isDemo) {
          throw new Error("Please use the demo login buttons for demo accounts.");
        }

        if (!password || !data.password) {
            throw new Error("Invalid login credentials.");
        }

        const isPasswordValid = await bcrypt.compare(password, data.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password.");
        }

        const foundUser: User = { 
            id: userDoc.id, 
            ...data,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
            updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(),
        } as User;
        
        if (!foundUser.isActive) {
            throw new Error("This user account is inactive.");
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
     
     const firestoreUser = {
       ...userToUpdate,
       createdAt: Timestamp.fromDate(new Date(userToUpdate.createdAt)),
       updatedAt: Timestamp.fromDate(new Date()),
     };
     // Remove id from the object to be written to Firestore
     delete (firestoreUser as any).id;
     
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
