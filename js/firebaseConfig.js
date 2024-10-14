// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, setDoc, doc, collection, addDoc, getDocs, onSnapshot, query, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPdjJGS0uu_bQ3zTDZtH1vRKvJI7XWHVc",
  authDomain: "estacionamiento-lasalle.firebaseapp.com",
  projectId: "estacionamiento-lasalle",
  storageBucket: "estacionamiento-lasalle.appspot.com",
  messagingSenderId: "907297168561",
  appId: "1:907297168561:web:d72e793f39f9db8859d690",
  measurementId: "G-NHSWXEWKND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };