// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 이 줄 추가됨

const firebaseConfig = {
  apiKey: "AIzaSyD9CsVgO0aFLl2CyCciNuN2I_j3eSAnYAo", // 본인 키 그대로 사용
  authDomain: "capstone-game-21431.firebaseapp.com",
  projectId: "capstone-game-21431",
  storageBucket: "capstone-game-21431.firebasestorage.app",
  messagingSenderId: "612723157220",
  appId: "1:612723157220:web:0c490cb9a97ef19cf224f1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 인증 기능을 밖으로 내보내야 다른 파일에서 씁니다