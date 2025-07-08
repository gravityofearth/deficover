// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "deficover.firebaseapp.com",
  projectId: "deficover",
  storageBucket: "deficover.firebasestorage.app",
  messagingSenderId: "760503227430",
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: "G-D01CWTN68W",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
export const app = getApp();
export { onAuthStateChanged };
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
// provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

// const analytics = getAnalytics(app);
