import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",               // Replace with your actual API key
  authDomain: "your-auth-domain",       // Replace with your actual Auth Domain
  projectId: "your-project-id",         // Replace with your actual Project ID
  storageBucket: "your-storage-bucket", // Replace with your actual Storage Bucket
  messagingSenderId: "your-sender-id",  // Replace with your actual Sender ID
  appId: "your-app-id",                 // Replace with your actual App ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
