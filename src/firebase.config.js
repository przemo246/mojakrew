// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR8eMcdkTCa4pkLfhUz-Hl860BskKp3cc",
  authDomain: "mojakrew-600bc.firebaseapp.com",
  projectId: "mojakrew-600bc",
  storageBucket: "mojakrew-600bc.appspot.com",
  messagingSenderId: "142008667098",
  appId: "1:142008667098:web:fa8820c5452798b99e8ee3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
