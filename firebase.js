// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWW9tYUOpBw99_c2QAAZh1Thb6Ph01DSo",
  authDomain: "firestore-6cd29.firebaseapp.com",
  projectId: "firestore-6cd29",
  storageBucket: "firestore-6cd29.firebasestorage.app",
  messagingSenderId: "660475947845",
  appId: "1:660475947845:web:4ebe7df652984f9e62ec2c",
  measurementId: "G-HMEBJTRFK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);