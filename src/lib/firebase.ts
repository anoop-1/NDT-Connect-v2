
// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// IMPORTANT: Replace these with your actual Firebase project's configuration values!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your actual API key
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // Replace with your actual auth domain
  projectId: "YOUR_PROJECT_ID", // Replace with your actual project ID
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // Replace with your actual storage bucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your actual messaging sender ID
  appId: "YOUR_APP_ID", // Replace with your actual app ID
  // measurementId: "YOUR_MEASUREMENT_ID" // Optional: Replace if you use Google Analytics
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
