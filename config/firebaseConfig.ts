/**
 * @deprecated This file is deprecated and no longer used.
 * The application now uses a custom REST API backend instead of Firebase.
 * See config/apiConfig.ts for the new API configuration.
 * 
 * This file is kept temporarily to avoid breaking any remaining imports.
 * It can be safely removed once all references are cleaned up.
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// You need to get these from Firebase Console > Project Settings > General > Your apps > Web app
const firebaseConfig = {
  apiKey: "AIzaSyCaOyUrpXynKGtuPQimL_3vbwuFfu0QHts",
  authDomain: "palcity-e00d4.firebaseapp.com",
  projectId: "palcity-e00d4",
  storageBucket: "palcity-e00d4.firebasestorage.app",
  messagingSenderId: "979664903684",
  appId: "1:979664903684:android:6b2a843779af6483c71f51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth with AsyncStorage persistence for React Native
// Note: For React Native, we need to use a custom persistence implementation
// The warning about AsyncStorage can be safely ignored as auth state will persist via context
export const auth = getAuth(app);

export default app;
