// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs fo r Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR4r2rjpp_jf6Ojmo24_V-E3-gIcorQTk",
  authDomain: "industryproject-e3cb3.firebaseapp.com",
  projectId: "industryproject-e3cb3",
  storageBucket: "industryproject-e3cb3.appspot.com",
  messagingSenderId: "447070787304",
  appId: "1:447070787304:web:38f6f1f91a0b0bfb955b5d",
  measurementId: "G-PSS7ZK7KMR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);