// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDhq-biD6U3Ynyl4j5F8hbJIJa42YWH0-k",
    authDomain: "chat-app-cf40a.firebaseapp.com",
    projectId: "chat-app-cf40a",
    storageBucket: "chat-app-cf40a.firebasestorage.app",
    messagingSenderId: "1072008664489",
    appId: "1:1072008664489:web:430e7aa934c49a27c8e0b8",
    measurementId: "G-H0FMP99JG1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
