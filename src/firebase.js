import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-VO3giSR8Trm9Coa5fBxS_7037xpPV0M",
  authDomain: "chat-1f999.firebaseapp.com",
  projectId: "chat-1f999",
  storageBucket: "chat-1f999.firebasestorage.app",
  messagingSenderId: "217897992889",
  appId: "1:217897992889:web:777d54665fd17b7eacd168",
  measurementId: "G-Q2W2ZGKJK2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
