// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9chjMH0kNFSVQQSkMe1XJ3IVj2ZX8uhc",
  authDomain: "asgermovies.firebaseapp.com",
  projectId: "asgermovies",
  storageBucket: "asgermovies.appspot.com",
  messagingSenderId: "76418606820",
  appId: "1:76418606820:web:55e8344720b0be2e99eef1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();