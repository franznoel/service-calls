import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const isDevelopment = process.env.NODE_ENV === 'development';

const projectId = "pang-service-calls";
const firebaseConfig = isDevelopment ? {
  databaseURL: "http://localhost:8080",
  projectId,
} : {
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId,
};

const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);
if (isDevelopment) {
  connectFirestoreEmulator(firestoreDb, '127.0.0.1', 8080);
}

export {
  firebaseApp,
  firestoreDb,
};
