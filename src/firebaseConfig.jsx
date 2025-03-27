// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAphrLdNrDnOyFJwY6dVD8oJTTYA-DXAME",
  authDomain: "juego-db.firebaseapp.com",
  projectId: "juego-db",
  storageBucket: "juego-db.firebasestorage.app",
  messagingSenderId: "967613130349",
  appId: "1:967613130349:web:2f4c21392cad7d6dc60164",
  measurementId: "G-64PBJ1EJX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);