import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAphrLdNrDnOyFJwY6dVD8oJTTYA-DXAME",
  authDomain: "juego-db.firebaseapp.com",
  projectId: "juego-db",
  storageBucket: "juego-db.firebasestorage.app",
  messagingSenderId: "967613130349",
  appId: "1:967613130349:web:2f4c21392cad7d6dc60164",
  measurementId: "G-64PBJ1EJX4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa Firestore
const db = getFirestore(app);

export { db };  // Exporta la instancia de Firestore
export default firebaseConfig;
