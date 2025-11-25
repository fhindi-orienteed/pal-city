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

// Initialize Auth (if you need authentication)
export const auth = getAuth(app);

export default app;
