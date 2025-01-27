// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setLogLevel } from "firebase/firestore"; // Import setLogLevel from firestore
import { getAuth, sendEmailVerification } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAudt0QADOMCW7qnyJUfbCUvh73pHux_G0",
  authDomain: "diasspora-94216.firebaseapp.com",
  projectId: "diasspora-94216",
  storageBucket: "diasspora-94216.appspot.com",
  messagingSenderId: "236270903246",
  appId: "1:236270903246:web:60ea1d64c28fcceeef559f",
  measurementId: "G-EE9S7L2CCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

// Enable Firestore debug logging
setLogLevel('debug'); // Add this line to enable verbose logging

export { db, auth, sendEmailVerification };
