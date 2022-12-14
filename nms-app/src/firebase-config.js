import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxTOhTbVvfOobZeRKqOtAnpY76Z80q0Fg",
  authDomain: "mkw-react-app.firebaseapp.com",
  projectId: "mkw-react-app",
  storageBucket: "mkw-react-app.appspot.com",
  messagingSenderId: "36650925722",
  appId: "1:36650925722:web:774128ef89c442a515e923",
  measurementId: "G-QHN3BTXXFZ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
