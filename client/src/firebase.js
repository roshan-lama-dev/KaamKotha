// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernestate-51310.firebaseapp.com",
  projectId: "mernestate-51310",
  storageBucket: "mernestate-51310.appspot.com",
  messagingSenderId: "535442592752",
  appId: "1:535442592752:web:89d6917072811f77438335",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
