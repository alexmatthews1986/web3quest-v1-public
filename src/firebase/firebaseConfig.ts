
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported as analyticsIsSupported, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// TODO: Replace this with environment variables later for security in production builds
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize core Firebase app
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore and Auth now for immediate use
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

// Conditionally load Analytics if supported
let analytics: Analytics | undefined = undefined;
analyticsIsSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log("[Firebase] Analytics initialized");
  }
});

export { app, db, auth, analytics };
