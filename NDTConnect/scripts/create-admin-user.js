// Script to create an admin user in Firestore or your database
// This script assumes Firebase Admin SDK is set up and initialized

const admin = require('firebase-admin');

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const email = 'anoop@atlantisinspection.com';
const password = 'Atlantis9$';
const displayName = 'Admin User';
const role = 'admin';

async function createAdminUser() {
  try {
    // Create the user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });
    console.log('Successfully created new user:', userRecord.uid);

    // Set custom claims for admin role
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });
    console.log('Custom claims set for admin.');

    // Optionally, add user profile to Firestore
    const db = admin.firestore();
    await db.collection('users').doc(userRecord.uid).set({
      email,
      displayName,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('Admin user profile created in Firestore.');
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('User already exists.');
    } else {
      console.error('Error creating admin user:', error);
    }
  }
}

createAdminUser();
