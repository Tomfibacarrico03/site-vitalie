// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCepKH1tBIhnpFUgI7jOIopH-FYCRIQitU",
    authDomain: "site-vitalie.firebaseapp.com",
    projectId: "site-vitalie",
    storageBucket: "site-vitalie.appspot.com",
    messagingSenderId: "819295218409",
    appId: "1:819295218409:web:e5173656bfaedf60ba1e78",
    measurementId: "G-RZQJ4N8C2C"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const functions = getFunctions(app);
export {auth, db, functions};

