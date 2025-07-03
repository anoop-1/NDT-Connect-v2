// src/contexts/AuthContext.tsx
"use client";

import type { User, ClientProfileData, ProviderProfileData, InspectorProfileData } from '@/lib/types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification,
    type User as FirebaseUser
} from "firebase/auth";
import { MOCK_DEMO_CLIENT, MOCK_DEMO_PROVIDER } from '@/lib/mockData';


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
  register: (details: RegisterDetails) => Promise<FirebaseUser | null>;
  loginWithEmail: (email: string, password?: string) => Promise<FirebaseUser | null>;
  loginAsDemoUser: (role: 'client' | 'provider') => void;
  logout: () => void;
  updateUser: (userToUpdate: User) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async (firebaseUser: FirebaseUser): Promise<User | null> => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      const appUser: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: data.name,
        role: data.role,
        emailVerified: firebaseUser.emailVerified,
        ...data
      };
      storeUserSession(appUser);
      return appUser;
    }
    return null;
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        await fetchUserProfile(firebaseUser);
      } else {
        // User is signed out
        setUser(null);
        localStorage.removeItem('ndt-user');
      }
      setLoading(false);
    });

    // Check for demo user in local storage as a fallback for non-Firebase auth sessions
    const storedUserJson = localStorage.getItem('ndt-user');
    if (storedUserJson) {
      const storedUser = JSON.parse(storedUserJson);
      if (storedUser.isDemo) {
        setUser(storedUser);
        setLoading(false);
      }
    }


    return () => unsubscribe();
  }, [fetchUserProfile]);

  const storeUserSession = (userToStore: User) => {
    setUser(userToStore);
    localStorage.setItem('ndt-user', JSON.stringify(userToStore));
  };

  const register = async (details: RegisterDetails): Promise<FirebaseUser | null> => {
    const { email, role, name, isDemo = false, profileData, password } = details;
    
    if (!password) {
        throw new Error("Password is required for registration.");
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const baseUser: Omit<User, 'id'> = {
      email: firebaseUser.email!,
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
            baseRate: profileData.servicesOffered?.[0]?.rate ? Number(profileData.servicesOffered[0].rate) : 0,
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
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      await setDoc(userDocRef, finalUser);
      
      // Send verification email
      await sendEmailVerification(firebaseUser);

      return firebaseUser;
    } catch (error) {
      console.error("Error creating user profile in Firestore:", error);
      // Optional: Delete the just-created Firebase Auth user if Firestore profile creation fails
      // await firebaseUser.delete(); 
      throw new Error("Failed to create user account in the database.");
    }
  };
  
  const loginWithEmail = async (email: string, password?: string): Promise<FirebaseUser | null> => {
    if (!password) {
        throw new Error("Password is required.");
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // onAuthStateChanged will handle setting the user state
        return userCredential.user;
    } catch (error: any) {
        console.error("Error logging in with email:", error);
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            throw new Error("Invalid email or password.");
        }
        throw new Error("Login failed. Please try again.");
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
     
     // Remove fields that should not be in Firestore or are managed by Firebase Auth
     const { id, emailVerified, ...dataToSave } = firestoreUser;
     
     await setDoc(userDocRef, dataToSave, { merge: true });

     storeUserSession(userToUpdate);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem('ndt-user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, register, loginWithEmail, loginAsDemoUser, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
