import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9CsVgO0aFLl2CyCciNuN2I_j3eSAnYAo",
  authDomain: "capstone-game-21431.firebaseapp.com",
  projectId: "capstone-game-21431",
  storageBucket: "capstone-game-21431.firebasestorage.app",
  messagingSenderId: "612723157220",
  appId: "1:612723157220:web:4a00153d6fb2b77df224f1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);   

