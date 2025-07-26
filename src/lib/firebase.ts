import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCyE4S4B5q2JLdtaTtr8kVVvg8y-3Zm7ZE',
  authDomain: 'driftpro-40ccd.firebaseapp.com',
  projectId: 'driftpro-40ccd',
  storageBucket: 'driftpro-40ccd.firebasestorage.app',
  messagingSenderId: '137181225938',
  appId: '1:137181225938:ios:945515ac1dbb4bdbf4de0b',
};

// Initialize Firebase only if config is valid and not already initialized
let app;
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
} else {
  console.error('Firebase config is missing required fields:', {
    apiKey: !!firebaseConfig.apiKey,
    projectId: !!firebaseConfig.projectId
  });
  app = null;
}

// Initialize Firebase services only if app exists
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;

// Debug logging
console.log('Firebase initialization:', {
  hasApp: !!app,
  hasAuth: !!auth,
  hasDb: !!db,
  hasStorage: !!storage,
  config: {
    apiKey: firebaseConfig.apiKey ? 'SET' : 'MISSING',
    projectId: firebaseConfig.projectId ? 'SET' : 'MISSING'
  }
});

export default app; 