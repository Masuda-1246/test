// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIw1befjc5g49wJ0QbQlZFM3YNdEoXaWY",
  authDomain: "test-1c3de.firebaseapp.com",
  projectId: "test-1c3de",
  storageBucket: "test-1c3de.appspot.com",
  messagingSenderId: "265939666503",
  appId: "1:265939666503:web:fefb315be9317c60761362",
  measurementId: "G-G8D55869WN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();

export default app;