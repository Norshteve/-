
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// هام: قم باستبدال هذه القيم بالقيم الحقيقية من لوحة تحكم Firebase الخاصة بك
// Go to Firebase Console -> Project Settings -> General -> Your Apps -> SDK Setup and Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-YOUR-REAL-API-KEY-HERE",
  authDomain: "munasabatkom-app.firebaseapp.com",
  projectId: "munasabatkom-app",
  storageBucket: "munasabatkom-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
