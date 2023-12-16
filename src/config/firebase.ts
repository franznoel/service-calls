import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const isDevelopment = process.env.NODE_ENV === 'development';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);
const firebaseAuth = getAuth();

if (isDevelopment) {
  connectFirestoreEmulator(firestoreDb, '127.0.0.1', 8080);
  connectAuthEmulator(firebaseAuth, "http://127.0.0.1:9099");
}

export {
  firebaseApp,
  firestoreDb,
  firebaseAuth,
};
